
import web3
from solidity_compiler import ContractData, compile_sol
from web3_connector import create_txn_from_contract, send_txn_to_chain
from account_handler import accounts
import time

def __execute_lending_transaction(w3, key, tx):
    signed_txn = w3.eth.account.signTransaction(tx, key)
    txn_hex = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hex)
    return txn_receipt

def add_lending_contract_to_chain(w3: web3.Web3, creator_key, creator, lender, borrower, collateral_token):
    contract_param={
        "b": borrower,
        "l": lender,
        "escrow": creator,
        "tenure_delta": 120,
        "token": collateral_token,
    }    
    contract = compile_sol('contracts/LendingContract.sol', 'LendingContract.sol')
    contract = w3.eth.contract(bytecode=contract.bytecode, abi=contract.abi)
    tx = contract.constructor(**contract_param).buildTransaction(
        {
            "from": creator,
            'nonce': w3.eth.getTransactionCount(creator)
        }
    )
    txn_receipt = __execute_lending_transaction(w3, creator_key, tx)
    print(f"Create Lending contract txn: {txn_receipt['contractAddress']}")
    return txn_receipt

def approval_from_borrower(w3, contract, key, address):
    try:
        tx = contract.functions.approve_borrower().buildTransaction(
            {
                'from': address,
                'nonce': w3.eth.getTransactionCount(address)
            }
        )
        txn_receipt = __execute_lending_transaction(w3, key, tx)
        print(f"\U0001F7E2 approval_from_borrower txn from: {txn_receipt['from']}")
    except web3.exceptions.ContractLogicError as e:        
        print(f"\U0001F534 Error approval_from_borrower: {e}")

def approval_from_lender(w3, contract, key, address):
    try:
        tx = contract.functions.approve_lender().buildTransaction(
            {
                'from': address,
                'nonce': w3.eth.getTransactionCount(address)
            }
        )
        txn_receipt = __execute_lending_transaction(w3, key, tx)
        print(f"\U0001F7E2 approval_from_lender txn from: {txn_receipt['from']}")
    except web3.exceptions.ContractLogicError as e:        
        print(f"\U0001F534 Error approval_from_lender: {e}")
        

def execute_contract(w3, contract, key, address):
    try:
        tx = contract.functions.transfer_tokens().buildTransaction(
            {
                'from': address,
                'nonce': w3.eth.getTransactionCount(address)
            }
        )
        txn_receipt = __execute_lending_transaction(w3, key, tx)
        print(f"\U0001F7E2 execute_contract txn from: {txn_receipt['from']}")
    except web3.exceptions.ContractLogicError as e:        
        print(f"\U0001F534 Error transfer_tokens: {e}")

def print_contract_state(contract: ContractData):
    print(f"\U0001F449 Contract state: {contract.functions.get_status().call()}")