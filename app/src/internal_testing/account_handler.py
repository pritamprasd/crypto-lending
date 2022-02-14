# from web3_connector import add_balance, create_account_raw, get_balance, print_all_accounts

# accounts = {
#     "admin": {
#         "address": "0xFF66aDab56EeAafABcd7EE03F50B8e3c17E6A57B",
#         "key": "0x158941b78df8aa5f0f64e43f92a4a088a64eebf7d1dd9f641df550ec5ac98251",
#     },
#     "lender": {
#         "address": "0xFC2a2b9A68514E3315f0Bd2a29e900DC1a815a1D",
#         "key": "0xc65f2e9b1c360d44070ede41d5e999d30c23657e2c5889d3d03cef39289cea7c",
#     },
#     "borrower": {
#         "address": "0x9575eB2a7804c43F68dC7998EB0f250832DF9f10",
#         "key": "0x2d7bdb58c65480ac5aee00b20d3558fb18a916810d298ed97174cc01bb809cdd",
#     }
# }

# def setup_demo_accounts(accounts, w3, admin_acc):
#     create_account_raw(w3, accounts['admin']['key'])
#     create_account_raw(w3, accounts['lender']['key'])
#     create_account_raw(w3, accounts['borrower']['key'])

#     print_all_accounts(w3)

#     add_balance(w3, admin_acc, accounts['admin']['address'], 500000000000000000)
#     add_balance(w3, admin_acc, accounts['lender']['address'], 100000000000000000)
#     add_balance(w3, admin_acc, accounts['borrower']['address'], 100000000000000000)

#     print(f"\U0001F4B0 Root Admin: {admin_acc}, Balance: {get_balance(w3, admin_acc)}")
#     print(f"\U0001F4B0 Admin: {accounts['admin']['address']}, Balance: {get_balance(w3, accounts['admin']['address'])}")
#     print(f"\U0001F4B0 Lender: {accounts['lender']['address']}, Balance: {get_balance(w3, accounts['lender']['address'])}")
#     print(f"\U0001F4B0 Borrower: {accounts['borrower']['address']}, Balance: {get_balance(w3, accounts['borrower']['address'])}")


# if __name__ == '__main__':
#     from eth_account import Account
#     import secrets
#     priv = secrets.token_hex(32)
#     private_key = "0x" + priv
#     print ("SAVE BUT DO NOT SHARE THIS:", private_key)
#     acct = Account.from_key(private_key)
#     print("Address:", acct.address)

