//TidyTree and ClusterTree
function generateTidyTree(data, idObject, visualizationType, commentConceptObject) {
    const width = 2000; //928
    let tree = d3.tree();
  
    // Compute the tree height; this approach will allow the height of the
    // SVG to scale according to the breadth (width) of the tree layout.
    const root = d3.hierarchy(data);
    const dx = 25; // 10
    const dy = width / (root.height+1);
  
    // Create a tree layout.
    if (visualizationType == "Tidy tree") {
      tree = d3.tree().nodeSize([dx, dy]);
    }
    if (visualizationType == "Cluster tree") {
      tree = d3.cluster().nodeSize([dx, dy]);
    }
    //const tree = d3.tree().nodeSize([dx, dy]);
  
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
        .text(d => idObject[d.data.id]["prefLabel"])
        .attr("fill", d => d.data.id in commentConceptObject ? commentConceptObject[d.data.id] : "black")
        .attr("stroke", "white")
        .attr("paint-order", "stroke");

    node.on("click", (e, d) => openDetails(d.data.id, idObject));
    
    return svg.node();
  }

  function generateRadialTidyTree(data, idObject, commentConceptObject) {
    // Specify the chart’s dimensions.
  const width = 2000;
  const height = width;
  const cx = width * 0.5; // adjust as needed to fit
  const cy = height * 0.59; // adjust as needed to fit
  const radius = Math.min(width, height) / 2 - 30;

  // Create a radial tree layout. The layout’s first dimension (x)
  // is the angle, while the second (y) is the radius.
  const tree = d3.tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

  // Sort the tree and apply the layout.
  const root = tree(d3.hierarchy(data)
      .sort((a, b) => d3.ascending(idObject[a.data.id], idObject[b.data.id]))); 

  // Creates the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

  // Append links.
  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll()
    .data(root.links())
    .join("path")
      .attr("d", d3.linkRadial()
          .angle(d => d.x)
          .radius(d => d.y));

  // Append nodes.
  svg.append("g")
    .selectAll()
    .data(root.descendants())
    .join("circle")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

  // Append labels.
  svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll()
    .data(root.descendants())
    .join("text")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("fill", "currentColor")
      //.attr("fill", d => d.data.id in commentConceptObject ? commentConceptObject[d.data.id] : "black")
      .text(d => idObject[d.data.id]["prefLabel"])
      .on("click", (e, d) => openDetails(d.data.id, idObject));

  return svg.node();
  }

  function generateRadialClusterTree(data, idObject, commentConceptObject) {
      // Specify the chart’s dimensions.
  const width = 2000;
  const height = width;
  const cx = width * 0.5; // adjust as needed to fit
  const cy = height * 0.54; // adjust as needed to fit
  const radius = Math.min(width, height) / 2 - 80;

  // Create a radial cluster layout. The layout’s first dimension (x)
  // is the angle, while the second (y) is the radius.
  const tree = d3.cluster()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

  // Sort the tree and apply the layout.
  const root = tree(d3.hierarchy(data)
      .sort((a, b) => d3.ascending(idObject[a.data.id], idObject[b.data.id])));

  // Creates the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

  // Append links.
  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll()
    .data(root.links())
    .join("path")
      .attr("d", d3.linkRadial()
          .angle(d => d.x)
          .radius(d => d.y));

  // Append nodes.
  svg.append("g")
    .selectAll()
    .data(root.descendants())
    .join("circle")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

  // Append labels.
  svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll()
    .data(root.descendants())
    .join("text")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("fill", "currentColor")
      //.attr("fill", d => d.data.id in commentConceptObject ? commentConceptObject[d.data.id] : "black")
      .text(d => idObject[d.data.id]["prefLabel"])
      .on("click", (e, d) => openDetails(d.data.id, idObject));

  return svg.node();
  }

  function generateSunburst(data, idObject, commentConceptObject) {
  // used for sunburst
  function autoBox() {
    document.body.appendChild(this);
    const {x, y, width, height} = this.getBBox();
    document.body.removeChild(this);
    return [x, y, width, height];
  }
  // Specify the chart’s colors and approximate radius (it will be adjusted at the end).
  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
  const radius = 2000 / 2;

  // Prepare the layout.
  const partition = data => d3.partition()
    .size([2 * Math.PI, radius])
  (d3.hierarchy(data)
    .sum(d => 1)
    .sort((a, b) => b.value - a.value)); //

  const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1);

  const root = partition(data);

  // Create the SVG container.
  const svg = d3.create("svg");

  // Add an arc for each element, with a title for tooltips.
  const format = d3.format(",d");
  svg.append("g")
      .attr("fill-opacity", 0.6)
    .selectAll("path")
    .data(root.descendants().filter(d => d.depth))
    .join("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(idObject[d.data.id]["prefLabel"]); })
      .attr("d", arc)
    .append("title")
      .text(d => `${d.ancestors().map(d => idObject[d.data.id]["prefLabel"]).reverse().join("/")}\n${format(d.value)}`);

  // Add a label for each element.
  svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
    .join("text")
      .attr("transform", function(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text(d => idObject[d.data.id]["prefLabel"]);
      //.attr("fill", d => d.data.id in commentConceptObject ? commentConceptObject[d.data.id] : "black");
      //.on("click", (e, d) => openDetails(d.data.id, idObject));

  // The autoBox function adjusts the SVG’s viewBox to the dimensions of its contents.
  return svg.attr("viewBox", autoBox).node(); //
  }

// Validation Method from observable missing
function generateForceDirectedTree(data, idObject, commentConceptObject) {

  // for force directed tree
  drag = simulation => {
  
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

    // Specify the chart’s dimensions.
    const width = 2000;
    const height = 1000;
  
    // Compute the graph and start the force simulation.
    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();
  
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(1))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("x", d3.forceX())
        .force("y", d3.forceY());
  
    // Create the container SVG.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");
  
    // Append links.
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");
  
    // Append nodes.
    const node = svg.append("g")
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("fill", d => d.children ? null : "#000")
        .attr("stroke", d => d.children ? null : "#fff")
        .attr("r", 3.5)
        .call(drag(simulation));
  
    node.append("title")
        .text(d => idObject[d.data.id]["prefLabel"]);
  
    simulation.on("tick", () => {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    });
  
    //invalidation.then(() => simulation.stop());
  
    return svg.node();
  }

  function generateCollapsibleTree(data, idObject, commentConceptObject) {

    // Specify the charts’ dimensions. The height is variable, depending on the layout.
    const width = 2000;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 10;
    const marginLeft = 40;
  
    // Rows are separated by dx pixels, columns by dy pixels. These names can be counter-intuitive
    // (dx is a height, and dy a width). This because the tree must be viewed with the root at the
    // “bottom”, in the data domain. The width of a column is based on the tree’s height.
    const root = d3.hierarchy(data);
    const dx = 30;
    const dy = (width - marginRight - marginLeft) / (1 + root.height);
  
    // Define the tree layout and the shape for links.
    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);
  
    // Create the SVG container, a layer for the links and a layer for the nodes.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", dx)
        .attr("viewBox", [-marginLeft, -marginTop, width, dx])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; user-select: none;");
  
    const gLink = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);
  
    const gNode = svg.append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");
  
    function update(event, source) {
      const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition
      const nodes = root.descendants().reverse();
      const links = root.links();
  
      // Compute the new tree layout.
      tree(root);
  
      let left = root;
      let right = root;
      root.eachBefore(node => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });
  
      const height = right.x - left.x + marginTop + marginBottom;
  
      const transition = svg.transition()
          .duration(duration)
          .attr("height", height)
          .attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
          .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));
  
      // Update the nodes…
      const node = gNode.selectAll("g")
        .data(nodes, d => d.id);
  
      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
          .attr("transform", d => `translate(${source.y0},${source.x0})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);
  
      nodeEnter.append("circle")
          .attr("r", 2.5)
          .attr("fill", d => d._children ? "#555" : "#999")
          .on("click", (event, d) => {
            d.children = d.children ? null : d._children;
            update(event, d);
          })
          .attr("stroke-width", 10);
  
      nodeEnter.append("text")
          .attr("dy", "0.31em")
          .attr("x", d => d._children ? -6 : 6)
          .attr("text-anchor", d => d._children ? "end" : "start")
          .text(d => idObject[d.data.id]["prefLabel"])
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .attr("stroke", "white")
          .on("click", (e, d) => openDetails(d.data.id, idObject))
          //.attr("fill", d => d.data.id in commentConceptObject ? commentConceptObject[d.data.id] : "black")
          .attr("paint-order", "stroke");
  
      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
          .attr("transform", d => `translate(${d.y},${d.x})`)
          .attr("fill-opacity", 1)
          .attr("stroke-opacity", 1);
  
      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
          .attr("transform", d => `translate(${source.y},${source.x})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);
  
      // Update the links…
      const link = gLink.selectAll("path")
        .data(links, d => d.target.id);
  
      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append("path")
          .attr("d", d => {
            const o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });
  
      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
          .attr("d", diagonal);
  
      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
          .attr("d", d => {
            const o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          });
  
      // Stash the old positions for transition.
      root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
  
    // Do the first update to the initial configuration of the tree — where a number of nodes
    // are open (arbitrarily selected as the root, plus nodes with 7 letters).
    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth && idObject[d.data.id]["prefLabel"].length !== 7) d.children = null;
    });
  
    update(null, root);
  
    return svg.node();
  }

  function generateIndentedTree(data, idObject, commentConceptObject) {
    const format = d3.format(",");
    const nodeSize = 17;
    const root = d3.hierarchy(data).eachBefore((i => d => d.index = i++)(0));
    const nodes = root.descendants();
    const width = 928;
    const height = (nodes.length + 1) * nodeSize;
  
    const columns = [
      /*
      {
        label: "Size", 
        value: d => d.value, 
        format, 
        x: 280
      },
      */
      {
        label: "Count", 
        value: d => d.children ? 0 : 1, 
        format: (value, d) => d.children ? format(value) : "-", 
        x: 340
      }
    ];
  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-nodeSize / 2, -nodeSize * 3 / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; overflow: visible;");
  
    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#999")
      .selectAll()
      .data(root.links())
      .join("path")
        .attr("d", d => `
          M${d.source.depth * nodeSize},${d.source.index * nodeSize}
          V${d.target.index * nodeSize}
          h${nodeSize}
        `);
  
    const node = svg.append("g")
      .selectAll()
      .data(nodes)
      .join("g")
        .attr("transform", d => `translate(0,${d.index * nodeSize})`);
  
    node.append("circle")
        .attr("cx", d => d.depth * nodeSize)
        .attr("r", 2.5)
        .attr("fill", d => d.children ? null : "#999");
  
    node.append("text")
        .attr("dy", "0.32em")
        .attr("x", d => d.depth * nodeSize + 6)
        .text(d => idObject[d.data.id]["prefLabel"])
        // fill commented nodes red
        .attr("fill", d => d.data.id in commentConceptObject ? commentConceptObject[d.data.id] : "black");
  
    node.append("title")
        .text(d => d.ancestors().reverse().map(d => idObject[d.data.id]["prefLabel"]).join("/"));
  
    for (const {label, value, format, x} of columns) {
      svg.append("text")
          .attr("dy", "0.32em")
          .attr("y", -nodeSize)
          .attr("x", x)
          .attr("text-anchor", "end")
          .attr("font-weight", "bold")
          .text(label);
  
      node.append("text")
          .attr("dy", "0.32em")
          .attr("x", x)
          .attr("text-anchor", "end")
          .attr("fill", d => d.children ? null : "#555")
          .data(root.copy().sum(value).descendants())
          .text(d => format(d.value, d));
          // set color of text to red, if commentedIdList includes d.data.id
          // alternative not working: d => commentedIdList.includes(d.data.id) ? "red" : "#555"
          // also not working: .attr("fill", determineColor(d.data.id, commentedIdList));
    }

  node.on("click", (e, d) => openDetails(d.data.id, idObject));
  return svg.node();
  }

