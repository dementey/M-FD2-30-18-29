"use strict";

var buildWrapper=function (tag) {
  return (texts) => {return('<'+tag+'>' + texts.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") + '</'+tag+'>');}
}

var wrapH1=new buildWrapper("H1");
var wrapP=new buildWrapper("P");

console.log( wrapH1("СТИХИ") );
console.log( wrapP("Однажды в студёную зимнюю пору") );
console.log( wrapP("Вкусные M&M's") );

// С2+
// Напишите функцию deepCopy для глубокого копирования переданного ей значения.
// Функция должна получать число, строку, хэш или массив и возвращать его копию, включая все подхэши, подмассивы и т.д.
// Напишите модульные тесты правильной работы функции, например такие:

// var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
// var h2=deepCopy(h1);
// h1===h2 => false
// typeof(h2)===typeof(h1) => true
// h1.a===h2.a => true
// h1.b===h2.b => false
// h1.b.b1===h2.b.b1 => true
// h1.c===h2.c => false
// h1.c[0]===h2.c[0] => true
// h1.d===h2.d => true
// h1.e===h2.e => true
// isNaN(h2.f) => true

// var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
// var a2=deepCopy(a1);
// a1===a2 => false
// typeof(a2)===typeof(a1) => true
// a1[0]===a2[0] => true
// a1[1]===a2[1] => false
// a1[1].b1===a2[1].b1 => true
// a1[2]===a2[2] => false
// a1[2][0]===a2[2][0] => true
// a1[3]===a2[3] => true
// a1[4]===a2[4] => true
// isNaN(a2[5]) => true

// var v1="sss";
// var v2=deepCopy(v1);
// typeof(v2)===typeof(v1) => true
// v1===v2 => true

// var z1=null;
// var z2=deepCopy(z1);
// typeof(z2)===typeof(z1) => true
// z1===z2 => true

// var n1=Number.NaN;
// var n2=deepCopy(n1);
// typeof(n2)===typeof(n1) => true
// isNaN(n2) => true