'use strict';

function createSVG() {
	var tagGame = document.getElementById('tagGame');//создаем игровое поле
	var buttonStart = document.createElement('input');//создаём input для кнопки СТАРТ
	var scoreBoard = document.createElement('div'); //сoздаём div для табло
	var fieldSVG = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); //создаём SVG для игрового поля
	var racquet_1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); //создаём SVG для первой(левой) ракетки
	var racquet_2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); //создаём SVG для второй(правой) ракетки
	var ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); //создаём SVG для мячика
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
	var positionTop = 0;//т.к. и мяч и ракетки будут внутри тега SVG (дочерние), то для них своя относительная система кординат, смещений относительно document не будет
	var positionLeft = 0;//tagGame.getBoundingClientRect().left;
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
	scoreBoard.style.top = '2px';
	scoreBoard.style.width = fieldWidth + 'px';
	scoreBoard.style.fontSize = '30px';
	scoreBoard.style.textAlign = 'center';
	scoreBoardInnerHTML(); //вызываем функцию для вывода счета
	document.body.appendChild(scoreBoard); //созданное табло делаем 2-ым дочерным элементом body

	// оформляем  игровое поле
	tagGame.style.width = fieldWidth + 'px';
	tagGame.style.height = fieldHeight + 'px';
	document.body.appendChild(tagGame); //игровое поле делаем 3-им дочерным элементом body

	// рисуем прямоугольник поля
	fieldSVG.setAttribute('width', fieldWidth);
	fieldSVG.setAttribute('height', fieldHeight);
	fieldSVG.setAttribute('fill', bgColor);
	tagGame.appendChild(fieldSVG);

	// оформляем ракетку 1
	racquet_1.setAttribute('width', racketWidth);
	racquet_1.setAttribute('height', racketHeight);
	racquet_1.setAttribute('fill', racket_1BgColor);
	tagGame.appendChild(racquet_1); //созданную первую(левую) ракетку делаем дочерным элементом tagGame

	// оформляем ракетку 2
	racquet_2.setAttribute('width', racketWidth);
	racquet_2.setAttribute('height', racketHeight);
	racquet_2.setAttribute('fill', racket_2BgColor);
	tagGame.appendChild(racquet_2);	//созданную вторую(правую) ракетку делаем дочерным элементом tagGame

	// оформляем мяч
	ball.setAttribute('r', ballRadius);
	ball.setAttribute('fill', ballColor);
	tagGame.appendChild(ball); //созданный мячик делаем дочерным элементом tagGame

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
			var racquet_1Obj = racquet_1,
				racquet_2Obj = racquet_2;

			racquet_1Obj.setAttribute('x', this.r1PosX);
			racquet_1Obj.setAttribute('y', this.r1PosY);

			racquet_2Obj.setAttribute('x', this.r2PosX);
			racquet_2Obj.setAttribute('y', this.r2PosY);
		}
	};

	ballOptions = {
		posX: positionLeft + positionWidth / 2,
		posY: positionTop + positionHeight / 2,
		speedX: 0,
		speedY: 0,
		radius: ballRadius,
		update: function () {
			var ballObj = ball;
			ballObj.setAttribute('cx', this.posX);
			ballObj.setAttribute('cy', this.posY);
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

	racketOption.update();
	ballOptions.update();

	// вывод актуального счета игры
	function scoreBoardInnerHTML() {
		scoreBoard.innerHTML = player1 + ':' + player2;
	}

	// функция запуска мяча
	function start() {
		do {
			var speedXNotNull = randomDiap(-8, 8) * 2;
			var speedYNotNull = randomDiap(-5, 5) * 2;
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
		'scoreBoard': scoreBoard
	};
}
export { createSVG };