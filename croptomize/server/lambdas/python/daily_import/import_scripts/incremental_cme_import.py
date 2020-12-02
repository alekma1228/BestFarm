import re
from io import StringIO
import traceback
import pandas as pd
import sqlalchemy
import import_scripts.common as common
import warnings


def import_file_with_key(key, import_settings_frame, bucket, db):
    try:
        print('Downloading ' + key + ' from S3')
        file_contents = bucket.Object(key).get()['Body'].read().decode('utf-8')
        file = pd.read_csv(StringIO(file_contents))

        print('merging dataframes')
        merged = pd.merge(import_settings_frame, file, how='inner', left_on=[
                          'exchange', 'symbol'], right_on=['Exch', 'Sym'])

        print('reindexing')
        reindexed = merged.reindex(columns=[
            'BizDt', 'Sym', 'ID', 'StrkPx', 'SecTyp', 'MMY', 'MatDt', 'PutCall', 'Exch', 'Descr', 'LastTrdDt', 'BidPrice', 'OpeningPrice', 'SettlePrice', 'SettleDelta', 'HighLimit', 'LowLimit'	, 'DHighPrice', 'DLowPrice', 'HighBid', 'LowBid', 'PrevDayVol', 'PrevDayOI', 'FixingPrice', 'UndlyExch', 'UndlyID', 'UndlySecTyp', 'UndlyMMY', 'BankBusDay'
        ])

        # fix null columns
        reindexed['Descr'] = reindexed['Descr'].fillna('')
        reindexed['StrkPx'] = reindexed['StrkPx'].fillna(0.0)
        reindexed['PutCall'] = reindexed['PutCall'].fillna(0)
        reindexed['BidPrice'] = reindexed['BidPrice'].fillna(0.0)
        reindexed['OpeningPrice'] = reindexed['OpeningPrice'].fillna(0.0)
        reindexed['SettleDelta'] = reindexed['SettleDelta'].fillna(0.0)
        reindexed['DHighPrice'] = reindexed['DHighPrice'].fillna(0.0)
        reindexed['DLowPrice'] = reindexed['DLowPrice'].fillna(0.0)
        reindexed['HighBid'] = reindexed['HighBid'].fillna(0.0)
        reindexed['LowBid'] = reindexed['LowBid'].fillna(0.0)
        reindexed['FixingPrice'] = reindexed['FixingPrice'].fillna(0.0)
        reindexed['UndlyExch'] = reindexed['UndlyExch'].fillna('')
        reindexed['UndlyID'] = reindexed['UndlyID'].fillna('')
        reindexed['UndlySecTyp'] = reindexed['UndlySecTyp'].fillna('')
        reindexed['UndlyMMY'] = reindexed['UndlyMMY'].fillna('')
        reindexed['BankBusDay'] = reindexed['BankBusDay'].fillna('')

        print('Writing to cme_rawfiledata')
        reindexed.to_sql('cme_rawfiledata', db,
                         if_exists='append', index=False)

        print('Writing croptomize crop types to croptomize_target')
        result = reindexed.query('Sym in ["KE", "ZC", "ZS", "ZW"]')
        result.to_sql('croptomize_target', db, if_exists='append', index=False)
    except Exception as ex:
        print('Exception while importing file ' + key)
        print(type(ex))
        print(ex)


def run_calculations(db):
    # Filter warnings for the drop table statements
    warnings.filterwarnings("ignore", "Unknown table.*")

    files = ['Add_CME_to_TA_F_FO_Raw_Data.sql',
             'Add_to_Fut_Hist_Tgt_Table.sql', 'Add_to_Opt_Hist_Tgt_Tbl.sql']
    for file_name in files:
        with open('database/import_sql/' + file_name) as file:
            print('Running ' + file_name)
            statements = file.read().split(';')
            for statement in statements:
                if statement and not statement.isspace():
                    print('statement:' + statement)
                    db.execute(sqlalchemy.text(statement))


def run(event, context):
    s3 = common.get_s3_connection()

    with common.get_db_connection().connect() as db:
        optcode_sql = '''
                SELECT CommoditySymbol_CME_EXCH exchange, CommoditySymbol_CME_F_SYM symbol
                FROM setup_commoditytype 
                UNION 
                SELECT CommoditySymbol_CME_EXCH exchange, CommoditySymbol_CME_FO_SYM symbol
	        FROM setup_commoditytype
        '''

        cme_optcode_records = db.execute(optcode_sql).fetchall()

        exchanges_to_import = set([row['exchange']
                                   for row in cme_optcode_records])
        import_settings_frame = pd.DataFrame(
            cme_optcode_records, columns=['exchange', 'symbol'])

        existing_symbol_dates_records = db.execute(
            'SELECT DISTINCT BizDt date, Sym symbol, Exch exchange FROM cme_rawfiledata')

        dates_for_exchanges = {}

        for row in existing_symbol_dates_records:
            exchange = row['exchange']
            date_string = row['date'].strftime('%Y%m%d')

            if exchange not in dates_for_exchanges:
                dates_for_exchanges[exchange] = set()

            dates_for_exchanges[exchange].add(date_string)

        bucket = s3.Bucket(common.IMPORT_BUCKET_NAME)

        empty_set = set()

        # Match the csv files and pull out the exchange and datestring from the names
        file_name_regex = re.compile(
            '^(?P<exchange>[^.]+)[^0-9]*(?P<date_string>\d*)\.s.csv')
        for object_summary in bucket.objects.all():
            key = object_summary.key
            file_name = object_summary.key.replace('CME_Settle_Files/', '')

            match_result = file_name_regex.match(file_name)
            if match_result:
                file_exchange = match_result['exchange'].upper()
                file_date_string = match_result['date_string']

                if file_exchange in exchanges_to_import:
                    if file_date_string not in dates_for_exchanges.get(file_exchange, empty_set):
                        import_file_with_key(
                            key, import_settings_frame, bucket, db)

        run_calculations(db)

    return 'SUCCESS'
