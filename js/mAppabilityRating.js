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


var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(function (d,i) { 
      return d.data.radius*100
  });
  
  
  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.radius; });

 var data = [{ label:0, radius:1, color:'#ff0022' }, { label:1, radius:1, color:'#eeff00' }, { label:2, radius:2,color:'#ff0022' }, { label:3, radius:1 , color:'#3300ff'}, { label:4, radius:0.5,  color:'#3300ff' }]

    
    // code source: https://stackoverflow.com/questions/41268437/d3-concentric-nested-donut-chart

 var svg =  d3.select('#mapAbility').append('svg').attr('width',1500).attr('height',1500)

let cwidth = 333;
  var innerArc = d3.arc()
          .innerRadius(58)
          .outerRadius(cwidth * 2.9);

        var outerArc = d3.arc()
          .innerRadius(70 + cwidth)
          .outerRadius(cwidth * 3.5);

 svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d',arc)
    .attr('transform','translate(250,250)')
    .attr('fill', function(d){ return(d.data.color) })
    .attr('stroke','black')


 svg.append("path")
          .attr("fill", function(d) {
            return "#A4C7F4";
          })
          .attr("d", function(d, i, j) {
            return j === 0 ? innerArc(d) : outerArc(d);
          });
// change the colours

//pie.colors(colorScale);
//.range())
 //  .colorAccessor(function(d){ return colorScale.domain().indexOf(d.fruitType); });    


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


