"use strict";

function deepComp(aa, bb) {
    debugger;
    // если значение  null или undefined, результат проверки возвращаем
    if (aa === null || aa === undefined || bb === null || bb === undefined) return aa === bb;
    // если значение  NaN и не объект, результат проверки возвращаем
    if (!aa === true || !bb === true) return isNaN(aa) === isNaN(bb);
    //проверяем простые значения
    if (aa === bb) return true;
    //грубое сравнение массивов
    if (Array.isArray(aa) && aa.length !== bb.length) return false;
    // если не объект и предыдущие проверки не прошли нет смысла дальше рассматривать
    if (!(aa instanceof Object) || !(bb instanceof Object)) return false;
    // Проверка вложенности рекурсией
    var temp = Object.keys(aa);
    return Object.keys(bb).every((i) => { return temp.indexOf(i) !== -1; }) &&//проверям обязательное совпадение ключей хэша
        temp.every(function (i) { return deepComp(aa[i], bb[i]); });//проверяем обязательное равенство значений хэша с одинаковыми ключами
}

export { deepComp };