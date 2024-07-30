    function parseJsonld(file) {
        let data = {nodes: [], links: []};
        let jsonld = JSON.parse(file);
        for (let object of jsonld) {
            let node = {};
            if (object["@type"] == "http://www.w3.org/2002/07/owl#Class") {
                node = {};
                node.id = stripOwlPrefix(object["@id"]);
                node.group = 1;
                if (object.hasOwnProperty("http://www.w3.org/2000/01/rdf-schema#subClassOf")) {
                    for (let target of object["http://www.w3.org/2000/01/rdf-schema#subClassOf"]) {
                        let link = {}
                        link.source = node.id;
                        link.target = stripOwlPrefix(target["@id"]);
                        link.value = 1;
                        link.name = "subClassOf"
                        data.links.push(link);
                    }
                }
                data.nodes.push(node);
            }
            
            if (object["@type"] == "http://www.w3.org/2002/07/owl#ObjectProperty") {
                /*
                node = {};
                node.id = stripOwlPrefix(object["@id"]);
                node.group = 2;
                let domainId
                let rangeId
                let link = {};
                for (let domain of object["http://www.w3.org/2000/01/rdf-schema#domain"]) {
                    link = {}
                    domainId = stripOwlPrefix(domain["@id"]);
                    link.source = domainId;
                    link.target = node.id;
                    link.value = 1;
                    //link.name = node.id;
                    data.links.push(link);
                }
                for (let range of object["http://www.w3.org/2000/01/rdf-schema#range"]) {
                    link = {}
                    rangeId = stripOwlPrefix(range["@id"]);
                    link.source = node.id;
                    link.target = rangeId;
                    link.value = 1;
                    //link.name = node.id;
                    data.links.push(link);
                }
                data.nodes.push(node);
            }
            */
                node = {};
                node.id = stripOwlPrefix(object["@id"]);
                let domainId
                let rangeId
                let link;
                for (let domain of object["http://www.w3.org/2000/01/rdf-schema#domain"]) {
                    domainId = stripOwlPrefix(domain["@id"]);
                    for (let range of object["http://www.w3.org/2000/01/rdf-schema#range"]) {
                        link = {}
                        rangeId = stripOwlPrefix(range["@id"]);
                        link.source = domainId;
                        link.target = rangeId;
                        link.value = 1;
                        link.name = node.id;
                        data.links.push(link);
                    }
                }
            }
        }
        data.nodes.push({id: "Thing", group: 1});
        let input = document.getElementById('input');
        let result = document.getElementById('chart');
        result.innerHTML = '';
        result.appendChild(generateGraphWithLabels(data));
        //let output = document.getElementById("output");
        //output.innerHTML=JSON.stringify(data);

        /*
        for (let node of data.nodes) {
            output.innerHTML+=JSON.stringify(node)
            output.innerHTML+="<br><br>"
        }
        */
        
        /*
        for (let link of data.links) {
            output.innerHTML+=JSON.stringify(link)
            output.innerHTML+="<br><br>"
        }
        */
    }
    function stripOwlPrefix(string) {
        try {
        return string.split("#")[1];
        }
        catch (e) {
            return string;
        }
    }

    function readExampleOntology() {
        const jsonData = `
        [
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#technologischeAuswertung",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#stelltFest",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objektuntersuchung"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Zustand"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#wirdFestgestelltDurch"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#wirdVerwendet",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Werkzeug"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Materialanalyse"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#verwendet"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Objekt",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl",
    "@type": [
      "http://www.w3.org/2002/07/owl#Ontology"
    ],
    "http://www.w3.org/2000/01/rdf-schema#comment": [
      {
        "@value": "Konservierungs- und Restaurierungsontologie des LEIZA"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Werkzeug",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#manuellesWerkzeug",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Werkzeug"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Zustand",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#wirdGebrauchtFür",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Werkzeug"
      },
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Material"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#praktischeMaßnahme"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#gebraucht"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Herstellungstechnik",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#zeigtSichDurch",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Zustand"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Schadensphänomen"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Schadensphänomen",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#gibtAuskunftÜber",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Herstellungstechnik"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objekt"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#wurdeHergestelltDurch"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#RestauratorIn",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#wirdFestgestelltDurch",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Zustand"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objektuntersuchung"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#stelltFest"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#technischesGerät",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Werkzeug"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#führtDurch",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#RestauratorIn"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objektuntersuchung"
      },
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#technologischeAuswertung"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#wirdDurchgeführtVon"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#hatUrsache",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Schadensphänomen"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Schadensursache"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#wirdBearbeitetVon",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#RestauratorIn"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objekt"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#bearbeitet"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#praktischeMaßnahme",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#bedingt",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Zustand"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Restaurierungskonzept"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#beziehtSichAuf"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Material",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#führtZu",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objektuntersuchung"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Ergebnis"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#entstehtAus"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#bearbeitet",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objekt"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#RestauratorIn"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#wirdBearbeitetVon"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Objektuntersuchung",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#zeigenAn",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Schadensphänomen"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Zustand"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#bestehtAus",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objekt"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Material"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#gebraucht",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#praktischeMaßnahme"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Werkzeug"
      },
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Material"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#wirdGebrauchtFür"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#hat",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Materialanalyse"
      },
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#praktischeMaßnahme"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Methode"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#entstehtAus",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Ergebnis"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objektuntersuchung"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#führtZu"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#erstellt",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#RestauratorIn"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Restaurierungskonzept"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#wirdErstelltVon"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#wirdErstelltVon",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Restaurierungskonzept"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#RestauratorIn"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#erstellt"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#gibtAn",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Ergebnis"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Material"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#benutzt",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#RestauratorIn"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Werkzeug"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Restaurierungskonzept",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#wurdeHergestelltDurch",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objekt"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Herstellungstechnik"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#gibtAuskunftÜber"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Methode",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Materialanalyse",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objektuntersuchung"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Ergebnis",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#Schadensursache",
    "@type": [
      "http://www.w3.org/2002/07/owl#Class"
    ],
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
      {
        "@id": "http://www.w3.org/2002/07/owl#Thing"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#verwendet",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Materialanalyse"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Werkzeug"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#wirdVerwendet"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#beziehtSichAuf",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Restaurierungskonzept"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Zustand"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#bedingt"
      }
    ]
    },
    {
    "@id": "http://www.conservationontology.com/conservationontology.owl#wirdDurchgeführtVon",
    "@type": [
      "http://www.w3.org/2002/07/owl#ObjectProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#domain": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#Objektuntersuchung"
      },
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#technologischeAuswertung"
      }
    ],
    "http://www.w3.org/2000/01/rdf-schema#range": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#RestauratorIn"
      }
    ],
    "http://www.w3.org/2002/07/owl#inverseOf": [
      {
        "@id": "http://www.conservationontology.com/conservationontology.owl#führtDurch"
      }
    ]
    }
    ]
        `;
        parseJsonld(jsonData)
    }