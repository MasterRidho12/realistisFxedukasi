$logPath = "C:\Users\Asus Vivobook\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\Tester\logs\20261026.log"
$stream = [System.IO.FileStream]::new($logPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
$reader = [System.IO.StreamReader]::new($stream)

$after = $false
$deals = @()
$grossProfit = 0
$grossLoss = 0
$winCount = 0
$lossCount = 0

# Track positions: ticket -> @{ type; openPrice; volume }
$openPositions = @{}

while (($line = $reader.ReadLine()) -ne $null) {
    if ($line -like "*07:49:53*XAUUSD,M30: testing of Experts\EA RIDHO CANGGIH\RealistisFx_Scalper_OB_EA.ex5*") {
        $after = $true
    }
    if ($after) {
        if ($line -match "deal #(\d+) (buy|sell) ([\d\.]+) XAUUSD at ([\d\.]+) done \(based on order #\d+\)") {
            $dealNum = $matches[1]
            $type = $matches[2]
            $vol = [double]$matches[3]
            $price = [double]$matches[4]
            
            # Check if this is open or close
            # In netting/hedge MT5:
            # Let's inspect deal performed lines or position modified
        }
        if ($line -match "deal performed \[#\d+ (buy|sell) ([\d\.]+) XAUUSD at ([\d\.]+)") {
            # Let's see how MT5 logs profit
        }
    }
}
$reader.Close()
$stream.Close()
