import rdflib
from rdflib import Graph, URIRef, Literal
from rdflib.namespace import SKOS, RDFS, DC, RDF, DCTERMS

# declare namespace for annotation ontology 
AO = rdflib.Namespace("http://www.w3.org/ns/oa#")

# load "annotationScheme.ttl" into the triplestore
with open("annotationScheme.ttl", "r") as f:
    annotationScheme = f.read()
g = rdflib.Graph()

schemeURI = "https://www.restaurierungsvokabular.solidweb.org/annotations/ConceptSchemes/ConceptScheme1"
conceptURI = "https://www.restaurierungsvokabular.solidweb.org/annotations/ConceptSchemes/ConceptScheme1/Concepts/"
annotationURI = "https://www.restaurierungsvokabular.solidweb.org/annotations/ConceptSchemes/ConceptScheme1/Annotations/"

# parse the annotationScheme into the triplestore
g.parse(data=annotationScheme, format="turtle")
# remove all concepts from the triplestore that are not target of an annotation
for concept in g.subjects(RDF.type, SKOS.Concept):
    if not g.value(None, AO.hasTarget, concept):
        g.remove((concept, None, None))
        g.remove((None, None, concept))

# create new triplestore h
h = rdflib.Graph()

#add conceptSchemes uri1 to the new triplestore
h.add((URIRef(schemeURI), RDF.type, SKOS.ConceptScheme))
# add title "LEIZA Restaurierungs- und Konservierungsthesaurus" to the new triplestore
h.add((URIRef(schemeURI), DCTERMS.title, Literal("LEIZA Restaurierungs- und Konservierungsthesaurus")))

#iterate over all concepts in the triplestore
for concept in g.subjects(RDF.type, SKOS.Concept):
    id = concept.split("/concept")[-1]
    # add concept to the new triplestore as a skos:Concept as uri+id
    h.add((URIRef(conceptURI+id), RDF.type, SKOS.Concept))
    # add property skos:inScheme to the concept
    h.add((URIRef(conceptURI+id), SKOS.inScheme, URIRef(schemeURI)))

# iterate over all annotations in the triplestore
for annotation in g.subjects(RDF.type, AO.Annotation):
    id = annotation.split("/")[-1]
    # add annotation to the new triplestore as a oa:Annotation as uri+id
    h.add((URIRef(annotationURI+id), RDF.type, AO.Annotation))
    # read properties dct:creator, dct:created, oa:hasBody, oa:hasTarget from the annotation
    creator = g.value(annotation, DCTERMS.creator)
    created = g.value(annotation, DCTERMS.created)
    body = g.value(annotation, AO.bodyValue)
    target = conceptURI+g.value(annotation, AO.hasTarget).split("concept")[-1]
    # add properties dct:creator, dct:created, oa:hasBody, oa:hasTarget to the annotation
    h.add((URIRef(annotationURI+id), DCTERMS.creator, creator))
    h.add((URIRef(annotationURI+id), DCTERMS.created, created))
    h.add((URIRef(annotationURI+id), AO.bodyValue, body))
    h.add((URIRef(annotationURI+id), AO.hasTarget, URIRef(target)))
    h.add((URIRef(annotationURI+id), SKOS.inScheme, URIRef(schemeURI)))

# serialize the new triplestore
h.serialize(destination="annotationConceptScheme.ttl", format="turtle")


