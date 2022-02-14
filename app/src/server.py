import time
import traceback
from flask import Flask, g, request
from timeit import default_timer as timer
from routes import DEV_BLUEPRINT, USER_BLUEPRINT
import config
from models import db

def create_app():
    app = Flask(__name__)

    app.debug = config.DEBUG
    app.config["SQLALCHEMY_DATABASE_URI"] = config.DB_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS
    app.config["SQLALCHEMY_POOL_SIZE"] = config.SQLALCHEMY_POOL_SIZE

    app.register_blueprint(DEV_BLUEPRINT)
    app.register_blueprint(USER_BLUEPRINT)

    db.init_app(app)
    if config.RESET_DB:
        print(f"\U000126A0 \U000126A0 Reseting database \U000126A0 \U000126A0")
        initialize_db(app, db)

    @app.before_request
    def before_request_func():
        g.start = timer()        
        print(f"Received {request.method} request at {request.base_url} and data {str(request.json)}")

    @app.after_request
    def after_request_func(response):
        diff = (timer() - g.start) if "start" in g else 0
        print(f"API Turnaround time: {diff} secs for {request.method} : {request.base_url}, data: {str(request.json)}")
        response.headers['Access-Control-Allow-Methods'] = "OPTIONS,GET,POST"
        response.headers['Access-Control-Allow-Origin'] = "*"
        response.headers['Access-Control-Allow-Headers'] = "*"
        return response
    @app.errorhandler(Exception)
    def handle_exception(e):        
        traceback.print_exc()
        return {
            'error': f"{e}",
            'timestamp': time.time()
        }
    return app

def initialize_db(app, database):
    with app.app_context():
        database.drop_all()
        database.create_all()


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5555)