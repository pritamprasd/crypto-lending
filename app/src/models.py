from weakref import WeakValueDictionary
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import aliased
from sqlalchemy.sql import text
from datetime import datetime
from sqlalchemy import inspect


db = SQLAlchemy()

class MetaBaseModel(db.Model.__class__):
    def __init__(cls, *args):
        super().__init__(*args)
        cls.aliases = WeakValueDictionary()

    def __getitem__(cls, key):
        try:
            alias = cls.aliases[key]
        except KeyError:
            alias = aliased(cls)
            cls.aliases[key] = alias
        return alias

class BaseModel:
    id = db.Column(db.String,
                    nullable=False,
                    primary_key=True,
                    default=text('uuid_generate_v4()'))
    is_deleted = db.Column(db.Boolean, default=False)

    print_filter = ()
    to_json_filter = ()

    def __repr__(self):
        return "%s(%s)" % (self.__class__.__name__,
        {
            column: value
            for column, value in self._to_dict().items() if column not in self.print_filter
        },)

    @property
    def json(self):        
        return {
            column: value if not isinstance(value, datetime) else value.strftime("%Y-%m-%dT%H:%M:%S%z")
            for column, value in self._to_dict().items() if column not in self.to_json_filter
        }

    def _to_dict(self):
        return {column.key: getattr(self, column.key) for column in inspect(self.__class__).attrs}

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        self.is_deleted = True
        db.session.add(self)
        db.session.commit()

    def refresh(self):
        db.session.refresh(self)

    def close_query(self):
        db.session.commit()

class AuditMixin(object):
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

class User(db.Model, BaseModel, AuditMixin, metaclass=MetaBaseModel):
    __tablename__ = "users"    
    wallet_address = db.Column(db.String, nullable=False)
    wallet_key = db.Column(db.String, nullable=True)
    password_hash = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=True)
    mobile = db.Column(db.String, nullable=True)
    primary_upi = db.Column(db.String, nullable=True)
    internal_key = db.Column(db.String, nullable=True)
    internal_address = db.Column(db.String, nullable=True)

    __table_args__ = (
        db.UniqueConstraint('wallet_address'),
    )
    print_filter = (wallet_key, password_hash, internal_key)
    to_json_filter = (wallet_key, password_hash, internal_key)

    def __init__(self, wallet_address, password_hash):
        self.wallet_address = wallet_address
        self.password_hash = password_hash

class Ads(db.Model, BaseModel, AuditMixin, metaclass=MetaBaseModel):
    __tablename__ = "ads"    
    creator_id = db.Column(db.String, nullable=False)
    min_amount = db.Column(db.Integer, nullable=False)
    max_amount = db.Column(db.Integer, nullable=False)
    min_tenure_sec = db.Column(db.Integer, nullable=False)
    max_tenure_sec = db.Column(db.Integer, nullable=False)
    min_interest_rate = db.Column(db.Integer, nullable=False)
    max_interest_rate = db.Column(db.Integer, nullable=False)
    ad_type = db.Column(db.String, nullable=False)    

    def __init__(
        self, creator_id, min_amount, max_amount, min_tenure_sec, 
        max_tenure_sec, min_interest_rate, max_interest_rate, ad_type
    ):
        self.creator_id= creator_id
        self.min_amount= min_amount
        self.max_amount= max_amount
        self.min_tenure_sec= min_tenure_sec
        self.max_tenure_sec= max_tenure_sec
        self.min_interest_rate= min_interest_rate
        self.max_interest_rate= max_interest_rate
        self.ad_type= ad_type
    
    def to_json(self):
        return{
            'ad_id': self.id,
            'creator_id': self.creator_id,
            'min_amount': self.min_amount,
            'max_amount': self.max_amount,
            'min_tenure_sec': self.min_tenure_sec,
            'max_tenure_sec': self.max_tenure_sec,
            'min_interest_rate': self.min_interest_rate,
            'max_interest_rate': self.max_interest_rate,
            'ad_type': self.ad_type
        }


class Negotiation(db.Model, BaseModel, AuditMixin, metaclass=MetaBaseModel):
    __tablename__ = "negotiation"    
    lender_id = db.Column(db.String, nullable=False)
    borrower_id = db.Column(db.String, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    interest = db.Column(db.Integer, nullable=False)
    tenure = db.Column(db.Integer, nullable=False)
    currency = db.Column(db.String, nullable=False, default="INR")
    collateral_amount = db.Column(db.Integer, nullable=False)
    collateral_currency = db.Column(db.String, nullable=False, default="ETH")
    collateral_txn_hash = db.Column(db.String, nullable=True)
    state = db.Column(db.String, nullable=False)
    active_loan_id = db.Column(db.String, nullable=True)
    # lender_vpa = db.Column(db.String, nullable=True) #through which lender can pay

    def __init__(self, lender_id, borrower_id, amount, collateral_amount, collateral_currency, interest, tenure):
        self.lender_id = lender_id
        self.borrower_id = borrower_id
        self.amount = amount
        self.collateral_amount = collateral_amount
        self.collateral_currency = collateral_currency
        self.interest = interest
        self.tenure = tenure
        self.state = "pending"

    def to_json(self):
       return{
           'negotiation_id': self.id,
           'lender_id': self.lender_id,
           'borrower_id': self.borrower_id,
           'amount': self.amount,
           'interest': self.interest,
           'currency': self.currency,
           'collateral_amount': self.collateral_amount,
           'collateral_currency': self.collateral_currency,
           'collateral_txn_hash': self.collateral_txn_hash,
           'state': self.state,
           'active_loan_id':self.active_loan_id,
        }
    


