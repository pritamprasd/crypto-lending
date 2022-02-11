from counter_contract import CounterContract
from solidity_compiler import compile_sol
from web3_connector import add_account_with_balance, connect_node, create_txn_from_contract, get_admin_account, get_balance, print_all_accounts


if __name__ == '__main__':
    w3 = connect_node("http://127.0.0.1:8545")

    print_all_accounts(w3)
    admin_acc = get_admin_account(w3)
    # accounts = [    
    # {
    #     "address": "0xFC2a2b9A68514E3315f0Bd2a29e900DC1a815a1D",
    #     "private_key": "0xc65f2e9b1c360d44070ede41d5e999d30c23657e2c5889d3d03cef39289cea7c",
    # }]
    # add_account_with_balance(w3, admin_acc, accounts[0]['address'], 1000)
    # bal = get_balance(w3, accounts[0]['address'])
    # print(f"Balance: {bal}, addr: {accounts[0]['address']}")

    counter = CounterContract(w3)    
    receipt = counter.upload_contract(admin_acc)

    for i in range(10):
        print(f"Contract balance: {counter.get_balance()}")
        print(f"Counter: {counter.get_counter()}")
        counter.increment_counter(admin_acc)
        print(f"Contract balance: {counter.get_balance()}")
        print(f"Counter: {counter.get_counter()}")











