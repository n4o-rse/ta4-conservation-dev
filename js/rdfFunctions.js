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
    var modal = document.getElementById("myModal");

    // clean modal content from previous concept
    var modalBody = document.getElementsByClassName("modal-body")[0];
    while (modalBody.firstChild) {
      modalBody.removeChild(modalBody.firstChild);
    }

    // generate concept information for modal
    var body = document.getElementsByClassName("modal-body")
    var header = document.getElementById("header-head")
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
    // temporary fix storing id in comment-button className, to call event listener with id parameter
    // pls change this!
    var commentButton = document.getElementById("commentButton")
    commentButton.className = id.toString();
    readComments(id, idObject);
    modal.style.display = "block";
}

async function readComments(id, idObject) {
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
  // log serialized store into json-ld
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
    commentObject["concepts"][conceptObjectID]["prefLabel"] = idObject[conceptObjectID]["prefLabel"]
  }
  console.log(commentObject)
  let updatedCommentArray = Object.keys(commentObject["comments"])
  console.log(updatedCommentArray)
  let sortedUpdatedCommentArray
  sortedUpdatedCommentArray = updatedCommentArray.sort((a, b) => new Date(commentObject["comments"][b]["created"]) - new Date(commentObject["comments"][a]["created"]))
  console.log(sortedUpdatedCommentArray)

  // generate a paragraph for each comment, containing target, creator, created in historyDiv
  for (let i = 0; i < sortedUpdatedCommentArray.length; i++) {
    let comment = document.createElement("p");
    let commentTargetID = commentObject["comments"][sortedUpdatedCommentArray[i]]["target"]
    let commentTargetLabel = idObject[commentTargetID]["prefLabel"]
    let commentCreator = commentObject["comments"][sortedUpdatedCommentArray[i]]["creator"]
    let commentCreated = commentObject["comments"][sortedUpdatedCommentArray[i]]["created"]
    console.log(commentCreated)
    console.log(typeof commentCreated)
    commentCreated = commentCreated.split(".")[0].replace("T", " ")
    comment.innerHTML = commentCreator + " kommentierte " + "<b>" + commentTargetLabel + "</b>" + " um " + commentCreated;
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
    let commentTargetID = commentObject["comments"][prunedCommentArray[i]]["target"]
    let commentTargetLabel = idObject[commentTargetID]["prefLabel"]
    let commentCreator = commentObject["comments"][prunedCommentArray[i]]["creator"]
    let commentCreated = commentObject["comments"][sortedUpdatedCommentArray[i]]["created"]
    console.log(commentCreated)
    console.log(typeof commentCreated)
    commentCreated = commentCreated.split(".")[0].replace("T", " ")
    let commentValue = commentObject["comments"][prunedCommentArray[i]]["value"]
    comment.innerHTML = commentCreator + " commented on " + commentTargetLabel + " on " + commentCreated;
    comment.innerHTML = "<b>creator:</b> " + commentCreator + "<br><b>created:</b> " + commentCreated + "<br><b>comment:</b> " + commentValue;
    commentDiv.appendChild(comment);
  }

  if (prunedCommentArray.length == 0) {
    let placeholderComment = document.createElement("p");
    placeholderComment.innerHTML = "No comments yet, be the first to comment!";
    placeholderComment.id = "noCommentsPlaceholder";
    commentDiv.appendChild(placeholderComment);
  }
}

async function updatePod() {
    event.preventDefault();
    const url = 'https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl';
    let commentText = document.getElementById("commentText").value;
    if (commentText == "") {
        alert("Kein Kommentar eingegeben!");
        return;
    }
    let author = document.getElementById("userName").innerHTML;
    let id = document.getElementById("commentButton").className;

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

    // create a list of all AO('Annotation')
    let annotations = store.each(undefined, RDF('type'), AO('Annotation'))
    console.log(annotations)

    // calculate the next annotation number
    let nextAnnoNumber = 1
    while (store.holds($rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/anno${nextAnnoNumber}`), RDF('type'), AO('Annotation'))) {
      console.log(nextAnnoNumber + "already used")
      nextAnnoNumber++
    }
    console.log(nextAnnoNumber + "not used yet")
    //create new annotation
    let newAnno = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/anno${nextAnnoNumber}`)
    let newConcept = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/concept${id}`)

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
    writeToPod(ttl, url)

    // if element exists with id "noCommentsPlaceholder" remove it
    if (document.getElementById("noCommentsPlaceholder") != null) {
        document.getElementById("noCommentsPlaceholder").remove();
    }

    // add new comment to commentaries in modal
    var commentDiv = document.getElementsByClassName("modal-comments")[0];
    var newComment = document.createElement("p");
    newComment.innerHTML = "<b>creator:</b> " + author + "<br><b>created:</b> " + newDate  + "<br><b>comment:</b> " + commentText;
    // integrate new comment at the top of the list
    commentDiv.insertBefore(newComment, commentDiv.firstChild);
    document.getElementById("commentText").value = "";
}

async function generateCommentedIdList() {
  const url = 'https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl';

  // declare namespaces
  var AO = $rdf.Namespace("http://www.w3.org/ns/oa#");
  var SK = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
  var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");

  // declare entities
  var concept = SK('Concept');

  // read ttl from pod
  let preRdf = await readFromPod(url);
  
  // parse ttl into store
  let store = $rdf.graph();
  $rdf.parse(preRdf, store, url, 'text/turtle');

  // create a list of all SK('Concept')
  let concepts = store.each(undefined, RDF('type'), concept);
  let commentConceptIds = [];
  for (let i=0; i < concepts.length; i++) {
    conceptObject = concepts[i];
    id = conceptObject.value.split("concept")[1]
    commentConceptIds.push(id)
  }
  return commentConceptIds
}