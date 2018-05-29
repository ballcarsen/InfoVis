import numpy as np
import pandas as pd
import csv


filename = 'data/matchinfo.csv'

'''combo, wins, games'''

win_rates = []
win_rates_champ = []

def nice_print(arr):
    for row in arr:
        print(row)

def check_combo(combo):
    count = 0
    index = -1
    if len(win_rates) == 0:
        return -1

    for row in win_rates:
        if row[0] == combo:
            index = count
        count+= 1
    return index

def check(champ):
    count = 0
    index = -1
    if len(win_rates_champ) == 0:
        return -1

    for row in (win_rates_champ):
        if row[0] == champ:
            index = count
        count+= 1
    return index


associations = [[0]]
print(associations)
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

        combo_b = b_adc + " " + b_sup
        combo_r = r_adc + " " + r_sup

        index_b = check_combo(combo_b)
        index_r = check_combo(combo_r)

        #Adds new Champ in assocations
        if "flare.adc." + b_adc not in associations[0]:
            associations[0].append("flare.adc." + b_adc)
            temp = ["flare.adc." + b_adc]
            for i in range(len(associations[0])):
                temp.append(0)
            associations.append(temp)
        if "flare.adc." + r_adc not in associations[0]:
            associations[0].append("flare.adc." + r_adc)
            temp = ["flare.adc." + r_adc]
            for i in range(len(associations[0])):
                temp.append(0)
            associations.append(temp)
        length  = len(associations[0])
        for row in associations:
            if len(row) != length:
                for  i in range(length - len(row)):
                    row.append(0)
print(associations)
data.close()
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

        if "flare.sup." + b_sup not in associations[0]:
            associations[0].append("flare.sup." + b_sup)
            temp = ["flare.sup." + b_sup]
            for i in range(len(associations[0])):
                temp.append(0)
            associations.append(temp)
        if "flare.sup." + r_sup not in associations[0]:
            associations[0].append("flare.sup." + r_sup)
            temp = ["flare.sup." + r_sup]
            for i in range(len(associations[0])):
                temp.append(0)
            associations.append(temp)
        length  = len(associations[0])
        for row in associations:
            if len(row) != length:
                for  i in range(length - len(row)):
                    row.append(0)

    wins = associations
    games_played = associations
data.close()
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

        b_adc_index = associations[0].index("flare.adc." + b_adc)
        r_adc_index = associations[0].index("flare.adc." + r_adc)

        b_sup_index = associations[0].index("flare.sup." + b_sup)
        r_sup_index = associations[0].index("flare.sup." + r_sup)

        print(b_sup_index, b_adc_index)

        associations[b_adc_index][b_sup_index] = 1
        associations[b_sup_index][b_adc_index] = 1
        associations[r_adc_index][r_sup_index] = 1
        associations[r_sup_index][r_adc_index] = 1

        if associations[b_adc_index][b_sup_index] != 1:
            associations[b_adc_index][b_sup_index] = 1
        if associations[r_adc_index][r_sup_index] != 1:
            associations[r_adc_index][r_sup_index] = 1
        if associations[b_sup_index][b_adc_index] != 1:
            associations[b_sup_index][b_adc_index] = 1
        if associations[r_sup_index][r_adc_index] != 1:
            associations[r_sup_index][r_adc_index] = 1
    indexes = associations[0]
    associations = associations[1:]
    nice_print(associations)

    # sample line {"name": "flare.sup.Thresh", "size": 10000, "imports": ["flare.adc.Jinx", "flare.adc.Lucian"]}
    with open('flare.json', 'w') as output:
        output.write('[\n')
        for test in associations:
            output.write("{\"name\":" + '\"' + test[0] + '\",' + "\"size\":1000, \"imports\": [")
            indices = [i for i, x in enumerate(test) if x == 1]
            print(indices)
            for ind in range(len(indices)):
                if ind != len(indices) - 1:
                    print("whoo")
                    output.write("\"" + indexes[indices[ind]] + "\", ")
                else:
                    output.write("\"" + indexes[indices[ind]] + "\"")
            output.write("]},\n")
        output.write(']')

data.close()



max_1 = ''
max_2 = ''
max_3 = ''



max_1_val = 0
max_2_val = 0
max_3_val = 0

pop_1 = ''
pop_2 = ''
pop_3 = ''
'''
for row in win_rates:
    if float(row[1]/row[2] >= max_1_val) and row[2] > 10:
        max_1_val = row[1]/row[2]
        max_1 = row[0]

    elif float(row[1]/row[2] >= max_2_val) and row[2] > 10:
        max_2_val = row[1]/row[2]
        max_2 = row[0]

    elif float(row[1]/row[2] >= max_3_val) and row[2] > 10:
        max_3_val = row[1]/row[2]
        max_3 = row[0]

    if row[2] > win_rates[check_combo(pop_1)][2]:
        pop_1 = row[0]

    elif row[2] > win_rates[check_combo(pop_2)][2]:
        pop_2 = row[0]

    elif row[2] > win_rates[check_combo(pop_3)][2]:
        pop_3 = row[0]

print (max_1 + ' ' + str(max_1_val))
print(win_rates[check_combo(max_1)])
print (max_2 + ' ' + str(max_2_val))
print(win_rates[check_combo(max_2)])
print (max_3 + ' ' + str(max_3_val))
print(win_rates[check_combo(max_3)])

print(pop_1)
temp = win_rates[check_combo(pop_1)]
print(str(temp) + " " + str(float(temp[1] / temp[2])))
print(pop_2)
temp = win_rates[check_combo(pop_2)]
print(str(temp) + " " + str(float(temp[1] / temp[2])))
print(pop_3)
temp = win_rates[check_combo(pop_3)]
print(str(temp) + " " + str(float(temp[1] / temp[2])))
'''




