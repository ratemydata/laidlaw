/** 
 * 
 * @function switchOffMenuOption
 * @param menuName
 * switch off any menu options that aren't relevant to the current project
 * e.g. if the project is 3D only don't show the 2D/leaflet map	
*/
function switchOffMenuOption(menuName){
      let isDivVisible = $('#'+menuName).hasClass('show');
      console.log("menu visible "+ isDivVisible);
      if (isDivVisible){
	      let menuCollapse = document.getElementById(menuName);
	      let mnMenuCollapse = new bootstrap.Collapse(menuCollapse, {
	          toggle: true
	      });
	  }
      // check that the item is now closed
      // temporary code 
      isDivVisible = $('#'+menuName).hasClass('show');
      console.log("menu visible "+ isDivVisible);
}