"use strict";
// forms for user input

// add a listener for when the user clicks on a button
addLayerBtn.addEventListener('click', (event) => {
  		event.preventDefault(); // We don't want to submit this fake form so this line cancels the default submit behaviour for an HTML form
  		// get the information that the user has typed in
  		let url = document.getElementById("loadLayerURL").value;
  		let layerName = document.getElementById("loadLayerName").value;
  		document.getElementById("layerToLoad").close(); 

  		// call the load layer code
  		// use the url as the internal layer name
  		//load2DLayer(url,url,layerName,'vector',true);
  		// to conform with the layers in our broker system, create a feature with the required information for the layer
  		let obj = new Object();
  		obj.type = "Feature";
  		let properties = new Object();
  		properties.dimension="2D";
  		properties.feature_type=layerName;
  		properties.geom_column="geometry";
  		properties.id=0;
  		properties.layer_colour="BLUEVIOLET";
  		properties.layer_source="external";
  		properties.layer_type="vector";
  		properties.layer_transparency="0.5";
  		properties.location_group_name="Outdoor";
  		properties.on_when_loaded =true;
  		properties.project_id=0;
  		properties.project_name="";
  		properties.schema="";
  		properties.tablename=url;
  		obj.properties = properties;
  		console.log(obj.properties.feature_type);
  		let feature = JSON.stringify(obj);
  		console.log(feature);

  		load2DLayer(url, obj, true)

}); // end of the listener



function showLayerLoadDialog(){
	let loadLayerDialog = document.getElementById("layerToLoad");
	loadLayerDialog.showModal();

}


function addLayersToSelect(selectElement){
	console.log("addLayersToSelect "+ mapLayers.length);
	for (let i = 0; i< mapLayers.length;i++){
		let option = document.createElement("option");
		option.text = mapLayers[i].name;
		selectElement.add(option);
	}
}


// remove all the options from a given select box
// from: https://stackoverflow.com/questions/3364493/how-do-i-clear-all-options-in-a-dropdown-box
function removeOptions(selectElement) {
   let i, L = selectElement.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectElement.remove(i);
   }
}