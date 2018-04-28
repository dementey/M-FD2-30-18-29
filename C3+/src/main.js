"use strict";

import { deepComp } from './DeepCompScript';

var H1 = { a: 5, b: { b1: 6, b2: 7 } };
var H2 = { b: { b1: 6, b2: 7 }, a: 5 };
var H3 = { a: 5, b: { b1: 6 } };
var H4 = { a: 5, b: { b1: 66, b2: 7 } };
var H5 = { a: 5, b: { b1: 6, b2: 7, b3: 8 } };
var H6 = { a: null, b: undefined, c: Number.NaN };
var H7 = { c: Number.NaN, b: undefined, a: null };
var H8 = { a: 5, b: 6 };
var H9 = { c: 5, d: 6 };
var H10 = { a: 5 };
var A1 = [5, 7];
var A2 = [5, 5, 7];
var A3 = [5, 8, 7];

console.log(deepComp(H1, H2) + ' => true');
console.log(deepComp(H1, H3) + ' => false');
console.log(deepComp(H1, H4) + ' => false');
console.log(deepComp(H1, H5) + ' => false');
console.log(deepComp(H6, H7) + ' => true');
console.log(deepComp(H8, H9) + ' => false');
console.log(deepComp(H8, H10) + ' => false');
console.log(deepComp(null, H10) + ' => false');
console.log(deepComp(H10, null) + ' => false');
console.log(deepComp(null, null) + ' => true');
console.log(deepComp(null, undefined) + ' => false');
console.log(deepComp(5, "5") + ' => false');
console.log(deepComp(5, H1) + ' => false');
console.log(deepComp(A1, H1) + ' => false');
console.log(deepComp(A2, A3) + ' => false');

// С3+
// Напишите функцию deepComp для глубокого сравнения переданных ей значений.
// Значения могут быть числами, строками, хэшами, массивами, в т.ч. любого уровня вложения.
// Учтите, что цикл for..in не гарантирует перебора ключей хэша в каком-либо порядке.
// Напишите автоматические тесты правильной работы функции, например такие: