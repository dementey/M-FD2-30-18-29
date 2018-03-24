"use strict";

function blueP() {
    var pars=document.getElementsByTagName('P');
    for ( var i=0; i<pars.length; i++ )
        pars[i].style.color='blue';
}

function redB() {
    var divBlock2=document.getElementById('Block2');
    var bolds=divBlock2.getElementsByTagName('B');
    for ( var i=0; i<bolds.length; i++ )
        bolds[i].style.color='red';
}

function myFunc() {
    var divMyBlock=document.getElementById('MyBlock');
    var tegH1=divMyBlock.getElementsByTagName('h1');
    for ( var i=0; i<tegH1.length; i++ )
        tegH1[i].style.color='blue';
}