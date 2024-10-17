// event functions and button onclick functions

function thesaurusInputFile() {
    event.preventDefault();
    // reset former outputs, if there are any
    resetOutput();
    // display loading popup until every following function is finished
    document.getElementById("loadingDiv").style.display = "block";
    const inputFile = document.getElementById('fileInput');
    const file = inputFile.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
      result = e.target.result;
      readData(result, "file")
    };
    reader.readAsText(file);
}

async function thesaurusInputUrl(inputURL) {
    event.preventDefault();
    // reset former outputs, if there are any
    resetOutput();
    // display loading popup until every following function is finished
    document.getElementById("loadingDiv").style.display = "block";
    const response = await fetch(inputURL, {
        headers: { "content-type": "text/csv;charset=UTF-8" },
    });
    const text = await response.text();
    readData(text, "url")
}

function saveUserName() {
  event.preventDefault();
  let userNameText = document.getElementById("userNameText").value;
  if (userNameText == "") {
    alert("Bitte geben Sie einen Benutzernamen ein!");
    return;
  }
  document.getElementById("userName").innerHTML = userNameText;
  document.getElementById("userNameText").value = "";
  document.getElementById("commentButton").innerText = `Kommentieren als ${userNameText}`;
}

function closeConceptModal() {
  event.preventDefault();
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function closeConceptSchemeModal() {
  event.preventDefault();
  let modal = document.getElementById("conceptSchemeModal");
  modal.style.display = "none";
  //let form = document.getElementById("conceptSchemeForm");
  // reset value of all input elements in form, currently deactivated
  //form.reset();
}

function collectThesaurusData(idObject, topPosition) {
  event.preventDefault();
  // make modal visible
  let dateInput = document.getElementById("createdInput");
  // reset readonly attribute of dateInput
  dateInput.removeAttribute("readonly");
  // fill dateInput with current date
  let currentDate = new Date()
  // add timezone offset to get local time
  currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset());
  // get current date in format yyyy-mm-dd
  let dateString = currentDate.toISOString().slice(0, 10);
  dateInput.value = dateString;
  // set readonly attribute of dateInput again
  dateInput.setAttribute("readonly", "readonly");
  let modal = document.getElementById("conceptSchemeModal");
  modal.style.display = "block";
  let conceptSchemeFormButton = document.getElementById("conceptSchemeFormButton");
  conceptSchemeFormButton.onclick = function() {generateThesaurus(idObject, topPosition)};
}

function setConceptSchemeTitle() {
  event.preventDefault();
  conceptSchemeTitle = document.getElementById('conceptSchemeTitleInput').value;
  let inputURL = document.getElementById('conceptSchemeTitleInput').dataset.urlmap[conceptSchemeTitle];
  thesaurusInputUrl(inputURL);
}

async function readConceptSchemeTitles() {
  annotationGraphText = await readFromPod(commentURL, "text/turtle");
  annotationGraph = $rdf.graph();
  // define namespaces
  let SKOS = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
  let DCT = $rdf.Namespace("http://purl.org/dc/terms/");
  let RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  $rdf.parse(annotationGraphText, annotationGraph, commentURL, "text/turtle");
  // get all conceptSchemes in graph
  let conceptSchemes = annotationGraph.each(undefined, RDF("type"), SKOS("ConceptScheme"));
  // get names of all conceptSchemes
  let conceptSchemeNames = [];
  let conceptSchemeSources = [];
  for (let x of conceptSchemes) {
    let conceptSchemeName = annotationGraph.any(x, DCT("title"));
    let conceptSchemeSource = annotationGraph.any(x, DCT("source"));
    conceptSchemeNames.push(conceptSchemeName.value);
    conceptSchemeSources.push(conceptSchemeSource.value);
  }
  // get selector for conceptSchemeTitle
  let conceptSchemeTitleSelector = document.getElementById("conceptSchemeTitleInput");
  // remove all children from conceptSchemeTitleSelector
  while (conceptSchemeTitleSelector.firstChild) {
    conceptSchemeTitleSelector.removeChild(conceptSchemeTitleSelector.firstChild);
  }
  // add generic option "keine"
  let option = document.createElement("option");
  option.value = "";
  option.innerHTML = "keine";
  conceptSchemeTitleSelector.appendChild(option);

  // add option tag to commentURLSelector for each conceptSchemeTitle in conceptSchemeNames
  for (let x of conceptSchemeNames) {
    let option = document.createElement("option");
    option.value = x;
    option.innerHTML = x;
    conceptSchemeTitleSelector.appendChild(option);
  }
  // create data property dataset.urlmap for conceptSchemeTitleSelector containing an object with urls as values for each conceptSchemeTitle
  let urlMap = {};
  for (let i = 0; i < conceptSchemeNames.length; i++) {
    urlMap[conceptSchemeNames[i]] = conceptSchemeSources[i];
  }
  conceptSchemeTitleSelector.dataset.urlmap = JSON.stringify(urlMap);
}

