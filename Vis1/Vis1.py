import numpy as np
import csv

filename = 'matchinfo.csv'

'''combo, wins, games'''

win_rates = []
win_rates_champ = []


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

with open('matchinfo.csv', "r") as data:
    read = csv.reader(data)
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

        if b_win == 1:
            if index_b == -1:
                win_rates.append([combo_b, 1, 1])
            else:
                win_rates[index_b][1] += 1
                win_rates[index_b][2] += 1
            if index_r == -1:
                win_rates.append([combo_b, 0, 1])
            else:
                win_rates[index_r][2] += 1

            index_b_top = check(b_top)
            if index_b_top == -1:
                win_rates_champ.append([b_top, 1, 1])

        else:
            if index_b == -1:
                win_rates.append([combo_b, 0, 1])
            else:
                win_rates[index_b][2] += 1
            if index_r == -1:
                win_rates.append([combo_b, 1, 1])
            else:
                win_rates[index_r][1] += 1
                win_rates[index_r][2] += 1

max_1 = ''
max_2 = ''
max_3 = ''

max_1_val = 0
max_2_val = 0
max_3_val = 0

pop_1 = ''
pop_2 = ''
pop_3 = ''

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





