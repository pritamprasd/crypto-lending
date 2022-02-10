from solidity_compiler import compile_sol
from web3_connector import add_account_with_balance, add_txn_to_chain, connect_node, create_txn_from_contract, get_admin_account, get_balance, print_all_accounts


if __name__ == '__main__':
    w3 = connect_node("http://127.0.0.1:8545")

    print_all_accounts(w3)

    admin_acc = get_admin_account(w3)
    print(f"Admin account: {admin_acc}")


    accounts = [    
    {
        "address": "0xFC2a2b9A68514E3315f0Bd2a29e900DC1a815a1D",
        "private_key": "0xc65f2e9b1c360d44070ede41d5e999d30c23657e2c5889d3d03cef39289cea7c",
    }]
    # add_account_with_balance(w3, admin_acc, accounts[0]['address'], 1000)

    bal = get_balance(w3, accounts[0]['address'])
    print(f"Balance: {bal}, addr: {accounts[0]['address']}")


    # print(f"Txn: Upload Counter Contract as Txn")
    # counter_txn = create_txn_from_contract(w3, 'contracts/Counter.sol', admin_acc)
    # txn_data = add_txn_to_chain(w3, counter_txn)
    # print(f"Txn data: {txn_data}")

    print(f"Txn: Execute Counter functions")
    counter = w3.eth.contract(address='0xA564Bb123839d464a4E8922F5C5D31249939f566', abi=compile_sol('contracts/Counter.sol').abi)
    counter.functions.read().call()
    # txn_hash = counter.functions.increment().transact({"from": admin_acc});
    # txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
    # print(f"Txn data: {txn_receipt}")
    # counter.functions.read().call()











