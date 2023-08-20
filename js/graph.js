"use strict";

/**
 * Function to load the demonstrator earthquakes graph
*/

function loadGraph(){
    showDiv('assetDataWrapperWrapper');

    // Add the close button and an SVG element for the graph
    let widtha = document.getElementById("assetDataWrapperWrapper").offsetWidth;
    let heighta = document.getElementById("assetDataWrapperWrapper").offsetHeight;

    document.getElementById("assetDataWrapperWrapper").innerHTML= `<div><button type="button" class="btn btn-primary ms-4" onclick="closeAssetData()">Close Graph</button>'
      +  <div id="assetDataWrapper" class="vw-100" style="height:calc(100% - 165px);width:100%;border-color='blue';border-width=5px;"> 
    </div>`;
    document.getElementById("assetDataWrapper").innerHTML += `<svg fill="blue" width="`+widtha+`" height="`+heighta+`" id="svg1">
                </svg><div>`;

    console.log(widtha+" "+heighta);


     // g is a grouping element
     let marginTop = 30;
     let marginBottom = 260;
     let marginLeft = 50;
     let marginRight=20;

let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// download the data and create the graph
d3.json(dataURL).then(data => {
  data = data.features;
  console.log(data);

  // loop through the data and get the length of the x axis titles
  let xLen = 0;
  data.forEach(feature =>{
      if (xLen < feature.properties.title.length) {
        xLen = feature.properties.title.length;
      }
      console.log(xLen);
        });

  // adjust the space available for the x-axis titles, depending on the length of the text
  if (xLen > 100) {
    marginBottom = Math.round(xLen/3,0) + 120; // the 120 allows for the close button
  }
  else {
    marginBottom = xLen + 120;  // the 120 allows for the close button 
  } //rough approximation for now
  console.log(marginBottom);
  let svg     = d3.select("#svg1"),
      margin  = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft},
      width   = svg.attr("width") - marginLeft - marginRight,
      height  = svg.attr("height") - marginTop - marginBottom,
      x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
      y       = d3.scaleLinear().rangeRound([height, 0]),
      g       = svg.append("g")
                   .attr("transform", `translate(${margin.left},${margin.top})`);


 x.domain(data.map(d => d.properties.title));
 y.domain([0, d3.max(data, d => d.properties.mag)]);



// adapted from: https://bl.ocks.org/mbostock/7555321 10th March 2021/
 g.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
      .call(wrap,x.bandwidth());


  g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(10).tickSize(8));

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.properties.title))
      .attr("y", d => y(d.properties.mag))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.properties.mag));

})
.catch(err => {
   svg.append("text")         
        .attr("y", 20)
        .attr("text-anchor", "left")  
        .style("font-size", "10px") 
        .style("font-weight", "bold")  
        .text(`Couldn't open the data file: "${err}".`);
});


}


function wrap(text, width) {
  text.each(function() {
    let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

/**
 * Function closeAssetData
 * remove the graph DIV and show the map div (the default DIV, 2D map)
*/
function closeAssetData(){
    showDiv('mapWrapper');
}


