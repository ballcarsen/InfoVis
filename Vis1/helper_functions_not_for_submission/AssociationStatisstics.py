import numpy as np
import pandas as pd
import csv
import json
import  math


filename = 'data/matchinfo.csv'

'''combo, wins, games'''

association_stats = {}
association_stats['ADC Support Pairs'] = {}

with open('matchinfo.csv', "r") as data:
    read = csv.reader(data)
    next(read, None)
    for row in read:
        b_win= row[5]
        r_win = row[6]

        b_adc = row[16]
        b_sup = row[18]

        r_adc = row[26]
        r_sup = row[28]

        combo_b = b_adc + " " + b_sup
        combo_r = r_adc + " " + r_sup

        if combo_b not in association_stats['ADC Support Pairs']:
            association_stats['ADC Support Pairs'][combo_b] = {"ADC": b_adc, "Support": b_sup, "Wins": 0, "Games": 0,
                                                               "Win Rate" : 0}

        if combo_r not in association_stats['ADC Support Pairs']:
            association_stats['ADC Support Pairs'][combo_r] = {"ADC": r_adc, "Support": r_sup, "Wins": 0, "Games": 0,
                                                               "Win Rate": 0}

        if b_win == 1:
            association_stats['ADC Support Pairs'][combo_b]["Wins"] += 1
            association_stats['ADC Support Pairs'][combo_b]["Games"] += 1

            association_stats['ADC Support Pairs'][combo_r]["Games"] += 1

        else:
            association_stats['ADC Support Pairs'][combo_r]["Wins"] += 1
            association_stats['ADC Support Pairs'][combo_r]["Games"] += 1

            association_stats['ADC Support Pairs'][combo_b]["Games"] += 1

    for key in association_stats['ADC Support Pairs'].keys():
        association_stats['ADC Support Pairs'][key]["Win Rate"] = round(association_stats['ADC Support Pairs'][key]["Wins"] / association_stats['ADC Support Pairs'][key]["Games"], 2)

with open('association_stats.json', 'w') as out:
    out.write("{ \"ADC Support Pairs\": \n\t[\n")
    for key, value in association_stats['ADC Support Pairs'].items():
        out.write("\t\t{\n")
        out.write("\t\t\t\"ADC\":" + "\"" + value["ADC"] + "\""  + ",\n")
        out.write("\t\t\t\"Support\":" + "\"" + value["Support"] +"\"" + ",\n")
        out.write("\t\t\t\"Wins\":" + str(value["Wins"]) + ",\n")
        out.write("\t\t\t\"Games\":" + str(value["Games"]) + ",\n")
        out.write("\t\t\t\"Win Rate\":" + str(value["Win Rate"]) + "\n")
        out.write("\t\t},\n")

    out.write("\t]\n}")