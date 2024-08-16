async function openDetails(id, idObject) {
    mappingTable = {
      "K6":	"DIN EN 16484	Leder - Anforderungen an die Bestimmung der Herkunft von Leder; Deutsche Fassung EN 16484",
      "K7":	"KUR Database	Onlinedatenbank für die fachgerechte Verfahrung zur Massenversorgung archäologischer Eisen- und Feuchtholzfunde",
      "K8":	"DIN EN 15898	Erhaltung des kulturellen Erbes - Allgemeine Begriffe",
      "K9":	"DIN CEN/TS 17135	Erhaltung des kulturellen Erbes - Allgemeine Begriffe zur Beschreibung von Veränderungen an Objekten; Dreisprachige Fassung",
      "K10":	"DIN EN ISO 8044	Korrosion von Metallen und Legierungen - Grundbegriffe; Dreisprachige Fassung",
      "K12":	"DIN EN ISO 7539-1	Korrosion der Metalle und Legierungen - Prüfung der Spannungsrisskorrosion - Teil 1: Allgemeiner Leitfaden für Prüfverfahren",
      "K14":	"Katharina Schmidt-Ott, Erhaltung von Kulturgütern. Das Plasma in der Metallkonservierung – Möglichkeiten und Grenzen. Collectio archaeologica 7 (Zürich 2010).	Monographie über die Plasmabehandlung von Metallobjekten",
      "K15":	"DIN EN 844	Rund- und Schnittholz - Terminologie; Dreisprachige Fassung EN 844:2019",
      "K16":	"DIN EN 16141	Erhaltung des kulturellen Erbes - Richtlinien für den Umgang mit Umwelt- und Umgebungsbedingungen - Schaudepots: Definition und Merkmale von Sammlungszentren bestimmt für die Bewahrung und Pflege des kulturellen Erbes",
      "K17":	"R. Dietrich/ B. Skinner, Die Gesteine und ihre Mineralien. Ein Einführungs- und Bestimmungsbuch2 (Thun 1995).	Monographie über Gesteine und Mineralien",
      "K18":	"Mineralienatlas - Fossilienatlas	Onlinedatenbank/Lexikon zu Gesteinen, Mineralien und Fossilien ",
      "K19":	'Sammelband: P. Heinrich: Metall-Restaurierung. Beiträge zur Analyse, Konzeption und Technologie (Wien 2000)	Sammelband mit verschiedenen Aufsätzen zum Thema "Metallrestaurierung"',
      "K20":	"Wilhelm P. Bauer, Grundzüge der Metallkorrosion. In: Peter Heinrich (Hrsg.), Metall-Restaurierung. Beiträge zur Analyse, Konzeption und Technologie. Wien 2000, 63–67.	Aufsatz über verschiedene Metallkorrosionsformen in K19",
      "K21":	"Wolfgang Knobloch, Ergänzungen und Rekonstruktionen an historischen Objekten aus Metall. In: Metallrestaurierung, München Callwey, 1994, S. 70 – 105	Aufsatz über Ergänzungs- und Rekonstruktionsmethoden in Sammelband K19",
      "K22":	"Erhard Brepohl, Theorie und Praxis des Goldschmieds (München 2000)	Standardwerk der Goldschmiedekunst",
      "K23":	"DIN EN ISO 2080 Metallische und andere anorganische Überzüge - Oberflächenbehandlung, metallische und andere anorganische Überzüge - Wörterbuch (ISO 2080:2022); Deutsche und Englische Fassung EN ISO 2080:2022",
      "K24":	"Jochem Wolters, Der Gold- und Silberschmied. Band 1 - Werkstoffe und Materialien (Stuttgart 1989)	Monographie über sämtliche Werkstoffe, Hilfsstoffe und Chemikalien, die in Handwerk und Industrie zur Herstellung von Schmuck, Gerät und Bestecken, sowie zur Edelsteinbestimmung verwendet werden. Standardwerk",
      "Q7":	"Kristina Fella",
      "Q8":	"LEIZA KB Restaurierung/Konservierung",
      "Q16":	"Markus Wittköpper",
      "Q17":	"Waldemar Muskalla"
    }
      var modal = document.getElementById("myModal");
    // make modal invisible
    modal.style.display = "none";
    var modalBody = document.getElementsByClassName("modal-body")[0];
    while (modalBody.firstChild) {
      modalBody.removeChild(modalBody.firstChild);
    }
    var commentDiv = document.getElementsByClassName("modal-comments")[0];
    while (commentDiv.firstChild) {
      commentDiv.removeChild(commentDiv.firstChild);
    }
    var body = document.getElementsByClassName("modal-body")
    var header = document.getElementById("header-head")
    header.innerHTML = idObject[id]["prefLabel"];
    idObject[id]["identifier"] = id.toString();
    const details = ["identifier","description", "altLabel", "related", "source", "creator", "closeMatch", "relatedMatch", "seeAlso", "example"];
    // iterate over all detail contents and create a paragraph for each
    for (let i = 0; i < details.length; i++) {

      let detailDiv = document.createElement("div");
      let multiDetails = ["source", "creator", "related"];
      // check if detail is a multi detail, seperated by "|"
      if (multiDetails.includes(details[i])) {
        if (!(idObject[id][details[i]]) == "") {
          let splittedDetails = idObject[id][details[i]].split("|");
          console.log(splittedDetails);
          let mappedDetails
          let finalDetails
          if (details[i] == "related") {
            mappedDetails = splittedDetails.map(x => idObject[idObject[id][details[i]]]["prefLabel"]);
          } 
          else {
            mappedDetails = splittedDetails.map(x => mappingTable[x]);
          }
          console.log(mappedDetails);
          for (let j = 0; j < mappedDetails.length; j++) {
            detailDiv.innerHTML += "<p>" +"<b>" + details[i] + ":</b> " + mappedDetails[j] + "</p>";
          }
          //detail.innerHTML = "<b>" + details[i] + ":</b> " + finalDetails;
        }
        else {
          detailDiv.innerHTML = "<p>" +"<b>" + details[i] + ":</b> " + idObject[id][details[i]] + "</p>";
          //detail.innerHTML = "<b>" + details[i] + ":</b> " + idObject[id][details[i]];
        }
      }
      else {
        detailDiv.innerHTML = "<p>" +"<b>" + details[i] + ":</b> " + idObject[id][details[i]] + "</p>";
        //detail.innerHTML = "<b>" + details[i] + ":</b> " + idObject[id][details[i]];
      }
      body[0].appendChild(detail);
    } 
  
    // generate existing comments for this concept
    const url = "https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl";
    let commentRdf = await readFromPod(url)
    
    // parse ttl into store
    let store = $rdf.graph()
    $rdf.parse(commentRdf, store, url, 'text/turtle')
    let concept = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/concept${id}`)
  
    // create namespace
    var AO = $rdf.Namespace("http://www.w3.org/ns/oa#");
    var SK = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
    var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    var DC = $rdf.Namespace("http://purl.org/dc/terms/");
    var target = AO("hasTarget")
    var value = AO("bodyValue")
    var creator = DC("creator")
    var created = DC("created")
  
    // check if concept is in store
    if (store.holds(concept, RDF('type'), SK('Concept'))) {
      // find all comments for this concept
      let comments = store.each(undefined, target, concept)
      // revert order of array comments
      comments = comments.reverse()
      // generate a paragraph for each comment, containing creator, created, value
      for (let i = 0; i < comments.length; i++) {
        let comment = document.createElement("p");
        comment.innerHTML = "<b>creator:</b> " + store.any(comments[i], creator) + "<br><b>created:</b> " + store.any(comments[i], created) + "<br><b>comment:</b> " + store.any(comments[i], value);
        commentDiv.appendChild(comment);
      } 
    } else {
      let placeholderComment = document.createElement("p");
      placeholderComment.innerHTML = "No comments yet, be the first to comment!";
      placeholderComment.id = "noCommentsPlaceholder";
      commentDiv.appendChild(placeholderComment);
    }
  
    var commentButton = document.getElementById("commentButton")
    commentButton.className = id.toString();
    modal.style.display = "block";
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
    // calculate the next annotation number
    let nextAnnoNumber = annotations.length + 1

    //create new annotation
    let newAnno = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/anno${nextAnnoNumber}`)
    let newConcept = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/concept${id}`)

    // add annotation to store
    store.add(newAnno, RDF('type'), AO('Annotation'))
    // add newConcept if not already in store
    if (!store.holds(newConcept, RDF('type'), SK('Concept'))) {
        store.add(newConcept, RDF('type'), SK('Concept'))
    }
    var newDate = new Date().toISOString()
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