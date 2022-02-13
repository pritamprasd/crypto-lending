import web3
from config import NODE_URL
from web3_connector import connect_node
from solidity_compiler import compile_sol

class LendingContractExecutor:
    def __init__(self):
        self.w3 = connect_node(NODE_URL)

    def __execute_lending_transaction(self, key, tx):
        signed_txn = self.w3.eth.account.signTransaction(tx, key)
        txn_hex = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        txn_receipt = self.w3.eth.wait_for_transaction_receipt(txn_hex)
        return txn_receipt

    def add_lending_contract_to_chain(self, creator_key, creator, lender, borrower, collateral_token, created_at, tenure):
        contract_param={
            "b": borrower,
            "l": lender,
            "escrow": creator,
            "created_at": created_at,
            "tenure_delta": tenure,
            "token_amount": collateral_token,
            "token_type": "MATIC"
        }    
        contract = compile_sol('contracts/LendingContract.sol', 'LendingContract.sol')
        contract = self.w3.eth.contract(bytecode=contract.bytecode, abi=contract.abi)
        tx = contract.constructor(**contract_param).buildTransaction(
            {
                "from": creator,
                'nonce': self.w3.eth.getTransactionCount(creator)
            }
        )
        txn_receipt = self.__execute_lending_transaction(creator_key, tx)
        print(f"Create Lending contract txn: {txn_receipt['contractAddress']}")
        return txn_receipt

    def approval_from_borrower(self, contract_hash, key, address):
        print(f"contract hash: {contract_hash}")
        contract = self.__build_contract(contract_hash)
        try:
            tx = contract.functions.approve_borrower().buildTransaction(
                {
                    'from': address,
                    'nonce': self.w3.eth.getTransactionCount(address)
                }
            )
            txn_receipt = self.__execute_lending_transaction(key, tx)
            print(f"\U0001F7E2 approval_from_borrower txn from: {txn_receipt['from']}")
        except web3.exceptions.ContractLogicError as e:        
            print(f"\U0001F534 Error approval_from_borrower: {e}")
            raise Exception("approval_from_borrower failed to execute")


    def approval_from_lender(self, contract_hash, key, address):
        contract = self.__build_contract(contract_hash)
        try:
            tx = contract.functions.approve_lender().buildTransaction(
                {
                    'from': address,
                    'nonce': self.w3.eth.getTransactionCount(address)
                }
            )
            txn_receipt = self.__execute_lending_transaction(key, tx)
            print(f"\U0001F7E2 approval_from_lender txn from: {txn_receipt['from']}")
        except web3.exceptions.ContractLogicError as e:        
            print(f"\U0001F534 Error approval_from_lender: {e}")
            raise Exception("approval_from_lender failed to execute")

    def execute_contract(self, contract_hash, key, address):
        contract = self.__build_contract(contract_hash)
        try:
            tx = contract.functions.transfer_tokens().buildTransaction(
                {
                    'from': address,
                    'nonce': self.w3.eth.getTransactionCount(address)
                }
            )
            txn_receipt = self.__execute_lending_transaction(key, tx)
            print(f"\U0001F7E2 execute_contract txn from: {txn_receipt['from']}")
        except web3.exceptions.ContractLogicError as e:        
            print(f"\U0001F534 Error transfer_tokens: {e}")
            raise Exception("execute_contract failed to execute")
        
    def get_contract_state(self, contract_hash):
        contract = self.__build_contract(contract_hash)
        state = contract.functions.get_contract_state().call()
        print(f"\U0001F449 Contract state: {state}")
        return state

    def __build_contract(self, contract_address):
        contract = self.w3.eth.contract(
            address= contract_address,
            abi=compile_sol('contracts/LendingContract.sol', 'LendingContract.sol').abi
        )
        return contract

    def get_admin_account(self):
        return self.w3.eth.accounts[0]

    def add_balance(self, to_acc, balance):
        txn_hash = self.w3.eth.send_transaction({
            "from": self.get_admin_account(),
            "to": to_acc,
            "value": balance
        })
        txn_receipt = self.w3.eth.waitForTransactionReceipt(txn_hash);
        print(f"\U0001F4BB Transferred {balance}, wei to account {to_acc}")



lending_contract = LendingContractExecutor()