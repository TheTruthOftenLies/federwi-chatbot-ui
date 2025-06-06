# PowerShell script to create desktop shortcut for Chatbot UI
$WshShell = New-Object -comObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$([Environment]::GetFolderPath('Desktop'))\Chatbot UI.lnk")
$Shortcut.TargetPath = "$PSScriptRoot\start-chatbot-ui.bat"
$Shortcut.WorkingDirectory = $PSScriptRoot
$Shortcut.IconLocation = "$PSScriptRoot\public\favicon.ico"
$Shortcut.Description = "Chatbot UI Desktop Application"
$Shortcut.Save()

Write-Host "Desktop shortcut created successfully!" -ForegroundColor Green
Write-Host "You can now find 'Chatbot UI' shortcut on your desktop." -ForegroundColor Green 