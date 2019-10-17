/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { logging } from '@angular-devkit/core';
import { spawn } from 'child_process';
import { colors } from '../utilities/color';
import { NgAddSaveDepedency } from '../utilities/package-metadata';

export default async function(
  packageName: string,
  logger: logging.Logger,
  packageManager: string,
  save: NgAddSaveDepedency = true,
) {
  const installArgs: string[] = [];
  switch (packageManager) {
    case 'cnpm':
    case 'pnpm':
    case 'npm':
      installArgs.push('install');
      break;

    case 'yarn':
      installArgs.push('add');
      break;

    default:
      packageManager = 'npm';
      installArgs.push('install');
      break;
  }

  logger.info(colors.green(`Installing packages for tooling via ${packageManager}.`));

  if (packageName) {
    installArgs.push(packageName);
  }

  if (!save) {
    // IMP: yarn doesn't have a no-save option
    installArgs.push('--no-save');
  }

  if (save === 'devDependencies') {
    installArgs.push(packageManager === 'yarn' ? '--dev' : '--save-dev');
  }

  installArgs.push('--quiet');

  await new Promise((resolve, reject) => {
    spawn(packageManager, installArgs, { stdio: 'inherit', shell: true }).on(
      'close',
      (code: number) => {
        if (code === 0) {
          logger.info(colors.green(`Installed packages for tooling via ${packageManager}.`));
          resolve();
        } else {
          reject('Package install failed, see above.');
        }
      },
    );
  });
}
