"use strict";

function addList() {

    var list=["красный","жёлтый","зелёный"];

    var str='';
    str+="<ul>";
    for ( var i=0; i<list.length; i++ )
        str+="<li>"+list[i]+"</li>";
    str+="</ul>";

    var contElem=document.getElementById('ICont');
    contElem.innerHTML=str;
    console.log(contElem.innerHTML);
}