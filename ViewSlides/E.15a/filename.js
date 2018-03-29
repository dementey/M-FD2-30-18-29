"use strict";

    var normalFN='./butt_n.gif';
    var hoverFN='./butt_h.gif';
    var pressedFN='./butt_p.gif';

    function buttHover(elem) {
        
        //debugger;
        // Обработчик события - код "buttHover(this)",
        // внутри этого кода this - это картинка.
        // А эта функция может найти картинку через getElementById,
        // или же мы можем передать ей this из кода обработчика, как сейчас
        elem.src=hoverFN;
        console.log(elem);

    }

    function buttNormal(elem) {
        elem.src=normalFN;
        console.log(elem);
    }

    function buttPressed(elem) {
        elem.src=pressedFN;
        console.log(elem);
    }

    buttNormal( document.getElementById('Butt') );