from account_handler import setup_demo_accounts, accounts
from lending_contract_handler import (
    add_lending_contract_to_chain, approval_from_borrower, approval_from_lender, execute_contract, 
    print_contract_state
)
from solidity_compiler import compile_sol
from web3_connector import (
    connect_node, get_admin_account
)

node_url = "http://127.0.0.1:8545"


if __name__ == '__main__':
    w3 = connect_node(node_url)
    admin_acc = get_admin_account(w3)

    # setup_demo_accounts(accounts, w3, admin_acc)

    # receipt = add_lending_contract_to_chain(
    #     w3,
    #     accounts['admin']['key'], 
    #     accounts['admin']['address'], 
    #     accounts['lender']['address'], 
    #     accounts['borrower']['address'], 
    #     100
    # )
    receipt = {'contractAddress': '0xBb292CD401195022252a796bd2163A3e348D74Ae'}

    contract = w3.eth.contract(
        address=receipt['contractAddress'], 
        abi=compile_sol('contracts/LendingContract.sol', 'LendingContract.sol').abi
    )  
    print_contract_state(contract)
    
    approval_from_borrower(w3, contract, accounts['borrower']['key'], accounts['borrower']['address'])
    print_contract_state(contract)

    approval_from_lender(w3, contract, accounts['lender']['key'], accounts['lender']['address'])
    print_contract_state(contract)

    execute_contract(w3, contract, accounts['admin']['key'], accounts['admin']['address'])
    print_contract_state(contract)


