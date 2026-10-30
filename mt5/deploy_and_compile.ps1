$src1 = "c:\realistisfxedukas\mt5\RealistisFx_MetodeBaku_EA.mq5"
$src2 = "c:\realistisfxedukas\mt5\RealistisFx_Scalper_OB_EA.mq5"
$copy1 = "c:\realistisfxedukas\mt5\RealistisFx_MetodeBaku_EA - Copy.mq5"

$baseMql = "C:\Users\Asus Vivobook\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5\Experts"

Copy-Item $src1 $copy1 -Force
Copy-Item $src1 "$baseMql\RealistisFx_MetodeBaku_EA.mq5" -Force
Copy-Item $src1 "$baseMql\Advisors\RealistisFx_MetodeBaku_EA.mq5" -Force
Copy-Item $src1 "$baseMql\EA RIDHO CANGGIH\RealistisFx_MetodeBaku_EA.mq5" -Force

Copy-Item $src2 "$baseMql\RealistisFx_Scalper_OB_EA.mq5" -Force
Copy-Item $src2 "$baseMql\Advisors\RealistisFx_Scalper_OB_EA.mq5" -Force
Copy-Item $src2 "$baseMql\EA RIDHO CANGGIH\RealistisFx_Scalper_OB_EA.mq5" -Force

Write-Host "Files copied to all MT5 locations."

$metaEditor = "C:\Program Files\MetaTrader 5\MetaEditor64.exe"
if (Test-Path $metaEditor) {
    Write-Host "Compiling RealistisFx_MetodeBaku_EA in EA RIDHO CANGGIH..."
    Start-Process -FilePath $metaEditor -ArgumentList "/compile:`"$baseMql\EA RIDHO CANGGIH\RealistisFx_MetodeBaku_EA.mq5`"", "/log" -Wait

    Write-Host "Compiling RealistisFx_Scalper_OB_EA in EA RIDHO CANGGIH..."
    Start-Process -FilePath $metaEditor -ArgumentList "/compile:`"$baseMql\EA RIDHO CANGGIH\RealistisFx_Scalper_OB_EA.mq5`"", "/log" -Wait

    Write-Host "Compiling root RealistisFx_MetodeBaku_EA..."
    Start-Process -FilePath $metaEditor -ArgumentList "/compile:`"$baseMql\RealistisFx_MetodeBaku_EA.mq5`"", "/log" -Wait

    Write-Host "Compiling root RealistisFx_Scalper_OB_EA..."
    Start-Process -FilePath $metaEditor -ArgumentList "/compile:`"$baseMql\RealistisFx_Scalper_OB_EA.mq5`"", "/log" -Wait

    Write-Host "All compilations completed."
} else {
    Write-Warning "MetaEditor not found at $metaEditor"
}
