"use strict";
function loadMappabilityRating(){
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
          toggle: false, show:false
    });
    bsMapCollapse.hide();

    let adwCollapse = document.getElementById('assetDataWrapperWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
          toggle: false, show:true
    });
    bsAdwCollapse.show();



    // Add the close button and an SVG element for the graph
     document.getElementById("assetDataWrapper").innerHTML=`<div  class="h-100 w-100">
                <button type="button" class="btn-close float-end" aria-label="Close" onclick="closeMappability()"></button>
                <svg fill="blue" width="`+widtha+`" height="`+heighta+`" id="svg1">
                </svg>
                </div>`


}


function closeMappability(){
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
          toggle: false, show:false
    });
    bsMapCollapse.show();

    let adwCollapse = document.getElementById('assetDataWrapperWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
          toggle: false, show:true
    });
    bsAdwCollapse.hide();
}


