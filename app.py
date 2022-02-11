import json
import time
import web3
from counter_contract import CounterContract
from solidity_compiler import compile_sol
from web3_connector import (
    add_balance, connect_node, create_account, create_account_raw, 
    create_txn_from_contract, get_admin_account, get_balance, print_all_accounts, 
    send_txn_to_chain
)

accounts = {
    "lender": {
        "address": "0xFC2a2b9A68514E3315f0Bd2a29e900DC1a815a1D",
        "key": "0xc65f2e9b1c360d44070ede41d5e999d30c23657e2c5889d3d03cef39289cea7c",
    },
    "borrower": {
        "address": "0x9575eB2a7804c43F68dC7998EB0f250832DF9f10",
        "key": "0x2d7bdb58c65480ac5aee00b20d3558fb18a916810d298ed97174cc01bb809cdd",
    }
}

if __name__ == '__main__':
    w3 = connect_node("http://127.0.0.1:8545")
    admin_acc = get_admin_account(w3)

    create_account_raw(w3, accounts['lender']['key'])
    create_account_raw(w3, accounts['borrower']['key'])
    print_all_accounts(w3)

    add_balance(w3, admin_acc, accounts['lender']['address'], 100000000000000000)
    add_balance(w3, admin_acc, accounts['borrower']['address'], 100000000000000000)    
    print(f"\U0001F4B0 Address: {admin_acc}, Balance: {get_balance(w3, admin_acc)}")
    print(f"\U0001F4B0 Address: {accounts['lender']['address']}, Balance: {get_balance(w3, accounts['lender']['address'])}")
    print(f"\U0001F4B0 Address: {accounts['borrower']['address']}, Balance: {get_balance(w3, accounts['borrower']['address'])}")

    compiled_contract = compile_sol('contracts/LendingContract.sol', 'LendingContract.sol')

    # l_contract_txn = create_txn_from_contract(
    #     w3,
    #     'contracts/LendingContract.sol',
    #     'LendingContract.sol',
    #     initial_param={"from": admin_acc},
    #     other_param={
    #         "b": accounts['borrower']['address'],
    #         "l": accounts['lender']['address'],
    #         "escrow": admin_acc,
    #         "timestamp": int(time.time()) + 30,
    #         "token": 100
    #     })
    # receipt = send_txn_to_chain(w3, l_contract_txn)
    receipt = {'contractAddress': '0x8a93Dc2cf65e05542180aAa4A090e6cf52054396'}
    print(f"Create Contract txn: {receipt}")

    contract = w3.eth.contract(address=receipt['contractAddress'], abi=compiled_contract.abi)    
    print(f"Status: {contract.functions.get_status().call()}")

    try:
        tx = contract.functions.approve_borrower().buildTransaction(
            {
                'from': accounts['borrower']['address'],
                'nonce': w3.eth.getTransactionCount(accounts['borrower']['address'])
            }
        )
        signed_txn = w3.eth.account.signTransaction(tx, accounts['borrower']['key'])
        txn_hex = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hex)
        print(f"Txn receipt: {txn_receipt}")

        print(f"\U0001F449 Status: {contract.functions.get_status().call()}")
    except web3.exceptions.ContractLogicError as e:
        print(f"Error: {e}")

    # # approve_borrower fail test
    # contract = w3.eth.contract(address=receipt['contractAddress'], abi=compile_sol('contracts/LendingContract.sol', 'LendingContract.sol').abi)
    # try:
    #     print(f"\U0001F449 approve_borrower: {contract.functions.approve_borrower().call()}")
    #     print(f"\U0001F449 Status: {contract.functions.get_status().call()}")
    # except web3.exceptions.ContractLogicError as e:
    #     print(f"Error: {e}")

    # counter = CounterContract(w3)
    # receipt = counter.upload_contract(admin_acc)

    # for i in range(10):
    #     print(f"Contract balance: {counter.get_balance()}")
    #     print(f"Counter: {counter.get_counter()}")
    #     counter.increment_counter(admin_acc)
    #     print(f"Contract balance: {counter.get_balance()}")
    #     print(f"Counter: {counter.get_counter()}")
