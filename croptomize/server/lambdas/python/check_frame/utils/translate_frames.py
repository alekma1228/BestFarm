import glob
import json
from xlsx2csv import Xlsx2csv
import pandas as pd
import re

for file in glob.glob('./*.xlsx'):
    Xlsx2csv(file, outputencoding="utf-8").convert(f'csv/{file}.csv')

results = []

print('Note: If you get an exception that mentions that a file is not a zip file, you probably have a temp file from excel that you need to delete')

for file in glob.glob('csv/*.csv'):
    print(f'loading {file}')
    data_for_file = pd.read_csv(file, sep=',').set_index('moments').transpose()
    
    # data_for_file.columns = [
    #     'Mean',
    #     'Standard Error',
    #     'Median',
    #     'Mode',
    #     'Standard Deviation',
    #     'Simple Variance',
    #     'Kurtosis',
    #     'Skewness',
    #     'Range',
    #     'Minimum',
    #     'Maximum',
    #     'Sum',
    #     'Count',
    #     'Confidence Level',
    #     'neg3sig',
    #     'neg2sig',
    #     'neg1sig',
    #     'pos1sig',
    #     'pos2sig',
    #     'pos3sig',
    #     'span',
    #     'call_2sig',
    #     'call_2.5sig',
    #     'call_3sig',
    #     'call_3.5sig',
    #     'call_4sig'
    # ]

    file_name_prefix = file[file.index('/') + 1:file.index('_')]

    for index_column, row in data_for_file.iterrows():
        if pd.isna(row['Mean']):
            continue

        column_suffix = index_column[index_column.index('_') + 1:]
        frame_name = f'{file_name_prefix}_{column_suffix}'

        results.append({
            'frame_name': frame_name,
            'mean': row['Mean'],
            'standard_deviation': row['Standard Deviation'],
        })

        print({
            'frame_name': frame_name,
            'mean': row['Mean'],
            'standard_deviation': row['Standard Deviation'],
        })

file = open('frames.json', 'w+')
file.write(json.dumps(results))
file.close()