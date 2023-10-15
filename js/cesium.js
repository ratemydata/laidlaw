/**
 * @global viewer
 * to hold the cesium viewer
 * 
 */
let viewer;
let cesiumLayers=[];

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

    let imageryProviders = Cesium.createDefaultImageryProviderViewModels();
    var selectedImageryProviderIndex =6;  // MapBox Street is 5th in the list.
    console.log("imagery");

    // Ellipsoid.
    let ellipsoid = Cesium.Ellipsoid.WGS84;
//      terrain: Cesium.Terrain.fromWorldTerrain(),

    viewer = new Cesium.Viewer('cesium', {
      imageryProviderViewModels: imageryProviders,
      selectedImageryProviderViewModel: imageryProviders[selectedImageryProviderIndex],
      ellipsoid: ellipsoid
    });      



}
