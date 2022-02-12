from marshmallow import EXCLUDE, Schema, fields


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


