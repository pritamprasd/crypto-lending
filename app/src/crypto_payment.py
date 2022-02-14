from binance.client import Client
from flask import Flask
from models import Negotiation, User, db
import config


def make_payment(from_addr, to_addr, amount, token_type):
    from_user = User.query.filter(User.wallet_address == from_addr).first()
    to_user = User.query.filter(User.wallet_address == to_addr).first()
    result = dict()
    try:
        client = Client(from_user.wallet_key, from_user.wallet_secret)
        result = client.withdraw(
            coin="MATIC",
            address=to_user.wallet_address,
            amount=amount,
            name='Withdraw',
        )
        # result = {'id': 'dummy_mock_crypto_txn_id'}
    except Exception as e:
        print(f"Error crypto transfer: {e}")
        raise Exception('Crypto transfer failed!!')
    return result


def handle_contract_result(state, neg_id):
    print(f"handle_contract_result: {state}")
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = config.DB_URI
    db.init_app(app)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS
    app.config["SQLALCHEMY_POOL_SIZE"] = config.SQLALCHEMY_POOL_SIZE
    with app.app_context():
        negotiation = Negotiation.query.filter_by(id=neg_id).first()
        admin = User.query.filter(User.wallet_address == config.ADMIN_WALLET_ADDRESS).first()
        lender = User.query.filter(User.id == negotiation.lender_id).first()
        borrower = User.query.filter(User.id == negotiation.borrower_id).first()
        try:
            if state == "defaulted":
                print(f"\U0001F7E2 Transferring collateral tokens from Excrow to Lender")
                make_payment(
                    admin.wallet_address, 
                    lender.wallet_address, 
                    negotiation.collateral_amount, 
                    negotiation.collateral_currency
                )
            elif state == "collateral_returned":
                print(f"\U0001F7E2 Transferring collateral tokens from Excrow to Borrower")
                make_payment(
                    admin.wallet_address, 
                    borrower.wallet_address,
                    negotiation.collateral_amount, 
                    negotiation.collateral_currency
                )
            else:
                print(f"\U0001F7E2  Raise dispute: {state}")
            negotiation.state = state
            negotiation.save()
        except Exception as e:
            print("\U0001F534 Error while collateral transfer on repayment, -> raise dispute")
            negotiation.state = 'error_repayment_collateral'
            negotiation.save()
            raise e