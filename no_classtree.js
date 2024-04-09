var tree={
  "plugins": [
    "defaults",
    "search",
    "sort",
    "state",
    "types",
    "contextmenu"
  ],
  "search": {
    "show_only_matches": true
  },
  "types": {
    "class": {
      "icon": "https://cdn.jsdelivr.net/gh/i3mainz/geopubby@master/public/icons/class.png"
    },
    "geoclass": {
      "icon": "https://cdn.jsdelivr.net/gh/i3mainz/geopubby@master/public/icons/geoclass.png"
    },
    "halfgeoclass": {
      "icon": "https://cdn.jsdelivr.net/gh/i3mainz/geopubby@master/public/icons/halfgeoclass.png"
    },
    "collectionclass": {
      "icon": "https://cdn.jsdelivr.net/gh/i3mainz/geopubby@master/public/icons/collectionclass.png"
    },
    "geocollection": {
      "icon": "https://cdn.jsdelivr.net/gh/i3mainz/geopubby@master/public/icons/geometrycollection.png"
    },
    "featurecollection": {
      "icon": "https://cdn.jsdelivr.net/gh/i3mainz/geopubby@master/public/icons/featurecollection.png"
    },
    "instance": {
      "icon": "https://cdn.jsdelivr.net/gh/i3mainz/geopubby@master/public/icons/instance.png"
    },
    "geoinstance": {
      "icon": "https://cdn.jsdelivr.net/gh/i3mainz/geopubby@master/public/icons/geoinstance.png"
    }
  },
  "core": {
    "themes": {
      "responsive": true
    },
    "check_callback": true,
    "data": [
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/LEIZA_Conservation_Thesaurus",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Vocabulary",
        "type": "instance",
        "text": "LEIZA Restaurierungs- und Konserverungsthesaurus (:LEIZA_Conservation_Thesaurus)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Vocabulary",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "Vocabulary (:Vocabulary) [1]",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://rdfs.org/ns/void#Dataset": 1,
              "http://www.w3.org/ns/adms#Asset": 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 3,
              "http://www.w3.org/2002/07/owl#Class": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#comment": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 1
            }
          },
          "from": {
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 0,
              "http://www.w3.org/2004/02/skos/core#Collection": 3
            }
          }
        },
        "instancecount": 6
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "parent": "#",
        "type": "class",
        "text": "Generic (:Generic)",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://rdfs.org/ns/void#Dataset": 1,
              "http://www.w3.org/ns/adms#Asset": 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 2
            },
            "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1
            }
          },
          "from": {
            "http://rdfs.org/ns/void#class": {
              "instancecount": 0,
              "http://rdfs.org/ns/void#Dataset": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 0,
              "http://www.w3.org/2004/02/skos/core#Collection": 1
            }
          }
        },
        "instancecount": 5
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Ontology_collection",
        "parent": "http://www.w3.org/2004/02/skos/core#Collection",
        "type": "instance",
        "text": "Ontology Instances Collection (:Ontology_collection)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/AnnotationProperty_collection",
        "parent": "http://www.w3.org/2004/02/skos/core#Collection",
        "type": "instance",
        "text": "AnnotationProperty Instances Collection (:AnnotationProperty_collection)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Datatype_collection",
        "parent": "http://www.w3.org/2004/02/skos/core#Collection",
        "type": "instance",
        "text": "Datatype Instances Collection (:Datatype_collection)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Class_collection",
        "parent": "http://www.w3.org/2004/02/skos/core#Collection",
        "type": "instance",
        "text": "Class Instances Collection (:Class_collection)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/NamedIndividual_collection",
        "parent": "http://www.w3.org/2004/02/skos/core#Collection",
        "type": "instance",
        "text": "NamedIndividual Instances Collection (:NamedIndividual_collection)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Vocabulary_collection",
        "parent": "http://www.w3.org/2004/02/skos/core#Collection",
        "type": "instance",
        "text": "Vocabulary Instances Collection (:Vocabulary_collection)",
        "data": {}
      },
      {
        "id": "http://www.w3.org/2004/02/skos/core#Collection",
        "parent": "#",
        "type": "collectionclass",
        "text": "Collection (skos:Collection) [6]",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://rdfs.org/ns/void#Dataset": 1,
              "http://www.w3.org/ns/adms#Asset": 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Ontology": 1
            }
          },
          "from": {}
        },
        "instancecount": 5
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Actor",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "Actor (:Actor)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Label",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "Label (:Label)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Source",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "Source (:Source)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/StructualConcept",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "StructualConcept (:StructualConcept)",
        "data": {}
      }
    ]
  },
  "@context": {
    "@version": 1.1,
    "foaf": "http://xmlns.com/foaf/0.1/",
    "ct": "http://purl.org/vocab/classtree#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "icon": "foaf:image",
    "id": "@id",
    "parent": "rdfs:subClassOf",
    "halfgeoclass": "ct:HalfGeoClass",
    "geoclass": {
      "@type": "ct:icontype",
      "@id": "ct:GeoClass"
    },
    "collectionclass": {
      "@type": "ct:icontype",
      "@id": "ct:CollectionClass"
    },
    "featurecollectionclass": {
      "@type": "ct:icontype",
      "@id": "ct:FeatureCollectionClass"
    },
    "class": "owl:Class",
    "instance": "owl:NamedIndividual",
    "geoinstance": {
      "@type": "ct:Icontype",
      "@id": "ct:GeoNamedIndividual"
    },
    "text": "rdfs:label",
    "type": "ct:icontype",
    "types": "ct:icontypes",
    "core": {
      "@type": "ct:TreeConfig",
      "@id": "@nest"
    },
    "data": {
      "@id": "ct:treeitem",
      "@type": "ct:TreeItem"
    }
  }
}