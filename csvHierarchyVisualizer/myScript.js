  /*
  const tableObject = {
    "name": "Asia",
    "children": [
        {
            "name": "Vietnam",
            "children": [
                {
                    "name": "Saigon"
                }
            ]
            
        },
        {
            "name": "India",
            "children": [
                {
                    "name": "Mumbai"
                }
            ]
            
        }
    ]
  }
  */

async function readSheet() {
  // /*
  try {
    //const target = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCho2k88nLWrNSXj4Mgj_MwER5GQ9zbZ0OsO3X_QPa9s-3UkoeLLQHuNHoFMKqCFjWMMprKVHMZzOj/pub?output=tsv";
    const target = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUwEkMkH3Tsllx32stLHYmmLubG8gmkGYgxPrlqQo4Hz939ajwvKJawDxXRzKwQ_h5wvMP4TblUdC4/pub?output=tsv"
    const text = await getText(target);
    // remove all "\r" from text
    const cleanedText = text.replace(/\r/g, "");
    const tableObject = d3.tsvParse(cleanedText);
    const stratifiedData = d3.stratify()
    .id((d) => d.ID)
    .parentId((d) => d.Parent)
    (tableObject);

    chart = copyPastaSVG(stratifiedData, {    // The JSON data
      label: (d) => d.name,  // Name on the node
      width: 400,            // width of chart
      dyNode: 50,            // height of node
    });

    document.getElementById("output").appendChild(chart);
  } catch (error) {
    document.getElementById("output").innerHTML = error;
  }

  //easyTree(tableObject)  

  //const chart = easyTree(tableObject);
  //const svgElement = document.getElementById("outputSVG")
  //svgElement.appendChild(chart);

  //paragraph = document.getElementById("outputText");
  //paragraph.innerHTML = hierarchy; //JSON.stringify()
}

async function getText(url) {
    try {
    const proxyUrl = "https://corsproxy.io/?";
    const response = await fetch(proxyUrl + encodeURIComponent(url));
    const data = await response.text();
    return data;
    } catch (error) {
      return error;
    }
  }

/*
function easyTree(data) {
  var treeLayout = d3.tree().size([400, 200]);
  var root = d3.hierarchy(data); 
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
*/

function copyPastaSVG(
  data,
  {
    // data is either tabular (array of objects) or hierarchy (nested objects)
    path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
    id = Array.isArray(data) ? (d) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
    parentId = Array.isArray(data) ? (d) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
    children, // if hierarchical data, given a d in data, returns its children
    tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
    sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
    label, // given a node d, returns the display name
    title, // given a node d, returns its hover text
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links (if any)
    width = 640, // outer width, in pixels
    height, // outer height, in pixels
    r = 3, // radius of nodes
    padding = 1, // horizontal padding for first and last column
    fill = "#999", // fill for nodes
    fillOpacity, // fill opacity for nodes
    stroke = "#555", // stroke for links
    strokeWidth = 1.5, // stroke width for links
    strokeOpacity = 0.4, // stroke opacity for links
    strokeLinejoin, // stroke line join for links
    strokeLinecap, // stroke line cap for links
    halo = "#fff", // color of label halo
    haloWidth = 3, // padding around the labels
    curve = d3.curveBumpX, // curve for the link
    dyNode = 10 // vertical height of node
  } = {}
) {
  // If id and parentId options are specified, or the path option, use d3.stratify
  // to convert tabular data to a hierarchy; otherwise we assume that the data is
  // specified as an object {children} with nested objects (a.k.a. the “flare.json”
  // format), and use d3.hierarchy.
  const root =
    path != null
      ? d3.stratify().path(path)(data)
      : id != null || parentId != null
      ? d3.stratify().id(id).parentId(parentId)(data)
      : d3.hierarchy(data, children);

  // Sort the nodes.
  if (sort != null) root.sort(sort);

  // Compute labels and titles.
  const descendants = root.descendants();
  const L = label == null ? null : descendants.map((d) => label(d.data, d));

  // Compute the layout.
  const dx = dyNode; // vertical height of node
  const dy = (width / (root.height + padding)) * 0.9; // reduced width by 90%, default is without *.9
  tree().nodeSize([dx, dy])(root);

  // Center the tree.
  let x0 = Infinity;
  let x1 = -x0;
  root.each((d) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  // Compute the default height.
  if (height === undefined) height = x1 - x0 + dx * 2;

  // Use the required curve
  if (typeof curve !== "function") throw new Error(`Unsupported curve`);

  const svg = d3
    .create("svg")
    .attr("viewBox", [(-dy * padding) / 2, x0 - dx, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10);

  svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", stroke)
    .attr("stroke-opacity", strokeOpacity)
    .attr("stroke-linecap", strokeLinecap)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-width", strokeWidth)
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr(
      "d",
      d3
        .link(curve)
        .x((d) => d.y)
        .y((d) => d.x)
    );

  const node = svg
    .append("g")
    .selectAll("a")
    .data(root.descendants())
    .join("a")
    .attr("xlink:href", link == null ? null : (d) => link(d.data, d))
    .attr("target", link == null ? null : linkTarget)
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  node
    .append("circle")
    .attr("fill", (d) => (d.children ? stroke : fill))
    .attr("r", r);

  if (title != null) node.append("title").text((d) => title(d.data, d));

  if (L)
    node
      .append("text")
      .attr("dy", "0.32em")
      .attr("x", (d) => (d.children ? -6 : 6))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .attr("paint-order", "stroke")
      .attr("stroke", halo)
      .attr("stroke-width", haloWidth)
      .text((d, i) => L[i]);

  return svg.node();
};

/*
function createTree(data) {
  chart = {
    const width = 928;
    // compute tree height
    const root = d3.hierarchy(data);
    const dx = 10;
    const dy = width / (root.height + 1);
    //create tree layout
    const tree = d3.tree().nodeSize([dx, dy]);
    // sort tree and apply layout
    root.sort((a,b) => d3.ascending(a.data.name, b.data.name));
    tree(root);
    //compute extend of tree
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });
    //compute adjusted height of tree
    const height = x1 - x0 + dx * 2;
    //create svg element
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
        .text(d => d.data.name)
        .attr("stroke", "white")
        .attr("paint-order", "stroke");

    return svg.node();
      }
}
*/

/*
function createTableObject(text) {
  const rows = text.split("\n");
  tableObject = {};
  const attributes = rows[0].split("\t");
  for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split("\t");
      if (columns[1].length > 0) {
        tableObject[columns[0]] = {}
        for (let j = 1; j < columns.length; j++) {
          tableObject[columns[0]][attributes[j]] = columns[j];
        }
      }
    }
  return tableObject;
}
*/