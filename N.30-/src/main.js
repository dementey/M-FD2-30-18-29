
"use strict";

var div11Field = document.getElementById('div1').addEventListener('drop', divDrop(),false);
//var div12Field = document.getElementById('div1').addEventListener('dragover',divDragOver(),false);
//var div21Field = document.getElementById('div2').addEventListener('drop',divDrop(),false);
//var div22Field = document.getElementById('div2').addEventListener('dragover',divDragOver(),false);

function divDragOver(EO) {
  EO = EO || window.event;
  // по-умолчанию ронять элементы в div запрещено, отменяем:
  EO.preventDefault();
}

function divDrop(EO) {
  // мячик уронен
  EO = EO || window.event;
  EO.preventDefault();
  // что уронено? this не пойдёт, drop - это событие div-а!
  var dragElem = document.getElementById('BALL');
  // куда уронено?
  // EO.target не пойдёт - это не всегда div, например если мячик в div-е чуть
  // сдвинуть и уронить НА САМОГО СЕБЯ - то EO.target будет сам мячик
  // EO.currentTarget - всегда тот элемент, у которого вызван обработчик события
  EO.currentTarget.appendChild(dragElem);
}
