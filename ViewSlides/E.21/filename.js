"use strict";

var boxObj=document.getElementById('IBox');
boxObj.addEventListener("click",boxClicked,false);
// или boxObj.onclick=boxClicked;

function boxClicked(EO) {
    debugger;
    console.log('EO = '+EO);
    console.log('window.event = '+window.event);
    // все браузеры, кроме старых IE,
    // передают объект события как аргумент обработчику события
    // т.е. он передан обработчику под именем EO
    // а старые IE хранят объект события в window.event
    // многие современные браузеры делают и то и другое
    EO=EO||window.event;
    // теперь EO - объект события в любом браузере

    // найдём положение самого жёлтого квадрата относительно страницы
    var boxPos=getElementPos(boxObj);

    var infoObj=document.getElementById('IInfo');
    // найдём координаты клика относительно жёлтого квадрата
    var clickX=Math.round(EO.pageX-boxPos.left);
    var clickY=Math.round(EO.pageY-boxPos.top);
    infoObj.innerHTML="x="+clickX+" y="+clickY;
}

function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left+window.pageXOffset,
        top: bbox.top+window.pageYOffset
    };
}