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

// С3+
// Напишите функцию deepComp для глубокого сравнения переданных ей значений.
// Значения могут быть числами, строками, хэшами, массивами, в т.ч. любого уровня вложения.
// Учтите, что цикл for..in не гарантирует перебора ключей хэша в каком-либо порядке.
// Напишите автоматические тесты правильной работы функции, например такие:
// var H1={ a:5, b: { b1:6, b2:7 } };
// var H2={ b: { b1:6, b2:7 }, a:5 };
// var H3={ a:5, b: { b1:6 } };
// var H4={ a:5, b: { b1:66, b2:7 } };
// var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
// var H6={ a:null, b:undefined, c:Number.NaN };
// var H7={ c:Number.NaN, b:undefined, a:null };
// var H8={a:5,b:6};
// var H9={c:5,d:6};
// var H10={a:5};
// var A1=[5,7];
// var A2=[5,5,7];
// var A3=[5,8,7];
// deepComp(H1,H2) => true
// deepComp(H1,H3) => false
// deepComp(H1,H4) => false
// deepComp(H1,H5) => false
// deepComp(H6,H7) => true
// deepComp(H8,H9) => false
// deepComp(H8,H10) => false
// deepComp(null,H10) => false
// deepComp(H10,null) => false
// deepComp(null,null) => true
// deepComp(null,undefined) => false
// deepComp(5,"5") => false
// deepComp(5,H1) => false
// deepComp(A1,H1) => false
// deepComp(A2,A3) => false
