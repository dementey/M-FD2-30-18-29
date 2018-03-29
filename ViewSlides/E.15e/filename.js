"use strict";

function Button(_elem) {
    //console.log(_elem);
    var self=this; // сохраняем ссылку на this в любой переменной, обычно self

    self.elem=_elem; // запоминаем, с каким IMG будем работать

    self.normalFN='./butt_n.gif';
    self.hoverFN='./butt_h.gif';
    self.pressedFN='./butt_p.gif';

    self.elem.addEventListener('mouseover',buttHover,false);
    self.elem.addEventListener('mousedown',buttPressed,false);
    self.elem.addEventListener('mouseup',buttHover,false);
    self.elem.addEventListener('mouseout',buttNormal,false);

    function buttNormal() {
        self.elem.src=self.normalFN;
    }

    function buttHover() {
        self.elem.src=self.hoverFN;
    }

    function buttPressed() {
        self.elem.src=self.pressedFN;
    }

    buttNormal(); // переключаем кнопку в стартовое состояние - обычное

}


var butt1=new Button( document.getElementById('Butt1') );
var butt2=new Button( document.getElementById('Butt2') );
var butt3=new Button( document.getElementById('Butt3') );