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
        "id": "http://www.wikidata.org/entity/Q125400047",
        "parent": "http://skosplus.net/skos-light/Source",
        "type": "instance",
        "text": "Q125400047 (wde:Q125400047)",
        "data": {}
      },
      {
        "id": "http://skosplus.net/skos-light/Source",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "Source (sl:Source) [1]",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "parent": "#",
        "type": "class",
        "text": "Generic (:Generic)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/LEIZA_Conservation_Thesaurus",
        "parent": "http://skosplus.net/skos-light/Vocabulary",
        "type": "instance",
        "text": "LEIZA Restaurierungs- und Konservierungsthesaurus (:LEIZA_Conservation_Thesaurus)",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://www.w3.org/ns/adms#Asset": 1,
              "http://rdfs.org/ns/void#Dataset": 1
            },
            "http://skosplus.net/skos-light/description": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/hasSuperLabel": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Vocabulary": 1
            },
            "http://skosplus.net/skos-light/identifier": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/identifierLabel": {
              "instancecount": 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 3,
              "http://www.w3.org/2002/07/owl#Class": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Vocabulary": 1
            },
            "https://archaeolink.github.io/n4o-ta4-conservation/hasSource": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Source": 1
            }
          },
          "from": {
            "http://skosplus.net/skos-light/hasSuperLabel": {
              "instancecount": 0,
              "http://www.w3.org/2002/07/owl#Class": 2,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 2,
              "http://skosplus.net/skos-light/Label": 2
            },
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 0,
              "http://www.w3.org/2004/02/skos/core#Collection": 3
            },
            "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
              "instancecount": 0,
              "http://www.w3.org/2002/07/owl#Class": 2,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 2,
              "http://skosplus.net/skos-light/Label": 2
            }
          }
        },
        "instancecount": 11
      },
      {
        "id": "http://skosplus.net/skos-light/Vocabulary",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "Vocabulary (sl:Vocabulary) [1]",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://www.w3.org/ns/adms#Asset": 1,
              "http://rdfs.org/ns/void#Dataset": 1
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
            "http://skosplus.net/skos-light/hasSuperLabel": {
              "instancecount": 0,
              "http://www.w3.org/2002/07/owl#Class": 3,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 3,
              "http://skosplus.net/skos-light/Label": 3
            },
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 0,
              "http://www.w3.org/2004/02/skos/core#Collection": 3
            },
            "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
              "instancecount": 0,
              "http://www.w3.org/2002/07/owl#Class": 5,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 5,
              "http://skosplus.net/skos-light/Label": 5
            }
          }
        },
        "instancecount": 6
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/cpT73gbyUgA22vohdo4rUa",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/LEIZA_Conservation_Thesaurus",
        "type": "instance",
        "text": "[Restaurierungs-/ Konservierungsplanung] (:cpT73gbyUgA22vohdo4rUa)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/dYxXkaqsnBqVYA1THAxjgE",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/LEIZA_Conservation_Thesaurus",
        "type": "instance",
        "text": "Eingriff (:dYxXkaqsnBqVYA1THAxjgE)",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://www.w3.org/ns/adms#Asset": 1,
              "http://rdfs.org/ns/void#Dataset": 1
            },
            "http://skosplus.net/skos-light/hasSuperLabel": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "http://skosplus.net/skos-light/identifier": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/identifierLabel": {
              "instancecount": 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 3,
              "http://www.w3.org/2002/07/owl#Class": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "http://www.w3.org/2004/02/skos/core#closeMatch": {
              "instancecount": 1
            }
          },
          "from": {
            "http://skosplus.net/skos-light/hasSubLabel": {
              "instancecount": 0,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 0,
              "http://www.w3.org/2004/02/skos/core#Collection": 3
            }
          }
        },
        "instancecount": 10
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/eq7GtLWHJesucfazgADPZE",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/LEIZA_Conservation_Thesaurus",
        "type": "instance",
        "text": "Zustandserfassung (:eq7GtLWHJesucfazgADPZE)",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://www.w3.org/ns/adms#Asset": 1,
              "http://rdfs.org/ns/void#Dataset": 1
            },
            "http://skosplus.net/skos-light/description": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/hasSuperLabel": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "http://skosplus.net/skos-light/identifier": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/identifierLabel": {
              "instancecount": 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 3,
              "http://www.w3.org/2002/07/owl#Class": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "https://archaeolink.github.io/n4o-ta4-conservation/hasSource": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Source": 1
            }
          },
          "from": {
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 0,
              "http://www.w3.org/2004/02/skos/core#Collection": 3
            }
          }
        },
        "instancecount": 11
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/fBAv2FHRc3aDVk9ve1JThd",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/59RpvNLTucB9wVbWVHTRur",
        "type": "instance",
        "text": "Umgebungskontrolle (:fBAv2FHRc3aDVk9ve1JThd)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/ievmu1QUgrpeYSiU1DeYfm",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/59RpvNLTucB9wVbWVHTRur",
        "type": "instance",
        "text": "Sammlungspflege (:ievmu1QUgrpeYSiU1DeYfm)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/qfYhqzHDc8FTxu1A6T6ycW",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/eq7GtLWHJesucfazgADPZE",
        "type": "instance",
        "text": "[Diagnose] (:qfYhqzHDc8FTxu1A6T6ycW)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/sSygVCh1KaCSrkS5Ku3Aak",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/8kKtpbqpnY2T2k7EixxdoP",
        "type": "instance",
        "text": "Organik (:sSygVCh1KaCSrkS5Ku3Aak)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/stStRVHTWT8PXV2Lj19GGL",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/eq7GtLWHJesucfazgADPZE",
        "type": "instance",
        "text": "[Objektuntersuchung] (:stStRVHTWT8PXV2Lj19GGL)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/tmjVdStfYu6PQuQeq7Sua7",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/dYxXkaqsnBqVYA1THAxjgE",
        "type": "instance",
        "text": "Methode und Technik (:tmjVdStfYu6PQuQeq7Sua7)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/wF7jn2tBfcnE3drqjzwi8D",
        "parent": "http://skosplus.net/skos-light/Label",
        "type": "instance",
        "text": "stabilisierende Konservierung (:wF7jn2tBfcnE3drqjzwi8D)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/wsbDppTfr2BSxsmhSuEbG4",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/dYxXkaqsnBqVYA1THAxjgE",
        "type": "instance",
        "text": "Material (:wsbDppTfr2BSxsmhSuEbG4)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/1eo1EwnxCPF6yukEJo1Wdq",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/8kKtpbqpnY2T2k7EixxdoP",
        "type": "instance",
        "text": "Silikat (:1eo1EwnxCPF6yukEJo1Wdq)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/2dmdnWjmWJURKh9PLaJuH1",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/8kKtpbqpnY2T2k7EixxdoP",
        "type": "instance",
        "text": "Metall (:2dmdnWjmWJURKh9PLaJuH1)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/3EE7pLjByXiT4nHWxyqKuB",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/dYxXkaqsnBqVYA1THAxjgE",
        "type": "instance",
        "text": "Werkzeug (:3EE7pLjByXiT4nHWxyqKuB)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/59RpvNLTucB9wVbWVHTRur",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/LEIZA_Conservation_Thesaurus",
        "type": "instance",
        "text": "pr\u00e4ventive Konservierung (:59RpvNLTucB9wVbWVHTRur)",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://www.w3.org/ns/adms#Asset": 1,
              "http://rdfs.org/ns/void#Dataset": 1
            },
            "http://skosplus.net/skos-light/description": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/hasSuperLabel": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "http://skosplus.net/skos-light/identifier": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/identifierLabel": {
              "instancecount": 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 3,
              "http://www.w3.org/2002/07/owl#Class": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "https://archaeolink.github.io/n4o-ta4-conservation/hasSource": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Source": 1
            }
          },
          "from": {
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 0,
              "http://www.w3.org/2004/02/skos/core#Collection": 3
            }
          }
        },
        "instancecount": 11
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/6jF9fBDq7W2tyRHLj554AT",
        "parent": "http://skosplus.net/skos-light/Label",
        "type": "instance",
        "text": "Restaurierung (:6jF9fBDq7W2tyRHLj554AT)",
        "data": {}
      },
      {
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/8kKtpbqpnY2T2k7EixxdoP",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/LEIZA_Conservation_Thesaurus",
        "type": "instance",
        "text": "[Objekt-Werkstoff] (:8kKtpbqpnY2T2k7EixxdoP)",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://www.w3.org/ns/adms#Asset": 1,
              "http://rdfs.org/ns/void#Dataset": 1
            },
            "http://skosplus.net/skos-light/alternativeLabel": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/description": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/hasSuperLabel": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "http://skosplus.net/skos-light/identifier": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/identifierLabel": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/translation": {
              "instancecount": 2
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 3,
              "http://www.w3.org/2002/07/owl#Class": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "http://www.w3.org/2004/02/skos/core#closeMatch": {
              "instancecount": 1
            }
          },
          "from": {
            "http://skosplus.net/skos-light/hasSubLabel": {
              "instancecount": 0,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Label": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 0,
              "http://www.w3.org/2004/02/skos/core#Collection": 3
            }
          }
        },
        "instancecount": 14
      },
      {
        "id": "http://skosplus.net/skos-light/Label",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "Label (sl:Label) [2]",
        "data": {
          "to": {
            "http://rdfs.org/ns/void#inDataset": {
              "instancecount": 1,
              "http://www.w3.org/ns/adms#Asset": 1,
              "http://rdfs.org/ns/void#Dataset": 1
            },
            "http://skosplus.net/skos-light/description": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/identifier": {
              "instancecount": 1
            },
            "http://skosplus.net/skos-light/identifierLabel": {
              "instancecount": 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 2,
              "http://www.w3.org/2002/07/owl#Class": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 1
            },
            "https://archaeolink.github.io/n4o-ta4-conservation/hasSource": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Source": 1
            }
          },
          "from": {
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 0,
              "http://www.w3.org/2004/02/skos/core#Collection": 2
            }
          }
        },
        "instancecount": 8
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
        "id": "https://archaeolink.github.io/n4o-ta4-conservation/Label_collection",
        "parent": "http://www.w3.org/2004/02/skos/core#Collection",
        "type": "instance",
        "text": "Label Instances Collection (:Label_collection)",
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
              "http://www.w3.org/ns/adms#Asset": 1,
              "http://rdfs.org/ns/void#Dataset": 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#label": {
              "instancecount": 1
            },
            "http://www.w3.org/2000/01/rdf-schema#member": {
              "instancecount": 1,
              "http://www.w3.org/2002/07/owl#Class": 1,
              "http://www.w3.org/2002/07/owl#NamedIndividual": 1,
              "http://skosplus.net/skos-light/Vocabulary": 1
            }
          },
          "from": {}
        },
        "instancecount": 5
      },
      {
        "id": "http://skosplus.net/skos-light/Actor",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "Actor (sl:Actor)",
        "data": {}
      },
      {
        "id": "http://skosplus.net/skos-light/StructualConcept",
        "parent": "https://archaeolink.github.io/n4o-ta4-conservation/Generic",
        "type": "class",
        "text": "StructualConcept (sl:StructualConcept)",
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