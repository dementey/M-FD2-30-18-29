"use strict";

var BuildWrapper=function (tag) {
  return (texts,atr) => {return('<'+tag+' '+ if (var key in atr) Object.keys(atr)+'>' + texts.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") + '</'+tag+'>');}
}

var WrapH1=new BuildWrapper("H1");
var WrapP=new BuildWrapper("P");

console.log( WrapH1("СТИХИ") );
console.log( WrapP("Однажды в студёную зимнюю пору") );
console.log( WrapP("Вкусные M&M's") );
console.log( WrapH1("СТИХИ",{align:"center"}) );
console.log( WrapP("Однажды в <студёную> зимнюю пору") );
// B6+
// Доработайте функцию для оборачивания текста в тег из задания B5+, чтобы в вызове функции
// можно было, при желании, указывать атрибуты в виде хэша.
// Функция должна учитывать, что некоторые символы надо замеменять на HTML-мнемоники.
// var WrapH1=BuildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
// var WrapP=BuildWrapper("P");   // строим функцию для оборачивания текста в тег P
// console.log( WrapH1("СТИХИ",{align:"center"}) );
// // в консоль выводится строка "<H1 align='center'>СТИХИ</H1>"
// console.log( WrapP("Однажды в <студёную> зимнюю пору") );
// // в консоль выводится строка "<P>Однажды в &lt;студёную&gt; зимнюю пору</P>"