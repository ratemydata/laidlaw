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
function loadCesiumLayer(url, tablename,layerName, layerType,fitBounds){

	if (layerType == "tileset"){
	    loadTileset()
    	.then(
			(tileSet) =>{
		    	viewer.scene.primitives.add(tileSet);   
		    });
	}
	if (layerType =="vector"){
		loadGeoJSON()
    	.then(
			(tileSet) =>{
		    	viewer.scene.primitives.add(tileSet);   
		    });

	}

}

loadGeoJSON = ()=> {
	return new Promise((resolve, reject) => {
   	    const tileSet = Cesium.createOsmBuildingsAsync();
   	    resolve(tileSet);

    }); // end of the promise

}

loadTileset = () => {
    return new Promise((resolve, reject) => {
   	    const tileSet = Cesium.createOsmBuildingsAsync();
   	    resolve(tileSet);

    }); // end of the promise
} // end of add building tileset