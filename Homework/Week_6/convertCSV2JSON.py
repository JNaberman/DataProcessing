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

with open('data.csv', newline = '') as csv_file:
    reader = csv.reader(csv_file, delimiter = ';')
    for row in reader:
        diction = {}
        if counter != 0:
            diction['country'] = row[0]
            diction['alcohol'] = float(row[1])
            diction['population'] = int(row[2])
            diction['tobacco'] = float(row[3])
            diction['continent'] = row[4]
            data.append(diction)
        counter += 1
        
with open('data.json', 'w') as json_file:
    json.dump(data, json_file, indent = 1, sort_keys = True)
        