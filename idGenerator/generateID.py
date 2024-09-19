import string
import random
import csv

def idGenerator(size=6, chars= "ABCDFG123456789"):
    return "".join(random.choice(chars) for _ in range(size))

def createNewId(checkList):
    x = idGenerator()
    hasLetters = any(c.isalpha() for c in x)
    hasNumbers = any(c.isdigit() for c in x)
    while x in checkList or not hasLetters or not hasNumbers or not x[0].isalpha():
        x = idGenerator()
        hasLetters = any(c.isalpha() for c in x)
        hasNumbers = any(c.isdigit() for c in x)
    return x

def readOldIds():
    with open("verwendeteIdentifier.csv", "r") as f:
        # read file as csv file with first column "identifier" and return as list
        oldIds = [row["identifier"] for row in csv.DictReader(f)]
    return oldIds
        
def main():
    numberOfIds = 2000
    idList = []
    checkList = []
    oldIds = readOldIds()
    for i in range(len(oldIds)):
        checkList.append(oldIds[i])
    with open("idList.csv", "w") as f:
        for i in range(numberOfIds):
            ID = createNewId(checkList)
            idList.append(ID)
            checkList.append(ID)
            f.write(ID + "\n")
main()



                
