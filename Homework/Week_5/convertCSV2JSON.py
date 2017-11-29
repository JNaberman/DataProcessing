# convertCSV2JSON.py
#
# Jasper Naberman
# 10787224
# Data Processing Week 5
#
# Convert the KNMI .csv-dataset to JSON format

import csv
import json

data = []
counter = 0

with open('dataLauwersoog.txt') as csv_file:
    reader = csv.reader(csv_file, delimiter = ',')
    for row in reader:
        diction = {}
        if row[0][0] != '#':
            if row[0] == '  277':
                diction['station'] = 'Lauwersoog'
            elif row[0] == '  380':
                diction['station'] = 'Maastricht'
            diction['date'] = row[1]
            diction['average_temperature'] = float(row[2])
            diction['minimum_temperature'] = float(row[3])
            diction['maximum_temperature'] = float(row[4])
            data.append(diction)
        counter += 1
        
with open('dataLauwersoog.json', 'w') as json_file:
    json.dump(data, json_file, indent = 1, sort_keys = True)