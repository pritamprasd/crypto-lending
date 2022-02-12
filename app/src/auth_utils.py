from functools import wraps
from flask import g, request
from utils import jwt_handler


def requires_auth():
    def wrapper(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            try:
                token = jwt_handler.decode(request.headers['Authorization'].split(" ")[1])
                g.user_id = token['user_id']
                return f(*args, **kwargs)
            except Exception as e:
                raise Exception('Authentication failed')
        return decorated
    return wrapper