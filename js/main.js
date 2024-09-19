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

async function thesaurusInputUrl() {
    event.preventDefault();
    // reset former outputs, if there are any
    resetOutput();
    // display loading popup until every following function is finished
    document.getElementById("loadingDiv").style.display = "block";
    const inputURL = document.getElementById('textInput').value;
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
  // read and return value of global variable commentURL
  conceptSchemeTitle = document.getElementById('conceptSchemeTitle').value;
  return conceptSchemeTitle;
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
  for (let x of conceptSchemes) {
    let conceptSchemeName = annotationGraph.any(x, DCT("title"));
    conceptSchemeNames.push(conceptSchemeName.value);
  }
  // get selector for conceptSchemeTitle
  let conceptSchemeTitleSelector = document.getElementById("conceptSchemeTitleInput");
  // add generic option "keine"
  let option = document.createElement("option");
  option.value = "keine";
  option.innerHTML = "keine";
  conceptSchemeTitleSelector.appendChild(option);

  // add option tag to commentURLSelector for each conceptSchemeTitle in conceptSchemeNames
  for (let x of conceptSchemeNames) {
    let option = document.createElement("option");
    option.value = x;
    option.innerHTML = x;
    conceptSchemeTitleSelector.appendChild(option);
  }
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
  for (let x of conceptSchemes) {
    let conceptSchemeName = annotationGraph.any(x, DCT("title"));
    if (conceptSchemeName.value == newConceptSchemeTitle) {
      alert("Es existiert bereits ein Thesaurus mit diesem Titel!");
      return;
    }
  }
  // create new conceptScheme
  let i = 1;
  while (annotationGraph.any($rdf.sym(":annotations/ConceptScheme" + i + "/"), RDF("type"), SKOS("ConceptScheme"))) {
    i++;
  }
  let newConceptScheme = $rdf.sym(":annotations/ConceptScheme" + i + "/");
  annotationGraph.add(newConceptScheme, RDF("type"), SKOS("ConceptScheme"));
  annotationGraph.add(newConceptScheme, DCT("title"), $rdf.lit(newConceptSchemeTitle));
  // write serialized graph to pod
  serializedGraph = $rdf.serialize(null, annotationGraph, commentURL, "text/turtle");
  await writeToPod(serializedGraph, commentURL, "text/turtle");
  // reload dropdown menu for conceptSchemes
  readConceptSchemeTitles();
}

// global variables and event listeners
let commentURL = "https://restaurierungsvokabular.solidweb.org/annotations/annotations2.ttl";
let conceptSchemeTitle = "";

const thesaurusFileInputForm = document.getElementById('fileForm');
thesaurusFileInputForm.addEventListener('submit', thesaurusInputFile);

const thesaurusUrlInputForm = document.getElementById('textForm');
thesaurusUrlInputForm.addEventListener('submit', thesaurusInputUrl);

const commentForm = document.getElementById("commentForm");
commentForm.addEventListener("submit", updatePod);

const conceptSchemeTitleForm = document.getElementById("conceptSchemeTitleForm");
conceptSchemeTitleForm.addEventListener("submit", setConceptSchemeTitle);

const createconceptSchemeTitleForm = document.getElementById("createconceptSchemeTitleForm");
createconceptSchemeTitleForm.addEventListener("submit", createConceptScheme);

readConceptSchemeTitles();


