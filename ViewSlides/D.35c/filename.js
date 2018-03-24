"use strict";

function pos( ) {

    var red=document.getElementById('RED');
    var green=document.getElementById('GREEN');

    var form=document.forms.FPos;
    var radius=parseFloat(form.elements.Radius.value);
    var angle=parseFloat(form.elements.Angle.value)/180*Math.PI;

    var redCenterX=red.offsetLeft+red.offsetWidth/2;
    var redCenterY=red.offsetTop+red.offsetHeight/2;

    var greenCenterX=redCenterX+radius*Math.sin(angle);
    var greenCenterY=redCenterY-radius*Math.cos(angle);

    green.style.left=Math.round(greenCenterX-green.offsetWidth/2)+'px';
    green.style.top=Math.round(greenCenterY-green.offsetHeight/2)+'px';
}

pos();