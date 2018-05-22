import numpy as np
import pandas as pd
import csv
import json
import pickle

#["top": [
# {# "champ":xxx, "games": 1, "wins": 1, "win-rate": 100}
#]

filename = 'data/matchinfo.csv'

g_top = []
g_mid = []
g_jg = []
g_bot = []
g_sup = []

win_top = []
win_mid = []
win_jg = []
win_bot = []
win_sup = []
dict = {}
dict['Lanes'] = {}
dict['Lanes']['Top'] = {}
dict['Lanes']['Mid'] = {}
dict['Lanes']['Jungle'] = {}
dict['Lanes']['Bottom'] = {}
dict['Lanes']['Support'] = {}
print(dict)

with open('matchinfo.csv', "r") as data:
    read = csv.reader(data)
    next(read, None)
    for row in read:
        b_win= row[5]
        r_win = row[6]
        b_top = row[10]
        b_jg = row[12]
        b_mid = row[14]
        b_adc = row[16]
        b_sup = row[18]

        r_top = row[20]
        r_jg = row[22]
        r_mid = row[24]
        r_adc = row[26]
        r_sup = row[28]

        #Blue top
        if b_top not in dict['Lanes']['Top']:
            dict['Lanes']['Top'][b_top] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Top'][b_top]["Games"] += 1

        #Red top
        if r_top not in dict['Lanes']['Top']:
            dict['Lanes']['Top'][r_top] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Top'][r_top]["Games"] += 1

        #Blue mid
        if b_mid not in dict['Lanes']['Mid']:
            dict['Lanes']['Mid'][b_mid] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Mid'][b_mid]["Games"] += 1

        #Red mid
        if r_mid not in dict['Lanes']['Mid']:
            dict['Lanes']['Mid'][r_mid] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Mid'][r_mid]["Games"] += 1

        #Blue jg
        if b_jg not in dict['Lanes']['Jungle']:
            dict['Lanes']['Jungle'][b_jg] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Jungle'][b_jg]["Games"] += 1

        #Red jg
        if r_jg not in dict['Lanes']['Jungle']:
            dict['Lanes']['Jungle'][r_jg] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Jungle'][r_jg]["Games"] += 1

        #Blue Bottom
        if b_adc not in dict['Lanes']['Bottom']:
            dict['Lanes']['Bottom'][b_adc] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Bottom'][b_adc]["Games"] += 1

        #Red Bottom
        if r_adc not in dict['Lanes']['Bottom']:
            dict['Lanes']['Bottom'][r_adc] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Bottom'][r_adc]["Games"] += 1

        #Blue Support
        if b_sup not in dict['Lanes']['Support']:
            dict['Lanes']['Support'][b_sup] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Support'][b_sup]["Games"] += 1

        #Red Support
        if r_sup not in dict['Lanes']['Support']:
            dict['Lanes']['Support'][r_sup] = {"Games" : 1, "Wins" : 0, "Percentage" : 0}
        else:
            dict['Lanes']['Support'][r_sup]["Games"] += 1

        if b_win == 1:
            dict['Lanes']['Top'][b_top]['Wins'] += 1
            dict['Lanes']['Mid'][b_mid]['Wins'] += 1
            dict['Lanes']['Jungle'][b_jg]['Wins'] += 1
            dict['Lanes']['Bottom'][b_adc]['Wins'] += 1
            dict['Lanes']['Support'][b_sup]['Wins'] += 1
        else:
            dict['Lanes']['Top'][r_top]["Wins"] += 1
            dict['Lanes']['Mid'][r_mid]["Wins"] += 1
            dict['Lanes']['Jungle'][r_jg]["Wins"] += 1
            dict['Lanes']['Bottom'][r_adc]["Wins"] += 1
            dict['Lanes']['Support'][r_sup]["Wins"] += 1

    for t in dict['Lanes']['Top']:
        dict['Lanes']['Top'][t]['Percentage'] = int(dict['Lanes']['Top'][t]['Wins'] / dict['Lanes']['Top'][t]['Games'] * 100)

    for m in dict['Lanes']['Mid']:
        dict['Lanes']['Mid'][m]['Percentage'] = int(dict['Lanes']['Mid'][m]['Wins'] / dict['Lanes']['Mid'][m]['Games'] * 100)

    for j in dict['Lanes']['Jungle']:
        dict['Lanes']['Jungle'][j]['Percentage'] = int(dict['Lanes']['Jungle'][j]['Wins'] / dict['Lanes']['Jungle'][j]['Games'] * 100)

    for a in dict['Lanes']['Bottom']:
        dict['Lanes']['Bottom'][a]['Percentage'] = int(dict['Lanes']['Bottom'][a]['Wins'] / dict['Lanes']['Bottom'][a]['Games'] * 100)

    for s in dict['Lanes']['Support']:
        dict['Lanes']['Support'][s]['Percentage'] = int(dict['Lanes']['Support'][s]['Wins'] / dict['Lanes']['Support'][s]['Games'] * 100)

    with open('win-rates.json', 'w') as out:
        json.dump(dict, out)