"use strict";

console.log('C использованием метода массива forEach количество русских гласных букв в строке = '+sumVowels(prompt('Введите строку на русском языке','Образовательный центр Парка высоких технологий')));

function sumVowels(str,counter=0) {
  var used={'а':true,'о':true,'э':true,'и':true,'у':true,'ы':true,'е':true,'ё':true,'ю':true,'я':true};
  str.toLowerCase().split('').forEach(f);
  function f (v,i,a){ if (v in used) counter++;};
  return counter;
}

// N.17 Домашнее задание VOWELS_ARR
// Переписать ДЗ VOWELS (подсчёт гласных букв в строке) без использования циклов, тремя способами:
// с использованием метода массива forEach,
// с использованием метода массива filter,
// с использованием метода массива reduce.

//N.07 Домашнее задание VOWELS
//Написать «чистую» функцию для эффективного подсчёта количества русских гласных букв в строке. 
//Спросить у пользователя строку. Вывести в консоль количество русских гласных букв в ней.