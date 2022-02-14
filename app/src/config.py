import os

TRUTH_VALUES = ['true', '1', 't', 'y', 'yes', 'yeah', 'yep', 'yup', 'certainly', 'uh-huh']

POSTGRES_HOST = 'localhost'
DB_URI = f"postgresql://testuser:wubalubadubdub@{POSTGRES_HOST}:54320/cryptodb"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_POOL_SIZE = 30
DEBUG = True

JWT_KEY = os.getenv('JWT_KEY', 'a0gs648gbsdhs853sd6sn83ns963hs7')
ADMIN_WALLET_ADDRESS = os.getenv('ADMIN_WALLET_ADDRESS', 'admin')
NODE_URL = os.getenv('NODE_URL', '')

CONTRACT_QUERY_WAIT_TIME = 10

RESET_DB = os.getenv('RESET_DB', 'nope')
RESET_DB = RESET_DB.lower() in TRUTH_VALUES

