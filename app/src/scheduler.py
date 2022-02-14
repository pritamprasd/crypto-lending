from config import CONTRACT_QUERY_WAIT_TIME
from crypto_payment import handle_contract_result
from lending_contract_handler import lending_contract
import time
from threading import Timer
from datetime import datetime

def execute_contract(hash, admin_key, admin_address, neg_id):
    print(f"Executing scheduled contract {hash}")
    try:
        lending_contract.execute_contract(hash, admin_key, admin_address)
    except Exception as e:
        print(f"Error while running scheduled contract: {e}")
        raise e
    print(f"Waiting for {CONTRACT_QUERY_WAIT_TIME} before quering contract")
    time.sleep(CONTRACT_QUERY_WAIT_TIME)
    contract_state = lending_contract.get_contract_state(hash)
    handle_contract_result(contract_state, neg_id)

def schedule_execution(interval, hash, admin_key, admin_address, neg_id):
    print(f"Scheduling execution for contract execution.. {hash}, after {interval} seconds, now:{datetime.now()}")
    Timer(interval, execute_contract, [hash, admin_key, admin_address, neg_id]).start()
    

    
    
