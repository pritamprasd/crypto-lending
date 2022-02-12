from email.policy import default
import uuid
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

    print_filter = (wallet_key, password_hash, internal_key)
    to_json_filter = (wallet_key, password_hash, internal_key)

    def __init__(self, wallet_address, password_hash):
        self.wallet_address = wallet_address
        self.password_hash = password_hash