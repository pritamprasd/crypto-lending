import solcx

class Contract:
    def __init__(self, abi, bytecode):
        self.abi = abi
        self.bytecode = bytecode

def compile_sol(contract_path: str):
    """Compiles Solidity contracts to 

    Args:
        contract_path (str): [description]

    Returns:
        [ABI, bytecode]
    """
    file = "Counter.sol"
    spec = {
            "language": "Solidity",
            "sources": {
                file: {
                    "urls": [
                        contract_path
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
    return Contract(abi, bytecode)
