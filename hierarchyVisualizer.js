async function readSheet() {

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
  const strings = ["rows were ignored: ", "concepts are on top: ","concepts are orphans: "];

  for (let i = 0; i < hints.length; i++) {
    hintObject = hints[i]
    if (hintObject.variable.length > 0) {
      document.getElementById(hintObject.id).innerHTML = "The following " + strings[i] + "\n" + JSON.stringify(hintObject.variable) + "\n";
    }
  } 

  //const identifierConcepts = idToName(toppedData)

  document.getElementById("outputText").innerHTML = "The resulting Concept-Array is: " + "\n" + JSON.stringify(identifierConcepts) + "\n" //toppedData

  try {
    const stratifiedData = stratifyData(toppedData)
    //document.getElementById("outputText").innerHTML = JSON.stringify(stratifiedData);
    createTree(stratifiedData);
  } catch (error) {
      document.getElementById("errorText").innerHTML = error;
  }
}

/*
async function readSheetFromUrl() {
  let target = document.getElementById("httpInput").value;
  let data = await d3.tsv(target)
  return data;
} 
*/


function readSheetFromFile() {
  let file = document.getElementById("fileInput").files[0];
  let data = d3.tsv(file)
  return data;
}

function cleanTableData(data) {
  const cleanArray = []
  const ignored = []
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    if (row.parent != "ignore") {
      if (row.prefLabel != "") {
        //remove whitespace from row.identifier and row.parent
        row.identifier = row.identifier.replace(/\s/g, "");
        row.parent = row.parent.replace(/\s/g, "");
        row = {"identifier":row.identifier,"concept":row.concept,"parent":row.parent}
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
      orphans.push(row)
      row.parent = "orphanage"
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

/*
function idToName(data) {
  const transformationObject = {}
  for (let i = 0; i < data.length; i++) {
    row = data[i];
    transformationObject.row.identifier = row.concept;
  }
  return transformationObject
}
*/

function stratifyData(data) {
  let stratifiedData = d3.stratify()
    .id((d) => d.identifier)
    .parentId((d) => d.parent)
  (data);
  return stratifiedData;
}

function createTree(data) {
  var treeLayout = d3.tree().size([1200, 600]);
  var root = d3.hierarchy(data); //stratifiedData
  treeLayout(root)
  d3.select("svg g.nodes") 
    .selectAll("circle.node")
    .data(root.descendants())
    .join("circle")
    .classed("node", true)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 10)

  d3.select("svg g.links") 
    .selectAll("line.link")
    .data(root.links())
    .join("line")
    .classed("link", true)
    .style("stroke", "black")
    .attr('x1', function(d) {return d.source.x;})
    .attr('y1', function(d) {return d.source.y;})
    .attr('x2', function(d) {return d.target.x;})
    .attr('y2', function(d) {return d.target.y;});

  d3.select("svg g.nodes")
    .selectAll("text.label")
    .data(root.descendants())
    .join("text")
    .classed("label", true)
    .attr("x", function(d) { return d.x + 15;})
    .attr("y", function(d) { return d.y + 10;})
    .text(d => {
        return d.data.name;
    });
}