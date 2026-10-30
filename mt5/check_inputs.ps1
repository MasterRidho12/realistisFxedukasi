$logPath = "C:\Users\Asus Vivobook\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\Tester\logs\20261026.log"
$stream = [System.IO.FileStream]::new($logPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
$reader = [System.IO.StreamReader]::new($stream)
$found = $false
$count = 0
while (($line = $reader.ReadLine()) -ne $null) {
    if ($line -like "*RealistisFx_Scalper_OB_EA.ex5*started with inputs*") {
        $found = $true
    }
    if ($found) {
        Write-Output $line
        $count++
        if ($count -ge 35) { break }
    }
}
$reader.Close()
$stream.Close()
