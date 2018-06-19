import pandas as pd
import numpy as np
from champ import Champ

matchInfo = pd.read_csv('LeagueofLegends.csv')

topChamps = {}
jgChamps = {}
midChamps = {}
botChamps = {}
supChamps = {}


dict = {}
dict['Lanes'] = {}
dict['Lanes']['Top'] = {}
dict['Lanes']['Mid'] = {}
dict['Lanes']['Jungle'] = {}
dict['Lanes']['Bottom'] = {}
dict['Lanes']['Support'] = {}

def get_array(string):
    string = string[:len(string) - 1]
    string = string[1:]
    array = np.array(string.split(','), dtype= int)
    return array


for index, row in matchInfo.iterrows():
    blue_top = row['blueTopChamp']
    blue_mid = row['blueMiddleChamp']
    blue_jg = row['blueJungleChamp']
    blue_adc = row['blueADCChamp']
    blue_sup = row['blueSupportChamp']

    red_top = row['redTopChamp']
    red_mid = row['redMiddleChamp']
    red_jg = row['redJungleChamp']
    red_adc = row['redADCChamp']
    red_sup = row['redSupportChamp']

    blue_top_gold = row['goldblueTop']
    blue_mid_gold = row['goldblueMiddle']
    blue_jg_gold = row['goldblueJungle']
    blue_adc_gold = row['goldblueADC']
    blue_sup_gold = row['goldblueSupport']

    red_top_gold = row['goldredTop']
    red_mid_gold = row['goldredMiddle']
    red_jg_gold = row['goldredJungle']
    red_adc_gold = row['goldredADC']
    red_sup_gold = row['goldredSupport']

    if blue_top not in topChamps:
        b_champ = Champ(blue_top, 'Top')
        b_champ.add_gold(get_array(blue_top_gold))
        topChamps[blue_top] = b_champ
    else:
        topChamps[blue_top].add_gold(get_array(blue_top_gold))

    if red_top not in topChamps:
        r_champ = Champ(red_top, 'Top')
        r_champ.add_gold(get_array(red_top_gold))
        topChamps[red_top] = r_champ
    else:
        topChamps[red_top].add_gold(get_array(red_top_gold))

    if blue_jg not in jgChamps:
        b_champ = Champ(blue_jg, 'Jungle')
        b_champ.add_gold(get_array(blue_jg_gold))
        jgChamps[blue_jg] = b_champ
    else:
        jgChamps[blue_jg].add_gold(get_array(blue_jg_gold))

    if red_jg not in jgChamps:
        r_champ = Champ(red_jg, 'Jungle')
        r_champ.add_gold(get_array(red_jg_gold))
        jgChamps[red_jg] = r_champ
    else:
        jgChamps[red_jg].add_gold(get_array(red_jg_gold))

    if blue_mid not in midChamps:
        b_champ = Champ(blue_mid, 'Middle')
        b_champ.add_gold(get_array(blue_mid_gold))
        midChamps[blue_mid] = b_champ
    else:
        midChamps[blue_mid].add_gold(get_array(blue_mid_gold))

    if red_mid not in midChamps:
        r_champ = Champ(red_mid, 'Middle')
        r_champ.add_gold(get_array(red_mid_gold))
        midChamps[red_mid] = r_champ
    else:
        midChamps[red_mid].add_gold(get_array(red_mid_gold))

    if blue_adc not in botChamps:
        b_champ = Champ(blue_adc, 'ADC')
        b_champ.add_gold(get_array(blue_adc_gold))
        botChamps[blue_adc] = b_champ
    else:
        botChamps[blue_adc].add_gold(get_array(blue_adc_gold))

    if red_adc not in botChamps:
        r_champ = Champ(red_adc, 'ADC')
        r_champ.add_gold(get_array(red_adc_gold))
        botChamps[red_adc] = r_champ
    else:
        botChamps[red_adc].add_gold(get_array(red_adc_gold))

    if blue_sup not in supChamps:
        b_champ = Champ(blue_sup, 'Support')
        b_champ.add_gold(get_array(blue_sup_gold))
        supChamps[blue_sup] = b_champ
    else:
        supChamps[blue_sup].add_gold(get_array(blue_sup_gold))

    if red_sup not in supChamps:
        r_champ = Champ(red_sup, 'Support')
        r_champ.add_gold(get_array(red_sup_gold))
        supChamps[red_sup] = r_champ
    else:
        supChamps[red_sup].add_gold(get_array(red_sup_gold))

with open('mid-rates.csv', 'w') as out:
    out.write("champ,time,value\n")
    count = 0
    for key, value in midChamps.items():
        value.average_gold_rate()

        for i in range(len(value.gold_array)):
            out.write(str(value.name) + "," + str(i) + "," + str(value.gold_array[i]) + ".0\n")

with open('bot-rates.csv', 'w') as out:
    out.write("champ,time,value\n")
    count = 0
    for key, value in botChamps.items():
        value.average_gold_rate()

        for i in range(len(value.gold_array)):
            out.write(str(value.name) + "," + str(i) + "," + str(value.gold_array[i]) + ".0\n")
with open('support-rates.csv', 'w') as out:
    out.write("champ,time,value\n")
    count = 0
    for key, value in supChamps.items():
        value.average_gold_rate()

        for i in range(len(value.gold_array)):
            out.write(str(value.name) + "," + str(i) + "," + str(value.gold_array[i]) + ".0\n")




