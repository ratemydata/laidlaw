"use strict";
let mapLayers = []; // array - stores the layers currently on the map



function loadLayer(url, tablename,layerName, layerType,fitBounds){
	// add a given layer to the map with the given name
	// assumes that the data source is geoJSON
	// url can refer to an external site or
	// if the data is stored on the same site, the code will assume that the data is in the
	// data subdirectory

	console.log(url);
	console.log(layerName);
	// check if the layer is loaded
	if (!layerExists(layerName)) {
			 // different load methods depending on the type of data being loaded
			switch (layertype) {
					case "vector":
						loadGeoJSONLayer(url, tablename, layerName, layerType, fitBounds);
						break;
					default: 
			}
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


/** 
 * @function loadGeoJSONLayer
 * function to load a geoJSON layer from a given URL
 * this will not call the URL directly but will make a request to the data broker that will
 * work out if the data is internal/external and generate the geoJSON appropriately
 */

function loadGeoJSONLayer(url, tablename, layerName, layerType, fitBounds){
						 $.ajax({url: url, crossDomain: true,success: function(result){
					 	console.log(result); // check that the data is correct
				    		// add the JSON layer onto the map - it will appear using the default icons
						// for each feature in the layer, add a pop-up with its properties
						let newLayer = L.geoJSON(result, {
		 					onEachFeature: function (f, l) {
		   						l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
		 					}
						}).addTo(mymap); 
				    		mapLayers.push({layer:newLayer, name:layerName});
				    		// add the layer to the default Leaflet layer control
								layerControl.addOverlay(newLayer, layerName);
				    		// change the map zoom so that all the data is shown

				    		// if this is a manual add then zoom to the new layer
				    		if (fitBounds){
				    			mymap.fitBounds(newLayer.getBounds());
				    		}
						} // end of the inner function
					}); // end of the ajax request

}