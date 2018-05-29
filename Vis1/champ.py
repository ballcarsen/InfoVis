import numpy as np

class Champ:
    def __init__(self, name, lane):
        self.name = name
        self.lane = lane
        self.gameCount = np.array([])
        self.games = 0
        self.gold_array = np.array([])
        self.averageLengthOfGame = 0

    def add_gold(self, goldArray):
        self.averageLengthOfGame += len(goldArray)
        self.games += 1
        for i in range(len(goldArray)):
            if i < len(self.gameCount):
                self.gameCount[i] += 1
            else:
                self.gameCount = np.append(self.gameCount, 1)

        if len(self.gold_array) == 0:
            self.gold_array = goldArray
        elif len(goldArray) > len(self.gold_array):
            for i in range (len(goldArray) - len(self.gold_array)):
                self.gold_array = np.append(self.gold_array, 0)
            self.gold_array = np.add(goldArray, self.gold_array)
        else:
            for i in range (len(self.gold_array) - len(goldArray)):
                goldArray = np.append(goldArray, 0)
            self.gold_array = np.add(goldArray, self.gold_array)

    def average_gold_rate(self):
        self.gold_array = np.divide(self.gold_array, self.gameCount)
        self.gold_array = np.array(self.gold_array, dtype= int)
        self.averageLengthOfGame = int(self.averageLengthOfGame / self.games)