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

// global variables and event listeners

const thesaurusFileInputForm = document.getElementById('fileForm');
thesaurusFileInputForm.addEventListener('submit', thesaurusInputFile);

const thesaurusUrlInputForm = document.getElementById('textForm');
thesaurusUrlInputForm.addEventListener('submit', thesaurusInputUrl);

const commentForm = document.getElementById("commentForm");
commentForm.addEventListener("submit", updatePod);