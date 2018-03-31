"use strict";

var numberOfDays = function (year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

console.log(numberOfDays(2018,3));
console.log(numberOfDays(2018,4));
console.log(numberOfDays(2012,2));


//C1+
//Напишите "чистую" функцию, получающую номер года и номер месяца, и возвращающую количество дней в этом месяце.
//Проверьте правильную работу кода серией вызовов этой функции с различными аргументами, обязательно с вариантом 
//февраля в високосном и невисокосном году.