async function createConceptScheme() {
  event.preventDefault();
  newConceptSchemeTitle = document.getElementById('createconceptSchemeTitleInput').value;
  // read annotation graph from pod
  annotationGraphText = await readFromPod(commentURL, "text/turtle");
  annotationGraph = $rdf.graph();
  // define namespaces
  let SKOS = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
  let DCT = $rdf.Namespace("http://purl.org/dc/terms/");
  let RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  $rdf.parse(annotationGraphText, annotationGraph, commentURL, "text/turtle");
  // check if there already exists a ConceptScheme with title = newConceptSchemeTitle
  let conceptSchemes = annotationGraph.each(undefined, RDF("type"), SKOS("ConceptScheme"));
  // print all conceptSchemes
  for (let x of conceptSchemes) {
    let conceptSchemeName = annotationGraph.any(x, DCT("title"));
    if (conceptSchemeName.value == newConceptSchemeTitle) {
      alert("Es existiert bereits ein Thesaurus mit diesem Titel!");
      return;
    }
  }
  let newConceptSchemeSource = ""
  newConceptSchemeSource = window.prompt("URL of the Data","");
  if (newConceptSchemeSource == "") {
    alert("Bitte geben Sie eine URL ein!");
    return;
  }

  let i = 1;
  let conceptSchemeURI = baseURI + "ConceptScheme"
  newConceptScheme = $rdf.sym(conceptSchemeURI + i);

  // check if newConceptScheme already exists in Graph, while loop increasing i and checking again
  while (annotationGraph.holds(newConceptScheme, RDF("type"), SKOS("ConceptScheme"))) {
    i++;
    newConceptScheme = $rdf.sym(conceptSchemeURI + i);
  }
  console.log("newConceptScheme: " + newConceptScheme);
  annotationGraph.add(newConceptScheme, RDF("type"), SKOS("ConceptScheme"));
  annotationGraph.add(newConceptScheme, DCT("title"), $rdf.lit(newConceptSchemeTitle));
  annotationGraph.add(newConceptScheme, DCT("source"), $rdf.sym(newConceptSchemeSource));
  // write serialized graph to pod
  serializedGraph = $rdf.serialize(null, annotationGraph, commentURL, "text/turtle");
  await writeToPod(serializedGraph, commentURL, "text/turtle");
  // reload dropdown menu for conceptSchemes
  readConceptSchemeTitles();
}

// global variables and event listeners
let commentURL = "https://restaurierungsvokabular.solidweb.org/annotations/annotations3.ttl";
let baseURI = "https://www.restaurierungsvokabular.solidweb.org/annotations/ConceptSchemes/";
let conceptSchemeTitle = "";

const thesaurusFileInputForm = document.getElementById('fileForm');
thesaurusFileInputForm.addEventListener('submit', thesaurusInputFile);



const commentForm = document.getElementById("commentForm");
commentForm.addEventListener("submit", updatePod);

const conceptSchemeTitleForm = document.getElementById("conceptSchemeTitleForm");
conceptSchemeTitleForm.addEventListener("submit", setConceptSchemeTitle);

const createconceptSchemeTitleForm = document.getElementById("createconceptSchemeTitleForm");
createconceptSchemeTitleForm.addEventListener("submit", createConceptScheme);

readConceptSchemeTitles();