function generateIcicle(data, idObject, commentConceptObject) {
    // Specify the chart’s dimensions.
    const width = 2000;
    const height = 3000;
    const format = d3.format(",d");
  
    // Create a color scale (a color for each child of the root node and their descendants).
    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
  
    // Create a partition layout.
    const partition = d3.partition()
        .size([height, width])
        .padding(1);
  
    // Apply the partition layout.
    const root = partition(d3.hierarchy(data)
        .sum(d => 1) //d.value
        .sort((a, b) => b.height - a.height || b.value - a.value));
  
    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif");
  
    // Add a cell for each node of the hierarchy.
    const cell = svg
      .selectAll()
      .data(root.descendants())
      .join("g")
        .attr("transform", d => `translate(${d.y0},${d.x0})`);
  
    cell.append("title")
        .text(d => `${d.ancestors().map(d => idObject[d.data.id]["prefLabel"]).reverse().join("/")}\n${format(d.value)}`);
  
    // Color the cell with respect to which child of root it belongs to. 
    cell.append("rect")
        .attr("width", d => d.y1 - d.y0)
        .attr("height", d => d.x1 - d.x0)
        .attr("fill-opacity", 0.6)
        .attr("fill", d => {
          if (!d.depth) return "#ccc";
          while (d.depth > 1) d = d.parent;
          return color(idObject[d.data.id]["prefLabel"]);
        });
  
    // Add labels and a title.
    const text = cell.filter(d => (d.x1 - d.x0) > 16).append("text")
        .attr("x", 4)
        .attr("y", 13);
  
    text.append("tspan")
        .text(d => idObject[d.data.id]["prefLabel"]);
  
    text.append("tspan")
        .attr("fill-opacity", 0.7)
        .text(d => ` ${format(d.value)}`);

    text.on("click", (e, d) => openDetails(d.data.id, idObject));
  
    return svg.node();
  }

  function generateGraphWithLabels(data){
    return ForceGraph(data, {
        nodeId: d => d.id,
        nodeGroup: d => d.group,
        nodeTitle: d => `${d.id}`, //\n${d.group}
        linkStrokeWidth: l => Math.sqrt(l.value),
        width: 1000,
        height: 500,
        //invalidation // a promise to stop the simulation when the cell is re-run
      });
      function ForceGraph(
        {
          nodes, // an iterable of node objects (typically [{id}, …])
          links // an iterable of link objects (typically [{source, target}, …])
        },
        {
          nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
          nodeGroup, // given d in nodes, returns an (ordinal) value for color
          nodeGroups, // an array of ordinal values representing the node groups
          nodeTitle, // given d in nodes, a title string
          nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
          nodeStroke = "#fff", // node stroke color
          nodeStrokeWidth = 1.5, // node stroke width, in pixels
          nodeStrokeOpacity = 1, // node stroke opacity
          nodeRadius = 5, // node radius, in pixels
          nodeStrength,
          linkSource = ({ source }) => source, // given d in links, returns a node identifier string
          linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
          linkStroke = "#999", // link stroke color
          linkStrokeOpacity = 0.6, // link stroke opacity
          linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
          linkStrokeLinecap = "round", // link stroke linecap
          linkStrength,
          colors = d3.schemeTableau10, // an array of color strings, for the node groups
          width = 100,//640, // outer width, in pixels
          height = 500,//400, // outer height, in pixels
          invalidation // when this promise resolves, stop the simulation
        } = {}
      ) {
        // Compute values.
        const N = d3.map(nodes, nodeId).map(intern);
        const LS = d3.map(links, linkSource).map(intern);
        const LT = d3.map(links, linkTarget).map(intern);
        if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
        const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
        const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
        const W =
          typeof linkStrokeWidth !== "function"
            ? null
            : d3.map(links, linkStrokeWidth);
        const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);
      
        // Replace the input nodes and links with mutable objects for the simulation.
        nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
        links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i] }));
      
        // Compute default domains.
        if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);
      
        // Construct the scales.
        const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);
      
        // Construct the forces.
        const forceNode = d3.forceManyBody().strength(-100);
        const forceLink = d3.forceLink(links).id(({ index: i }) => N[i]);
        if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
        if (linkStrength !== undefined) forceLink.strength(linkStrength);
      
        const simulation = d3
          .forceSimulation(nodes)
          .force("link", forceLink)
          .force("charge", forceNode)
          .force("center", d3.forceCenter())
          .on("tick", ticked);
      
        const svg = d3
          .create("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      
        const link = svg
          .append("g")
          .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
          .attr("stroke-opacity", linkStrokeOpacity)
          .attr(
            "stroke-width",
            typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
          )
          .attr("stroke-linecap", linkStrokeLinecap)
          .selectAll("line")
          .data(links)
          .join("line");
      
        const node = svg
          .append("g")
          .attr("fill", nodeFill)
          .attr("stroke", nodeStroke)
          .attr("stroke-opacity", nodeStrokeOpacity)
          .attr("stroke-width", nodeStrokeWidth)
          // SM: change
          // .selectAll("circle")
          .selectAll("g")
          .data(nodes)
          // SM: change
          // .join("circle")
          .join("g")
          // SM: change
          // .attr("r", nodeRadius)
          .call(drag(simulation));
      
        // SM: change
        // append circle and text to node <g> (selection of all <g> elements corresponding to each node)
        node.append("circle").attr("r", nodeRadius);
        node
          .append("text")
          .text(({ index: i }) => T[i])
          .attr("fill", "gray")
          .attr("stroke", "none")
          .attr("font-size", "0.7em");
      
        if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
        if (L) link.attr("stroke", ({ index: i }) => L[i]);
        if (G) node.attr("fill", ({ index: i }) => color(G[i]));
        if (T) node.append("title").text(({ index: i }) => T[i]);
        if (invalidation != null) invalidation.then(() => simulation.stop());
      
        function intern(value) {
          return value !== null && typeof value === "object"
            ? value.valueOf()
            : value;
        }
      
        function ticked() {
          link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);
      
          node.attr("transform", (d) => `translate(${d.x} ${d.y})`);
          // SM: change
          // instead of moving the circle centers we transform the whole <g>
          // .attr("cx", d => d.x)
          // .attr("cy", d => d.y);
        }
      
        function drag(simulation) {
          function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          }
      
          function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          }
      
          function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          }
      
          return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
        }
      
        return Object.assign(svg.node(), { scales: { color } });
      }
}