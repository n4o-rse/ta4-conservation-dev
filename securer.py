import requests
from rdflib import Graph, Literal, BNode, Namespace, URIRef
from rdflib.namespace import SKOS, RDF, DC, DCTERMS, RDFS

# get the ttl file from the solid pod
ttlText = requests.get('https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl').text

# check if the ttl file has changed
with open('comments.ttl', 'r') as f:
    fileText = f.read()

if fileText != ttlText:
    with open('comments.ttl', 'w') as f:
        f.write(ttlText)

# check annotations for multiple entries
OA = Namespace("http://www.w3.org/ns/oa#")
creator = DCTERMS.creator
created = DCTERMS.created
target = OA.hasTarget

# load ttlTest into a graph
g = Graph()
g.parse(data=ttlText, format='ttl')
# load all annotations from the graph into list
annotations = []

# find all subjects in the graph which are of type oa:Annotation and check them for multiple entries
for s, p, o in g.triples((None, RDF.type, OA.Annotation)):
    annotations.append(s)
for annotation in annotations:
    # get the target of the annotation
    annotationTarget = list(g.objects(annotation, target))
    # get the creator of the annotation
    annotationCreator = list(g.objects(annotation, creator))
    # get the created date of the annotation
    annotationCreated = list(g.objects(annotation, created))
    if len(annotationTarget) > 1 or len(annotationCreator) > 1 or len(annotationCreated) > 1:
        # if there are multiple entries, cancel workflow of github action
        print('Multiple entries found in annotation with subject: ' + str(annotation))
        exit(1)
    else:
        print('No multiple entries found in annotation with subject: ' + str(annotation))
        exit(0)

