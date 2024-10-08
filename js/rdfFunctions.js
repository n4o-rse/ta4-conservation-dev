async function openDetails(id, idObject) {
    mappingTable = {
      "K6":	"DIN EN 16484 -	Leder - Anforderungen an die Bestimmung der Herkunft von Leder; Deutsche Fassung EN 16484",
      "K7":	"KUR Database -	Onlinedatenbank für die fachgerechte Verfahrung zur Massenversorgung archäologischer Eisen- und Feuchtholzfunde",
      "K8":	"DIN EN 15898	Erhaltung des kulturellen Erbes - Allgemeine Begriffe",
      "K9":	"DIN CEN/TS 17135	- Erhaltung des kulturellen Erbes - Allgemeine Begriffe zur Beschreibung von Veränderungen an Objekten; Dreisprachige Fassung",
      "K10":	"DIN EN ISO 8044 - Korrosion von Metallen und Legierungen - Grundbegriffe; Dreisprachige Fassung",
      "K12":	"DIN EN ISO 7539-1 - Korrosion der Metalle und Legierungen - Prüfung der Spannungsrisskorrosion - Teil 1: Allgemeiner Leitfaden für Prüfverfahren",
      "K14":	"Katharina Schmidt-Ott, Erhaltung von Kulturgütern. Das Plasma in der Metallkonservierung - Möglichkeiten und Grenzen. Collectio archaeologica 7 (Zürich 2010).",
      "K15":	"DIN EN 844 -	Rund- und Schnittholz - Terminologie; Dreisprachige Fassung EN 844:2019",
      "K16":	"DIN EN 16141 -	Erhaltung des kulturellen Erbes - Richtlinien für den Umgang mit Umwelt- und Umgebungsbedingungen - Schaudepots: Definition und Merkmale von Sammlungszentren bestimmt für die Bewahrung und Pflege des kulturellen Erbes",
      "K17":	"R. Dietrich/ B. Skinner, Die Gesteine und ihre Mineralien. Ein Einführungs- und Bestimmungsbuch2 (Thun 1995).",
      "K18":	"Mineralienatlas - Fossilienatlas	- Onlinedatenbank/Lexikon zu Gesteinen, Mineralien und Fossilien",
      "K19":	'Heinrich Fendel, Mechanische Bearbeitung von Korrosionsprodukten. In: Peter Heinrich (Hrsg.), Metallrestaurierung. Beiträge zur Analyse, Konzeption und Technologie. München 2000, S106 - 125',
      "K20":	"Wilhelm P. Bauer, Grundzüge der Metallkorrosion. In: Peter Heinrich (Hrsg.), Metallrestaurierung. Beiträge zur Analyse, Konzeption und Technologie. München 2000, 63-67.",
      "K21":	"Wolfgang Knobloch, Ergänzungen und Rekonstruktionen an historischen Objekten aus Metall. In: In: Peter Heinrich (Hrsg.), Metallrestaurierung. Beiträge zur Analyse, Konzeption und Technologie. München 2000, S. 70 - 105.",
      "K22":	"Erhard Brepohl, Theorie und Praxis des Goldschmieds (München 2000).",
      "K23":	"DIN EN ISO 2080 - Metallische und andere anorganische Überzüge - Oberflächenbehandlung, metallische und andere anorganische Überzüge - Wörterbuch (ISO 2080:2022); Deutsche und Englische Fassung EN ISO 2080:2022",
      "K24":	"Jochem Wolters, Der Gold- und Silberschmied. Band 1 - Werkstoffe und Materialien (Stuttgart 1989)",
      "K25": "Mindat.org - Online-Datenbank des Hudson Institute of Mineralogy über Mineralien und Gesteine",
      "K26": "Barbara Stuart, Analytical Techniques in Materials Conservation (West Sussex 2007).",
      "K27": "Joel R. Fried, Polymer Science and Technology (New Jersey 2014)3.",
      "K28": "Der Brockhaus von A-Z: In drei Bänden (Mannheim 2002).",
      "K29": "Barbara Stuart, Infrared Spectroscopy: Fundamentals and Applications (Chichester 2004). ",
      "K30": "William D. Callister, David G. Rethwisch, Materials Science and Engineering. An Introduction (New Jersey 2018)10.",
      "K31": "Janey Cronyn, The Elements of Archaeological Conservation (London 1990).",
      "K32": "Marcel Locquin, Maurice Langeron, Handbook of Microscopy (London 1983).",
      "K33": "Franz Mairinger, UV-, IR- and X-ray imaging. In: S Jannsens, R. van Grieken (Hrsg.), Non-Destructive Microanalysis of Cultural Heritage Materials, Amsterdam 2004, 15-75.",
      "K34": "Velson Horie, Materials for Conservation. Organic consolidants, adhesives and coatings (London 2010)2.",
      "K35": "GESTIS-Stoffdatenbank - online Gefahrstoffinformationssystem der Deutschen Gesetzlichen Unfallversicherung",
      "K36": "Charles E. Mortimer, Ulrich Müller, Chemie. Das Basiswissen der Chemie (Stuttgart 2007)9.",
      "K37": "Gerhard Banik, Gabriela Krist, Lösungsmittel in der Restaurierung. Restaurierung - Konservierung - Technologie 1, Wien 2003.",
      "K38": "DIN EN 923 - Klebstoffe - Benennungen und Definitionen; Deutsche Fassung EN 923:2015",
      "K39": "Frédérique-Sophie Tissier, Sabine Brechbühl Trijasse, Röntgenaufnahmen, Computertomografie und Neutronenuntersuchung.Bildgebende Verfahren im Dienst der Archäologie und der Konservierung-Restaurierung. Archäologie Bern 2014, 236 - 246.",
      "Q7":	"Kristina Fella",
      "Q8":	"LEIZA KB Restaurierung/Konservierung",
      "Q16":	"Markus Wittköpper",
      "Q17":	"Waldemar Muskalla",
      "Q18":	"Roland Schwab",
    }
    let modal = document.getElementById("myModal");

    // clean modal content from previous concept
    let modalBody = document.getElementsByClassName("modal-body")[0];
    while (modalBody.firstChild) {
      modalBody.removeChild(modalBody.firstChild);
    }

    // generate concept information for modal
    let body = document.getElementsByClassName("modal-body")
    let header = document.getElementById("header-head")
    header.innerHTML = idObject[id]["prefLabel"];
    idObject[id]["identifier"] = id.toString();

    const details = ["identifier","description", "altLabel", "related", "source", "creator", "closeMatch", "relatedMatch", "seeAlso", "example"];
    let mappingDetails = ["source", "creator", "related"];

    // iterate over all detail contents and create a paragraph for each
    for (let i = 0; i < details.length; i++) {

      //check if detail has a value at all
      if (!(idObject[id][details[i]].trim()) == "") {
        let detailDiv = document.createElement("div");

        let splittedDetails = idObject[id][details[i]].split("|");
        let mappedDetails

        // check if detail belongs to properties with values to be converted, either by mapping or by generating prefLabel from identifier
        if (mappingDetails.includes(details[i])) {

          // case for related, to generate prefLabel from identifier
          if (details[i] == "related") {
            mappedDetails = []
            for (let j = 0; j < splittedDetails.length; j++) {
              mappedDetails.push(idObject[splittedDetails[j]]["prefLabel"]);
            }
          } 

          // case for source and creator, to generate mapped values
          else {
            mappedDetails = []
            for (let j = 0; j < splittedDetails.length; j++) {
              if (splittedDetails[j].trim() in mappingTable) {
                mappedDetails.push(mappingTable[splittedDetails[j].trim()]);
              } 
              else {
                mappedDetails.push(splittedDetails[j]);
              }
            }
          }
        }

        // case for all other properties, where splitted strings don't have to be converted
        else {
          mappedDetails = splittedDetails;
        }

        // generate HTML element for each detail
        // case for properties with multiple values
        if (mappedDetails.length > 1) {
          detailDiv.innerHTML += "<b>" + details[i] + ":</b>";
          for (let j = 0; j < mappedDetails.length; j++) {
            detailDiv.innerHTML += "<p>" +"<b>" + "</b> " + mappedDetails[j] + "</p>";
          }
        }

        // case for properties with single values
        else {
          detailDiv.innerHTML = "<p>" +"<b>" + details[i] + ":</b> " + mappedDetails[0] + "</p>";
        }
        body[0].appendChild(detailDiv);
      }
    } 
    // storing id of current concept and idObject comment-button data-properties, to feed updataPod function with parameters
    let commentButton = document.getElementById("commentButton")
    commentButton.dataset.id = id.toString();
    commentButton.dataset.idObject = JSON.stringify(idObject);

    /* alternative way to call updatePod with parameters
    // generates an event listener for every concept id clicked, would need listener removal after each comment to work...
    const commentForm = document.getElementById("commentForm");
    commentForm.addEventListener("submit", function() { // anonymous function to call updatePod with parameters
      event.preventDefault();
      updatePod(id.toString(), idObject);
    });
    */

    await readComments(id, idObject);
    modal.style.display = "block";
}

