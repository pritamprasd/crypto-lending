from flask import Blueprint
from resources import AdsResource, HealthResource, LoginResource, UserResource
from flask_restful import Api

DEV_BLUEPRINT = Blueprint("dev", __name__)
Api(DEV_BLUEPRINT).add_resource(HealthResource, "/health")

USER_BLUEPRINT = Blueprint("user", __name__)
Api(USER_BLUEPRINT).add_resource(UserResource, "/user", endpoint="user")
Api(USER_BLUEPRINT).add_resource(LoginResource, "/login", endpoint="login_user")
Api(USER_BLUEPRINT).add_resource(AdsResource, "/ads/<string:adtype>", endpoint="ads")
