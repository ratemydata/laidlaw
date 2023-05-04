"use strict";
let mymap; // stores the leaflet map

function loadMap() {
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


} // end loadMap

 
function refreshMap(){
    // needs a timeout to allow the new size of the div to settle
    setTimeout(function(){ mymap.invalidateSize()}, 400);
}


document.addEventListener('DOMContentLoaded', function() {
  console.log("listener domcontentloaded");
//  console.log(document.getElementById("assetDataWrapper").style.zIndex);
  loadMap();
}, false);


