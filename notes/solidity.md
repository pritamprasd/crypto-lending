# Solidity Notes:

### Storage:
The Ethereum Virtual Machine has three areas where it can store items.
1. The first is `storage`, where all the contract state variables reside. Every contract has its own storage and it is persistent between function calls and quite expensive to use.
2. The second is `memory`, this is used to hold temporary values. It is erased between (external) function calls and is cheaper to use.
3. The third one is the `stack`, which is used to hold small local variables. It is almost free to use, but can only hold a limited amount of values.
- state variables are always in storage
- function arguments are always in memory
- local variables always reference storage

### Vars:
#### Types:
- `State` Variables − Variables whose values are permanently stored in a contract storage.
- `Local` Variables − Variables whose values are present till function is executing.
- `Global` Variables − Special variables exists in the global namespace used to get information about the blockchain.
### Var scope:
- `Public` − Public state variables can be accessed internally as well as via messages. For a public state variable, an automatic getter function is generated.
- `Internal` − Internal state variables can be accessed only internally from the current contract or contract deriving from it without using this.
- `Private` − Private state variables can be accessed only internally from the current contract they are defined not in the derived contract from it.


### Function Visibility Specifiers:
- `public`: visible externally and internally (creates a getter function for storage/state variables)
- `private`: only visible in the current contract
- `external`: only visible externally (only for functions) - i.e. can only be message-called (via this.func)
- `internal`: only visible internally

### Modifiers
- `pure` for functions: Disallows modification or access of state.
- `view` for functions: Disallows modification of state.
- `payable` for functions: Allows them to receive Ether together with a call.
- `constant` for state variables: Disallows assignment (except initialisation), does not occupy storage slot.
- `immutable` for state variables: Allows exactly one assignment at construction time and is constant afterwards. Is stored in code.
- `anonymous` for events: Does not store event signature as topic.
- `indexed` for event parameters: Stores the parameter as topic.
- `virtual` for functions and modifiers: Allows the function’s or modifier’s behaviour to be changed in derived contracts.
- `override`: States that this function, modifier or public state variable changes the behaviour of a function or modifier in a base contract.



### Types: 
#### Address:
- Types:
    1. `address`: 
        - Holds a 20 byte value (size of an Ethereum address).
        - cannot send Ether
    2. `address payable`: 
        - Same as address, but with the additional members like `transfer` and `send`.
        - can send Ether to
- Use `payable(...)` for address to address_payable conversion.
    ```solidity
    address payable x = payable(0x123);
    address myAddress = address(this);
    if (x.balance < 10 && myAddress.balance >= 10) x.transfer(10);
    ```
- If x is a contract address, its code (more specifically: its Receive Ether Function, if present, or otherwise its Fallback Function, if present) will be executed together with the transfer call (this is a feature of the EVM and cannot be prevented). If that execution runs out of gas or fails in any way, the Ether transfer will be reverted and the current contract will stop with an exception.


### Globals:
#### ETH units:
```
assert(1 wei == 1);
assert(1 gwei == 1e9);
assert(1 ether == 1e18);
```
#### time units:
```
1 == 1 seconds
1 minutes == 60 seconds
1 hours == 60 minutes
1 days == 24 hours
1 weeks == 7 days
```
#### Special Variables and Functions:
- In a simple call chain A->B->C->D, inside D `msg.sender` will be C, and `tx.origin` will be A.

##### For blocks:
- `blockhash(uint blockNumber) returns (bytes32)`: hash of the given block when blocknumber is one of the 256 most recent blocks; otherwise returns zero
- `block.basefee (uint)`: current block’s base fee (EIP-3198 and EIP-1559)
- `block.chainid (uint)`: current chain id
- `block.coinbase (address payable)`: current block miner’s address
- `block.difficulty (uint)`: current block difficulty
- `block.gaslimit (uint`): current block gaslimit
- `block.number (uint)`: current block number
- `block.timestamp (uint)`: current block timestamp as seconds since unix epoch

##### Misc:
- `gasleft() returns (uint256)`: remaining gas

##### msg:
The values of all members of msg, including msg.sender and msg.value can change for every external function call. This includes calls to library functions.
- `msg.data (bytes calldata`): complete calldata
- `msg.sender (address)`: sender of the message (current call), owner can be a contract.
- `msg.sig (bytes4)`: first four bytes of the calldata (i.e. function identifier)
- `msg.value (uint)`: number of wei sent with the message

##### txn:
- `tx.gasprice (uint)`: gas price of the transaction
- `tx.origin (address)`: sender of the transaction (full call chain), owner can never be a contract.

##### ABI:
- `abi.decode(bytes memory encodedData, (...)) returns (...)`: ABI-decodes the given data, while the types are given in parentheses as second argument. Example: 
    ```
    (uint a, uint[2] memory b, bytes memory c) = abi.decode(data, (uint, uint[2], bytes))
    ```
- `abi.encode(...) returns (bytes memory)`: ABI-encodes the given arguments
- `abi.encodePacked(...) returns (bytes memory)`: Performs packed encoding of the given arguments. Note that packed encoding can be ambiguous!
- `abi.encodeWithSelector(bytes4 selector, ...) returns (bytes memory)`: ABI-encodes the given arguments starting from the second and prepends the given four-byte selector
- `abi.encodeWithSignature(string memory signature, ...) returns (bytes memory)`: Equivalent to abi.encodeWithSelector(bytes4(keccak256(bytes(signature))), ...)
- `abi.encodeCall(function functionPointer, (...)) returns (bytes memory)`: ABI-encodes a call to functionPointer with the arguments found in the tuple. Performs a full type-check, ensuring the types match the function signature. Result equals abi.encodeWithSelector(functionPointer.selector, (...))

##### Error:
- `assert(bool condition)`: causes a Panic error and thus state change reversion if the condition is not met - to be used for internal errors.
- `require(bool condition)`: reverts if the condition is not met - to be used for errors in inputs or external components.
- `require(bool condition, string memory message)`: reverts if the condition is not met - to be used for errors in inputs or external components. Also provides an error message.
- `revert()`: abort execution and revert state changes
- `revert(string memory reason)`: abort execution and revert state changes, providing an explanatory string


