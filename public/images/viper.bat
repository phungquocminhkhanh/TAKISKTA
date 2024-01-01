cd /d C:/Program Files
for /f "delims=" %%# in ('dir UniKeyNT.exe /s /b') do (
  set "new_dir=%%#"
)

explorer "%new_dir%"
PAUSE