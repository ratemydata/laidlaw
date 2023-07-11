"use strict";
function loadMappabilityRating(){
    let isMapVisible = $('#mapWrapper').is( ":visible" );
    if (isMapVisible) {
      let mapCollapse = document.getElementById('mapWrapper');
      let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
          toggle: true
      });
    }
    //bsMapCollapse.hide();


    let isGraphVisible = $('#assetDataWrapperWrapper').is( ":visible" );
    if (isGraphVisible){
      let graphCollapse = document.getElementById('assetDataWrapperWrapper');
      let gsGraphCollapse = new bootstrap.Collapse(graphCollapse, {
          toggle: true
      });
    }
    //gsGraphCollapse.hide();

    let isRatingVisible = $('#mapAbilityWrapper').is( ":visible" );
    if (!isRatingVisible){
      let ratingCollapse = document.getElementById('mapAbilityWrapper');
      let gsRatingCollapse = new bootstrap.Collapse(ratingCollapse, {
          toggle: true
      });
    }

    document.getElementById("mapAbilityWrapper").innerHTML= `<div><button type="button" class="btn btn-primary ms-4" onclick="closeMappability()">Close Rating</button>`
     + `<div id="mapAbility" class="vw-100" style="height:calc(100% - 165px);width:100%;border-color='blue';border-width=5px;"> 
    </div>`;

    // temporary code - this will be replaced with the rating creation code
    document.getElementById("mapAbility").innerHTML="the boxes for the ratings will go here";

let data = [{ label:0, radius:0.5, color:'#ffffff' }, { label:1, radius:1, color:'#eeff00' }, { label:2, radius:2,color:'#ff0022' }, { label:3, radius:1 , color:'#3300ff'}, { label:4, radius:0.5,  color:'#3300ff' }]


// multiply the radius by 100 to create a large pie
let arc = d3.arc()
  .innerRadius(0)
  .outerRadius(function (d,i) { 
      return d.data.radius*100
  });
  
 
let pie = d3.pie()
  .sort(null)
  .value(function(d) { return d.radius; });

    
//code source adapted from: https://stackoverflow.com/questions/41268437/d3-concentric-nested-donut-chart
//https://stackoverflow.com/questions/36327948/draw-circles-inside-pie-d3-chart
//https://stackoverflow.com/questions/41427354/how-to-add-a-circle-in-the-middle-of-donut-chart-and-fill-it-in-d3-js
//https://stackoverflow.com/questions/58985805/d3-js-create-a-pie-chart-where-each-slice-has-a-different-radial-gradient-radiu

 let svg =  d3.select('#mapAbility').append('svg').attr('width',1500).attr('height',1500)


// add the actual pie to the SVG 
// move it to 500,500 so that it is centered in the DIV
// path is a sort of join the dots option to draw the graphics
// so we start by selecting any existing paths and then adding a new path for this pie chart
 svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
        .attr('d',arc)
        .attr('transform','translate(500,500)')
        .attr('fill', function(d){ return(d.data.color) })
        .attr('stroke','black')
    .append("g")
        .attr('transform','translate(0,0)')

// add concentric circles
// this should probably be inside a loop
// the radius value in the data is multiplied by 100 to give the radius of the arc
// so for the concentric circles you need to find the highest radius value
// multiply by 100 and then divide that by the number of concentric circles you want
// cx and cy are the same values as the 'translate' option above - i.e. where the center of the pie was moved to

svg.append("svg:circle")
    .attr("cx", 500)
    .attr("cy", 500)
    .attr("r", 20)
    .attr('fill','none')
    .attr('stroke','black')
    .attr("class", "white-circle")
    .attr("stroke-width",5)

svg.append("svg:circle")
    .attr("cx", 500)
    .attr("cy", 500)
    .attr("r", 50)
    .attr('fill','none')
    .attr('stroke','black')
    .attr("class", "white-circle")
    .attr("stroke-width",5)


svg.append("svg:circle")
    .attr("cx", 500)
    .attr("cy", 500)
    .attr("r", 100)
    .attr('fill','none')
    .attr('stroke','black')
    .attr("class", "white-circle")
    .attr("stroke-width",5)


svg.append("svg:circle")
    .attr("cx", 500)
    .attr("cy", 500)
    .attr("r", 150)
    .attr('fill','none')
    .attr('stroke','black')
    .attr("class", "white-circle")
    .attr("stroke-width",5)


svg.append("svg:circle")
    .attr("cx", 500)
    .attr("cy", 500)
    .attr("r", 300)
    .attr('fill','none')
    .attr('stroke','black')
    .attr("class", "white-circle2")
    .attr("stroke-width",5)


}


function closeMappability(){
      let isMapVisible = $('#mapWrapper').is( ":visible" );
    if (!isMapVisible) {
      let mapCollapse = document.getElementById('mapWrapper');
      let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
          toggle: true
      });
    }
    //bsMapCollapse.hide();


    let isRatingVisible = $('#mapAbilityWrapper').is( ":visible" );
    if (isRatingVisible){
      let ratingCollapse = document.getElementById('mapAbilityWrapper');
      let rsratingCollapse = new bootstrap.Collapse(ratingCollapse, {
          toggle: true
      });
    }

    let isGraphVisible = $('#assetDataWrapperWrapper').is( ":visible" );
    if (isGraphVisible){
      let graphCollapse = document.getElementById('assetDataWrapperWrapper');
      let gsGraphCollapse = new bootstrap.Collapse(graphCollapse, {
          toggle: true
      });
    }



}


