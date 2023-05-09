"use strict";
let mymap; // stores the leaflet map

function loadMap() {
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

// add a function to show the coordinates of where the user clicks on the map
    mymap.on('click', function(e) {
    //alert("Clicked on Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
     document.getElementById("clickCoordinates").innerHTML = "Clicked on Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng;
});

} // end loadMap

// makes sure that the map is only loaded once the page has completely loaded
// i.e. the div for the map must exist before the code tries to load the map
document.addEventListener('DOMContentLoaded', function() {
  console.log("listener domcontentloaded");
  loadMap();
}, false);


