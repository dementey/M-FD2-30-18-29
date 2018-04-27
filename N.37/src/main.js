"use strict";

import { createSVGAnalogClock } from './createSVG.js'

// формат выводимой даты
var dateTimeFormat = (time) => str0l(time.getHours(), 2) + ":" + str0l(time.getMinutes(), 2) + ":" + str0l(time.getSeconds(), 2);

//дописываем недастоющие нули в значения даты
function str0l(val, len) {
	var strVal = val.toString();
	while (strVal.length < len)
		strVal = '0' + strVal;
	return strVal;
}

var link = createSVGAnalogClock(dateTimeFormat(new Date()));
//отрисовываем SVG и передаем цыфровые часы для полноценного отображения часов при первичной загрузки

var updateСlock = (() => {
	var dd = new Date();
	link.digitalClock.textContent = dateTimeFormat(dd);
	link.secHand.setAttribute("transform", "rotate(" + (dd.getSeconds() * 6) + ")");
	link.minuteHand.setAttribute("transform", "rotate(" + (dd.getMinutes() * 6) + ")");
	link.hourHand.setAttribute("transform", "rotate(" + ((dd.getHours() % 12) * 30 + dd.getMinutes() / 2) + ")");
});

setInterval(updateСlock, 1000);

