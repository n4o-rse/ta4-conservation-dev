async function openDetails(id, idObject) {
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

    // iterate over all detail contents and create a paragraph for each
    for (let i = 0; i < details.length; i++) {
      // check if details[i] is a key in idObject[id]
      try {
        //check if detail has a value at all
        if (!(idObject[id][details[i]].trim()) == "") {
          let detailDiv = document.createElement("div");
          let splittedDetails = idObject[id][details[i]].split("|");
          let mappedDetails

          // case for related, to generate prefLabel from identifier
          if (details[i] == "related") {
            mappedDetails = []
            for (let j = 0; j < splittedDetails.length; j++) {
              mappedDetails.push(idObject[splittedDetails[j]]["prefLabel"]);
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
      } catch (error) {
        // if details[i] is not a key in idObject[id], do nothing. Keycheck didn't work. Pls fix this later...
      }
    } 
    // storing id of current concept and idObject in comment-button data-properties, to feed updataPod function with parameters
    let commentButton = document.getElementById("commentButton")
    commentButton.dataset.id = id.toString();
    commentButton.dataset.idObject = JSON.stringify(idObject);
    await readComments(id, idObject);
    modal.style.display = "block";
}

async function readComments(id, idObject) {
  console.log("ID: " + id)
  console.log("IDObject: " + JSON.stringify(idObject))
  console.log("ConceptSchemeTitle: " + conceptSchemeTitle)
  /*
  try {
  */

  // clean modal content from previous comments
  var commentDiv = document.getElementsByClassName("modal-comments")[0];
  while (commentDiv.firstChild) {
    commentDiv.removeChild(commentDiv.firstChild);
  }
  var historyDiv = document.getElementsByClassName("modal-history")[0];
  while (historyDiv.firstChild) {
    historyDiv.removeChild(historyDiv.firstChild);
  }

  // return if no comment file is loaded, i.e. no conceptSchemeTitle
  if (conceptSchemeTitle == "") {
    let placeholderComment = document.createElement("p");
    placeholderComment.innerHTML = "Keine Kommentardatei geladen...";
    placeholderComment.id = "noCommentsPlaceholder";
    commentDiv.appendChild(placeholderComment);
    let historyCommentPlaceholder = document.createElement("p");
    historyCommentPlaceholder.innerHTML = "Keine Kommentardatei geladen...";
    historyDiv.appendChild(historyCommentPlaceholder);
    return;
  }

  // load store and namespaces
  [store, AO, DC, SK, RDF] = await readStore(commentURL)

  // finde Skos ConceptScheme where title is conceptSchemeTitle
  let conceptScheme = store.each(undefined, RDF('type'), SK('ConceptScheme')).find(conceptScheme => store.any(conceptScheme, DC('title')).value == conceptSchemeTitle)
  console.log("conceptScheme: " + conceptScheme)

  // find entries in conceptScheme, both concepts and annotations
  // annotations use skos: inScheme to reference the conceptScheme
  let thingsInScheme = store.each(undefined, SK('inScheme'), conceptScheme)
  console.log("thingsInScheme: " + thingsInScheme)

  // remove all concepts and annotations that dont have the conceptScheme as inScheme
  for (thing of store.each(undefined, RDF('type'), SK('Concept')).concat(store.each(undefined, RDF('type'), AO('Annotation')))) {
    if (!store.holds(thing, SK('inScheme'), conceptScheme)) {
      store.removeMany(thing, undefined, undefined)
    }
  }

  // serialize store into json-ld
  let jsonldSerialization = $rdf.serialize(null, store, commentURL, 'application/ld+json');
  // parse json-ld into object
  let parsedJson = JSON.parse(jsonldSerialization)
  console.log("parsedJSON: " + JSON.stringify(parsedJson))
  let commentObject = {comments: {}, concepts: {}}
  let jsonCommentArray = parsedJson["@graph"].filter(obj => obj["@type"] == "o:Annotation")
  let jsonConceptArray = parsedJson["@graph"].filter(obj => obj["@type"] == "skos:Concept")
  for (let x of jsonCommentArray) {
    commentObjectID = x["@id"].split(":")[1]
    commentObject["comments"][commentObjectID] = {}
    commentObject["comments"][commentObjectID]["creator"] = x["dct:creator"]
    commentObject["comments"][commentObjectID]["created"] = x["dct:created"]
    commentObject["comments"][commentObjectID]["value"] = x["o:bodyValue"]
    commentObject["comments"][commentObjectID]["target"] = x["o:hasTarget"]["@id"].split(":")[1]
  }
  for (let x of jsonConceptArray) {
    conceptObjectID = x["@id"].split(":")[1]
    commentObject["concepts"][conceptObjectID] = {}
    if (!(conceptObjectID in idObject)) {
      commentObject["concepts"][conceptObjectID]["prefLabel"] = "Fehlender Begriff"
    } else {
    commentObject["concepts"][conceptObjectID]["prefLabel"] = idObject[conceptObjectID]["prefLabel"]
    }
  }
  console.log("commentObject: " + JSON.stringify(commentObject))
  let updatedCommentArray = Object.keys(commentObject["comments"])
  let sortedUpdatedCommentArray
  sortedUpdatedCommentArray = updatedCommentArray.sort((a, b) => new Date(commentObject["comments"][b]["created"]) - new Date(commentObject["comments"][a]["created"]));
  
  // generate a paragraph for each comment, containing target, creator, created in historyDiv
  for (let i = 0; i < sortedUpdatedCommentArray.length; i++) {
    let comment = document.createElement("p");
    let commentTargetID = commentObject["comments"][sortedUpdatedCommentArray[i]]["target"];
    let commentTargetLabel
    if (!(commentTargetID in idObject)) {
      commentTargetLabel = "Fehlender Begriff"
    } else {
      idObject[commentTargetID]["prefLabel"];
    }
    let commentCreator = commentObject["comments"][sortedUpdatedCommentArray[i]]["creator"];
    let commentCreated = commentObject["comments"][sortedUpdatedCommentArray[i]]["created"];
    commentCreated = commentCreated.split(".")[0].replace("T", " ");
    comment.innerHTML = commentCreator + " kommentierte " + "<b>" + commentTargetLabel + "</b>" + " um " + commentCreated;
    // if not commentTargetLabel "gelöschter Begriff", add event listener to openDetails
    if (commentTargetLabel != "Fehlender Begriff") {
      comment.onclick = function() {openDetails(commentTargetID, idObject)};
    }
    comment.className = "commentHistoryParagraph";
    historyDiv.appendChild(comment);
  }

  // refactorize this part to be included in the upper

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
  /*
  } catch (error) {
      console.error(error);
      alert("Fehler beim Laden der Kommentare! Bitte den Entwickler informieren.");
  }
  */
}

async function updatePod() {
    event.preventDefault();
    // check if comment file is selected
    if (conceptSchemeTitle == "") {
      alert("Keine Kommentardatei geladen!")
      return;
    }
    // avoid empty comments and anonymous commenters
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
    
    // get id and idObject from commentButton data-properties
    let id = document.getElementById("commentButton").dataset.id;
    let idObject = JSON.parse(document.getElementById("commentButton").dataset.idObject);

    [store, AO, DC, SK, RDF] = await readStore(commentURL)

    // declare entities
    var value = AO("bodyValue")
    var target = AO("hasTarget")
    var creator = DC("creator")
    var created = DC("created")
    var inScheme = SK("inScheme")

    let conceptScheme = store.each(undefined, RDF('type'), SK('ConceptScheme')).find(conceptScheme => store.any(conceptScheme, DC('title')).value == conceptSchemeTitle)

    // calculate the next annotation number
    let nextAnnoNumber = 1
    while (store.holds($rdf.sym(`ConceptSchemes/${conceptScheme.value.split("/")[1]}/Annotations/anno${nextAnnoNumber}`), RDF('type'), AO('Annotation'))) {
      nextAnnoNumber++
    }
    //create new annotation
    let newAnno = $rdf.sym(`${conceptScheme.value}/Annotations/anno${nextAnnoNumber}`)
    let newConcept = $rdf.sym(`ConceptSchemes/${conceptScheme.value.split("/")[1]}/Annotations/Concepts/${id}`)

    // add annotation to store
    store.add(newAnno, RDF('type'), AO('Annotation'))
    // add newConcept if not already in store
    if (!store.holds(newConcept, RDF('type'), SK('Concept'))) {
        store.add(newConcept, RDF('type'), SK('Concept'))
        store.add(newConcept, inScheme, conceptScheme)
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
    store.add(newAnno, inScheme, conceptScheme)

    // serialize store into ttl
    let ttl = $rdf.serialize(null, store, commentURL, 'text/turtle')

    // write ttl to pod
    await writeToPod(ttl, commentURL, 'text/turtle')
    readComments(id, idObject)
}

// function to generate an object with all concepts and their latest comment date for visualization
async function generateCommentedIdList() {
  let commentConceptObject = {};
  if (conceptSchemeTitle == "") {
    return commentConceptObject
  }

  [store, AO, DC, SK, RDF] = await readStore(commentURL)

  // declare entities
  var concept = SK('Concept');
  var created = DC('created');
  var anno = AO('Annotation');
  var target = AO('hasTarget');

  // find conceptScheme
  let conceptScheme = store.each(undefined, RDF('type'), SK('ConceptScheme')).find(conceptScheme => store.any(conceptScheme, DC('title')).value == conceptSchemeTitle)

  // find all concepts in conceptScheme
  let concepts = store.each(undefined, SK('inScheme'), conceptScheme)
  // 

  // remove concepts which are not target of annotations
  for (let i = 0; i < concepts.length; i++) {
    if (store.each(undefined, target, concepts[i]).length == 0) {
      concepts.splice(i, 1);
    }
  }
  for (let i=0; i < concepts.length; i++) {
    conceptObject = concepts[i];
    let id = conceptObject.value.split("/")
    id = id[id.length - 1];
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

async function readStore(commentURL) {
      // read ttl from pod
      let preRdf = await readFromPod(commentURL, 'text/turtle')
      
      // parse ttl into store
      let store = $rdf.graph()
      $rdf.parse(preRdf, store, commentURL, 'text/turtle')

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

      return [store, AO, DC, SK, RDF]
}