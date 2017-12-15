# convertCSV2JSON.py
#
# Jasper Naberman
# 10787224
# Data Processing Week 4
#
# Convert a .csv-dataset to JSON format

import csv
import json

data = []
counter = 0

with open('population_data.csv', newline = '') as csv_file:
    reader = csv.reader(csv_file, delimiter = ',')
    for row in reader:
        diction = {}
        if counter != 0:
            diction['country'] = row[0]
            diction['population'] = float(row[1])
            diction['rank'] = int(row[2])
            data.append(diction)
        counter += 1
        
with open('population_data.json', 'w') as json_file:
    json.dump(data, json_file, indent = 1, sort_keys = True)
        