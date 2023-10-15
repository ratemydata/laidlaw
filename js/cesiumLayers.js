/** 
 * @function zoomToCesiumExtents
 * @param boundingBox - geoJSON
 * zoom the cesium map to the given extents
 * 
 */
function zoomToCesiumExtents(boundingBox, project){
    var dataSource = new Cesium.GeoJsonDataSource("Polygon");
      dataSource.clampToGround=false;
      dataSource._name = project;
      viewer.dataSources.add(dataSource);
      dataSource.load(boundingBox).then(function(dataSource){
      		viewer.flyTo(dataSource).then(function(dataSource){
      			console.log(viewer.dataSources);
      			viewer.dataSources._dataSources[0].show =false;
		});
	});
}


/**
 * @function loadCesiumLayer
 * load cesium layer
 * can be a 2d or 3d layer
 * 
 */
function loadCesiumLayer(url, feature,fitBounds){
	console.log("layer type"+feature.properties.layer_type);

	if (feature.properties.layer_type == "tileset"){
	    loadTileset(url, feature)
    	.then(
			(tileSet) =>{
		    	viewer.scene.primitives.add(tileSet);   
		    });
	}
	if (feature.properties.layer_type =="vector"){
		loadGeoJSON(url,feature)
    	.then(
			(dataSource) =>{
                  viewer.dataSources.add(dataSource);
		    });

	}

}

loadGeoJSON = (url,feature)=> {
	return new Promise((resolve, reject) => {
            var layerURL = url; 
            console.log(layerURL);
            var dataSource = new Cesium.GeoJsonDataSource(feature.properties.feature_type);
			console.log(feature.properties.layer_colour);
			var options = [];
				options.push({
    			fill:feature.properties.layer_colour,
    			strokewidth:3
			});
			let fillColor = Cesium.Color.fromCssColorString(feature.properties.layer_colour).withAlpha(feature.properties.layer_transparency);
			let borderColor = Cesium.Color.fromCssColorString('black').withAlpha(feature.properties.layer_transparency);
			let markerSymbol = '?';

			console.log(options);
            let geoJSONOptions = {
              stroke: borderColor,
                  fill: fillColor ,
                  strokeWidth: 3,
                  markerSymbol: markerSymbol,
            }
			console.log(geoJSONOptions);
            dataSource._name = feature.properties.feature_type;
            let layername = feature.properties.feature_type;
            let i=cesiumLayers.length;
            cesiumLayers[i]=dataSource.load(layerURL,geoJSONOptions )
            	.then(function(dataSource,layername){
            		cesiumLayers[i].name = feature.properties.feature_type;       
		            // use a promise approach so that some functionlaity
        		    // can be run once the layer is loaded
//             		layernamex[i] =feature.properties.feature_type;
//            		console.log("layer name is "+layernamex[i]);
		            console.log("just before setting the name"+feature.properties.feature_type);
       		        dataSource.clampToGround=false;
                    dataSource._name = feature.properties.feature_type;
			        let entities = dataSource.entities.values;
        			console.log(entities);
        			resolve(dataSource);
				})
            	.catch(function(error) {
    				console.log(error);
    			});
    }); // end of the promise
}

loadTileset = (url,feature) => {
    	console.log(url);

    return new Promise((resolve, reject) => {
	    let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({url : url}));
	    let style = new Cesium.Cesium3DTileStyle();
		// Override color expression with a string
		let featureColour = 'color("'+feature.properties.layer_colour+'",'+feature.properties.layer_transparency+')';
		console.log("feature colour "+featureColour);
		style.color = featureColour;
  		style.pointSize = Cesium.defaultValue(style.pointSize, 5.0);
		tileset.style = style;
//	  	tileset.readyPromise
//	  		.then(function(onetileset) {
				console.log("tiles");
	    		var heightOffset = 0.0;
        		tileset.pointCloudShading.attenuation = true;
  				var boundingSphere = tileset.boundingSphere;
				var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
				var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
				var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
				var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
				tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        		viewer.camera.flyToBoundingSphere(tileset.root.boundingSphere);
//				return onetileset;
//			});
   	    resolve(tileSet);
    }); // end of the promise
} // end of add building tileset