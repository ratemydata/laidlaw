"use strict";
/*--snippet1m-start*/
/**
 * variable to store the leaflet map so that we can get hold of the map and make changes via code
 */
let mymap; // stores the leaflet map




/**
 * variable to store the leaflet layer control so that we can get hold of the map and make changes via code
 */
let layerControl; // the leaflet layer control
/*--snippet1m-end*/


function loadMap() {

    // note the ordering of events below - the load event is set when the map is first initiatlised i.e. zoom etc set
    // so the load event needs to be set BEFORE the setView
    mymap = L.map('mapid').on('load',loadProject).setView([51.505, -0.09], 13);
    let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);

    let baseMaps = {
        "OpenStreetMap": osm,
    };

    var overlayMaps = {
    };

    layerControl = L.control.layers(baseMaps,overlayMaps).addTo(mymap);

// add a function to show the coordinates of where the user clicks on the map
    mymap.on('click', function(e) {
    //alert("Clicked on Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
     document.getElementById("clickCoordinates").innerHTML = "Clicked on Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng;
});

} // end loadMap



/** 
*  @function showLeaflet
*  show the div with the cesium map loaded
*  no close button at the top as the user can swap back to 2D from the menu
*
*/
function showLeaflet() {
        showDiv('mapWrapper');

}
