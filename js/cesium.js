/** 
*  @function showCesium
*  show the div with the cesium map loaded
*  no close button at the top as the user can swap back to 2D from the menu
*
*/
function showCesium() {
	    showDiv('cesiumWrapper');
}

function loadCesium() {

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiN2NhNjVlMy03YTZmLTRlNzktYjRmYi0zNjg0ZWRhYmViN2MiLCJpZCI6MTU2NjMsImlhdCI6MTY5NzM0OTM3Mn0.MIh_LeyAbUT5eysD03v9atH__XQFR0Nk_93nslFT9Cs';

    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Cesium.Viewer('cesium', {
      terrain: Cesium.Terrain.fromWorldTerrain(),
    });    

    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      }
    });

    // Add Cesium OSM Buildings, a global 3D buildings layer.
    addBuildingTileset()
    	.then(
			(tileSet) =>{
		    	viewer.scene.primitives.add(tileSet);   
		    });

}


addBuildingTileset = () => {
    return new Promise((resolve, reject) => {
   	    const buildingTileset = Cesium.createOsmBuildingsAsync();
   	    resolve(buildingTileset);

    }); // end of the promise
} // end of add building tileset