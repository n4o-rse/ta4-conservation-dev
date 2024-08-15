function readData(data, inputType) {
  resetOutput();
  let Data
  if (inputType == "file") {
    const file = document.getElementById("fileInput").files[0];
    if (file.name.endsWith(".tsv")) {
      Data = d3.tsvParse(data);
    }
    else { //(file.name.endsWith(".tsv")) 
      Data = d3.csvParse(data);
    }
  }
  else if (inputType == "url") {
    const textInput = document.getElementById("textInput").value;
    if (textInput.endsWith("tsv")) {
      Data = d3.tsvParse(data);
    }
    else {
      Data = d3.csvParse(data);
    }
  }
  let cleanedArray= cleanTableData(Data);
  let cleanedTableData = cleanedArray[0];
  let ignored = cleanedArray[1];

  let toppedArray = topData(cleanedTableData);
  let toppedData = toppedArray[0];
  //const topPosition = toppedArray[1];
  let orphans = toppedArray[2];

  let idArray = idToName(toppedData)
  let idObject = idArray[0]
  let doublettes = idArray[1]
  let missingParents = idArray[2]
  //test function, delete later
  generateCommentedIdList()
  validation([toppedData, idObject, doublettes, missingParents, ignored, orphans]);
}

function readExample() {
  resetOutput();
  let bibleCSV = `identifier,prefLabel,parent
  Eve,Eve,top
  Cain,Cain,Eve
  Seth,Seth,Eve
  Enos,Enos,Seth
  Noam,Noam,Seth
  Abel,Abel,Eve
  Awan,Awan,Eve
  Enoch,Enoch,Awan
  Azura,Azura,Eve`;
  let csvData = d3.csvParse(bibleCSV);
  let exampleData = csvData
  let cleanedArray= cleanTableData(exampleData);
  let cleanedTableData = cleanedArray[0];
  let ignored = cleanedArray[1];

  let toppedArray = topData(cleanedTableData);
  let toppedData = toppedArray[0];
  //const topPosition = toppedArray[1];
  let orphans = toppedArray[2];
  let idArray = idToName(toppedData)
  let idObject = idArray[0]
  let doublettes = idArray[1]
  let missingParents = idArray[2]
  validation([toppedData, idObject, doublettes, missingParents, ignored, orphans]);
}

function validation([toppedData, idObject, doublettes, missingParents, ignored, orphans]) {
  const hints = [{variable:ignored, id:"ignored"}, {variable:orphans, id:"orphans"}]; //{variable:topPosition, id:"topped"},
  const strings = ["concepts were ignored: ","concepts are orphans: "]; //, "concepts are on top: "
  for (let i = 0; i < hints.length; i++) {
    hintObject = hints[i]
    if (hintObject.variable.length > 0) {
      document.getElementById(hintObject.id).innerHTML = "The following " + strings[i] + "\n" + JSON.stringify(hintObject.variable) + "\n";
    }
  } 
  if (doublettes.length > 0) {
    document.getElementById("doublettes").innerHTML = "ERROR! There are doublettes in the identifiers: " + JSON.stringify(doublettes);
  }
  if (missingParents.length > 0) {
    document.getElementById("missingParents").innerHTML = "ERROR! The parents of the following concepts are missing : " + JSON.stringify(missingParents);
  }
  if ((doublettes.length < 1) && (missingParents.length < 1)) {
    try {
      //document.getElementById("submitButton").innerHTML = "Neue Datei validieren";
      const stratifiedData = stratifyData(toppedData);
      document.getElementById("outputText").innerHTML = "Data successfully validated. \n";
      document.getElementById("outputText").style.color = "green";
      const radioDiv = document.createElement("div");
      radioDiv.id = "radioDiv";
      radioDiv.innerHTML = "Select visualization type: ";
      const radioTypes = ["Indented Tree(Kommentare)","Tidy tree(Kommentare)", "Cluster tree(Kommentare)", "Radial tidy tree", "Radial cluster tree", "Collapsible Tree", "Force directed tree", "Sunburst", "Icicle"];
      let lineBreakStarter = document.createElement("br");
      radioDiv.appendChild(lineBreakStarter);
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
        let lineBreak = document.createElement("br");
        radioDiv.appendChild(lineBreak);
      }
      const button = document.createElement("button");
      button.id = "visualizeButton";
      button.innerHTML = "Tabelle visualisieren";
      button.onclick = function() {visualizeData([stratifiedData, idObject])};
      document.getElementById("chartDiv").before(button);

      //check if there is an Element with id lineBreak
      if (document.getElementById("linebreak") != null) {
        document.getElementById("lineBreak").remove();
      }
      const lineBreak = document.createElement("br");
      lineBreak.id = "lineBreak";
      document.getElementById("visualizeButton").before(radioDiv);
      document.getElementById("Indented Tree(Kommentare)").checked = true;
      document.getElementById("visualizeButton").before(lineBreak);
      return [stratifiedData, idObject];
    } 
    catch (error) {
      console.log(error);
      document.getElementById("errorText").innerHTML = error;
      document.getElementById("errorText").style.color = "red";  
      
    }
  }
  else {
    document.getElementById("outputText").innerHTML = "Data invalid. \n";
    document.getElementById("outputText").style.color = "red";
  }
}

