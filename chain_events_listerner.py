import asyncio

import web3
from solidity_compiler import compile_sol
from web3_connector import connect_node


node_url = "http://127.0.0.1:8545"
contract_address = '0xBb292CD401195022252a796bd2163A3e348D74Ae'

def handle_event(w3, contract, event):
    receipt = w3.eth.waitForTransactionReceipt(event['transactionHash'])
    print(receipt)
    # result = contract.events.StateChange.processReceipt(receipt)
    # print(result[0]['args'])

async def log_loop(w3, contract, event_filter, poll_interval):
    print('Loop initiated...')
    while True:
        print('Checking events...')
        for event in event_filter.get_new_entries():
            print('Got Event')
            handle_event(w3, contract, event)
        await asyncio.sleep(poll_interval)

def main():
    w3 = connect_node(node_url)
    contract = w3.eth.contract(
        address=contract_address, 
        abi=compile_sol('contracts/LendingContract.sol', 'LendingContract.sol').abi
    )
    event_filter = w3.eth.filter({'fromBlock':'latest'})
    loop = asyncio.get_event_loop()
    try:
        loop.run_until_complete(
            asyncio.gather(
                log_loop(w3, contract, event_filter, 2)
            )
        )
    finally:
        loop.close()  


if __name__ == '__main__':
    main()