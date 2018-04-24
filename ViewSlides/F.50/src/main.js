"use strict";

setInterval(updateTime, 1000);

function updateTime() {
    var currTime = new Date();
    var currTimeStr = formatDateTime(currTime);
    document.getElementById('TTT').innerHTML = 'Текущие дата и время - ' + currTimeStr;
}

// форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
function formatDateTime(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    return str0l(day, 2) + '.' + str0l(month, 2) + '.' + year + ' ' + str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

// дополняет строку val слева нулями до длины Len
function str0l(val, len) {
    var strVal = val.toString();
    while (strVal.length < len)
        strVal = '0' + strVal;
    return strVal;
}