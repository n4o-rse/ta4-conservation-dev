async function readSheet() {

  const ids = ["outputText", "errorText", "ignored", "topped", "orphans", "chart", "doublettes", "missingParents"];
  for (let i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).innerHTML = "";
  }
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

  const hints = [{variable:ignored, id:"ignored"}, {variable:topPosition, id:"topped"}, {variable:orphans, id:"orphans"}];
  const strings = ["concepts were ignored: ", "concepts are on top: ","concepts are orphans: "];

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
  //document.getElementById("outputText").innerHTML = "idObject : " + JSON.stringify(idObject);
  if ((doublettes.length < 1) && (missingParents.length < 1)) {
    try {
      const stratifiedData = stratifyData(toppedData)
      const svg = createTidyTree(stratifiedData, idObject);
      document.getElementById("chart").innerHTML = svg.outerHTML;
    } 
    catch (error) {
      document.getElementById("errorText").innerHTML = error;
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

function createTidyTree(data, idObject) {
  const width = 2000; //928

  // Compute the tree height; this approach will allow the height of the
  // SVG to scale according to the breadth (width) of the tree layout.
  const root = d3.hierarchy(data);
  const dx = 25; // 10
  const dy = width / (root.height+1);

  // Create a tree layout.
  const tree = d3.tree().nodeSize([dx, dy]);

  // Sort the tree and apply the layout.
  root.sort((a, b) => d3.ascending(a.data.id, b.data.id));
  tree(root);

  // Compute the extent of the tree. Note that x and y are swapped here
  // because in the tree layout, x is the breadth, but when displayed, the
  // tree extends right rather than down.
  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  // Compute the adjusted height of the tree.
  const height = x1 - x0 + dx * 2;

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-dy / 3, x0 - dx, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

  const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll()
      .data(root.links())
      .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));
  
  const node = svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll()
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

  node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => idObject[d.data.id])
      .attr("stroke", "white")
      .attr("paint-order", "stroke");
  
  return svg.node();
}