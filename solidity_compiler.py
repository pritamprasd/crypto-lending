import solcx

class Contract:
    def __init__(self, abi, bytecode):
        self.abi = abi
        self.bytecode = bytecode

def compile_sol(contract_path: str, contract_file_name:str):
    """Compiles Solidity contracts to 

    Args:
        contract_path (str): [description]

    Returns:
        [ABI, bytecode]
    """
    contract_name = contract_file_name.split(".")[0]
    spec = {
            "language": "Solidity",
            "sources": {
                contract_file_name: {
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
    abi = out['contracts'][contract_file_name][contract_name]['abi']
    bytecode = out['contracts'][contract_file_name][contract_name]['evm']['bytecode']['object']
    return Contract(abi, bytecode)
