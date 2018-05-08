'use strict';

function createDOM() {
	var tagGame = document.getElementById('tagGame');//создаем игровое поле
	var buttonStart = document.createElement('input');//создаём input для кнопки СТАРТ
	var scoreBoard = document.createElement('div'); //сoздаём div для табло
	var racquet_1 = document.createElement('div'); //создаём div для первой(левой) ракетки
	var racquet_2 = document.createElement('div'); //создаём div для второй(правой) ракетки
	var ball = document.createElement('div'); //создаём div для мячика
	var player1 = 0; //счет первого игрока
	var player2 = 0; //счет второго игрока
	var racketOption; //создаём хэш racketOption для данимации движения ракеток
	var racquetZone; //создаём хэш racquetZone для проверки зоны движения ракеток
	var ballOptions; //создаём хэш ballOptions для анимации движения мячика
	var ballZone; //создаём хэш ballZone для зоны движения мячика
	var fieldWidth = 700;//ширина игрового поля
	var fieldHeight = 300;//высота игрового поля
	var racketWidth = 10;//ширина ракетки
	var racketHeight = 100;//высота ракетки
	var ballWidth = 30;//ширина мяча
	var ballHeight = 30;//высота мяча

	// оформляем кнопку "СТАРТ!"
	buttonStart.type = 'button';
	buttonStart.value = 'старт!';
	buttonStart.style.marginTop = 'left';
	buttonStart.style.width = '100px';
	buttonStart.style.fontSize = '20px';
	document.body.appendChild(buttonStart); //созданную кнопку делаем 1-ым дочерным элементом body
	addEventListener('click', start); //подписываемся на события onclick

	// оформляем счет-табло
	scoreBoard.style.top = '4px';
	scoreBoard.style.width = fieldWidth + 'px';
	scoreBoard.style.fontSize = '30px';
	scoreBoard.style.position = 'absolute';
	scoreBoard.style.textAlign = 'center';
	scoreBoardInnerHTML(); //вызываем функцию для вывода счета
	document.body.appendChild(scoreBoard); //созданный табло делаем 2-ым дочерным элементом body

	// оформляем кнопку игровое поле
	tagGame.style.width = fieldWidth + 'px';
	tagGame.style.height = fieldHeight + 'px';
	tagGame.style.marginTop = 'left';
	tagGame.style.border = '1px solid black';
	tagGame.style.backgroundColor = '#f1ef7f';
	document.body.appendChild(tagGame); //игровое поле делаем 3-им дочерным элементом body


	//оформляем ракетку 1
	racquet_1.style.width = racketWidth + 'px';
	racquet_1.style.height = racketHeight + 'px';
	racquet_1.style.position = 'absolute';
	racquet_1.style.backgroundColor = '#02ab56';
	tagGame.appendChild(racquet_1); //созданную первую(левую) ракетку делаем дочерным элементом tagGame

	//оформляем ракетку 2
	racquet_2.style.width = racketWidth + 'px';
	racquet_2.style.height = racketHeight + 'px';
	racquet_2.style.position = 'absolute';
	racquet_2.style.backgroundColor = '#120c98';
	tagGame.appendChild(racquet_2); //созданную вторую(правую) ракетку делаем дочерным элементом tagGame


	// узнаем позитионирование игрового поля после формирования DOM
	var positionTop = tagGame.getBoundingClientRect().top;
	var	positionLeft = tagGame.getBoundingClientRect().left;
	var	positionHeight = tagGame.getBoundingClientRect().height;
	var	positionWidth = tagGame.getBoundingClientRect().width;

	racketOption = {
		r1PosX: positionLeft,
		r1PosY: positionTop + positionHeight / 2 - racquet_1.getBoundingClientRect().height / 2,
		r1Speed: 0,
		r2PosX: positionLeft + positionWidth - racquet_2.getBoundingClientRect().width,
		r2PosY: positionTop + positionHeight / 2 - racquet_1.getBoundingClientRect().height / 2,
		r2Speed: 0,
		width: racketWidth,
		height: racketHeight,

		update: function () {
			var racquet_1Obj = racquet_1,
				racquet_2Obj = racquet_2;

			racquet_1Obj.style.left = this.r1PosX + 'px';
			racquet_1Obj.style.top = this.r1PosY + 'px';

			racquet_2Obj.style.left = this.r2PosX + 'px';
			racquet_2Obj.style.top = this.r2PosY + 'px';
		}
	};

	racquetZone = {
		width: racketWidth,
		height: positionHeight
	};

	racketOption.update();

	// работаем с мячиком-----------------------------------------------------------------------------------------
	ball.style.width = ballWidth + 'px';
	ball.style.height = ballHeight + 'px';
	ball.style.position = 'absolute';
	ball.style.borderRadius = '50%';
	ball.style.backgroundColor = '#f11c34';
	tagGame.appendChild(ball); //созданный мячик делаем дочерным элементом tagGame

	ballOptions = {
		posX: positionLeft + positionWidth / 2 - ball.getBoundingClientRect().width / 2,
		posY: positionTop + positionHeight / 2 - ball.getBoundingClientRect().height / 2,
		speedX: 0,
		speedY: 0,
		width: ballWidth,
		height: ballHeight,

		update: function () {
			var ballObj = ball;
			ballObj.style.left = this.posX + 'px';
			ballObj.style.top = this.posY + 'px';
		}
	};

	ballZone = {
		width: positionWidth,
		height: positionHeight
	};

	ballOptions.update();



	//ф-ция для того чтоб на табло выводили очки(player1 и player2) игроков
	function scoreBoardInnerHTML() {
		scoreBoard.innerHTML = player1 + ':' + player2;
	}

	function start() {
		do {
			var speedXNotNull = randomDiap(-8, 8) * 2;
			var speedYNotNull = randomDiap(-5, 5) * 2;
		}
		while (speedXNotNull == 0 || speedYNotNull == 0);
		ballOptions.speedX = speedXNotNull;
		ballOptions.speedY = speedYNotNull;
		ballOptions.posX = positionLeft + positionWidth / 2 - ball.getBoundingClientRect().width / 2;
		ballOptions.posY = positionTop + positionHeight / 2 - ball.getBoundingClientRect().height / 2

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


export { createDOM };