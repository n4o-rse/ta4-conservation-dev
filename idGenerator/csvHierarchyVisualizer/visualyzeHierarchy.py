import pandas as pd

hierarchyConstructionDict = {}
with open('hierarchy.csv', 'r') as file:
    lines = file.readlines()
    # convert csv to dataframe and print it
    df = pd.read_csv('hierarchy.csv')
    print("\n")
    print(df)
    print("\n")
    for line in lines[1:]:
        line = line.strip()
        concept, parents, childs = line.split(',')
        if ";" in parents:
            parents = parents.split(';')
        else:
            parents = [parents]
        if ";" in childs:
            childs = childs.split(';')
        else:
            childs = [childs]
        hierarchyConstructionDict[concept] = {"parents": parents, "childs": childs}

print(hierarchyConstructionDict)
print("\n")

hierarchyDict = {}

# recursive function to build hierarchy
def buildHierarchy(concept, hierarchyDict, hierarchyConstructionDict):
    #print(concept)
    if hierarchyConstructionDict[concept]["childs"] == ['None']:
        return hierarchyDict
    
    else:
        hierarchyDict[concept] = {}
        for child in hierarchyConstructionDict[concept]["childs"]:
            hierarchyDict[concept][child] = buildHierarchy(child, {}, hierarchyConstructionDict)
        return hierarchyDict[concept]

for concept in hierarchyConstructionDict:
    if hierarchyConstructionDict[concept]["parents"] == ['None']:
        hierarchyDict[concept] = {}

for parent in hierarchyDict:
    #print(parent)
    hierarchyDict[parent] = buildHierarchy(parent, hierarchyDict, hierarchyConstructionDict)

print(hierarchyDict)
print("\n")

# visualize hierarchical dictionary as a tree
def visualizeHierarchy(hierarchyDict, depth):
    for key in hierarchyDict:
        print("\t"*depth + key)
        visualizeHierarchy(hierarchyDict[key], depth+1)

visualizeHierarchy(hierarchyDict, 0)