async function readComments(id, idObject) {
  try {
    // clean modal content from previous comments
    var commentDiv = document.getElementsByClassName("modal-comments")[0];
    while (commentDiv.firstChild) {
      commentDiv.removeChild(commentDiv.firstChild);
    }
    var historyDiv = document.getElementsByClassName("modal-history")[0];
    while (historyDiv.firstChild) {
      historyDiv.removeChild(historyDiv.firstChild);
    }
    // generate existing comments for this concept from solid pod
    const url = "https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl";
    let commentRdf = await readFromPod(url)
    // parse ttl into store
    let store = $rdf.graph()
    $rdf.parse(commentRdf, store, url, 'text/turtle')
    // serialize store into json-ld
    let jsonldSerialization = $rdf.serialize(null, store, url, 'application/ld+json');
    // parse json-ld into object
    let parsedJson = JSON.parse(jsonldSerialization)
    let commentObject = {comments: {}, concepts: {}}
    let jsonCommentArray = parsedJson["@graph"].filter(obj => obj["@type"] == "o:Annotation")
    let jsonConceptArray = parsedJson["@graph"].filter(obj => obj["@type"] == "skos:Concept")
    for (let x of jsonCommentArray) {
      commentObjectID = x["@id"].split("n0:")[1]
      commentObject["comments"][commentObjectID] = {}
      commentObject["comments"][commentObjectID]["creator"] = x["dct:creator"]
      commentObject["comments"][commentObjectID]["created"] = x["dct:created"]
      commentObject["comments"][commentObjectID]["value"] = x["o:bodyValue"]
      commentObject["comments"][commentObjectID]["target"] = x["o:hasTarget"]["@id"].split("n0:concept")[1]
    }
    for (let x of jsonConceptArray) {
      conceptObjectID = x["@id"].split("n0:concept")[1]
      commentObject["concepts"][conceptObjectID] = {}
      if (idObject[conceptObjectID]["prefLabel"] == undefined) {
        commentObject["concepts"][conceptObjectID]["prefLabel"] = "gelöschter Begriff"
      } else {
      commentObject["concepts"][conceptObjectID]["prefLabel"] = idObject[conceptObjectID]["prefLabel"]
      }
    }
    let updatedCommentArray = Object.keys(commentObject["comments"])
    let sortedUpdatedCommentArray
    sortedUpdatedCommentArray = updatedCommentArray.sort((a, b) => new Date(commentObject["comments"][b]["created"]) - new Date(commentObject["comments"][a]["created"]))

    // generate a paragraph for each comment, containing target, creator, created in historyDiv
    for (let i = 0; i < sortedUpdatedCommentArray.length; i++) {
      let comment = document.createElement("p");
      let commentTargetID = commentObject["comments"][sortedUpdatedCommentArray[i]]["target"]
      let commentTargetLabel = idObject[commentTargetID]["prefLabel"]
      let commentCreator = commentObject["comments"][sortedUpdatedCommentArray[i]]["creator"]
      let commentCreated = commentObject["comments"][sortedUpdatedCommentArray[i]]["created"]
      commentCreated = commentCreated.split(".")[0].replace("T", " ")
      comment.innerHTML = commentCreator + " kommentierte " + "<b>" + commentTargetLabel + "</b>" + " um " + commentCreated;
      // if not commentTargetLabel "gelöschter Begriff", add event listener to openDetails
      if (commentTargetLabel != "gelöschter Begriff") {
        comment.onclick = function() {openDetails(commentTargetID, idObject)};
      }
      comment.className = "commentHistoryParagraph";
      historyDiv.appendChild(comment);
    }

    // delete all elements from sortedUpdatedCommentArray, where property target in commentObject["comments"]["target"] is not id
    let prunedCommentArray = []
    for (let i = 0; i < sortedUpdatedCommentArray.length; i++) {
      if (commentObject["comments"][sortedUpdatedCommentArray[i]]["target"] == id) {
        prunedCommentArray.push(sortedUpdatedCommentArray[i])
      }
    }
    for (let i = 0; i < prunedCommentArray.length; i++) {
      let comment = document.createElement("p");
      //let commentTargetID = commentObject["comments"][prunedCommentArray[i]]["target"] //unused?
      //let commentTargetLabel = idObject[commentTargetID]["prefLabel"] // unused?
      let commentCreator = commentObject["comments"][prunedCommentArray[i]]["creator"]
      let commentCreated = commentObject["comments"][prunedCommentArray[i]]["created"]
      commentCreated = commentCreated.split(".")[0].replace("T", " ")
      let commentValue = commentObject["comments"][prunedCommentArray[i]]["value"]
      comment.innerHTML = "<b>Kommentierender:</b> " + commentCreator + "<br><b>Datum:</b> " + commentCreated + "<br><b>Kommentar:</b> " + commentValue;
      commentDiv.appendChild(comment);
    }

    if (prunedCommentArray.length == 0) {
      let placeholderComment = document.createElement("p");
      placeholderComment.innerHTML = "Bislang keine Kommentare zum Begriff. Verfasse den ersten!";
      placeholderComment.id = "noCommentsPlaceholder";
      commentDiv.appendChild(placeholderComment);
    }
  } catch (error) {
      console.error(error);
      alert("Fehler beim Laden der Kommentare! Bitte den Entwickler (Lasse) informieren.");
  }
}

