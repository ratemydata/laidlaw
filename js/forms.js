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
  		loadLayer(url,layerName);
}); // end of the listener


// add a listener for when the user clicks on a button
// for the remove layer option
removeLayerBtn.addEventListener('click', (event) => {
  		event.preventDefault(); // We don't want to submit this fake form so this line cancels the default submit behaviour for an HTML form
  		// get the layername that the user has selected
		let layerList = document.getElementById("listOfLayers");
  		let selectedOption = layerList.options[layerList.selectedIndex];
  		let layerName = selectedOption.text;
  		// call the load layer code
  		console.log(layerName);
  		removeLayer(layerName);
  		document.getElementById("layerToRemove").close(); // Have to send the select box value here.
}); // end of the listener


function showLayerListDialog(){
	let layerListDialog = document.getElementById("allLayers");

	let layerList = document.getElementById("listAllLayers");
	// clear any previous contents of the select box
	removeOptions(layerList);

	// add the current list of layers for the user to select from
	addLayersToSelect(layerList);

	layerListDialog.showModal();
}


function showLayerLoadDialog(){
	let loadLayerDialog = document.getElementById("layerToLoad");
	loadLayerDialog.showModal();

}

function removeLayerDialog(){
	let removeLayerDialog = document.getElementById("layerToRemove");

	let layerList = document.getElementById("listOfLayers");
	// clear any previous contents of the select box
	removeOptions(layerList);

	// add the current list of layers for the user to select from
	addLayersToSelect(layerList);

	// show the dialog
	removeLayerDialog.showModal();

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