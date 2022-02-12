from flask import Blueprint
from resources import AdsResource, UpdateNegotiationResource, HealthResource, LoginResource, NegotiationResource, UserResource
from flask_restful import Api

DEV_BLUEPRINT = Blueprint("dev", __name__)
Api(DEV_BLUEPRINT).add_resource(HealthResource, "/health")

USER_BLUEPRINT = Blueprint("user", __name__)
Api(USER_BLUEPRINT).add_resource(UserResource, "/user", endpoint="user")
Api(USER_BLUEPRINT).add_resource(LoginResource, "/login", endpoint="login_user")
Api(USER_BLUEPRINT).add_resource(AdsResource, "/ads/<string:adtype>", endpoint="ads")
Api(USER_BLUEPRINT).add_resource(NegotiationResource, "/negotiation", endpoint="negotiation")
Api(USER_BLUEPRINT).add_resource(UpdateNegotiationResource, "/engagenegotiation/<string:neg_id>", endpoint="engage")
Api(USER_BLUEPRINT).add_resource(UpdateNegotiationResource, "/finaloffer/<string:neg_id>", endpoint="finaloffer")
Api(USER_BLUEPRINT).add_resource(UpdateNegotiationResource, "/acceptoffer/<string:neg_id>", endpoint="acceptoffer")
Api(USER_BLUEPRINT).add_resource(UpdateNegotiationResource, "/loanpaid/<string:neg_id>", endpoint="loanpaid")
Api(USER_BLUEPRINT).add_resource(UpdateNegotiationResource, "/loanreceived/<string:neg_id>", endpoint="loanreceived")
