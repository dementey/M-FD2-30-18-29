"use strict";

function deepCopy (obj) {
 
    //Еcли obj все (например number, string) кроме массива, хэша или null просто возвращаем обратно 
    if (typeof obj !== 'object') return obj;

    //Если NaN, null, undefined просто возвращаем обратно 
    if (!obj) return obj;

    //Если массив то начинаем переберать элементы
    if (Array.isArray(obj)) {
        var tempArr = [];//создаем временный массив   
        for (var i = 0; i < obj.length; i++) {//перебираем все элементы массива
            tempArr[i] = deepCopy(obj[i]);//рекурсивно вызываем deepCopy, которая проверяет элемент массива какого он типа, NaN, массив, хэш и результат присваиваетя temp
        }
        return tempArr; //возвращаем вренный массив элементами которого может быть что угодно, с учетом вложенности
    }

    //Если хэш то начинаем переберать ключи со значениями c последующей проверкой на вложенность рекурсивным вызовом deepCopy
    if (typeof obj === 'object') {
        var tempHash = {};//создаем временный хэш 
        for (i in obj) //перебераем все ключи
            tempHash[i] = deepCopy(obj[i]);//как и выше  с массивом аналогично рекурсивно вызываем deepCopy, которая проверяет элемент массива какого он типа, NaN, массив, хэш и результат присваиваетя temp
    }
    return tempHash;//возвращаем хэш значеними которого может быть что угодно, с учетом вложенности
}

 console.log('---------');
 var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
 var h2=deepCopy(h1);
 console.log(h1===h2);                  // => false
 console.log(typeof(h2)===typeof(h1));  // => true
 console.log(h1.a===h2.a);              // => true
 console.log(h1.b===h2.b);              // => false
 console.log(h1.b.b1===h2.b.b1);        // => true
 console.log(h1.c===h2.c);              // => false
 console.log(h1.c[0]===h2.c[0]);        // => true
 console.log(h1.d===h2.d);              // => true
 console.log(h1.e===h2.e);              // => true
 console.log(isNaN(h2.f));              // => true
 console.log('---------');

 var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
 var a2=deepCopy(a1);
 console.log(a1===a2);                  // => false
 console.log(typeof(a2)===typeof(a1));  // => true
 console.log(a1[0]===a2[0]);            // => true
 console.log(a1[1]===a2[1]);            // => false
 console.log(a1[1].b1===a2[1].b1);      // => true
 console.log(a1[2]===a2[2]);            // => false
 console.log(a1[2][0]===a2[2][0]);      // => true
 console.log(a1[3]===a2[3]);            // => true
 console.log(a1[4]===a2[4]);            // => true
 console.log(isNaN(a2[5]));             // => true
 console.log('---------');

 var v1="sss";
 var v2=deepCopy(v1);
 console.log(typeof(v2)===typeof(v1));  // => true
 console.log(v1===v2);                  // => true
 console.log('---------');

 var z1=null;
 var z2=deepCopy(z1);
 console.log(typeof(z2)===typeof(z1));  // => true
 console.log(z1===z2);                  // => true
 console.log('---------');

 var n1=Number.NaN;
 var n2=deepCopy(n1);
 console.log(typeof(n2)===typeof(n1));  // => true
 console.log(isNaN(n2));                // => true
 console.log('---------');
 
// С2+
// Напишите функцию deepCopy для глубокого копирования переданного ей значения.
// Функция должна получать число, строку, хэш или массив и возвращать его копию, включая все подхэши, подмассивы и т.д.
// Напишите модульные тесты правильной работы функции, например такие:
