"use strict";
function loadMappabilityRating(){
    let isMapVisible = $('#mapWrapper').is( ":visible" );
    alert(isMapVisible);

    if (isMapVisible) {
      let mapCollapse = document.getElementById('mapWrapper');
      let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
          toggle: true
      });
    }
    //bsMapCollapse.hide();


    let isGraphVisible = $('#assetDataWrapperWrapper').is( ":visible" );
    if (isGraphVisible){
      let graphCollapse = document.getElementById('assetDataWrapperWrapper');
      let gsGraphCollapse = new bootstrap.Collapse(graphCollapse, {
          toggle: true
      });
    }
    //gsGraphCollapse.hide();

    let adwCollapse = document.getElementById('mapAbilityWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
          toggle: true
    });

    document.getElementById("mapAbilityWrapper").innerHTML= '<div><button type="button" class="btn btn-primary ms-4" onclick="closeMappability()">Close Rating</button>' + document.getElementById("mapAbilityWrapper").innerHTML;

    // temporary code - this will be replaced with the rating creation code
    document.getElementById("mapAbility").innerHTML="the boxes for the ratings will go here";

}


function closeMappability(){
      let isMapVisible = $('#mapWrapper').is( ":visible" );
    if (!isMapVisible) {
      let mapCollapse = document.getElementById('mapWrapper');
      let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
          toggle: true
      });
    }
    //bsMapCollapse.hide();


    let isRatingVisible = $('#mapAbilityWrapper').is( ":visible" );
    if (isRatingVisible){
      let ratingCollapse = document.getElementById('mapAbilityWrapper');
      let rsratingCollapse = new bootstrap.Collapse(ratingCollapse, {
          toggle: true
      });
    }

    let isGraphVisible = $('#assetDataWrapperWrapper').is( ":visible" );
    if (isGraphVisible){
      let graphCollapse = document.getElementById('assetDataWrapperWrapper');
      let gsGraphCollapse = new bootstrap.Collapse(graphCollapse, {
          toggle: true
      });
    }



}


