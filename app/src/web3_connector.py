import web3
from web3.middleware import geth_poa_middleware
from solidity_compiler import compile_sol

def connect_node(url):
    w3 = web3.Web3(web3.HTTPProvider(url))      
    if not w3.isConnected():  
        raise Exception('Connetion to Node {url} failed !!')
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)        
    return w3

def create_account(w3: web3.Web3):
    pas = 'hello@123'
    addr = w3.geth.personal.new_account(pas)  
    return{
        'address': addr
    }

def create_account_raw(w3: web3.Web3, key: str):
    try:
        addr = w3.geth.personal.import_raw_key(key, '')
    except ValueError:
        return{'address': ''} 
    return{        
        'address': addr
    }

def get_admin_account(w3: web3.Web3):
    return w3.eth.accounts[0]

def get_balance(w3, addr):
    return w3.eth.get_balance(addr)

def add_balance(w3, from_acc, to_acc, balance):
    txn_hash = w3.eth.send_transaction({
        "from": from_acc,
        "to": to_acc,
        "value": balance
    })
    w3.eth.waitForTransactionReceipt(txn_hash);
    print(f"\U0001F4BB Transferred {balance}, wei to account {to_acc}")

def create_txn_from_contract(w3, contract_path, contract_filename, initial_param={}, other_param={}):
    contract_data = compile_sol(contract_path, contract_filename)
    contract = w3.eth.contract(bytecode=contract_data.bytecode, abi=contract_data.abi)
    txn = contract.constructor(**other_param).buildTransaction(initial_param); 
    return txn

def send_txn_to_chain(w3: web3.Web3, txn):
    txn_hash = w3.eth.send_transaction(txn)
    txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
    return txn_receipt

def print_all_accounts(w3: web3.Web3):
    i = 1
    for acc in w3.eth.accounts:
        print(f"\U0001F4BC Account {i}: {acc}")
        i +=1