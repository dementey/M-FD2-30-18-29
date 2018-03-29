"use strict";

var buildWrapper=function (tag) {
  return (texts) => {return('<'+tag+'>' + texts.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") + '</'+tag+'>');}
}

var wrapH1=new buildWrapper("H1");
var wrapP=new buildWrapper("P");

console.log( wrapH1("СТИХИ") );
console.log( wrapP("Однажды в студёную зимнюю пору") );
console.log( wrapP("Вкусные M&M's") );

// C1+
// Напишите "чистую" функцию, получающую номер года и номер месяца, и возвращающую количество дней в этом месяце.
// Проверьте правильную работу кода серией вызовов этой функции с различными аргументами, обязательно с вариантом
// февраля в високосном и невисокосном году.