"use strict";
let mapLayers = []; // array - stores the layers currently on the map



function loadLayer(url, layerName){
	// add a given layer to the map with the given name
	// assumes that the data source is geoJSON
	// url can refer to an external site or
	// if the data is stored on the same site, the code will assume that the data is in the
	// data subdirectory

	console.log(url);
	console.log(layerName);
	// check if the layer is loaded
	if (!layerExists(layerName)) {
			// we use AJAX to get the data
			// that ensures that the map doesn't try to load the data before it has been returned to the browser from 
			// wherever it is stored
			 $.ajax({url: url, crossDomain: true,success: function(result){
			 	console.log(result); // check that the data is correct
		    		// add the JSON layer onto the map - it will appear using the default icons
		    		let newLayer = L.geoJson(result).addTo(mymap);
		    		mapLayers.push({layer:newLayer, name:layerName});
		    		listLayers();
		    		// change the map zoom so that all the data is shown
		    		mymap.fitBounds(newLayer.getBounds());
				} // end of the inner function
			}); // end of the ajax request
	} // end check if the layer already loaded
}

function layerExists(layerName){
  console.log("layer exists check");
  // first check if the thing is loaded already
  for (let i=0;i<mapLayers.length ;i++){
  	console.log(mapLayers[i].name + " "+ layerName);
    if (mapLayers[i].name == layerName){
      console.log("found "+ layerName);
      alert ("Layer "+layerName + " already loaded");
      return true;
    }
  }
  return false;

}

function removeLayer(layerName) {
	// remove a layer from the map	
  for (let i=0;i<mapLayers.length ;i++){
    if (mapLayers[i].name == layerName){
      console.log("removing layer "+ layerName);

      // remove the layer from the map
      mymap.removeLayer(mapLayers[i].layer);

      // remove the layer from the array
      mapLayers.splice(i,1);  
	  // don't continue the loop as we now have 1 less element in the array which means // that when we try to get the last element it won't be there any more
  	 break; 
    }
  } // end loop around the list of layers
}


function listLayers() {
	// list all the layers that are currently loaded
  console.log("*********************************");
  console.log("********Current Layers *********");
  for (let i=0;i<mapLayers.length;i++){
    console.log(mapLayers[i].name);
  }
  console.log("*********************************");

}