# Install nodejs and yarn via Chocolatey
choco install nodejs yarn

# Refresh the shell to get node/yarn, choco tells you to do so because the path changed.
# But that doesn't seem to work. Maybe it's because CircleCI uses runs commands 
# via `#!powershell.exe -NoProfile -ExecutionPolicy Bypass`.
refreshenv

# Add paths for nodejs and yarn manually to the registry, so future commands pick them up.
$nodeAndYarnPaths = ";C:\Program Files\nodejs\;C:\Program Files (x86)\Yarn\bin\;"

[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::Machine) + $nodeAndYarnPaths,
    [EnvironmentVariableTarget]::Machine)
