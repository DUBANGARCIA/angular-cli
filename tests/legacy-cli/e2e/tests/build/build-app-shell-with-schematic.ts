import { getGlobalVariable } from '../../utils/env';
import { appendToFile, expectFileToMatch } from '../../utils/fs';
import { ng, silentNpm } from '../../utils/process';
import { updateJsonFile } from '../../utils/project';
import { readNgVersion } from '../../utils/version';


export default async function () {
  // Skip this test in Angular 2/4.
  if (getGlobalVariable('argv').ng2 || getGlobalVariable('argv').ng4) {
    return;
  }

  await appendToFile('src/app/app.component.html', '<router-outlet></router-outlet>');
  await ng('generate', 'appShell', '--client-project', 'test-project');
  await updateJsonFile('package.json', packageJson => {
    const dependencies = packageJson['dependencies'];
    dependencies['@angular/platform-server'] = getGlobalVariable('argv')['ng-snapshots']
      ? 'github:angular/platform-server-builds'
      : readNgVersion();
  });

  await silentNpm('install');
  await ng('run', 'test-project:app-shell');
  await expectFileToMatch('dist/test-project/index.html', /app-shell works!/);
}
