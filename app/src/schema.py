from marshmallow import EXCLUDE, Schema, fields, validate


class UserCreateSchema(Schema):
    class Meta:
        unknown = EXCLUDE
    wallet_address = fields.String(data_key='walletAddress', required=True)
    password = fields.String(data_key='password', required=True)


class UserSchema(Schema):
    class Meta:
        unknown = EXCLUDE
    wallet_key = fields.String(data_key='walletKey', required=False)
    username = fields.String(data_key='username', required=False)
    email = fields.String(data_key='email', required=False)
    mobile = fields.String(data_key='mobile', required=False)
    primary_upi = fields.String(data_key='primaryUpi', required=False)
    wallet_secret = fields.String(data_key='walletSecret', required=False)
    wallet_address_tag = fields.String(data_key='walletAddressTag', required=False)

class AdsSchema(Schema):
    class Meta:
        unknown = EXCLUDE
    min_amount = fields.Integer(data_key='minAmount', required=True) #in rupees
    max_amount = fields.Integer(data_key='maxAmount', required=True)
    min_tenure_sec = fields.Integer(data_key='minTenure', required=True) #in secs
    max_tenure_sec = fields.Integer(data_key='maxTenure', required=True)
    min_interest_rate = fields.Integer(data_key='minInterest', required=True)
    max_interest_rate = fields.Integer(data_key='maxInterest', required=True)


class NegotiationSchema(Schema):
    class Meta:
        unknown = EXCLUDE
    lender_id = fields.String(data_key='lenderId', required=True)
    amount = fields.Integer(data_key='amount', required=True)
    interest = fields.Integer(data_key='interest', required=True)
    tenure = fields.Integer(data_key='tenure', required=True)
    collateral_amount = fields.Float(data_key='collateralAmount', required=True)
    collateral_currency = fields.String(data_key='collateralCurrency', required=True)

class FinalNegotiation(Schema):
    class Meta:
        unknown = EXCLUDE
    amount = fields.Integer(data_key='amount', required=True)
    interest = fields.Integer(data_key='interest', required=True)
    tenure = fields.Integer(data_key='tenure', required=True)