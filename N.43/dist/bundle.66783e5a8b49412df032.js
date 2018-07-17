/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createGameDOM = __webpack_require__(1);

var hash = (0, _createGameDOM.createDOM)();

var positionTop = hash.positionTop;
var positionWidth = hash.positionWidth;
var positionLeft = hash.positionLeft;
var racketOption = hash.racketOption;
var racquetZone = hash.racquetZone;
var ballOptions = hash.ballOptions;
var ballZone = hash.ballZone;
var player1 = hash.player1;
var player2 = hash.player2;
var scoreBoard = hash.scoreBoard;

requestAnimationFrame(tick);

// подписываемся на вжатие клавиш
window.addEventListener('keydown', function (EO) {
	EO = EO || window.event;
	if (EO.keyCode === 17) {
		racketOption.r1Speed = 10;
	}
	if (EO.keyCode === 16) {
		racketOption.r1Speed = -10;
	}
	if (EO.keyCode === 40) {
		racketOption.r2Speed = 10;
	}
	if (EO.keyCode === 38) {
		racketOption.r2Speed = -10;
	}
});

// подписываемся на отпускание клавиш
window.addEventListener('keyup', function (EO) {
	EO = EO || window.event;
	if (EO.keyCode === 17) {
		racketOption.r1Speed = 0;
	}
	if (EO.keyCode === 16) {
		racketOption.r1Speed = 0;
	}
	if (EO.keyCode === 40) {
		racketOption.r2Speed = 0;
	}
	if (EO.keyCode === 38) {
		racketOption.r2Speed = 0;
	}
});

//функция вывода счета игры в DOM
function scoreBoardInnerHTML() {
	scoreBoard.innerHTML = player1 + ':' + player2;
}

