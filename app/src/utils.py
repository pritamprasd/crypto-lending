from distutils.command import config
import config
import jwt
import time
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

EXPIRY_DELTA = 5 * 60


class JwtHandler:
    def __init__(self):
        self.key = config.JWT_KEY

    def encode(self, data):
        data = {
            **data,
            "exp": int(time.time()) + EXPIRY_DELTA
        }
        return jwt.encode(data, self.key, algorithm="HS256")

    def decode(self, jwt_str):
        try:
            return jwt.decode(jwt_str, self.key, algorithms=["HS256"])
        except ExpiredSignatureError:
            raise Exception('token expired')
        except InvalidTokenError as e:
            raise Exception(f'invalid token: {e}')


jwt_handler = JwtHandler()


def make_jwt_for_user(user):
    return {
        'user_id': user.id
    }
