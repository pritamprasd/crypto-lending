from binance.client import Client
from flask import Flask
from models import Negotiation, User, db
import config


def make_payment(from_addr, to_addr, amount, token_type):
    from_user = User.query.filter(User.wallet_address == from_addr).first()
    to_user = User.query.filter(User.wallet_address == to_addr).first()
    result = dict()
    try:
        # client = Client(from_user.wallet_key, from_user.wallet_secret)
        # result = client.withdraw(
        #     coin="MATIC",
        #     address=to_user.wallet_address,
        #     amount=amount,
        #     name='Withdraw',
        # )
        result = {'id': 'dummy_mock_crypto_txn_id'}
    except Exception as e:
        print(f"Error crypto transfer: {e}")
        raise Exception('Crypto transfer failed!!')
    return result


def handle_contract_result(state, neg_id):
    print(f"handle_contract_result: {state}")
    if state == "defaulted":
        print(f"--> transferring from Excrow to Lender")
    elif state == "collateral_returned":
        print(f"--> transferring from Excrow to Borrower")
    else:
        print(f"Raise dispute: {state}")
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = config.DB_URI
    db.init_app(app)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS
    app.config["SQLALCHEMY_POOL_SIZE"] = config.SQLALCHEMY_POOL_SIZE

    with app.app_context():
        negotiation = Negotiation.query.filter_by(id=neg_id).first()
        negotiation.state = state
        negotiation.save()
        