//фунция движения в зависимости от нажатия клавиш и скоростей с проверками
function tick() {
	racketOption.update();
	ballOptions.update();

	//перемещаем или нет 1-ую ракетку-------------------------------------------------------------
	racketOption.r1PosY += racketOption.r1Speed;

	// ракетка 1 ниже пола?
	if (racketOption.r1PosY + racketOption.height > positionTop + racquetZone.height) {
		racketOption.r1PosY = positionTop + racquetZone.height - racketOption.height;
	}
	// ракетка 1 выше потолка?
	if (racketOption.r1PosY < positionTop) {
		racketOption.r1PosY = positionTop;
	}

	//перемещаем или нет 2-ую ракетку-------------------------------------------------------------
	racketOption.r2PosY += racketOption.r2Speed;

	// ракетка 2 ниже пола?
	if (racketOption.r2PosY + racketOption.height > positionTop + racquetZone.height) {
		racketOption.r2PosY = positionTop + racquetZone.height - racketOption.height;
	}

	// ракетка 2 выше потолка?
	if (racketOption.r2PosY < positionTop) {
		racketOption.r2PosY = positionTop;
	}

	//перемещаем мяч по X-------------------------------------------------------------------------------
	ballOptions.posX -= ballOptions.speedX;

	// мяч правее стены?
	if ((ballOptions.posY + ballOptions.height < racketOption.r2PosY || ballOptions.posY > racketOption.r2PosY + racketOption.height) && ballOptions.posX + ballOptions.width >= positionLeft + positionWidth) {
		player1 += 1;
		scoreBoardInnerHTML();
		ballOptions.speedX = 0;
		ballOptions.speedY = 0;
		ballOptions.posX = positionLeft + positionWidth - ballOptions.width - 1;
	} else if (!(ballOptions.posY + ballOptions.height < racketOption.r2PosY || ballOptions.posY > racketOption.r2PosY + racketOption.height) && ballOptions.posX + ballOptions.width > racketOption.r2PosX) {
		ballOptions.speedX = -ballOptions.speedX;
		ballOptions.posX = positionLeft + positionWidth - racketOption.width - ballOptions.width;
	}

	// мяч левее стены?
	if ((ballOptions.posY + ballOptions.height < racketOption.r1PosY || ballOptions.posY > racketOption.r1PosY + racketOption.height) && ballOptions.posX <= positionLeft) {
		player2 += 1;
		scoreBoardInnerHTML();
		ballOptions.speedX = 0;
		ballOptions.speedY = 0;
		ballOptions.posX = positionLeft + 1;
	} else if (!(ballOptions.posY + ballOptions.height < racketOption.r1PosY || ballOptions.posY > racketOption.r1PosY + racketOption.height) && ballOptions.posX < racketOption.width + racketOption.r1PosX) {
		ballOptions.speedX = -ballOptions.speedX;
		ballOptions.posX = positionLeft + racketOption.width;
	}

	//перемещаем мяч по Y-------------------------------------------------------------------------------
	ballOptions.posY -= ballOptions.speedY;
	//  мяч ниже пола?
	if (ballOptions.posY + ballOptions.height > positionTop + ballZone.height) {
		ballOptions.speedY = -ballOptions.speedY;
		ballOptions.posY = positionTop + ballZone.height - ballOptions.height;
	}

	// мяч выше потолка?
	if (ballOptions.posY < positionTop) {
		ballOptions.speedY = -ballOptions.speedY;
		ballOptions.posY = positionTop;
	}

	requestAnimationFrame(tick);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function createDOM() {
	var tagGame = document.getElementById('tagGame'); //создаем игровое поле
	var buttonStart = document.createElement('input'); //создаём input для кнопки СТАРТ
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
	var fieldWidth = 700; //ширина игрового поля
	var fieldHeight = 300; //высота игрового поля
	var racketWidth = 10; //ширина ракетки
	var racketHeight = 100; //высота ракетки
	var ballWidth = 30; //ширина мяча
	var ballHeight = 30; //высота мяча

	// оформляем кнопку "СТАРТ!"
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
	tagGame.style.marginTop = 'left';
	tagGame.style.border = '1px solid black';
	tagGame.style.backgroundColor = '#f1ef7f';
	document.body.appendChild(tagGame); //игровое поле делаем 3-им дочерным элементом body

	// оформляем ракетку 1
	racquet_1.style.width = racketWidth + 'px';
	racquet_1.style.height = racketHeight + 'px';
	racquet_1.style.position = 'absolute';
	racquet_1.style.backgroundColor = '#02ab56';
	tagGame.appendChild(racquet_1); //созданную первую(левую) ракетку делаем дочерным элементом tagGame

	// оформляем ракетку 2
	racquet_2.style.width = racketWidth + 'px';
	racquet_2.style.height = racketHeight + 'px';
	racquet_2.style.position = 'absolute';
	racquet_2.style.backgroundColor = '#120c98';
	tagGame.appendChild(racquet_2); //созданную вторую(правую) ракетку делаем дочерным элементом tagGame

	// оформляем мяч
	ball.style.width = ballWidth + 'px';
	ball.style.height = ballHeight + 'px';
	ball.style.position = 'absolute';
	ball.style.borderRadius = '50%';
	ball.style.backgroundColor = '#f11c34';
	tagGame.appendChild(ball); //созданный мячик делаем дочерным элементом tagGame

	// узнаем позиционирование игрового поля после формирования всего DOM
	var positionTop = tagGame.getBoundingClientRect().top;
	var positionLeft = tagGame.getBoundingClientRect().left;
	var positionHeight = tagGame.getBoundingClientRect().height;
	var positionWidth = tagGame.getBoundingClientRect().width;

	racketOption = {
		r1PosX: positionLeft,
		r1PosY: positionTop + positionHeight / 2 - racketHeight / 2,
		r1Speed: 0,
		r2PosX: positionLeft + positionWidth - racketWidth,
		r2PosY: positionTop + positionHeight / 2 - racketHeight / 2,
		r2Speed: 0,
		width: racketWidth,
		height: racketHeight,
		update: function update() {
			var racquet_1Obj = racquet_1,
			    racquet_2Obj = racquet_2;

			racquet_1Obj.style.left = this.r1PosX + 'px';
			racquet_1Obj.style.top = this.r1PosY + 'px';

			racquet_2Obj.style.left = this.r2PosX + 'px';
			racquet_2Obj.style.top = this.r2PosY + 'px';
		}
	};

	ballOptions = {
		posX: positionLeft + positionWidth / 2 - ballWidth / 2,
		posY: positionTop + positionHeight / 2 - ballHeight / 2,
		speedX: 0,
		speedY: 0,
		width: ballWidth,
		height: ballHeight,

		update: function update() {
			var ballObj = ball;
			ballObj.style.left = this.posX + 'px';
			ballObj.style.top = this.posY + 'px';
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
		console.log('!');
		do {
			var speedXNotNull = randomDiap(-8, 8) * 2;
			var speedYNotNull = randomDiap(-5, 5) * 2;
		} while (speedXNotNull == 0 || speedYNotNull == 0);
		ballOptions.speedX = speedXNotNull;
		ballOptions.speedY = speedYNotNull;
		ballOptions.posX = positionLeft + positionWidth / 2 - ballWidth / 2;
		ballOptions.posY = positionTop + positionHeight / 2 - ballHeight / 2;

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

exports.createDOM = createDOM;

/***/ })
/******/ ]);