function visualizeData([stratifiedData, idObject]) {
  const visualizationType = document.querySelector('input[name="visualizationType"]:checked').value;
  let svg;
  try {
    if (visualizationType == "Tidy tree(Kommentare)" || visualizationType == "Cluster tree(Kommentare)") {
      svg = generateTidyTree(stratifiedData, idObject, visualizationType);
    }
    if (visualizationType == "Radial tidy tree") {
      svg = generateRadialTidyTree(stratifiedData, idObject);
    }
    if (visualizationType == "Radial cluster tree") {
      svg = generateRadialClusterTree(stratifiedData, idObject);
    }
    if (visualizationType == "Sunburst") {
      svg = generateSunburst(stratifiedData, idObject);
    }
    if (visualizationType == "Force directed tree") {
      svg = generateForceDirectedTree(stratifiedData, idObject);
    }
    if (visualizationType == "Collapsible Tree") {
      svg = generateCollapsibleTree(stratifiedData, idObject);
    }
    if (visualizationType == "Indented Tree(Kommentare)") {
      svg = generateIndentedTree(stratifiedData, idObject);
    }
    if (visualizationType == "Icicle") {
      svg = generateIcicle(stratifiedData, idObject);
    }
    //document.getElementById("chartDiv").innerHTML = svg.outerHTML; ???
    document.getElementById("errorText").innerHTML = "";
    document.getElementById("errorText").style.color = "black";
    document.getElementById("chartDiv").innerHTML = "";
    document.getElementById("chartDiv").append(svg);
    if (!document.getElementById("downloadButton")) {
      const button = document.createElement("button");
      button.id = "downloadButton";
      button.innerHTML = "Download Visualization";
      button.onclick = function() {downloadSvg(svg, visualizationType)};
      document.getElementById("chartDiv").after(button);
    }
  } 
  catch (error) {
    document.getElementById("errorText").innerHTML = error;
    document.getElementById("errorText").style.color = "red";
  }
}

function downloadSvg(svg, visualizationType) {
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
  const ids = ["outputText", "errorText", "ignored", "topped", "orphans", "chartDiv", "doublettes", "missingParents", "radioDiv", "visualizeButton"]; //
  for (let i = 0; i < ids.length; i++) {
    try {
      document.getElementById(ids[i]).innerHTML = "";
    }
    catch (error) {
      // pass 
    }
  }
  //document.getElementById("fileButton").innerHTML = "Tabelle validieren";
  let elements = ["visualizeButton", "radioDiv", "lineBreak", "downloadButton"]
  for (let i = 0; i < elements.length; i++) {
    try {
      document.getElementById(elements[i]).remove();
    }
    catch (error) {
      // pass
    }
  }
  //return to default color
  document.getElementById("outputText").style.color = "black";
}

function cleanTableData(data) {
  const cleanArray = []
  const ignored = []
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    if (row.parent != "ignore") {
      if (row.prefLabel != "" && row.identifier != "") {
        row.identifier = row.identifier.replace(/\s/g, "");
        row.parent = row.parent.replace(/\s/g, "");
        row.prefLabel = row.prefLabel.replace(/\s/g, "");
        cleanArray.push(row);
      }
    }
    else {
      row = {"identifier":row.identifier,"concept":row.prefLabel,"parent":row.parent}
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
    rootArray.push({
    "identifier":"top",
    "prefLabel":"Thesaurus",
    "parent":"",
    "description":"This is the synthetic top concept of the thesaurus.",
    "altLabel":"",
    "related":"",
    "source":"",
    "creator":"",
    "closeMatch":"",
    "relatedMatch":"",
    "seeAlso":"",
    "example":""
  })
  }

  if (orphans.length > 0) {
    rootArray.push({
    "identifier":"orphanage",
    "prefLabel":"orphanage",
    "parent":"top",
    "description":"This is the synthetic top concept of the orphan-terms.",
    "altLabel":"",
    "related":"",
    "source":"",
    "creator":"",
    "closeMatch":"",
    "relatedMatch":"",
    "seeAlso":"",
    "example":""
  })
  }
  return [rootArray, topPosition, orphans];
}

function idToName(data) {
  const transformationObject = {}
  const doublettes = []
  const missingParents = []
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    if (!(row.identifier in transformationObject)) {
      transformationObject[row.identifier] = {};
    }
    if ("concept" in transformationObject[row.identifier]) {
      transformationObject[row.identifier]["concept"].push(row.prefLabel);
    }
    else {
      transformationObject[row.identifier]["concept"] = [];
      transformationObject[row.identifier]["concept"].push(row.prefLabel);
    }
    transformationObject[row.identifier]["prefLabel"] = row.prefLabel;
    transformationObject[row.identifier]["description"] = row.description;
    transformationObject[row.identifier]["altLabel"] = row.altLabel;
    transformationObject[row.identifier]["related"] = row.related;
    transformationObject[row.identifier]["source"] = row.source;
    transformationObject[row.identifier]["creator"] = row.creator;
    transformationObject[row.identifier]["closeMatch"] = row.closeMatch;
    transformationObject[row.identifier]["relatedMatch"] = row.relatedMatch;
    transformationObject[row.identifier]["seeAlso"] = row.seeAlso;
    transformationObject[row.identifier]["example"] = row.example;
  }
  for (let key in transformationObject) {
    if (transformationObject[key]["concept"].length > 1) {
      doublettes.push([key, transformationObject[key]["concept"]]);
    }
  }
  for (let i = 0; i < data.length; i++) {
    row = data[i];
    if (!(row.parent in transformationObject) && !(row.parent == "")) {
      row = {"identifier":row.identifier,"concept":row.prefLabel,"parent":row.parent}
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