"use strict";

function toLeft( ) {
    var green=document.getElementById('GREEN');
    var red=document.getElementById('RED');
    green.style.left=(red.offsetLeft-green.offsetWidth)+'px';
    console.log((red.offsetLeft-green.offsetWidth)+'px');
    green.style.top=(red.offsetTop+red.offsetHeight/2-green.offsetHeight/2)+'px';
    console.log((red.offsetTop+red.offsetHeight/2-green.offsetHeight/2)+'px');
}

function toRight( ) {
    var green=document.getElementById('GREEN');
    var red=document.getElementById('RED');
    green.style.left=(red.offsetLeft+red.offsetWidth)+'px';
    green.style.top=(red.offsetTop+red.offsetHeight/2-green.offsetHeight/2)+'px';
}

function toTop( ) {
    var green=document.getElementById('GREEN');
    var red=document.getElementById('RED');
    green.style.top=(red.offsetTop-green.offsetHeight)+'px';
    console.log((red.offsetTop-green.offsetHeight)+'px');
    green.style.left=(red.offsetLeft+red.offsetWidth/2-green.offsetWidth/2)+'px';
}

function toBottom( ) {
    var green=document.getElementById('GREEN');
    var red=document.getElementById('RED');
    green.style.top=(red.offsetTop+red.offsetHeight)+'px';
    green.style.left=(red.offsetLeft+red.offsetWidth/2-green.offsetWidth/2)+'px';
}