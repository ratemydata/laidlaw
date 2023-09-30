function loadProject(){
	// if there is a project name in the URL, then load all the layers for that project
	console.log ("project");
	const params = Object.fromEntries(new URLSearchParams(location.search));
	console.log(params['project']);
	if (params['project']){
		// this is a twins project
		// first call an end point in express to get the URL for the server
		getProjectsURL(params['project']);
	}
}

function getProjectsURL(project){

	// get the URL of this side so that we can get the API URL for the data component of the software
	let currentURL = window.location.protocol+"//"+ window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/getProjectsAPI"
	console.log(currentURL);

    $.ajax({url: currentURL, crossDomain: true,success: function(result){
    	console.log(result);
	 	zoomToExtents(project, result);
	} // end of the succes function
	}); // end of the ajax call
}

function zoomToExtents(project, url){
	// call the API to get the project extents and zoom to them
	let currentURL = url+"/projects/extents/"+project
    $.ajax({dataType:"json", url: currentURL, crossDomain: true,success: function(result){
    	console.log(result.features[0]);

    	// note that we have to initialise a new object here - see:  https://gis.stackexchange.com/questions/314946/leaflet-extension-this-callinithooks-is-not-a-function
    	let extent = new L.GeoJSON();
    	extent.addData(result.features[0]);
    	//let extent = L.GeoJSON(result.features[0]); //.coordsToLatLng(result.features[0].geometry.coordinates[0]);
    	//let extentCoords = L.GeoJSON.coordsToLatLng(extent);

    	mymap.fitBounds(extent.getBounds());
	} // end of the succes function
	}); // end of the ajax call
}


function loadLayers(project){

}