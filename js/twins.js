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
	let currentURL = url+"/extents/"+project
    $.ajax({dataType:"json", url: currentURL, crossDomain: true,success: function(result){
    	console.log(result.features[0]);

    	// note that we have to initialise a new object here - see:  https://gis.stackexchange.com/questions/314946/leaflet-extension-this-callinithooks-is-not-a-function
    	let extent = new L.GeoJSON();
    	extent.addData(result.features[0]);
    	mymap.fitBounds(extent.getBounds());

    	// now load the actual layers
    	loadLayers(project, url);
	} // end of the succes function
	}); // end of the ajax call
}


function loadLayers(project,projectURL){
	// get the URL of the data broker first
	let brokerURL = window.location.protocol+"//"+ window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/getDataBrokerAPI"
	console.log(brokerURL);
    $.ajax({url: brokerURL, crossDomain: true,success: function(result){
			// load the data 
			// once complete add the layer to the layer control list
			let dataURL = result;

			// get the layer list using the project url
			let url=projectURL+"/layerlist/"+project;
			$.ajax({dataType:"json", url: url, crossDomain: true,success: function(result){
		    	console.log(result.features[0]);
				// note that we have to initialise a new object here - see:  https://gis.stackexchange.com/questions/314946/leaflet-extension-this-callinithooks-is-not-a-function
		    	for (let i=0;i< result.features.length;i++){
		    		let feature = result.features[i];
		   			let layername = feature.properties.feature_type;
		    		console.log(feature.properties.feature_type);
		    		let layerUrl="";
		    		if (feature.properties.layer_source=='internal'){
		   				 //layerUrl = dataURL+"/internal/vector"+feature.properties.layer_source+"/"+feature.properties.layer_type+"/"+feature.properties.id;
		    			layerUrl = dataURL+"/internal/vector/"+feature.properties.id; 
		   			}
		   			if (feature.properties.layer_source =='API'){
		   				// we need to send the centre point of the screen
		   				layerUrl = url+"/external/API/vector/"+feature.properties.layer_source+"/"+feature.properties.layer_type+"/"+feature.properties.id;
		   			}
		   			loadLayer(layerUrl, feature.properties.table_name,layername, feature.properties.layer_type,false);
		    	}
			} // end of the succes function
			});
		} // end of the success function
	});
}