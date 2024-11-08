async function checkTableFormat(input) {
  // display loading popup until every following function is finished
  document.getElementById("loadingDiv").style.display = "block";
  let csv;
  if (input.name.endsWith(".xlsx")) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      var sheetName = workbook.SheetNames[0];
      var sheet = workbook.Sheets[sheetName];
      csv = XLSX.utils.sheet_to_csv(sheet);
    };
    reader.readAsBinaryString(file);
  } else {
    let reader = new FileReader();
    reader.onload = function(e) {
      csv = e.target.result;
    };
    reader.readAsText(input);
  }
  let Data = d3.csvParse(csv);
  
  // wait to make sure the loadingDiv is displayed and user knows different data is loaded
  await new Promise(r => setTimeout(r, 2000));
  readData(Data);
}

function readData(Data) {
  let cleanedArray= cleanTableData(Data);
  let cleanedTableData = cleanedArray[0];
  let ignored = cleanedArray[1];

  let toppedArray = topData(cleanedTableData);
  let toppedData = toppedArray[0];
  let topPosition = toppedArray[1];
  let orphans = toppedArray[2];

  let idArray = idToName(toppedData)
  let idObject = idArray[0]
  let doublettes = idArray[1]
  let missingParents = idArray[2]
  validation([toppedData, idObject, doublettes, missingParents, ignored, topPosition, orphans]);
}

function validation([toppedData, idObject, doublettes, missingParents, ignored, topPosition, orphans]) {
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
      const stratifiedData = stratifyData(toppedData);
      document.getElementById("loadingDiv").style.display = "none";
      document.getElementById("outputText").innerHTML = "Data successfully validated. \n";
      document.getElementById("outputText").style.color = "green";
      const radioDiv = document.createElement("div");
      radioDiv.id = "radioDiv";
      radioDiv.innerHTML = "Select visualization type: ";
      const radioTypes = ["Indented Tree","Tidy tree", "Cluster tree", "Radial tidy tree", "Radial cluster tree", "Collapsible Tree", "Sunburst(keine Kommentare)", "Icicle"]; //"Force directed tree",
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
      let visualizationButton = document.createElement("button");
      visualizationButton.id = "visualizeButton";
      visualizationButton.innerHTML = "Tabelle visualisieren";
      visualizationButton.onclick = function() {visualizeData([stratifiedData, idObject])};

      let thesaurusDownloadButton = document.createElement("button");
      thesaurusDownloadButton.id = "thesaurusDownloadButton";
      thesaurusDownloadButton.innerHTML = "Thesaurus herunterladen";
      thesaurusDownloadButton.onclick = function() {collectThesaurusData(idObject, topPosition)};

      document.getElementById("chartDiv").before(visualizationButton);
      document.getElementById("chartDiv").before(thesaurusDownloadButton);
      //check if there is an Element with id lineBreak
      if (document.getElementById("linebreak") != null) {
        document.getElementById("lineBreak").remove();
      }
      const lineBreak = document.createElement("br");
      lineBreak.id = "lineBreak";
      document.getElementById("visualizeButton").before(radioDiv);
      document.getElementById("Indented Tree").checked = true;
      document.getElementById("visualizeButton").before(lineBreak);
    } 
    catch (error) {
      console.log(error);
      document.getElementById("loadingDiv").style.display = "none";
      document.getElementById("errorText").innerHTML = error;
      document.getElementById("errorText").style.color = "red";
    }
  }
  else {
    document.getElementById("loadingDiv").style.display = "none";
    document.getElementById("outputText").innerHTML = "Data invalid. \n";
    document.getElementById("outputText").style.color = "red";
  }
}

async function visualizeData([stratifiedData, idObject]) {
  // ["Indented Tree","Tidy tree", "Cluster tree", "Radial tidy tree", "Radial cluster tree", "Collapsible Tree", "Sunburst(keine Kommentare)", "Icicle"]; //"Force directed tree",
  let commentConceptObject = await generateCommentedIdList();
  let visualizationType = document.querySelector('input[name="visualizationType"]:checked').value;
  let svg;
  let visualizationObject = {
    "Indented Tree": () => {return generateIndentedTree(stratifiedData, idObject, commentConceptObject)},
    "Tidy tree": () => {return generateTidyTree(stratifiedData, idObject, visualizationType, commentConceptObject)}, 
    "Cluster tree": () => {return generateTidyTree(stratifiedData, idObject, visualizationType, commentConceptObject)}, 
    "Radial tidy tree": () => {return generateRadialTidyTree(stratifiedData, idObject, commentConceptObject)}, 
    "Radial cluster tree": () => {return generateRadialClusterTree(stratifiedData, idObject, commentConceptObject)}, 
    "Collapsible Tree": () => {return generateCollapsibleTree(stratifiedData, idObject, commentConceptObject)}, 
    "Sunburst(keine Kommentare)": () => {return generateSunburst(stratifiedData, idObject, commentConceptObject)}, 
    "Icicle": () => {return generateIcicle(stratifiedData, idObject, commentConceptObject)}
  }
  try {
    // call the visualization function as value of they key visualizationType
    svg = visualizationObject[visualizationType]();
    document.getElementById("errorText").innerHTML = "";
    document.getElementById("errorText").style.color = "black";
    document.getElementById("chartDiv").innerHTML = "";
    document.getElementById("chartDiv").append(svg);
    if (!document.getElementById("downloadButton")) {
      const button = document.createElement("button");
      button.id = "downloadButton";
      button.innerHTML = "Visualisierung herunterladen";
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
  let ids = ["outputText", "errorText", "ignored", "topped", "orphans", "chartDiv", "doublettes", "missingParents", "radioDiv", "visualizeButton"];
  for (let i = 0; i < ids.length; i++) {
    // check if getElementById(ids[i]) exists
    if (document.getElementById(ids[i]) != null) {
      document.getElementById(ids[i]).innerHTML = "";
    }
  }
  let elements = ["visualizeButton", "radioDiv", "lineBreak", "downloadButton", "thesaurusDownloadButton"];
  for (let i = 0; i < elements.length; i++) {
    // check if getElementById(elements[i]) exists
    if (document.getElementById(elements[i]) != null) {
      document.getElementById(elements[i]).remove();
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
    // iterate over all row properties and remove whitespaces
    for (let key in row) {
      row[key] = row[key].trim();
    }
    if (row.parent != "ignore") {
      if (row.prefLabel != "" && row.identifier != "") {
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
      orphans.push({"identifier":row.identifier,"concept":row.prefLabel})
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
    "altLabel":"",
    "translation":"",
    "description":"Der Thesarus als Beginn der Hierarchie.",
    "parent":"",
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
    "prefLabel":"Waisenhaus",
    "altLabel":"",
    "translation":"",
    "description":"Hierhin werden Begriffe verschoben, die keine Elternteil haben.",
    "parent":"top",
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
    // using concept as key to store all prefLabels of the same identifier
    if ("concept" in transformationObject[row.identifier]) {
      transformationObject[row.identifier]["concept"].push(row.prefLabel);
    }
    else {
      transformationObject[row.identifier]["concept"] = [];
      transformationObject[row.identifier]["concept"].push(row.prefLabel);
    }
    transformationObject[row.identifier]["prefLabel"] = row.prefLabel;
    transformationObject[row.identifier]["altLabel"] = row.altLabel;
    transformationObject[row.identifier]["translation"] = row.translation;
    transformationObject[row.identifier]["description"] = row.description;
    transformationObject[row.identifier]["parent"] = row.parent;
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