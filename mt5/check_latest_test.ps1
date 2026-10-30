$logPath = "C:\Users\Asus Vivobook\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\Tester\logs\20261026.log"
$stream = [System.IO.FileStream]::new($logPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
$reader = [System.IO.StreamReader]::new($stream)

$after = $false
$count = 0
$totalDeals = 0
$profitDeals = 0
$lossDeals = 0

while (($line = $reader.ReadLine()) -ne $null) {
    if ($line -like "*07:49:53*XAUUSD,M30: testing of Experts\EA RIDHO CANGGIH\RealistisFx_Scalper_OB_EA.ex5*") {
        $after = $true
    }
    if ($after) {
        if ($line -like "*CTrade::OrderSend: market*") {
            if ($count -lt 10) {
                Write-Output $line
                $count++
            }
        }
        if ($line -like "*deal performed*") {
            $totalDeals++
        }
    }
}
$reader.Close()
$stream.Close()
Write-Output "`nTotal deals in this run: $totalDeals"
