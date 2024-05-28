async function readSheet() {
  resetOutput();
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const text = await file.text();
  const tsvData = d3.tsvParse(text);

  const cleanedArray= cleanTableData(tsvData);
  const cleanedTableData = cleanedArray[0];
  const ignored = cleanedArray[1];

  const toppedArray = topData(cleanedTableData);
  const toppedData = toppedArray[0];
  const topPosition = toppedArray[1];
  const orphans = toppedArray[2];

  const hints = [{variable:ignored, id:"ignored"}, {variable:orphans, id:"orphans"}]; //{variable:topPosition, id:"topped"},
  const strings = ["concepts were ignored: ","concepts are orphans: "]; //, "concepts are on top: "

  for (let i = 0; i < hints.length; i++) {
    hintObject = hints[i]
    if (hintObject.variable.length > 0) {
      document.getElementById(hintObject.id).innerHTML = "The following " + strings[i] + "\n" + JSON.stringify(hintObject.variable) + "\n";
    }
  } 

  const idArray = idToName(toppedData)
  const idObject = idArray[0]
  const doublettes = idArray[1]
  const missingParents = idArray[2]
  if (doublettes.length > 0) {
    document.getElementById("doublettes").innerHTML = "ERROR! There are doublettes in the identifiers: " + JSON.stringify(doublettes);
  }
  if (missingParents.length > 0) {
    document.getElementById("missingParents").innerHTML = "ERROR! The parents of the following concepts are missing : " + JSON.stringify(missingParents);
  }
  if ((doublettes.length < 1) && (missingParents.length < 1)) {
    try {
      document.getElementById("fileButton").innerHTML = "Neue Tabelle validieren";
      const stratifiedData = stratifyData(toppedData);
      document.getElementById("outputText").innerHTML = "Data successfully validated. \n";
      //create radio element to select visualization type
      const radioDiv = document.createElement("div");
      radioDiv.id = "radioDiv";
      radioDiv.innerHTML = "Select visualization type: ";
      const radioTypes = ["Tidy tree", "Cluster tree", "Radial tidy tree", "Radial cluster tree"]; //, "Sunburst"
      for (let i = 0; i < radioTypes.length; i++) {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "visualizationType";
        radio.value = radioTypes[i];
        radio.id = radioTypes[i];
        radioDiv.appendChild(radio);
        const label = document.createElement("label");
        label.htmlFor = radioTypes[i];
        label.innerHTML = radioTypes[i];
        radioDiv.appendChild(label);
      }
      const button = document.createElement("button");
      button.id = "visualizeButton";
      button.innerHTML = "Tabelle visualisieren";
      button.onclick = function() {visualizeData([stratifiedData, idObject])};
      document.getElementById("chart").before(button);
      const lineBreak = document.createElement("br");
      document.getElementById("visualizeButton").before(radioDiv);
      document.getElementById("Tidy tree").checked = true;
      document.getElementById("visualizeButton").before(lineBreak);
      return [stratifiedData, idObject];
    } 
    catch (error) {
      document.getElementById("errorText").innerHTML = error;
    }
  }
}

function visualizeData([stratifiedData, idObject]) {
  const visualizationType = document.querySelector('input[name="visualizationType"]:checked').value;
  let svg;
  try {
    // check if visualization type has value "Tidy tree" or "Cluster tree"
    if (visualizationType == "Tidy tree" || visualizationType == "Cluster tree") {
      svg = createTidyTree(stratifiedData, idObject, visualizationType);
      document.getElementById("chart").innerHTML = svg.outerHTML;
    }
    if (visualizationType == "Radial tidy tree") {
      svg = generateRadialTidyTree(stratifiedData, idObject);
      document.getElementById("chart").innerHTML = svg.outerHTML;
    }
    if (visualizationType == "Radial cluster tree") {
      svg = generateRadialClusterTree(stratifiedData, idObject);
      document.getElementById("chart").innerHTML = svg.outerHTML;
    }
    if (visualizationType == "Sunburst") {
      svg = generateSunburst(stratifiedData, idObject);
      document.getElementById("chart").innerHTML = svg.outerHTML;
    }
    // create button to download svg file if no element with id "downloadButton" exists
    if (!document.getElementById("downloadButton")) {
      const button = document.createElement("button");
      button.id = "downloadButton";
      button.innerHTML = "Download Visualization";
      button.onclick = function() {downloadSvg(svg)};
      document.getElementById("chart").after(button);
    }
  } 
  catch (error) {
    document.getElementById("errorText").innerHTML = error;
  }
}

function downloadSvg(svg) {
  const visualizationType = document.querySelector('input[name="visualizationType"]:checked').value;
  const svgString = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgString], {type: "image/svg+xml"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = visualizationType + ".svg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function resetOutput() {
  const ids = ["outputText", "errorText", "ignored", "topped", "orphans", "chart", "doublettes", "missingParents"]; //
  for (let i = 0; i < ids.length; i++) {
    try {
      document.getElementById(ids[i]).innerHTML = "";
    }
    catch (error) {
      //ignore console.log(error);
    }
  }
  document.getElementById("fileButton").innerHTML = "Tabelle validieren";
  let elements = ["visualizeButton", "radioDiv", "lineBreak", "downloadButton"]
  for (let i = 0; i < elements.length; i++) {
    try {
      document.getElementById(elements[i]).remove();
    }
    catch (error) {
      // ignore console.log(error);
    }
  }
}

function cleanTableData(data) {
  const cleanArray = []
  const ignored = []
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    if (row.parent != "ignore") {
      if (row.prefLabel != "") {
        row.identifier = row.identifier.replace(/\s/g, "");
        row.parent = row.parent.replace(/\s/g, "");
        row.prefLabel = row.prefLabel.replace(/\s/g, "");
        row = {"identifier":row.identifier,"concept":row.prefLabel,"parent":row.parent}
        cleanArray.push(row);
      }
    }
    else {
      row = {"identifier":row.identifier,"concept":row.concept,"parent":row.parent}
      ignored.push(row);
    }
  }
  return [cleanArray, ignored];
}

function topData(data) {
  const rootArray = []
  const topPosition = []
  const orphans = []
  let topCount = 0;

  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    if (row.parent == "top") {
      topCount++;
      rootArray.push(row)
      topPosition.push(row)
    }
    else if (row.parent == "") {
      row.parent = "orphanage"
      orphans.push(row)
      rootArray.push(row)
    }
    else {
      rootArray.push(row)
    }
  }
  if (topCount > 0) {
    rootArray.push({"identifier":"top","concept":"Thesaurus","parent":""})
  }

  if (orphans.length > 0) {
    rootArray.push({"identifier":"orphanage","concept":"orphanage","parent":"top"})
  }
  return [rootArray, topPosition, orphans];
}

function idToName(data) {
  const transformationObject = {}
  const doublettes = []
  const missingParents = []
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    if (row.identifier in transformationObject) {
      transformationObject[row.identifier].push(row.concept);

    }
    else {
      transformationObject[row.identifier] = [row.concept];
    }
  }
  for (let key in transformationObject) {
    if (transformationObject[key].length > 1) {
      doublettes.push([key, transformationObject[key]]);
    }
  }
  for (let i = 0; i < data.length; i++) {
    row = data[i];
    if (!(row.parent in transformationObject) && !(row.parent == "")) {
      missingParents.push(row);
    }
  }
  return [transformationObject, doublettes, missingParents];
}

function stratifyData(data) {
  let stratifiedData = d3.stratify()
    .id((d) => d.identifier)
    .parentId((d) => d.parent)
  (data);
  return stratifiedData;
}