"use strict";
let mapLayers = []; // array - stores the layers currently on the map

/**
 * @function zoomtToLeafletExtents
 * @params boundingBox
 * take a geoJSON box and zoom the map to the extents
 * 
 */
function zoomToLeafletExtents(boundingBox){
    	// note that we have to initialise a new object here - see:  https://gis.stackexchange.com/questions/314946/leaflet-extension-this-callinithooks-is-not-a-function
    	let extent = new L.GeoJSON();
    	extent.addData(boundingBox.features[0]);
    	mymap.fitBounds(extent.getBounds());
}

function load2DLayer(url, feature, fitBounds){
	// add a given layer to the map with the given name
	// assumes that the data source is geoJSON
	// url can refer to an external site or
	// if the data is stored on the same site, the code will assume that the data is in the
	// data subdirectory

	let layerName = feature.properties.feature_type;
	let tablename = feature.properties.table_name;
	let layerType  = feature.properties.layer_type;

	console.log(url);
	console.log(layerName);
	// check if the layer is loaded
	if (!layerExists(layerName)) {
			 // different load methods depending on the type of data being loaded
			switch (layerType) {
					case "vector":
						loadGeoJSONLayer(url, feature, fitBounds);
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


function style(feature) {
    return {
        fillColor: '#E31A1C',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

/** 
 * @function loadGeoJSONLayer
 * function to load a geoJSON layer from a given URL
 * this will not call the URL directly but will make a request to the data broker that will
 * work out if the data is internal/external and generate the geoJSON appropriately
 */

function loadGeoJSONLayer(url, feature, fitBounds){

let layerName = feature.properties.feature_type;
	let tablename = feature.properties.table_name;
	let layerType  = feature.properties.layer_type;

						 $.ajax({url: url, crossDomain: true,success: function(result){
					 	console.log(result); // check that the data is correct
				    		// add the JSON layer onto the map - it will appear using the default icons
						// for each feature in the layer, add a pop-up with its properties
						var geojsonMarkerOptions = {
						    radius: 8,
						    fillColor: feature.properties.layer_colour,
						    color: "#000",
						    weight: 1,
						    opacity: 1,
						    fillOpacity: 0.8
						};
						let style= {
				        fillColor: feature.properties.layer_colour,
				        weight: 2,
        				opacity: 1,
        				color: feature.properties.layer_colour,
				        dashArray: '3',
        				fillOpacity: feature.properties.layer_transparency
    			};
						let newLayer = L.geoJSON(result, {
							style: style,
		 					onEachFeature: function (f, l) {
		   						l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');

		 					},
		 						  pointToLayer: function (feature, latlng) {
     							   return L.circleMarker(latlng, geojsonMarkerOptions);
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