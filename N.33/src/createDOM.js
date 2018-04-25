

"use strict";

function createDOMAnalogClock() {

	//устанавливаем цвет и размер часов
	var blackColor = "#000";
	var bgColor = "#fccb66";
	var width = 200;
	var widthHour = width / 7;//ширина часовой стрелки

	var tagForm = document.getElementById("clock");
	tagForm.style.fontcolor = blackColor;
	tagForm.style.display = 'none';//отключаем отображение до отображения текущего времени

	// табло часов, родитель 
	var staticPanel = document.createElement("div");
	staticPanel.style.borderRadius = "50%";
	staticPanel.style.backgroundColor = bgColor;
	staticPanel.style.border = "solid 1px" + bgColor;
	staticPanel.style.width = width + "px";
	staticPanel.style.height = width + "px";
	staticPanel.style.position = "relative";
	tagForm.appendChild(staticPanel);

	//цифровые часы на панели 
	var digitalClock = document.createElement("p");
	digitalClock.id = 'digitalClock';
	digitalClock.style.textAlign = "center";
	digitalClock.style.fontSize = width / 10 + "px";
	digitalClock.style.marginTop = width * 0.25 + "px";
	digitalClock.style.color = blackColor;
	staticPanel.appendChild(digitalClock);

	// создаем контейнер для цыфр на табло
	var numberOfHours = document.createElement("div");
	numberOfHours.style.height = "100%";
	numberOfHours.style.listStyle = "none";
	numberOfHours.style.position = "absolute";
	numberOfHours.style.top = 0;
	numberOfHours.style.left = width / 2 - widthHour / 2 + "px";
	staticPanel.appendChild(numberOfHours);

	//формируем цыфры
	for (var i = 0; i <= 11; i++) {
		var digitsListHours = document.createElement("div");
		digitsListHours.id = 'digitsListHours';
		digitsListHours.style.position = "absolute";
		digitsListHours.style.textAlign = "center";
		digitsListHours.style.height = width + "px";
		digitsListHours.style.fontSize = width / 12 + "px";
		digitsListHours.style.fontStyle = "arial";
		digitsListHours.style.transform = "rotate(" + 360 / 12 * (i + 1) + "deg)";
		numberOfHours.appendChild(digitsListHours);

		//выводим окружности вокруг цифр
		var numCircle = document.createElement("div");
		numCircle.style.borderRadius = "50%";
		numCircle.style.backgroundColor = "#46b483";
		numCircle.style.width = widthHour + "px";
		numCircle.style.height = widthHour + "px";
		numCircle.style.transform = "rotate(" + -360 / 12 * (i + 1) + "deg)";
		digitsListHours.appendChild(numCircle);

		//выводим числа
		var numTop = document.createElement("div");
		numTop.style.width = "100%";
		numTop.style.position = "absolute";
		numTop.style.textAlign = "center";
		numTop.style.paddingTop = widthHour / 5 + "px";
		numTop.innerHTML = i + 1;
		numCircle.appendChild(numTop);
	}

	//часовая стрелка
	var hour = document.createElement("div");
	var hourWidth = width / 20;
	var hourTop = width * 0.25 - (hourWidth * 0.5);
	var hourleft = width * 0.5 - (hourWidth * 0.5);
	hour.id = 'hourHand';
	hour.style.width = hourWidth + "px";
	hour.style.height = hourWidth * 6 + "px";
	hour.style.position = "absolute";
	hour.style.left = hourleft + "px";
	hour.style.top = hourTop + "px";
	hour.style.borderRadius = hourWidth + "px";
	hour.style.backgroundColor = blackColor;
	hour.style.transformOrigin = "55% 90%";
	staticPanel.appendChild(hour);

	//минутная стрелка
	var min = document.createElement("div");
	var minWidth = hourWidth / 2;
	var minTop = width * 0.1 - (minWidth * 0.5);
	var minleft = width * 0.5 - (minWidth * 0.5);
	min.id = 'minHand';
	min.style.width = minWidth + "px";
	min.style.position = "absolute";
	min.style.border = "solid 0px transparent";
	min.style.left = minleft + "px";
	min.style.top = minTop + "px";
	min.style.borderTop = "solid " + (width * 0.5 - minTop) + "px";
	min.style.borderBottomWidth = (width * 0.5 - minTop) + "px";
	min.style.borderRadius = hourWidth + "px";
	staticPanel.appendChild(min);

	//секундная стрелка
	var sec = document.createElement("div");
	var secWidth = 1;
	var secTop = width * 0.05;
	sec.id = 'secHand';
	sec.style.width = secWidth + "px";
	sec.style.height = secWidth + "px";
	sec.style.position = "absolute";
	sec.style.border = "solid 0px transparent";
	sec.style.left = (width * 0.5 - secWidth) + "px";
	sec.style.top = secTop + "px";
	sec.style.borderTop = "solid " + (width * 0.5 - secTop) + "px " + blackColor;
	sec.style.borderBottomWidth = (width * 0.5 - secTop) + "px";
	sec.style.borderRadius = 2 + "px";
	staticPanel.appendChild(sec);
}

export { createDOMAnalogClock };