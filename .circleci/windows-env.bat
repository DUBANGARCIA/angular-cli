REM Install nodejs and yarn via Chocolatey
choco install nodejs yarn

REM Refresh the shell to get node/yarn, choco tells you to do so because the path changed.
REM But that doesn't seem to work. Maybe it's because CircleCI uses runs commands 
REM via `#!powershell.exe -NoProfile -ExecutionPolicy Bypass`.
refreshenv

REM setx /M path "$Env:Path;C:\Program Files\nodejs\;C:\Program Files (x86)\Yarn\bin\;"
