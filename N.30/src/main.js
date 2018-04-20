"use strict";

var elems = document.getElementsByTagName('img');

for (var i = elems.length - 1; i > 0; i--) {
  var elem = elems[i];
  elem.style.position = 'absolute';
  elem.style.left = elem.offsetLeft;
  elem.style.top = elem.offsetTop;
}

document.body.addEventListener('mousedown', shiftFunc, false);

function shiftFunc(EO) {
  EO = EO || window.event;
  var elem = EO.target;

  var shiftX = EO.pageX - elem.getBoundingClientRect().left;
  var shiftY = EO.pageY - elem.getBoundingClientRect().top;

  document.body.appendChild(elem);

  document.onmousemove = function (EO) {
    elem.style.left = EO.pageX - shiftX + 'px';
    elem.style.top = EO.pageY - shiftY + 'px';
  };

  elem.onmouseup = () => document.onmousemove = null;

  elem.ondragstart = function () {
    return false;
  };
}


