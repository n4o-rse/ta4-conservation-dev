import string
import random
import csv

def idGenerator(size=6, chars= "ABCDEF123456789"):
    return "".join(random.choice(chars) for _ in range(size))

def createNewId(checkList):
    x = idGenerator()
    while x in checkList:
        print("combination already in use...")
        x = idGenerator()
    return x
        

#print(idGenerator())

numberOfIds = 2000
idList = []
checkList = []

with open("idList.csv", "w") as f:
    for i in range(numberOfIds):
        ID = createNewId(checkList)
        idList.append(ID)
        checkList.append(ID)
        f.write(ID + "\n")

                
