$logPath = "C:\Users\Asus Vivobook\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\Tester\logs\20261026.log"
$stream = [System.IO.FileStream]::new($logPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
$reader = [System.IO.StreamReader]::new($stream)

$after = $false
$trades = @()

while (($line = $reader.ReadLine()) -ne $null) {
    if ($line -like "*07:49:53*XAUUSD,M30: testing of Experts\EA RIDHO CANGGIH\RealistisFx_Scalper_OB_EA.ex5*") {
        $after = $true
    }
    if ($after) {
        if ($line -like "*OrderSend: market*" -or $line -like "*stop loss triggered*" -or $line -like "*take profit triggered*") {
            $trades += $line
            if ($trades.Count -ge 20) { break }
        }
    }
}
$reader.Close()
$stream.Close()
$trades | ForEach-Object { Write-Output $_ }
