$logPath = "C:\Users\Asus Vivobook\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\Tester\logs\20261026.log"
$stream = [System.IO.FileStream]::new($logPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
$reader = [System.IO.StreamReader]::new($stream)

$orderTypes = @{}
$sampleLines = @()

while (($line = $reader.ReadLine()) -ne $null) {
    if ($line -like "*CTrade::OrderSend: market*") {
        if ($sampleLines.Count -lt 15) {
            $sampleLines += $line
        }
        # extract comment or info
        $parts = $line -split " "
        $key = "trade"
        if ($line -match "\[(.*?)\]") { $key = $matches[1] }
        if (!$orderTypes.ContainsKey($key)) { $orderTypes[$key] = 0 }
        $orderTypes[$key]++
    }
}
$reader.Close()
$stream.Close()

Write-Output "Sample OrderSend lines:"
$sampleLines | ForEach-Object { Write-Output $_ }
Write-Output "`nOrder Types Count:"
$orderTypes.GetEnumerator() | ForEach-Object { "$($_.Key): $($_.Value)" }
