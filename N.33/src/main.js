"use strict";

import { createDOMAnalogClock } from './createDOM.js'

createDOMAnalogClock();//формируем DOM аналоговых часов

setInterval(function () {

	var currentTime = new Date();
	document.getElementById('digitalClock').innerHTML = dateTimeFormat(currentTime);
	document.getElementById("clock").style.display = 'block';

	var rotateSecondHand = 360 / 60 * currentTime.getSeconds();
	var rotateMinuteHand = 360 / 60 * currentTime.getMinutes();
	var rotateHourHand = 360 / 12 * currentTime.getHours() + 360 / 12 * (currentTime.getMinutes() / 60);

	document.getElementById('secHand').style.transform = 'rotate(' + rotateSecondHand + 'deg)';
	document.getElementById('minHand').style.transform = 'rotate(' + rotateMinuteHand + 'deg)';
	document.getElementById('hourHand').style.transform = 'rotate(' + rotateHourHand + 'deg)';
}, 1000);

// формат выводимой даты
var dateTimeFormat = (time) => str0l(time.getHours(), 2) + ":" + str0l(time.getMinutes(), 2) + ":" + str0l(time.getSeconds(), 2);

//дописываем недостоющие нули в значения даты
function str0l(val, len) {
	var strVal = val.toString();
	while (strVal.length < len)
		strVal = '0' + strVal;
	return strVal;
}