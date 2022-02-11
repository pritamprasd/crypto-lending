from solidity_compiler import compile_sol
from web3_connector import create_txn_from_contract, send_txn_to_chain

class CounterContract:
    def __init__(self, w3):
        self.w3 = w3
        self.contract_path = 'contracts/Counter.sol'
        self.hash = ''
        self.abi = compile_sol(self.contract_path).abi

    def __build_counter_contract(self):
        return self.w3.eth.contract(address=self.hash, abi=self.abi)

    def upload_contract(self, acc_addr):
        print(f"\U0001F449 UPLOAD: counter..")
        counter_txn = create_txn_from_contract(self.w3, 'contracts/Counter.sol','Counter.sol', 
            {
                "from": acc_addr
            }
        )
        txn_receipt = send_txn_to_chain(self.w3, counter_txn)
        self.hash = txn_receipt['contractAddress']
        print(f"Txn data: {txn_receipt}")
        return{
            'hash': txn_receipt['contractAddress'],
            'gas_used': txn_receipt['gasUsed'],
            'block_number': txn_receipt['blockNumber']
        }

    def get_counter(self):
        print(f"\U0001F449 GET: counter..")
        counter = self.__build_counter_contract()
        return counter.functions.read().call()

    def increment_counter(self, addr):
        print(f"\U0001F449 INC: counter..")
        counter = self.__build_counter_contract()
        txn_hash = counter.functions.increment().transact({"from": addr})
        txn_receipt = self.w3.eth.wait_for_transaction_receipt(txn_hash)
        return {
            'to_addr': txn_receipt['to'],
            'gas_used': txn_receipt['gasUsed'],
            'block_number': txn_receipt['blockNumber']
        }

    def get_balance(self):
        contract = self.__build_counter_contract()
        token_balance = contract.functions.balance().call()
        return token_balance






