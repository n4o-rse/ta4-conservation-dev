import pandas as pd
file = "LEIZA Restaurierungs- und Konservierungsthesaurus - First Import(2).csv"
# read file as csv
df = pd.read_csv(file, delimiter=',', encoding='utf-8')    
#delete all rows without a value in the column "prefLabel"
#df = df.dropna(subset=['prefLabel'])
#df = df.dropna(subset=['identifier'])
thesaurus = {}
#iterate over all rows
for index, row in df.iterrows():
    thesaurus[row["identifier"]] = row["parent"]
for id in thesaurus:
    parent = thesaurus[id]
    if parent != "top":
        if thesaurus[parent] == id:
            print("Error: " + id + " is parent of " + parent)
