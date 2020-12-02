import os
import json
import botocore
import boto3
import scipy.stats

TABLE_NAME = os.getenv('TABLE_NAME')
STAGE = os.getenv('STAGE')


def get_old_style_symbol(new_symbol):
    lower_case_symbol = new_symbol.lower()
    value_map = {
        'ke': 'kw',
        'zs': 's',
        'zw': 'w',
        'zc': 'c',
    }

    return value_map.get(lower_case_symbol, lower_case_symbol)


def dynamodb_client():
    if STAGE == 'local':
        return boto3.resource('dynamodb', endpoint_url='http://localhost:8000')

    return boto3.resource('dynamodb')


def run(event, context):
    params = event.get('queryStringParameters', {})
    symbol = params.get('symbol')
    month_symbol = params.get('month_symbol')
    year = params.get('year')
    calculation_range = params.get('calculation_range')
    check_value_in_cents = params.get('check_value_in_cents')
    if not symbol or not month_symbol or not year or not calculation_range or not check_value_in_cents:
        print(
            'Missing parameters, Required: [symbol, month_symbol, year, calculation_range]. Found: ')
        print(f'symbol: {symbol}')
        print(f'month_symbol: {month_symbol}')
        print(f'year: {year}')
        print(f'calculation_range: {calculation_range}')
        print(f'check_value_in_cents: {check_value_in_cents}')
        return {
            'statusCode': 400,
        }

    check_value_in_cents = float(check_value_in_cents)

    mapped_symbol = get_old_style_symbol(symbol)
    frame_name = f'{mapped_symbol}{month_symbol.lower()}{year}_{calculation_range}yr_stats'
    print(f'checking frame with name: {frame_name}')

    dynamodb = dynamodb_client()
    table = dynamodb.Table(TABLE_NAME)

    try:
        response = table.get_item(
            Key={
                'frame_name': frame_name,
            }
        )

        item = response.get('Item', {})

        mean = item.get('mean')
        standard_deviation = item.get('standard_deviation')

        if not mean or not standard_deviation:
            print(f'Could not find frame or frame values for {frame_name}')
            return {
                'statusCode': 404
            }

        # cumulative distribution function: the probability that the value
        # will be equal to or below the check value

        chance = scipy.stats.norm.cdf(
            check_value_in_cents, float(mean), float(standard_deviation))

        print(f'Result: {chance}')

        return {
            'statusCode': 200,
            'body': json.dumps({
                'result': chance
            })
        }
    except Exception as e:
        if e.__class__.__name__ == 'ResourceNotFoundException':
            print(f'No frame found with name: {frame_name}')
            return {'statusCode': 404}
        raise e
