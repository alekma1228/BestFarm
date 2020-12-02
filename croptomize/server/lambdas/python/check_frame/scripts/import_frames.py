import os
import json
import botocore
import boto3
import scipy.stats
from decimal import Decimal

TABLE_NAME = os.getenv('TABLE_NAME')
STAGE = os.getenv('STAGE')

def dynamodb_client():
    if STAGE == 'local':
        return boto3.resource('dynamodb', endpoint_url='http://localhost:8000')

    return boto3.resource('dynamodb')

def run(event, context):
    dynamodb = dynamodb_client()
    table = dynamodb.Table(TABLE_NAME)

    try:
        for values in event:
            response = table.put_item(
                Item={
                    'frame_name': values['frame_name'],
                    'mean': Decimal(str(values['mean'])),
                    'standard_deviation': Decimal(str(values['standard_deviation'])),
                }
            )

            print(f'wrote frame {values["frame_name"]}')

        return 'SUCCESS'
    except Exception as e:
        if e.__class__.__name__ == 'ResourceNotFoundException':
            print(f'No frame found with name: {frame_name}')
            return 'FAILURE'
        raise e
