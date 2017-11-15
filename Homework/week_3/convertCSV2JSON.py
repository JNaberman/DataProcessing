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

# strip the file of it's comments and whitespaces
file = 'KNMI_20151231.txt.tsv'
with open(file, 'r') as raw_data:
    reader = csv.reader(raw_data, delimiter=',')
    for line in reader:
        if line[0][0] != '#':
            for element in range(len(line)):
                line[element] = line[element].strip(' ')
            line.pop(0)
            data.append(line)

# store the data list in a textfile in json format
with open('data.json', 'w') as outfile:
    json.dump(data, outfile)