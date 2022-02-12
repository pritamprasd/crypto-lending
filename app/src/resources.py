from flask_restful import Resource
from flask import jsonify, request, g
import sqlalchemy
from schema import AdsSchema, UserCreateSchema, UserSchema
from models import Ads, User, db
from hashlib import sha256
from utils import jwt_handler, make_jwt_for_user
from auth_utils import requires_auth
class HealthResource(Resource):
    def get(self):
        db.engine.execute('SELECT 1')
        return jsonify(success=True)

class LoginResource(Resource):
    def post(self):
        req_data = UserCreateSchema().load(request.json)
        user = User.query.filter(User.wallet_address == req_data['wallet_address']).first()
        if user is None:
            raise Exception('User not found')
        password_hash = sha256(req_data['password'].encode('utf-8')).hexdigest()        
        if password_hash == user.password_hash:
            return{
                'id': user.id,
                'token': jwt_handler.encode(make_jwt_for_user(user))
            }
        return {
            'error': 'login error, check credentials'
        }

class UserResource(Resource):
    def post(self):
        req_data = UserCreateSchema().load(request.json)
        password_hash = sha256(req_data['password'].encode('utf-8')).hexdigest()
        user = User(req_data['wallet_address'], password_hash)
        try:        
            user.save()        
        except sqlalchemy.exc.IntegrityError:
            raise Exception('User Already exists')        
        return{
            'id': user.id,
            'token': jwt_handler.encode(make_jwt_for_user(user))
        }

    @requires_auth()
    def patch(self):
        req_data = UserSchema().load(request.json)        
        user:User = User.query.filter(User.id == g.user_id).first()
        if 'wallet_key' in req_data:
            user.wallet_key = req_data['wallet_key']
        if 'username' in req_data:
            user.username = req_data['username']
        if 'email' in req_data:
            user.email = req_data['email']
        if 'mobile' in req_data:
            user.mobile = req_data['mobile']
        if 'primary_upi' in req_data:
            user.primary_upi = req_data['primary_upi']        
        user.save()        
        return {
            'success': True
        }

class AdsResource(Resource):
    @requires_auth()
    def post(self, adtype):
        data = AdsSchema().load(request.json)
        user = User.query.filter(User.id == g.user_id).first()
        if user is None:
            raise Exception('User not found')
        ad = Ads(
            g.user_id, data['min_amount'], data['max_amount'], data['min_tenure_sec'], 
            data['max_tenure_sec'],  data['min_interest_rate'], data['max_interest_rate'], adtype)
        ad.save()
        return {
            'id': ad.id
        }

    @requires_auth()
    def get(self, adtype):
        ads = Ads.query.filter(Ads.is_deleted == False).filter(Ads.ad_type == adtype).all()
        return [ad.to_json() for ad in ads]
