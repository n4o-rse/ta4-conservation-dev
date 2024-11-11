// event functions and button onclick functions
async function thesaurusInputFile() {
    event.preventDefault();
    // reset former outputs, if there are any
    resetOutput();
    // display loading popup until every following function is finished
    document.getElementById("loadingDiv").style.display = "block";
    let csv
    let reader = new FileReader();
    const inputFile = document.getElementById('fileInput');
    const file = inputFile.files[0];
    await new Promise(r => setTimeout(r, 2000));
    if (file.name.endsWith(".xlsx")) {
      reader.onload = function(e) {
        let data = e.target.result;
        let workbook = XLSX.read(data, {
          type: 'binary'
        });
        let sheetName = workbook.SheetNames[0];
        let sheet = workbook.Sheets[sheetName];
        csv = XLSX.utils.sheet_to_csv(sheet);
        readData(csv);
      };
      reader.readAsBinaryString(file);
    } else if (file.name.endsWith(".csv")) {
        reader.onload = function(e) {
          csv = e.target.result;
          readData(csv);
        };
        reader.readAsText(file);
      }
}

async function thesaurusInputUrl(inputURL) {
    event.preventDefault();
    // reset former outputs, if there are any
    resetOutput();
    document.getElementById("loadingDiv").style.display = "block";
    let text;
    if (inputURL.endsWith("csv")) {
    const response = await fetch(inputURL, {headers: { "content-type": "text/csv;charset=UTF-8" },});
    text = await response.text();
    }
    else if (inputURL.endsWith("xlsx")) {
      const response = await fetch(inputURL, {headers: { "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },});
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, {type: 'array'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      text = XLSX.utils.sheet_to_csv(sheet);
    }
    readData(text);
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
}

function closeConceptSchemeTitelModal() {
  event.preventDefault();
  let modal = document.getElementById("conceptSchemeTitelModal");
  modal.style.display = "none";
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
  console.log("conceptSchemeTitle: " + conceptSchemeTitle);
  let urlMapJsonString = document.getElementById('conceptSchemeTitleInput').dataset.urlmap;
  console.log("urlMapJsonString: " + urlMapJsonString);
  let urlMapJson = JSON.parse(urlMapJsonString);
  console.log("urlMapJson: " + urlMapJson);
  let inputURL = urlMapJson[conceptSchemeTitle];
  console.log("inputURL: " + inputURL);
  thesaurusInputUrl(inputURL);
}

function openConceptSchemeTitelModal() {
  document.getElementById('conceptSchemeTitelModal').style.display = 'block';
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
  closeConceptSchemeTitelModal();
  newConceptSchemeTitle = document.getElementById('conceptSchemeTitelInput').value;
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
  newConceptSchemeSource = document.getElementById('conceptSchemeSourceImput').value;
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

readConceptSchemeTitles();