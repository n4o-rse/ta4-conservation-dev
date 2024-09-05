/* temporary disabled for commentation process
const fileForm = document.getElementById('fileForm');
fileForm.addEventListener('submit', inputFile);
*/

const textForm = document.getElementById('textForm');
textForm.addEventListener('submit', inputUrl);

const closeModalButton = document.getElementsByClassName("close")[0];
closeModalButton.onclick = closeModal();

function inputFile() {
    event.preventDefault();
    const inputFile = document.getElementById('fileInput');
    const file = inputFile.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
      result = e.target.result;
      readData(result, "file")
    };
    reader.readAsText(file);
}

async function inputUrl() {
    event.preventDefault();
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

function closeModal() {
  event.preventDefault();
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}