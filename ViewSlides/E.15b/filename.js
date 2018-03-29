"use strict";

var normalFN='./butt_n.gif';
var hoverFN='./butt_h.gif';
var pressedFN='./butt_p.gif';
console.log(this);
var buttObj1=document.getElementById('Butt1');
buttObj1.onmouseover=buttHover;
buttObj1.onmousedown=buttPressed;
buttObj1.onmouseup=buttHover;
buttObj1.onmouseout=buttNormal;
buttObj1.src=normalFN;

var buttObj2=document.getElementById('Butt2');
buttObj2.onmouseover=buttHover;
buttObj2.onmousedown=buttPressed;
buttObj2.onmouseup=buttHover;
buttObj2.onmouseout=buttNormal;
buttObj2.src=normalFN;

var buttObj3=document.getElementById('Butt3');
buttObj3.onmouseover=buttHover;
buttObj3.onmousedown=buttPressed;
buttObj3.onmouseup=buttHover;
buttObj3.onmouseout=buttNormal;
buttObj3.src=normalFN;

function buttHover() {

    this.src=hoverFN; // this - объект, у которого произошло событие

}

function buttNormal() {
    this.src=normalFN;

}

function buttPressed() {
    this.src=pressedFN;
    console.log(this);
}
