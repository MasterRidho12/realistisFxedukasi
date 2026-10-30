$testerIni = "c:\realistisfxedukas\mt5\tester_auto.ini"
$terminal = "C:\Program Files\MetaTrader 5\terminal64.exe"
Write-Host "Starting MT5 backtest via CLI..."
$proc = Start-Process -FilePath $terminal -ArgumentList "/config:$testerIni" -PassThru
$timeoutSec = 60
$sw = [System.Diagnostics.Stopwatch]::StartNew()
while (-not $proc.HasExited -and $sw.Elapsed.TotalSeconds -lt $timeoutSec) {
    Start-Sleep -Seconds 2
}
if (-not $proc.HasExited) {
    Write-Host "Test still running after $($sw.Elapsed.TotalSeconds)s..."
} else {
    Write-Host "Test completed in $($sw.Elapsed.TotalSeconds)s with exit code $($proc.ExitCode)"
}
