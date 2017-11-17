# convertCSV2JSON.py
#
# Jasper Naberman
# 10787224
# Data Processing Week 3
#
# Convert the given .csv-dataset to JSON format

import csv
import json

data = []

csv_file = open('rawData.csv', 'r')
json_file = open('data.json', 'w')

reader = csv.DictReader(csv_file)
temp = []
for line in reader:
    temp.append(line)

json.dump(temp, json_file, indent = 4, separators = (',', ': '))