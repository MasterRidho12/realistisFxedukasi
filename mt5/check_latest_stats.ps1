$logPath = "C:\Users\Asus Vivobook\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\Tester\logs\20261026.log"
$stream = [System.IO.FileStream]::new($logPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
$reader = [System.IO.StreamReader]::new($stream)

$after = $false
$comments = @{}
$tpCount = 0
$slCount = 0

while (($line = $reader.ReadLine()) -ne $null) {
    if ($line -like "*07:49:53*XAUUSD,M30: testing of Experts\EA RIDHO CANGGIH\RealistisFx_Scalper_OB_EA.ex5*") {
        $after = $true
    }
    if ($after) {
        if ($line -match "OrderSend: market (buy|sell) \S+ \S+ sl: \S+ tp: \S+ \[done at \S+\]") {
            # look for the comment in previous line or order description
        }
        if ($line -like "*take profit triggered*") { $tpCount++ }
        if ($line -like "*stop loss triggered*") { $slCount++ }
        if ($line -match 'RFX_.*') {
            $key = $matches[0]
            if (!$comments.ContainsKey($key)) { $comments[$key] = 0 }
            $comments[$key]++
        }
    }
}
$reader.Close()
$stream.Close()
Write-Output "TP count: $tpCount"
Write-Output "SL count: $slCount"
$comments.GetEnumerator() | ForEach-Object { "$($_.Key): $($_.Value)" }
