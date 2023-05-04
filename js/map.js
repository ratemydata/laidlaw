"use strict";
let mymap; // stores the leaflet map

function loadMap() {
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


} // end loadMap

// makes sure that the map is only loaded once the page has completely loaded
// i.e. the div for the map must exist before the code tries to load the map
document.addEventListener('DOMContentLoaded', function() {
  console.log("listener domcontentloaded");
  loadMap();
}, false);


