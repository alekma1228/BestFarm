import sqlalchemy
import import_scripts.common as common
import requests
from datetime import datetime
import urllib.parse
import json
from sqlalchemy import MetaData, Table

KEY = '4DCB06E8-7FD1-3DAD-A209-C2EEB7D94956'


def query(url):
    response = requests.get(url=url)
    print('Downloading: ', response.url.replace(KEY, 'KEY'))

    try:
        return response.json()['data']
    except KeyError:
        print('No results.')
        return None


def request_data_for_crop(crop, short_descs, last_date):
    common_params = {
        'key': '4DCB06E8-7FD1-3DAD-A209-C2EEB7D94956',
        'source_desc': 'SURVEY',
        'sector_desc': 'CROPS',
        'group_desc': 'FIELD_CROPS',
        'commodity_desc': crop,
        'statisticcat_desc': 'PROGRESS',
        'domain': 'TOTAL',
        'freq_desc': 'WEEKLY',
    }

    agg_level_descs = ['NATIONAL', 'STATE']

    date_string = last_date.strftime('%Y-%m-%d')

    all_results = []

    for agg_level_desc in agg_level_descs:
        for short_desc in short_descs:
            url = f'http://quickstats.nass.usda.gov/api/api_GET/?key={KEY}&source_desc=SURVEY&sector_desc=CROPS&commodity_desc={crop}&short_desc={short_desc}&domain=TOTAL&agg_level_desc={agg_level_desc}&freq_desc=WEEKLY&group_desc=FIELD CROPS&statisticcat_desc=PROGRESS&week_ending__GT={date_string}'
            results = query(url)
            if results is not None:
                all_results = all_results + results

    return all_results


def format_results(results):
    formatted_results = []
    for row in results:
        try:
            state_ansi = row['state_ansi']
            if len(state_ansi) == 0:
                state_ansi = -1

            formatted_results.append({
                'program': row['source_desc'],
                'year': row['year'],
                'period': row['reference_period_desc'],
                'week_ending': row['week_ending'],
                'geo_level': row['agg_level_desc'],
                'state': row['state_name'],
                'state_ansi': state_ansi,
                'watershed': row['watershed_code'],
                'commodity': row['commodity_desc'],
                'data_item': row['short_desc'],
                'domain': row['domain_desc'],
                'value': row['Value'],
            })
        except:
            print('An error occurred parsing row (skipping):')
            print(json.dumps(row))

    return formatted_results


def run(event, context):
    print('RUNNING')

    db_engine = common.get_db_connection()
    meta = MetaData(bind=db_engine, reflect=True)

    with db_engine.connect() as db:

        corn_short_descs = [
            'CORN - PROGRESS, MEASURED IN PCT PLANTED',
            'CORN - PROGRESS, MEASURED IN PCT EMERGED',
            'CORN - PROGRESS, MEASURED IN PCT SILKING',
            'CORN - PROGRESS, MEASURED IN PCT DOUGH',
            'CORN, GRAIN - PROGRESS, MEASURED IN PCT HARVESTED',
        ]

        soybean_short_descs = [
            'SOYBEANS - PROGRESS, MEASURED IN PCT PLANTED',
            'SOYBEANS - PROGRESS, MEASURED IN PCT EMERGED',
            'SOYBEANS - PROGRESS, MEASURED IN PCT SETTING PODS',
            'SOYBEANS - PROGRESS, MEASURED IN PCT DROPPING LEAVES',
            'SOYBEANS - PROGRESS, MEASURED IN PCT HARVESTED',
        ]

        get_latest_date = '''
          SELECT max(week_ending) last_date
          FROM usda_crop_progress_condition_details 
          ORDER BY week_ending DESC
        '''

        latest_date_results = db.execute(get_latest_date).fetchall()

        for row in latest_date_results:
            last_date = row['last_date']

        if last_date is None:
            last_date = datetime.now().replace(day=1, month=1)

            # TODO: remove this:
        last_date = datetime.now().replace(day=1, month=1, year=2019)

        results = request_data_for_crop('CORN', corn_short_descs, last_date)
        results = results + request_data_for_crop(
            'SOYBEANS', soybean_short_descs, last_date)

        print('Finished downloading. Appending to the database.')

        table = meta.tables['usda_crop_progress_condition_details']

        formatted_results = format_results(results)

        if len(formatted_results) > 0:
            table.insert(values=formatted_results).execute()
        else:
            print('No results')

    return
