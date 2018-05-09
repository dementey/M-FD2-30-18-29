'use strict';

var i = 0;
var colorBlack = '#000'; //Цвет стрелок
var colorBg = '#FFF'; //Цвет фона для затирания всех часов в начале каждого такта, т.е. просто белый цвет
var colPan = '#fccb66'; //Цвет панели
var colHourCirc = '#46b483'; // Цвет окружностей часовых меток
var radPanel = 100; //Радиус круга панели часов
var radCircNum = radPanel * 0.17;// радиус окружностей часовых меток
var secHand = radPanel * 0.9; //Длина секундной стрелки
var minuteHand = radPanel * 0.7; //Длина минутной стрелки
var hourHand = radPanel * 0.45; //Длина часовой стрелки
var canvasClock;

var context = document.getElementById('canvasClock').getContext('2d');

//Функция рисования линии под углом
function contextLine(x1, y1, length, angle, color, width) {
	var x2 = (radPanel + (length * Math.cos(angle)));
	var y2 = (radPanel + (length * Math.sin(angle)));
	context.beginPath();
	context.strokeStyle = color;
	context.lineWidth = width;
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineCap = 'round';
	context.stroke();
}

//Функция рисования круга
function contextCircle(x, y, rd, color = '#fccb66', bg = '#fccb66', text = false, i) {
	context.beginPath();
	context.arc(x, y, rd, 0, 2 * Math.PI, false);
	context.fillStyle = bg;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = color;
	context.stroke();
	if (text === true) {
		context.font = '15px Arial';
		context.fillStyle = colorBlack;
		context.textAlign = 'center';
		context.fillText(i, x, y + 5);
	}
}

//Функция рисования стрелок и цифрового табло в каждом такте
function tick() {
	var dd = new Date();

	// Рисуем главнцую окружность
	contextCircle(radPanel, radPanel, radPanel);

	// Рисуем часовые окружности
	for (var k = 1; k <= 12; k++) {
		i = 360 / 12 * k;
		contextCircle((radPanel + ((radPanel - 20) * Math.cos((i - 90) / 180 * Math.PI))), (radPanel + ((radPanel - 20) * Math.sin((i - 90) / 180 * Math.PI))), radCircNum, colHourCirc, colHourCirc, true, k);
	}

	//Вычисляем поворот часовой стрелки
	i = 360 / 720 * ((dd.getHours() * 60) + dd.getMinutes());
	//Рисуем часовую стрелку
	contextLine(radPanel, radPanel, hourHand, ((i - 90) / 180 * Math.PI), colorBlack, 10);

	//Вычисляем поворот минутной стрелки
	i = 360 / 3600 * ((dd.getMinutes() * 60) + dd.getSeconds());
	//Рисуем минутную стрелку
	contextLine(radPanel, radPanel, minuteHand, ((i - 90) / 180 * Math.PI), colorBlack, 5);

	//Вычисляем поворот секундоной стрелки
	i = 360 / (60 * 1000) * ((dd.getSeconds() * 1000) + dd.getMilliseconds());
	//Рисуем секундную стрелку
	contextLine(radPanel, radPanel, secHand, ((i - 90) / 180 * Math.PI), colorBlack, 2);
	//отображаем цифровые часы
	context.font = '25px Arial';
	context.fillText(dateTimeFormat(dd), 100, 80);
}

(function () {
	canvasClock = document.getElementById('canvasClock');
	context = canvasClock.getContext('2d');
	//затираем в начале каждого такта все белым квадратом
	context.fillStyle = colorBg;
	context.fillRect(0, 0, canvasClock.width, canvasClock.height);
	setInterval(tick, 1000);}());

//дописываем недастоющие нули в значения даты
function str0l(val, len) {
	var strVal = val.toString();
	while (strVal.length < len)
		strVal = '0' + strVal;
	return strVal;
}

// формат выводимой даты
var dateTimeFormat = (time) => str0l(time.getHours(), 2) + ':' + str0l(time.getMinutes(), 2) + ':' + str0l(time.getSeconds(), 2);