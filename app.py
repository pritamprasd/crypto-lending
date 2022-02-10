import solcx
import web3
from web3.middleware import geth_poa_middleware


source = "contracts/Counter.sol"
file = "Counter.sol"
spec = {
        "language": "Solidity",
        "sources": {
            file: {
                "urls": [
                    source
                ]
            }
        },
        "settings": {
            "optimizer": {
               "enabled": True
            },
            "outputSelection": {
                "*": {
                    "*": [
                        "metadata", "evm.bytecode", "abi"
                    ]
                }
            }
        }
    };
out = solcx.compile_standard(spec, allow_paths=".");
abi = out['contracts']['Counter.sol']['Counter']['abi']
bytecode = out['contracts']['Counter.sol']['Counter']['evm']['bytecode']['object']

w3 = web3.Web3(web3.HTTPProvider("http://127.0.0.1:8545"))
print(f"Connected: {w3.isConnected()}")
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

account = None

for acc in w3.eth.accounts:
    print(f"Account..")
    account = acc

temp = w3.eth.contract(bytecode=bytecode, abi=abi)
txn = temp.constructor().buildTransaction({"from": account}); 
txn_hash = w3.eth.send_transaction(txn)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
address = txn_receipt['contractAddress']