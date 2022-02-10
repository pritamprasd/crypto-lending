import web3
from web3.middleware import geth_poa_middleware
from solidity_compiler import compile_sol

def connect_node(url):
    w3 = web3.Web3(web3.HTTPProvider(url))    
    
    if not w3.isConnected():  
        raise Exception('Connetion to Node {url} failed !!')
    print("Connection data:")
    print(f"\t chain_id:{w3.eth.chain_id}")
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)        
    return w3    

def get_admin_account(w3):
    return w3.eth.accounts[0]

def get_balance(w3, addr):
    return w3.eth.get_balance(addr)

def add_account_with_balance(w3, from_acc, to_acc, balance):
    txn_hash = w3.eth.send_transaction({
        "from": from_acc,
        "to": to_acc,
        "value": balance
    })
    txn_receipt = w3.eth.waitForTransactionReceipt(txn_hash);
    print(f"Transferred {balance}, wei to account {to_acc}, tx receipt: {txn_receipt}")

def create_txn_from_contract(w3, contract_path, acc):
    contract = compile_sol(contract_path)
    contract = w3.eth.contract(bytecode=contract.bytecode, abi=contract.abi)
    txn = contract.constructor().buildTransaction({"from": acc}); 
    return txn

def add_txn_to_chain(w3, txn):
    txn_hash = w3.eth.send_transaction(txn)
    txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
    return txn_receipt

def print_all_accounts(w3):
    i = 1
    for acc in w3.eth.accounts:
        print(f"Account {i}: {acc}")
        i +=1