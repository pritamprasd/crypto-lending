POSTGRES_HOST = 'localhost'
DB_URI = f"postgresql://testuser:wubalubadubdub@{POSTGRES_HOST}:54320/cryptodb"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_POOL_SIZE = 30
DEBUG = True
JWT_KEY = 'a0gs648gbsdhs853sd6sn83ns963hs7'

ADMIN_WALLET_ADDRESS = 'admin'

NODE_URL = "http://127.0.0.1:8545"

CELERY_BROKER_URL = ""