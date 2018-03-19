"use strict";

function buildWrapper(texts) {
    switch ( texts ) {
        case "H1": return (texts) => {return('<H1>' + texts.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") + '</H1>');}
          break;
        case "P": return (texts) => {return('<P>' + texts.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") + '</P>');}
          break;
        default: console.log('Введен неизвестный тег');
      }
}

var wrapH1=new buildWrapper("H1");
var wrapP=new buildWrapper("P");

console.log( wrapH1("СТИХИ") );
console.log( wrapP("Однажды в студёную зимнюю пору") );
console.log( wrapP("Вкусные M&M's") );

// B5+
// Напишите функцию для оборачивания текста в тег, с которой можно было бы работать в следующем стиле:
// var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
// var wrapP=buildWrapper("P");   // строим функцию для оборачивания текста в тег P
// console.log( wrapH1("СТИХИ") );
// // в консоль выводится строка "<H1>СТИХИ</H1>"
// console.log( wrapP("Однажды в студёную зимнюю пору") );
// // в консоль выводится строка "<P>Однажды в студёную зимнюю пору</P>"
// Функция должна учитывать, что некоторые символы надо замеменять на HTML-мнемоники:
// console.log( wrapP("Вкусные M&M's") );
// // в консоль выводится строка "<P>Вкусные M&amp;M&apos;s</P>"