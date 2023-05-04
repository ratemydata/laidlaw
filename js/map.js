"use strict";
let mymap; // stores the leaflet map
let mapPoint; // stores the UCL point that appears in a specific view size of the map
function loadMap() {
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

    // create a custom popup    
    let popup = L.popup();

    // create an event detector to wait for the user's click event and then use the popup to show them where they clicked
    // note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you
    function onMapClick(e) {
    popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    // now add the click event detector to the map
    mymap.on('click', onMapClick);

    // create a geoJSON feature -
    let geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "London",
            "popupContent": "This is where UCL is based"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-0.118092, 51.509865]
        }
    };

    // and add it to the map
    L.geoJSON(geojsonFeature).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");




     // create a polygon
    let geojsonFeature2 = {
        "type": "Feature",
        "properties": {
            "name": "South west",
            "popupContent": "This is not where UCL is based"
            },
            "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-3.445594640344274,52.62721228966887],
                [-3.442640887519025,52.62724830544241],
                [-3.44272958475667,52.6299443686539],
                [-3.445683518998908,52.62990834938883],
                [-3.445594640344274,52.62721228966887]

                      ]]
        }



    }






// give it some colour
    function polystyle(geojsonFeature2) {
    return {
        fillColor: 'blue',
        weight: 2,
        opacity: 1,
        color: 'white',  //Outline color
        fillOpacity: 0.7
    };
}

      // add this feature to the map
    // and add it to the map
    let busStation = L.geoJSON(geojsonFeature2, {style:polystyle}).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");
    mymap.fitBounds(busStation.getBounds());

// add a resize event
    mymap.on('resize', function () {
        mymap.invalidateSize();
    });


}
function refreshMap(){
    // needs a timeout to allow the new size of the div to settle
    setTimeout(function(){ mymap.invalidateSize()}, 400);
}

function setMapClickEvent() {
   let width = $(window).width();
   console.log(width);

   // what function called this one
   // adapted from: https://stackoverflow.com/questions/29572466/how-do-you-find-out-the-caller-function-in-javascript-when-use-strict-is-enabled  23rd Jan 2023
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];

   console.log(sCallerName);
   if (width < 767) { //the quiz – defined as 'small' by bootstrap
    // remove the UCL point if it exists
    if (mapPoint){
        mymap.removeLayer(mapPoint);
    }   

    // cancel the map onclick  ..
    mymap.off('click',onMapClick)
    // create a geoJSON feature -
    let geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "London",
            "popupContent": "This is where UCL is based"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-0.13263, 51.522449]
        }
    };
  // and add it to the map
  let popUpHTML = "the quiz question goes here";
  console.log(popUpHTML);
  mapPoint= L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
  mymap.setView([51.522449,-0.13263], 12)
}
// the on click functionality of the POINT should pop up  blank quiz form so that the user can  select the answer to the question

   else { // the questions page
      // remove the map point if it exists

      if (mapPoint){
        mymap.removeLayer(mapPoint);
      }
      // the on click functionality of the MAP should pop up a blank questions form
      mymap.on('click', onMapClick);
    }

}

let popup = L.popup();
function onMapClick(e) {
    let formHTML = "html for the form goes here";
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML)
      .openOn(mymap);
  }


document.addEventListener('DOMContentLoaded', function() {
  console.log("listener domcontentloaded");
//  console.log(document.getElementById("assetDataWrapper").style.zIndex);
  loadMap();
}, false);


