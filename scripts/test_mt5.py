import MetaTrader5 as mt5

def test():
    init_res = mt5.initialize()
    print("MT5 initialized:", init_res)
    if not init_res:
        print("Last error:", mt5.last_error())
        return
    print("Version:", mt5.version())
    print("Terminal info:", mt5.terminal_info())
    account = mt5.account_info()
    if account:
        print(f"Logged in account: login={account.login}, server={account.server}, currency={account.currency}, balance={account.balance}")
    else:
        print("No active account logged in or error:", mt5.last_error())
    mt5.shutdown()

if __name__ == "__main__":
    test()
