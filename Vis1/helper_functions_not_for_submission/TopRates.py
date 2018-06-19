import json
import numpy

path = 'association_stats.json'
path_2 = 'flare_or.json'

champs = {}
champs['Support'] = {}
champs['ADC'] = {}

with open(path, 'r') as j:
    data  = json.load(j)

    for i in  data['ADC Support Pairs']:
        ad = i["ADC"]
        sup = i['Support']
        wins = i['Wins']
        games = i['Games']
        rate = i['Win Rate']
        if games > 10:

            if ad not in champs['ADC']:
                champs['ADC'][ad] = {'Support' : [], 'Games': [], 'Wins': [], 'Rates': []}

            ad_rates = champs['ADC'][ad]['Rates']

            if len(ad_rates) == 0:
                champs['ADC'][ad]['Support'].append(sup)
                champs['ADC'][ad]['Games'].append(games)
                champs['ADC'][ad]['Wins'].append(wins)
                champs['ADC'][ad]['Rates'].append(rate)

            else:
                z = 0
                while z < len(ad_rates):
                    if ad_rates[z] < rate:
                        if len(ad_rates) == 3:
                            champs['ADC'][ad]['Rates'].insert(z, rate)
                            champs['ADC'][ad]['Rates'].pop()

                            champs['ADC'][ad]['Games'].insert(z,games)
                            champs['ADC'][ad]['Wins'].insert(z, wins)
                            champs['ADC'][ad]['Support'].insert(z, sup)

                            champs['ADC'][ad]['Games'].pop()
                            champs['ADC'][ad]['Wins'].pop()
                            champs['ADC'][ad]['Support'].pop()

                        else:
                            champs['ADC'][ad]['Rates'].insert(z, rate)
                            champs['ADC'][ad]['Games'].insert(z, games)
                            champs['ADC'][ad]['Wins'].insert(z, wins)
                            champs['ADC'][ad]['Support'].insert(z, sup)
                        z = 4
                    else:
                        z+=1
                if len(champs['ADC'][ad]['Rates']) < 3:
                    champs['ADC'][ad]['Rates'].append(rate)
                    champs['ADC'][ad]['Games'].append(games)
                    champs['ADC'][ad]['Wins'].append(wins)
                    champs['ADC'][ad]['Support'].append(sup)

            if sup not in champs['Support']:
                champs['Support'][sup] = {'ADC': [], 'Games': [], 'Wins': [], 'Rates': []}

            sup_rates = champs['Support'][sup]['Rates']

            if len(sup_rates) == 0:
                champs['Support'][sup]['ADC'].append(ad)
                champs['Support'][sup]['Games'].append(games)
                champs['Support'][sup]['Wins'].append(wins)
                champs['Support'][sup]['Rates'].append(rate)

            else:
                z = 0
                while z < len(sup_rates):
                    if sup_rates[z] < rate:
                        if len(sup_rates) == 3:
                            champs['Support'][sup]['Rates'].insert(z, rate)
                            champs['Support'][sup]['Rates'].pop()

                            champs['Support'][sup]['Games'].insert(z, games)
                            champs['Support'][sup]['Wins'].insert(z, wins)
                            champs['Support'][sup]['ADC'].insert(z, ad)

                            champs['Support'][sup]['Games'].pop()
                            champs['Support'][sup]['Wins'].pop()
                            champs['Support'][sup]['ADC'].pop()

                        else:
                            champs['Support'][sup]['Rates'].insert(z, rate)
                            champs['Support'][sup]['Games'].insert(z, games)
                            champs['Support'][sup]['Wins'].insert(z, wins)
                            champs['Support'][sup]['ADC'].insert(z, ad)
                        z = 4
                    else:
                        z += 1
                if len(champs['Support'][sup]['Rates']) < 3:
                    champs['Support'][sup]['Rates'].append(rate)
                    champs['Support'][sup]['Games'].append(games)
                    champs['Support'][sup]['Wins'].append(wins)
                    champs['Support'][sup]['ADC'].append(ad)
with open('flare_or.json', 'r') as fl:
    f = json.load(fl)
    for ch in f:
        name = ch['name']
        if 'sup' not in name:
            name = name.replace('flare.adc.', '')
            if name in champs['ADC']:
                rate = champs['ADC'][name]['Rates']
                sup = champs['ADC'][name]['Support']
                g = champs['ADC'][name]['Games']
                w = champs['ADC'][name]['Wins']

                string = ''
                for i in range(len(rate)):
                    string += str(sup[i])
                    string += '  Win Rate: '
                    string += str(rate[i])
                    string += '%, Games: '
                    string += str(g[i])
                    string += ', Wins: '
                    string += str(w[i])
                    string += '\\n'
                ch['Data'] = 'Top supports with > 10 games\\n' + string
            else:
                ch['Data'] = 'Not played as an adc for more than 10 games'
        else:
            name = name.replace('flare.sup.', '')
            if name in champs['Support']:
                rate = champs['Support'][name]['Rates']
                ad = champs['Support'][name]['ADC']
                g = champs['Support'][name]['Games']
                w = champs['Support'][name]['Wins']

                string = ''
                for i in range(len(rate)):
                    string += str(ad[i])
                    string += '  Win Rate: '
                    string += str(rate[i])
                    string += '%, Games: '
                    string += str(g[i])
                    string += ', Wins: '
                    string += str(w[i])
                    string += '\\n'

                ch['Data'] = 'Top ADCs with > 10 games\\n' + string
            else:
                ch['Data'] = 'Not played as a Support for more than 10 games'
fl.close()

with open('flare.json', 'w') as output:
    output.write('[\n')
    for test in f:
        print(test)
        output.write("{\"name\":" + '\"' + test['name'] + '\",' + "\"size\":1000, \"imports\": [")
        indices = test['imports']
        for ind in range(len(indices)):
           if ind != len(indices) - 1:

                output.write("\"" + indices[ind] + "\", ")
           else:
                output.write("\"" + indices[ind] + "\"")
        output.write("], \"Data\" : \"" + test['Data'] + '\"},\n')
    output.write(']')