async function updatePod() {
    event.preventDefault();
    const url = 'https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl';
    let commentText = document.getElementById("commentText").value;
    let author = document.getElementById("userName").innerHTML;
    if (commentText == "") {
        alert("Kein Kommentar eingegeben!");
        return;
    }
    if (author == "Anonymus") {
      alert("Kein Nutzername eingegeben! Bitte Detailansicht schließen und Nutzernamen oben rechts eingeben.");
      return;
    }
    
    // not trying to avoid storing id in className anymore
    let id = document.getElementById("commentButton").dataset.id;
    let idObject = JSON.parse(document.getElementById("commentButton").dataset.idObject);

    // declare namespaces
    var AO = $rdf.Namespace("http://www.w3.org/ns/oa#");
    var DC = $rdf.Namespace("http://purl.org/dc/terms/");
    var SK = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
    var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");

    // declare entities
    var value = AO("bodyValue")
    var target = AO("hasTarget")
    var creator = DC("creator")
    var created = DC("created")

    // read ttl from pod
    let preRdf = await readFromPod(url)
    
    // parse ttl into store
    let store = $rdf.graph()
    $rdf.parse(preRdf, store, url, 'text/turtle')

    // calculate the next annotation number
    let nextAnnoNumber = 1
    while (store.holds($rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/anno${nextAnnoNumber}`), RDF('type'), AO('Annotation'))) {
      nextAnnoNumber++
    }
    //create new annotation
    let newAnno = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/anno${nextAnnoNumber}`)
    let newConcept = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/concept${id}`)

    // double check if anno already in store, if so alert popup and error
    if (store.holds(newAnno, RDF('type'), AO('Annotation'))) {
        alert("Fehler beim Erstellen des Kommentars! Bitte den Entwickler (Lasse) informieren.");
        return
    }

    // add annotation to store
    store.add(newAnno, RDF('type'), AO('Annotation'))
    // add newConcept if not already in store
    if (!store.holds(newConcept, RDF('type'), SK('Concept'))) {
        store.add(newConcept, RDF('type'), SK('Concept'))
    }

    var newDate = new Date() 
    // add time zone offset to date
    newDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
    // convert date to iso string
    newDate = newDate.toISOString()
    store.add(newAnno, value, commentText)
    store.add(newAnno, creator, author)
    store.add(newAnno, created, newDate)
    store.add(newAnno, target, newConcept)

    // serialize store into ttl
    let ttl = $rdf.serialize(null, store, url, 'text/turtle')

    // write ttl to pod
    await writeToPod(ttl, url)
    readComments(id, idObject)
}

async function generateCommentedIdList() {
  const url = 'https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl';

  // declare namespaces
  var SK = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
  var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  var DC = $rdf.Namespace("http://purl.org/dc/terms/");
  var AO = $rdf.Namespace("http://www.w3.org/ns/oa#");

  // declare entities
  var concept = SK('Concept');
  var created = DC('created');
  var anno = AO('Annotation');
  var target = AO('hasTarget');

  // read ttl from pod
  let preRdf = await readFromPod(url);
  
  // parse ttl into store
  let store = $rdf.graph();
  $rdf.parse(preRdf, store, url, 'text/turtle');

  // find all concepts
  let concepts = store.each(undefined, RDF('type'), concept);
  // remove concepts which are not target of annotations
  for (let i = 0; i < concepts.length; i++) {
    if (store.each(undefined, target, concepts[i]).length == 0) {
      concepts.splice(i, 1);
    }
  }
  let commentConceptObject = {};

  for (let i=0; i < concepts.length; i++) {
    conceptObject = concepts[i];
    id = conceptObject.value.split("concept")[1]
    // find all annotations with target conceptObject
    targetingAnnotations = store.each(undefined, target, conceptObject);
    // create an array of all dates of the annotations
    let dateArray = [];
    for (let j=0; j < targetingAnnotations.length; j++) {
      let date = Date.parse(store.any(targetingAnnotations[j], created));
      dateArray.push(date);
    }
    // find the latest date in the dateArray
    let latestDate = Math.max.apply(null, dateArray);
    commentConceptObject[id] = latestDate;
  }
  // create an array sorting the concepts by date
  let sortedCommentConceptArray = Object.keys(commentConceptObject).sort((a, b) => new Date(commentConceptObject[b]) - new Date(commentConceptObject[a]));
  // create an array of rgb colors for the concepts depending on their date going from red to blue
  let colorArray = [];
  let colorStep = 255 / sortedCommentConceptArray.length;
  for (let i = 0; i < sortedCommentConceptArray.length; i++) {
    let color = "rgb(" + (255 - i * colorStep) + ", 0, " + i * colorStep + ")";
    colorArray.push(color);
  }

  for (let i=0; i < sortedCommentConceptArray.length; i++) {
    commentConceptObject[sortedCommentConceptArray[i]] = colorArray[i];
  }
  return commentConceptObject
}

async function generateThesaurus(idObject, topPosition) {
  event.preventDefault();
  console.log("idObject", idObject)
  console.log("topPosition", topPosition)
  //read all form data from conceptSchemeForm
  let conceptSchemeNamespace = document.getElementById("nameSpaceInput").value;
  console.log(conceptSchemeNamespace)
  conceptSchemeTitle = document.getElementById("titleInput").value;
  conceptSchemeCreator = document.getElementById("creatorInput").value;
  conceptSchemePublisher = document.getElementById("publisherInput").value;
  conceptSchemeContributor = document.getElementById("contributorInput").value;
  conceptSchemeSubject = document.getElementById("subjectInput").value;
  conceptSchemeDescription = document.getElementById("descriptionInput").value;
  conceptSchemeCreated = document.getElementById("createdInput").value;
  // select radio element of conceptSchemeForm which is checked
  let conceptSchemeFormat;
  if (document.getElementById("turtleFormatRadio").checked) {
      conceptSchemeFormat = 'text/turtle'
    } else if (document.getElementById("jsonldFormatRadio").checked) {
      conceptSchemeFormat = 'application/ld+json'
  }
  closeConceptSchemeModal()
  // remove idObject["top"]
  idObject = Object.fromEntries(Object.entries(idObject).filter(([key, value]) => key != "top"));
  // remove idObject["orphanage"]
  idObject = Object.fromEntries(Object.entries(idObject).filter(([key, value]) => key != "orphanage"));
  // remove every object having "orphanage" as parent
  for (let key in idObject) {
    if (idObject[key]["parent"] == "orphanage") {
      delete idObject[key];
    }
  }

  // declare namespaces for skos and needed entities
  let SK = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
  let DC = $rdf.Namespace("http://purl.org/dc/terms/");
  let RDFS = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
  let RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");

  // declare relevant entities for skos properties like prefLabel, altLabel, description, broader, related, closeMatch, relatedMatch, example, inScheme, topConceptOf
  let prefLabel = SK('prefLabel');
  let altLabel = SK('altLabel');
  // be careful ob key "description" in idObject while in skos it is "definition" 
  let definition = SK('definition');
  // be careful ob key "parent" in idObject while in skos it is "broader"
  let broader = SK('broader');
  let related = SK('related');
  let closeMatch = SK('closeMatch');
  let relatedMatch = SK('relatedMatch');
  let example = SK('example');
  let inScheme = SK('inScheme');
  let topConceptOf = SK('topConceptOf');
  // let concept = SK('Concept'); // removed because used as loop variable
  let conceptScheme = SK('ConceptScheme');

  // declare relevant non skos properties like seeAlso, title, creator, source, publisher, contributor, subject, created, description
  let seeAlso = RDFS('seeAlso');
  let title = DC('title');
  let creator = DC('creator');
  let source = DC('source');
  let publisher = DC('publisher');
  let contributor = DC('contributor');
  let subject = DC('subject');
  let created = DC('created');
  let description = DC('description');
  let type = RDF('type');

  // create store
  let store = $rdf.graph();
  
  // create thesaurus concept scheme
  let thesaurusConceptScheme = $rdf.sym(conceptSchemeNamespace+"/conceptSchemes/" + "1");
  store.add(thesaurusConceptScheme, type, conceptScheme);
  store.add(thesaurusConceptScheme, title, conceptSchemeTitle);
  let creators = conceptSchemeCreator.split(",");
  for (let i = 0; i < creators.length; i++) {
    store.add(thesaurusConceptScheme, creator, creators[i]);
  }
  store.add(thesaurusConceptScheme, publisher, conceptSchemePublisher);
  let contributors = conceptSchemeContributor.split(",");
  for (let i = 0; i < contributors.length; i++) {
    store.add(thesaurusConceptScheme, contributor, contributors[i]);
  }
  let subjects = conceptSchemeSubject.split(",");
  for (let i = 0; i < subjects.length; i++) {
    store.add(thesaurusConceptScheme, subject, subjects[i]);
  }
  store.add(thesaurusConceptScheme, created, conceptSchemeCreated);
  store.add(thesaurusConceptScheme, description, conceptSchemeDescription);

  // iterate over all concepts in idObject and add them and their properties to the store
  for (let key in idObject) {
    console.log("concept " + key, idObject[key])
    let concept = $rdf.sym(conceptSchemeNamespace+"/concepts/" + key);
    console.log("concept IRI", concept)

    store.add(concept, type, SK('Concept'));

    store.add(concept, inScheme, thesaurusConceptScheme);

    // add idObject[key]["prefLabel"]) as rdf:langString german to concept
    store.add(concept, prefLabel, $rdf.lit(idObject[key]["prefLabel"], undefined, "de"));

    if (idObject[key]["translation"] != "") {
      let translations = idObject[key]["translation"].split("|");
      for (let i = 0; i < translations.length; i++) {
        let translationValue = translations[i].split("@")[0];
        let translationLang = translations[i].split("@")[1];
        store.add(concept, prefLabel, $rdf.lit(translationValue, undefined, translationLang));
      }
    }

    // add idObject[key]["definition"] as rdf:langString german to concept
    if (idObject[key]["description"] != "") {
      store.add(concept, definition, $rdf.lit(idObject[key]["description"], undefined, "de"));
    }

    if (idObject[key]["altLabel"] != "") {
      let altLabels = idObject[key]["altLabel"].split("|");
      for (let i = 0; i < altLabels.length; i++) {
        // add altLabels as rdf:langString german to concept
        store.add(concept, altLabel, $rdf.lit(altLabels[i], undefined, "de"));
      }
    }
    if (idObject[key]["related"] != "") {
      let relatedConcepts = idObject[key]["related"].split("|");
      for (let i = 0; i < relatedConcepts.length; i++) {
        store.add(concept, related, $rdf.sym(conceptSchemeNamespace+"/concepts/" + relatedConcepts[i]));
      }
    }
    if (idObject[key]["source"] != "") {
      let sources = idObject[key]["source"].split("|");
      for (let i = 0; i < sources.length; i++) {
        store.add(concept, source, sources[i]);
      }
    }
    if (idObject[key]["closeMatch"] != "") {
      let closeMatches = idObject[key]["closeMatch"].split("|");
      for (let i = 0; i < closeMatches.length; i++) {
        store.add(concept, closeMatch, closeMatches[i]);
      }
    }
    if (idObject[key]["relatedMatch"] != "") {
      let relatedMatches = idObject[key]["relatedMatch"].split("|");
      for (let i = 0; i < relatedMatches.length; i++) {
        store.add(concept, relatedMatch, relatedMatches[i]);
      }
    }
    if (idObject[key]["seeAlso"] != "") {
      let seeAlsos = idObject[key]["seeAlso"].split("|");
      for (let i = 0; i < seeAlsos.length; i++) {
        store.add(concept, seeAlso, seeAlsos[i]);
      }
    }

    if (idObject[key]["example"] != "") {
      let examples = idObject[key]["example"].split("|");
      for (let i = 0; i < examples.length; i++) {
        store.add(concept, example, examples[i]);
      }
    }

    if (idObject[key]["parent"] != "top") {
      store.add(concept, broader, $rdf.sym(conceptSchemeNamespace+"/concepts/"+ idObject[key]["parent"]));
    }

    // check if idObject[key] is a top concept and add it to thesaurusConceptScheme if so
    for (let topObject of topPosition) {
      if (topObject["identifier"] == key) { //
        store.add(concept, topConceptOf, thesaurusConceptScheme);
      }
    }
  }

  try {
    let serializedThesaurus = $rdf.serialize(null, store, conceptSchemeNamespace, conceptSchemeFormat);
    // download file thesaurus.ttl if format is turtle or thesaurus.json if format is jsonld with the serialized thesaurus
    a = document.createElement("a");
    if (conceptSchemeFormat == 'text/turtle') {
      a.href = URL.createObjectURL(new Blob([serializedThesaurus], {type: 'text/turtle'}));
      a.download = 'thesaurus.ttl';
    } else if (conceptSchemeFormat == 'application/ld+json') {
      a.href = URL.createObjectURL(new Blob([serializedThesaurus], {type: 'application/ld+json'}));
      a.download = 'thesaurus.json';
    }
    a.click();
    // remove the created a element after download
    a.remove();
    alert("Thesaurus heruntergeladen!");
  } catch (error) {
    alert("Fehler: " + error);
  }
}