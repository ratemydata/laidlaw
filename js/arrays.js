// ---------------------------------------------------------------
// SAMPLE CODE TO SHOW HOW ARRAYS WORK
// 


// create an empty array 
var layerList = []

function loadLayer(schemaname, tablename, idcolumn,geometrycolumn) {

        // check if the layer is loaded already
  for (i=0;i<layerList.length ;i++){
    console.log(layerList[i].layerName+ " "+tablename);
    if (layerList[i].layerName == tablename){
      console.log("equal");
      alert("Layer already loaded");
      return;
    }
  }


var layerURL = document.location.origin + "/api/getGeoJSON/"+schemaname+"/"+tablename+"/"+idcolumn+"/"+geometrycolumn;
      $.ajax({url: layerURL, crossDomain: true,success: function(result){
        console.log(result); // check that the data is correct


        // add the JSON layer onto the map - it will appear using the default icons
        // load the geoJSON layer
        // pop up code from here: https://gis.stackexchange.com/questions/229723/displaying-properties-of-geojson-in-popup-on-leaflet  (10th March 2021)
        var newLayer = L.geoJson(result, {
 onEachFeature: function (f, l) {
   l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');}}).addTo(mymap);
        newLayer.layerName = tablename;

        // change the map zoom so that all the data is shown
        mymap.fitBounds(newLayer.getBounds());


        // now add the layer into the array so that we can reference it later on
        // push adds an item to the top of the array
        layerList.push(newLayer);
    } // end of the inner function
  }); // end of the ajax request
}

function listAllLayers() {
  console.log("*********************************");
  console.log("********Current Layers *********");
  for (i=0;i<layerList.length;i++){
    console.log(layerList[i].layerName);
  }
  console.log("*********************************");
}

function removeLayer(layername){
  for (i=0;i<layerList.length ;i++){
    console.log(layerList[i].layerName+ " "+layername);
    if (layerList[i].layerName == layername){
      console.log("equal");
      mymap.removeLayer(layerList[i]);
      layerList.splice(i,1);  // splice removes an item at a specific location - the 1 says only remove 1 element
      break; // don't continue the loop as we now have 1 less element in the array which means that when we try to get the last element it won't be there any more
    }
  }
}
