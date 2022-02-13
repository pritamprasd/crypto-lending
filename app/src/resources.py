from flask_restful import Resource
from flask import jsonify, request, g
import sqlalchemy
from schema import AdsSchema, FinalNegotiation, NegotiationSchema, UserCreateSchema, UserSchema
from models import Ads, Negotiation, User, db
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


class NegotiationResource(Resource):
    @requires_auth()
    def post(self):
        data = NegotiationSchema().load(request.json)
        user = User.query.filter(User.id == g.user_id).first()
        if user is None:
            raise Exception('User not found')
        negotiation = Negotiation(
            data['lender_id'], g.user_id, data['amount'], data['collateral_amount'], 
            data['collateral_currency'], data['interest'], data['tenure'])
        negotiation.save()
        return {
            **(negotiation.to_json())
        }
    
    @requires_auth()
    def get(self):
        negotiations = Negotiation.query.filter(
            Negotiation.lender_id == g.user_id or Negotiation.borrower_id == g.user_id
        ).all()        
        return [n.to_json() for n in negotiations]


class UpdateNegotiationResource(Resource):
    @requires_auth()
    def post(self, neg_id):        
        user = User.query.filter(User.id == g.user_id).first()
        if user is None:
            raise Exception('User not found')        
        negotiation = Negotiation.query.filter_by(id=neg_id).first()
        if negotiation is None:
            raise Exception('Negotiation not found')

        if negotiation.state == 'pending':
            if negotiation.lender_id != user.id:
                raise Exception("You're not a part of this negotiation")
            negotiation.state = 'engaged'
            negotiation.save()

        elif negotiation.state == 'engaged':
            data = FinalNegotiation().load(request.json)
            if negotiation.lender_id != user.id:
                raise Exception("You're not a part of this negotiation")
            negotiation.amount = data['amount']
            negotiation.interest = data['interest']
            negotiation.tenure = data['tenure']
            negotiation.state = 'final'
            negotiation.save()

        elif negotiation.state == 'final':
            if negotiation.borrower_id != user.id:
                raise Exception("You're not a part of this negotiation")
            negotiation.state = 'accepted'
            negotiation.save()
            #TODO: transfer money to escrow wallet, persist tx hash, into negotiations
            negotiation.collateral_txn_hash = 'txn_hash'
            negotiation.state = 'borrower_paid'
            negotiation.save()

        elif negotiation.state == 'borrower_paid':
            if negotiation.lender_id != user.id:
                raise Exception("You're not a part of this negotiation")
            negotiation.state = 'lender_paid'
            negotiation.save()

        elif negotiation.state == 'lender_paid':
            if negotiation.borrower_id != user.id:
                raise Exception("You're not a part of this negotiation")
            negotiation.state = 'deal_done'
            negotiation.save()            
            #TODO: create a loan db model here and store id in active_loan_id:negotiation       
            #TODO: create smart contract, add data(timestamp, maturity) to loan object.
        elif negotiation.state == 'deal_done':
            if negotiation.borrower_id != user.id:
                raise Exception("You're not a part of this negotiation")
            negotiation.state = 'borrower_repaid'
            negotiation.save()  
        elif negotiation.state == 'borrower_repaid':
            if negotiation.lender_id != user.id:
                raise Exception("You're not a part of this negotiation")
            negotiation.state = 'finished'
            negotiation.save()   
        return {
            **(negotiation.to_json())
        }
            
class LoansResource(Resource):
   
    @requires_auth()
    def get(self):
        negotiations = Negotiation.query.filter(
            Negotiation.lender_id == g.user_id or Negotiation.borrower_id == g.user_id
        ).filter(Negotiation.state == "deal_done").all()        
        return [n.to_json() for n in negotiations]


