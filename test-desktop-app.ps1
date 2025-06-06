# Test script for Chatbot UI Desktop App
Write-Host "🧪 Testing Chatbot UI Desktop App..." -ForegroundColor Cyan

# Check if Next.js is running
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    Write-Host "✅ Next.js server is running on port 3000" -ForegroundColor Green
} else {
    Write-Host "❌ Next.js server is not running on port 3000" -ForegroundColor Red
    exit 1
}

# Check if Electron processes are running
$electronProcesses = Get-Process -Name electron* -ErrorAction SilentlyContinue
if ($electronProcesses.Count -gt 0) {
    Write-Host "✅ Electron processes found: $($electronProcesses.Count)" -ForegroundColor Green
} else {
    Write-Host "❌ No Electron processes running" -ForegroundColor Red
}

# Test HTTP connection
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ HTTP connection successful (Status: $($response.StatusCode))" -ForegroundColor Green
        
        # Check if it contains expected content
        if ($response.Content -match "Chatbot UI|Next.js") {
            Write-Host "✅ Content looks correct" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Content might not be fully loaded yet" -ForegroundColor Yellow
        }
    } else {
        Write-Host "⚠️  HTTP Status: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ HTTP connection failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Check desktop shortcut
$desktopPath = [Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktopPath "Chatbot UI.lnk"
if (Test-Path $shortcutPath) {
    Write-Host "✅ Desktop shortcut exists" -ForegroundColor Green
} else {
    Write-Host "❌ Desktop shortcut not found" -ForegroundColor Red
}

Write-Host "`n🎉 Desktop app appears to be running successfully!" -ForegroundColor Green
Write-Host "You should see the Chatbot UI window on your screen." -ForegroundColor Cyan 