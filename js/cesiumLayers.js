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
		console.log("**********************************TILESET");
		// get the URL of the actual tileset
		$.ajax({url: url, crossDomain: true,success: function(result){
			console.log("result is "+ result.text);
	    loadTileset(result, feature)
    	.then(
			(tileset) =>{
		    	//viewer.scene.primitives.add(tileSet); 
		    				viewer.scene.primitives.add(tileset);
		    				// styling can only happen once the tile is added
		    				styleTiles(tileset, feature);
	
							// Set the camera to view the newly added tileset
							//viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
		    });
    } // end of success function 
    }); // end get teh URL for hte actual tileset from the broker

	}  // feature.properties.tileset
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

            		// fix a bug in Cesium
            		// https://github.com/reearth/resium/issues/115
/*            		for (var i = 0; i < dataSource.entities.values.length; i++) {
										var entity = dataSource.entities.values[i];
										console.log(i);
										if (Cesium.defined(entity.polygon)) {
														entity.polygon.arcType = Cesium.ArcType.GEODESIC;
										}
								}
*/

		            console.log("just before setting the name"+feature.properties.feature_type);
       		        dataSource.clampToGround=true;
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
		console.log("tileset loading "+url);
    return new Promise((resolve, reject) => {
	  let tileset =  Cesium.Cesium3DTileset.fromUrl(url);
	  //  let tileset = new Cesium.Cesium3DTileset.fromUrl(url);
	 //   viewer.scene.primitives.add(tileset);   
	 //   console.log(url);

	


		//style.color = fillColor;
  //		style.pointSize = Cesium.defaultValue(style.pointSize, 5.0);
//		tileset.style = style;
//	  	tileset.readyPromise
//	  	.then(function(onetileset) {
				console.log("tiles");
	    	let heightOffset = 0.0;
  	//		let boundingSphere = tileset.boundingSphere;
	//			let cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
//				let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
//				let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOf/fset);
//			let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
//				tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
 //     		viewer.camera.flyToBoundingSphere(tileset.root.boundingSphere);
//				return onetileset;
//			});



   	    resolve(tileset);
    }); // end of the promise
} // end of add building tileset


function styleTiles(tileset, feature){
		let colorString = 'color('+feature.properties.layer_colour+','+feature.properties.layer_transparency+')';
			console.log (colorString);
   		tileset.style = new Cesium.Cesium3DTileStyle({  color : colorString });
/*   		{
       conditions : [
       	   ['${id} > 0', 'color("#d65c5c")'],
           ['true', 'color("#E8F1F2", 0.5)']
       ]
   }}); */

}

