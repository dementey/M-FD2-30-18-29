'use strict';

function createCANVAS() {
	var cvs = document.getElementById('tagGame');
	var context = cvs.getContext('2d');
	var buttonStart = document.createElement('input');//создаём input для кнопки СТАРТ
	var scoreBoard = document.createElement('div'); //сoздаём div для табло
	var player1 = 0; //счет первого игрока
	var player2 = 0; //счет второго игрока
	var racketOption; //создаём хэш racketOption для анимации движения ракеток
	var racquetZone; //создаём хэш racquetZone для проверки зоны движения ракеток
	var ballOptions; //создаём хэш ballOptions для анимации движения мячика
	var ballZone; //создаём хэш ballZone для зоны движения мячика
	var fieldWidth = 700;//ширина игрового поля
	var fieldHeight = 300;//высота игрового поля
	var racketWidth = 10;//ширина ракетки
	var racketHeight = 100;//высота ракетки
	var ballRadius = 15;//ширина мяча
	var bgColor = '#f1ef7f';//цвет поля
	var racket_1BgColor = '#02ab56';//цвет 1-ой ракетки
	var racket_2BgColor = '#120c98';//цвет 2-ой ракетки
	var ballColor = '#f11c34';//цвет мяча
	var positionTop = 0;//т.к. и мяч и ракетки будут внутри тега CANVAS, то для них своя 
						//относительная система кординат, смещений относительно document не будет
	var positionLeft = 0;
	var positionHeight = fieldHeight;
	var positionWidth = fieldWidth;

	// оформляем кнопку 'СТАРТ!'
	buttonStart.type = 'button';
	buttonStart.value = 'старт!';
	buttonStart.style.width = '100px';
	buttonStart.style.fontSize = '20px';
	buttonStart.style.position = 'fixed';
	document.body.appendChild(buttonStart); //созданную кнопку делаем 1-ым дочерным элементом body
	buttonStart.onclick = start; //подписываемся на события onclick

	// оформляем счет-табло
	scoreBoard.style.width = fieldWidth + 'px';
	scoreBoard.style.fontSize = '25px';
	scoreBoard.style.textAlign = 'center';
	scoreBoardInnerHTML(); //вызываем функцию для вывода счета
	document.body.appendChild(scoreBoard); //созданное табло делаем 2-ым дочерным элементом body
	document.body.appendChild(cvs);

	// оформляем  игровое поле и выделяем в функцию для "затирания экрана в каждом такте requestAnimationFrame
	function clearField() {
		context.fillStyle = bgColor;
		context.fillRect(positionTop, positionLeft, fieldWidth, fieldHeight);
	}

	racketOption = {
		r1PosX: positionLeft,
		r1PosY: positionTop + positionHeight / 2 - racketHeight / 2,
		r1Speed: 0,
		r2PosX: positionLeft + positionWidth - racketWidth,
		r2PosY: positionTop + positionHeight / 2 - racketHeight / 2,
		r2Speed: 0,
		width: racketWidth,
		height: racketHeight,
		update: function () {
			// оформляем ракетку 1
			context.fillStyle = racket_1BgColor;
			context.fillRect(this.r1PosX, this.r1PosY, racketWidth, racketHeight)
			// оформляем ракетку 2
			context.fillStyle = racket_2BgColor;
			context.fillRect(this.r2PosX, this.r2PosY, racketWidth, racketHeight)
		}
	};

	ballOptions = {
		posX: positionLeft + positionWidth / 2,
		posY: positionTop + positionHeight / 2,
		speedX: 0,
		speedY: 0,
		radius: ballRadius,
		update: function () {
			// оформляем мяч
			context.beginPath();
			context.arc(this.posX, this.posY, ballRadius, 0, 2 * Math.PI, false);
			context.fillStyle = ballColor;
			context.fill();
		}
	};

	racquetZone = {
		width: racketWidth,
		height: positionHeight
	};

	ballZone = {
		width: positionWidth,
		height: positionHeight
	};

	clearField();
	racketOption.update();
	ballOptions.update();

	// вывод актуального счета игры
	function scoreBoardInnerHTML() {
		scoreBoard.innerHTML = player1 + ':' + player2;
	}

	// функция запуска мяча
	function start() {
		do {
			var speedXNotNull = randomDiap(-8, 8);
			var speedYNotNull = randomDiap(-5, 5);
		}
		while (speedXNotNull == 0 || speedYNotNull == 0);
		ballOptions.speedX = speedXNotNull;
		ballOptions.speedY = speedYNotNull;
		ballOptions.posX = positionLeft + positionWidth / 2 - ballRadius / 2;
		ballOptions.posY = positionTop + positionHeight / 2 - ballRadius / 2

		// получение целого случайного числа в заданном диапазоне
		function randomDiap(n, m) {
			return Math.floor(Math.random() * (m - n + 1)) + n;
		}

	}

	return {
		'racketOption': racketOption,
		'positionTop': positionTop,
		'racquetZone': racquetZone,
		'ballOptions': ballOptions,
		'ballZone': ballZone,
		'positionLeft': positionLeft,
		'positionWidth': positionWidth,
		'player1': player1,
		'player2': player2,
		'scoreBoard': scoreBoard,
		'clearField': clearField
	};
}
export { createCANVAS };