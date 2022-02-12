from flask_restful import Resource
from flask import jsonify, request
from schema import UserCreateSchema, UserSchema
from models import User, db
from hashlib import sha256
from utils import jwt_handler
import json
class HealthResource(Resource):
    def get(self):
        db.engine.execute('SELECT 1')
        return jsonify(success=True)

class LoginResource(Resource):
    def post(self):
        req_data = UserCreateSchema().load(request.json)
        password_hash = sha256(req_data['password'].encode('utf-8')).hexdigest()
        user = User.query.filter(User.wallet_address == req_data['wallet_address']).first()
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
        user.save()        
        return{
            'id': user.id,
            'token': jwt_handler.encode(make_jwt_for_user(user))
        }

    def patch(self):
        token = jwt_handler.decode(request.headers['Authorization'].split(" ")[1])
        req_data = UserSchema().load(request.json)        
        user:User = User.query.filter(User.id == token['user_id']).first()
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

def make_jwt_for_user(user):
    return {
        'user_id': user.id
    }