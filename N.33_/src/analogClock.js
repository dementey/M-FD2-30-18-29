



function AnalogClock() {

	var dateTimeFormat = (time) => str0l(time.getHours(), 2) + ":" + str0l(time.getMinutes(), 2) + ":" + str0l(time.getSeconds(), 2);

	function str0l(val, len) {
		var strVal = val.toString();
		while (strVal.length < len)
			strVal = '0' + strVal;
		return strVal;
	}

	var blackColor = "#000";//text color #46b483
	var bgColor = "#fccb66";
	var width = 200;

	var tagForm = document.getElementById("clock");
	tagForm.style.fontcolor = blackColor;

	//статическая часть
	//внешняя панель часов, включая фон
	var staticPanel = document.createElement("div");
	staticPanel.style.borderRadius = "50%";
	staticPanel.style.backgroundColor = bgColor;
	staticPanel.style.border = "solid 10px #fccb66";
	staticPanel.style.width = width + "px";
	staticPanel.style.height = width + "px";
	staticPanel.style.position = "relative";
	tagForm.appendChild(staticPanel);

	//цифровые часы на панели
	var digitalClock = document.createElement("p");
	digitalClock.style.textAlign = "center";
	digitalClock.style.fontSize = width / 10 + "px";
	digitalClock.style.marginTop = width * 0.3 + "px";
	digitalClock.style.color = blackColor;
	//digitalClock.innerHTML = dateTimeFormat(new Date());
	staticPanel.appendChild(digitalClock);

	//контейнер номеров часов на панели
	var numberOfHours = document.createElement("ul");
	numberOfHours.style.height = "100%";
	numberOfHours.style.padding = "0";
	numberOfHours.style.margin = "0";
	numberOfHours.style.listStyle = "none";
	numberOfHours.style.position = "absolute";
	numberOfHours.style.width = 40 + "px";
	numberOfHours.style.top = 0;
	numberOfHours.style.left = width / 2 - 20 + "px";
	numberOfHours.style.color = blackColor;
	staticPanel.appendChild(numberOfHours);

	//список номеров часов на панели
	for (var i = 0; i <= 11; i++) {
		var digitsListHours = document.createElement("li");
		digitsListHours.style.padding = "0";
		digitsListHours.style.margin = "0";
		digitsListHours.style.borderRadius = "50%";
		//digitsListHours.style.backgroundColor = "#46b483";
		digitsListHours.style.position = "absolute";
		digitsListHours.style.textAlign = "center";
		digitsListHours.style.width = "40px";
		digitsListHours.style.height = width + "px";
		digitsListHours.style.fontSize = width / 12 + "px";
		digitsListHours.style.fontStyle = "arial";
		numberOfHours.appendChild(digitsListHours);
		digitsListHours.style.transform = "rotate(" + 360 / 12 * (i + 1) + "deg)";




		var numCircle = document.createElement("div");
		numCircle.style.borderRadius = "50%";
		numCircle.style.backgroundColor = "#46b483";
		numCircle.style.border = "solid 1px #46b483";
		numCircle.style.width = width / 7 + "px";
		numCircle.style.height = width / 7 + "px";
		numCircle.style.position = "relative";
		digitsListHours.appendChild(numCircle);
		numCircle.style.transform = "rotate(" + -360 / 12 * (i + 1) + "deg)";//recover the rotation

		//выводим числа
		var numTop = document.createElement("div");
		numTop.style.width = "100%";
		numTop.style.position = "absolute";
		numTop.style.textAlign = "center";
		numTop.style.paddingTop = width / 30 + "px";
		numTop.innerHTML = i + 1;
		numCircle.appendChild(numTop);
		//numTop.style.transform = "rotate(" + -360 / 12 * (i + 1) + "deg)";//recover the rotation
	}

	//часовая стрелка
	var hour = document.createElement("div");
	var hourWidth = width * 0.04;
	var hourTop = width * 0.25 - (hourWidth * 0.5);
	var hourleft = width * 0.5 - hourWidth * 0.5;
	hour.style.width = hourWidth + "px";
	hour.style.height = hourWidth + "px";
	hour.style.position = "absolute";
	hour.style.border = "solid 0px transparent";
	hour.style.left = hourleft + "px";
	hour.style.top = hourTop + "px";
	hour.style.borderTop = "solid " + (width * 0.5 - hourTop) + "px";
	hour.style.borderBottomWidth = (width * 0.5 - hourTop) + "px";

	//hour.style.transformOrigin = "50% 50%";


	staticPanel.appendChild(hour);

	//minute hand
	var min = document.createElement("div");
	var minWidth = width * 0.02;
	var minTop = width * 0.1 - (minWidth * 0.5);
	var minleft = width * 0.5 - minWidth * 0.5;
	min.style.width = minWidth + "px";
	min.style.height = minWidth + "px";
	min.style.position = "absolute";
	min.style.border = "solid 0px transparent";
	min.style.left = minleft + "px";
	min.style.top = minTop + "px";
	min.style.borderTop = "solid " + (width * 0.5 - minTop) + "px";
	min.style.borderBottomWidth = (width * 0.5 - minTop) + "px";
	staticPanel.appendChild(min);

	//second hand
	var sec = document.createElement("div");
	var secWidth = 1;
	var secTop = width * 0.05;
	sec.style.width = secWidth + "px";
	sec.style.height = secWidth + "px";
	sec.style.position = "absolute";
	sec.style.border = "solid 0px transparent";
	sec.style.left = (width * 0.5 - secWidth) + "px";
	sec.style.top = secTop + "px";
	sec.style.borderTop = "solid " + (width * 0.5 - secTop) + "px " + blackColor;
	sec.style.borderBottomWidth = (width * 0.5 - secTop) + "px";
	staticPanel.appendChild(sec);

	//start the clock (the animation part)
	//-----------------------------------------------------
	setInterval(function () {
		var now = new Date();
		digitalClock.innerHTML = dateTimeFormat(now);

		var roS = 1.0 * 360 / 60 * now.getSeconds();
		var roM = 1.0 * 360 / 60 * now.getMinutes();
		var roH = 1.0 * 360 / 12 * (now.getHours() % 12) + 1.0 * 360 / 12 * (now.getMinutes() / 60);

		sec.style.transform = 'rotate(' + roS + 'deg)';
		min.style.transform = 'rotate(' + roM + 'deg)';
		hour.style.transform = 'rotate(' + roH + 'deg)';
	}, 1000);
}

AnalogClock();//simple use