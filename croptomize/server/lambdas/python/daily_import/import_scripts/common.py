
import os
import boto3
import json
from sqlalchemy import create_engine

IMPORT_BUCKET_NAME = os.getenv('IMPORT_BUCKET_NAME')
USE_CREDENTIALS = os.getenv('USE_CREDENTIALS')
SUB_DIRECTORY = 'CME_Settle_Files/'
STAGE = os.getenv('STAGE')
DB_NAME = os.getenv('DBNAME')

secrets_manager = boto3.client('ssm')

def get_secret(key):
    response = secrets_manager.get_parameter(
        Name= STAGE + '_' + key,
        WithDecryption=True
    )
    return response['Parameter']['Value']

DB_PARAMS = json.loads(get_secret('DB_PARAMS'))

def get_s3_connection(low_level = False):
    if low_level:
        if (USE_CREDENTIALS != 'false'):
            return boto3.client('s3', profile_name=USE_CREDENTIALS)
        else:
            return boto3.client('s3')

    if (USE_CREDENTIALS != 'false'):
        return boto3.Session(profile_name=USE_CREDENTIALS).resource('s3')
    else:
        return boto3.resource('s3')

def get_db_connection():
    return create_engine('mysql+pymysql://' + DB_PARAMS['user'] + ':' + DB_PARAMS['password'] + '@' + DB_PARAMS['host'] + '/' + DB_PARAMS['database_name'])