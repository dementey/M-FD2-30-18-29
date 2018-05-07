'use strict';
import './style.css';
//import {createTennisRacquet} from'./createTennisRacquetClass.js';

var tennisTag = document.getElementById('tennisGame'),
	buttonStart = document.createElement("input"), //создаём input для кнопки СТАРТ
	scoreBoard = document.createElement("div"), //сoздаём div для табло
	scorePlayer1 = 0, //очки первого игрока
	scorePlayer2 = 0, //очки второго игрока
	racquet_1 = document.createElement("div"), //создаём div для первой(левой) ракетки
	racquet_2 = document.createElement("div"), //создаём div для второй(правой) ракетки
	racketOption, //создаём переменную Option для дальнейшей работы с ракетками
	racquetAreaH, //создаём переменную racquetAreaH для дальнейшей работы с ракетками
	ball = document.createElement("div"), //создаём div для мячика
	ballOptions, //создаём переменную ballOptions для дальнейшей работы с мячиком
	areaH, //создаём переменную areaH для дальнейшей работы с мячиком
	settimeout; //создаём переменную settimeout для дальнейшей работы с таймером

// работаем с tennisTag задаём размеры-----------------------------------------------------------------------------
tennisTag.style.width = "700px";
tennisTag.style.height = "400px";

// работаем с таймером----------------------------------------------------------------------------------------
requestAnimationFrame(tick);

// работаем с кнопкой старт-----------------------------------------------------------------------------------
buttonStart.type = "button"; //задаём тип(кнопка)
buttonStart.value = "старт!"; //задаем значение(то что будет отображаться на кнопке)
buttonStart.classList.add('buttonStart');//устанавливаем готовый CSS класс
buttonStart = document.body.insertBefore(buttonStart, document.body.children[0]); //созданную кнопку делаем дочерным элементом body
buttonStart.onclick = start; //на события onclick ставим функцию start(при клике на кнопку запусскаем функцию)

// работаем с табло(счет)-------------------------------------------------------------------------------------
scoreBoard.classList.add('scoreBoard');//устанавливаем готовый CSS класс
scoreBoardInnerHTML(); //вызываем функцию чтоб на табло вывести очки(scorePlayer1 и scorePlayer2) игроков
scoreBoard = document.body.insertBefore(scoreBoard, document.body.children[1]); //созданный табло делаем дочерным элементом body

// работаем с ракетками---------------------------------------------------------------------------------------
racquet_1.classList.add('racquet_1');//устанавливаем готовый CSS класс
racquet_2.classList.add('racquet_2');//устанавливаем готовый CSS класс

tennisTag.appendChild(racquet_1); //созданную первую(левую) ракетку делаем дочерным элементом tennisTag
tennisTag.appendChild(racquet_2); //созданную вторую(правую) ракетку делаем дочерным элементом tennisTag

racketOption = {
	// первая(левая) ракетка
	racquet_1PosX: tennisTag.getBoundingClientRect().left,
	racquet_1PosY: tennisTag.getBoundingClientRect().top + tennisTag.getBoundingClientRect().height / 2 - racquet_1.getBoundingClientRect().height / 2,
	racquet_1Speed: 0,
	// вторая(правая) ракетка
	racquet_2PosX: tennisTag.getBoundingClientRect().left + tennisTag.getBoundingClientRect().width - racquet_2.getBoundingClientRect().width,
	racquet_2PosY: tennisTag.getBoundingClientRect().top + tennisTag.getBoundingClientRect().height / 2 - racquet_1.getBoundingClientRect().height / 2,
	racquet_2Speed: 0,
	width: 10,
	height: 100,

	update: function () {
		var racquet_1Obj = racquet_1,
			racquet_2Obj = racquet_2;

		racquet_1Obj.style.left = this.racquet_1PosX + "px";
		racquet_1Obj.style.top = this.racquet_1PosY + "px";

		racquet_2Obj.style.left = this.racquet_2PosX + "px";
		racquet_2Obj.style.top = this.racquet_2PosY + "px";
	}
};

racquetAreaH = {
	width: 10,
	height: tennisTag.getBoundingClientRect().height
};

racketOption.update();

// работаем с мячиком-----------------------------------------------------------------------------------------
ball.classList.add('ball'); //устанавливаем готовый CSS класс
ball = tennisTag.appendChild(ball); //созданный мячик делаем дочерным элементом tennisTag

ballOptions = {
	posX: tennisTag.getBoundingClientRect().left + tennisTag.getBoundingClientRect().width / 2 - ball.getBoundingClientRect().width / 2,
	posY: tennisTag.getBoundingClientRect().top + tennisTag.getBoundingClientRect().height / 2 - ball.getBoundingClientRect().height / 2,
	speedX: 0, //ballOptions.speedX = 4
	speedY: 0, //ballOptions.speedY = 2
	width: 30,
	height: 30,

	update: function () {
		var ballObj = ball;
		ballObj.style.left = this.posX + "px";
		ballObj.style.top = this.posY + "px";
	}
};

areaH = {
	width: tennisTag.getBoundingClientRect().width,
	height: tennisTag.getBoundingClientRect().height
};

ballOptions.update();

// 1. Надо в обработчике keydown/keyup вызывать preventDefault.
window.addEventListener("keydown", function (EO) {
	EO = EO || window.event;
	//EO.preventDefault();

	if (EO.keyCode === 17) {
		racketOption.racquet_1Speed = 5;
	}

	if (EO.keyCode === 16) {
		racketOption.racquet_1Speed = -5;
	}

	if (EO.keyCode === 40) {
		racketOption.racquet_2Speed = 5;
	}

	if (EO.keyCode === 38) {
		racketOption.racquet_2Speed = -5;
	}
});

window.addEventListener("keyup", function (EO) {
	EO = EO || window.event;
	//EO.preventDefault();

	if (EO.keyCode === 17) {
		racketOption.racquet_1Speed = 0;
	}

	if (EO.keyCode === 16) {
		racketOption.racquet_1Speed = 0;
	}

	if (EO.keyCode === 40) {
		racketOption.racquet_2Speed = 0;
	}

	if (EO.keyCode === 38) {
		racketOption.racquet_2Speed = 0;
	}
});

//ф-ция для того чтоб на табло выводили очки(scorePlayer1 и scorePlayer2) игроков
function scoreBoardInnerHTML() {
	scoreBoard.innerHTML = scorePlayer1 + ":" + scorePlayer2;
}

//ф-ция для того чтоб запустить игру 
function start() {
do {var speedXNotNull= randomDiap(-8, 8)*2;
var speedYNotNull= randomDiap(-5, 5)*2;}
while(speedXNotNull==0||speedYNotNull==0);
	ballOptions.speedX = speedXNotNull;
	ballOptions.speedY = speedYNotNull;
	ballOptions.posX = tennisTag.getBoundingClientRect().left + tennisTag.getBoundingClientRect().width / 2 - ball.getBoundingClientRect().width / 2;
	ballOptions.posY = tennisTag.getBoundingClientRect().top + tennisTag.getBoundingClientRect().height / 2 - ball.getBoundingClientRect().height / 2

	// получение целого случайного числа в заданном диапазоне
	function randomDiap(n, m) {
		return Math.floor(Math.random() * (m - n + 1)) + n;
	}

}
//ф-ция для того чтоб мяч двигался, не выходило из рамки и т.д.
function tick() {
	// работаем с ракетками-----------------------------------------------------------------------------------
	racketOption.update();


	racketOption.racquet_1PosY += racketOption.racquet_1Speed;
	// вылетела ли ракетка 1 ниже пола?
	if (racketOption.racquet_1PosY + racketOption.height > (tennisTag.getBoundingClientRect().top + racquetAreaH.height)) {
		racketOption.racquet_1PosY = tennisTag.getBoundingClientRect().top + racquetAreaH.height - racketOption.height;
	}
	// вылетела ли ракетка 1 выше потолка?
	if (racketOption.racquet_1PosY < tennisTag.getBoundingClientRect().top) {
		racketOption.racquet_1PosY = tennisTag.getBoundingClientRect().top;
	}

	racketOption.racquet_2PosY += racketOption.racquet_2Speed;
	// вылетела ли ракетка 2 ниже пола?
	if (racketOption.racquet_2PosY + racketOption.height > (tennisTag.getBoundingClientRect().top + racquetAreaH.height)) {
		racketOption.racquet_2PosY = tennisTag.getBoundingClientRect().top + racquetAreaH.height - racketOption.height;
	}

	// вылетела ли ракетка 2 выше потолка?
	if (racketOption.racquet_2PosY < tennisTag.getBoundingClientRect().top) {
		racketOption.racquet_2PosY = tennisTag.getBoundingClientRect().top;
	}

	// работаем с мячиком-------------------------------------------------------------------------------------
	ballOptions.posX -= ballOptions.speedX;
	// вылетел ли мяч правее стены?
	if ((ballOptions.posY + ballOptions.height < racketOption.racquet_2PosY
		|| ballOptions.posY > (racketOption.racquet_2PosY + racketOption.height))
		&& ballOptions.posX + ballOptions.width >= (tennisTag.getBoundingClientRect().left + tennisTag.getBoundingClientRect().width)) {

		scorePlayer1 += 1;
		scoreBoardInnerHTML();
		ballOptions.speedX = 0;
		ballOptions.speedY = 0;

		ballOptions.posX = tennisTag.getBoundingClientRect().left + tennisTag.getBoundingClientRect().width - ballOptions.width - 1;


	} else if (!(ballOptions.posY + ballOptions.height < racketOption.racquet_2PosY || ballOptions.posY > (racketOption.racquet_2PosY + racketOption.height)) && ballOptions.posX + ballOptions.width > (racketOption.racquet_2PosX)) {
		ballOptions.speedX = - ballOptions.speedX;
		ballOptions.posX = tennisTag.getBoundingClientRect().left + tennisTag.getBoundingClientRect().width - racketOption.width - ballOptions.width;
	}

	// вылетел ли мяч левее стены
	if ((ballOptions.posY + ballOptions.height < racketOption.racquet_1PosY
		|| ballOptions.posY > (racketOption.racquet_1PosY + racketOption.height))
		&& ballOptions.posX <= (tennisTag.getBoundingClientRect().left)) {

		scorePlayer2 += 1;
		scoreBoardInnerHTML();
		ballOptions.speedX = 0;
		ballOptions.speedY = 0;

		ballOptions.posX = tennisTag.getBoundingClientRect().left + 1;


	} else if (!(ballOptions.posY + ballOptions.height < racketOption.racquet_1PosY || ballOptions.posY > (racketOption.racquet_1PosY + racketOption.height)) && ballOptions.posX < (racketOption.width + racketOption.racquet_1PosX)) {
		ballOptions.speedX = - ballOptions.speedX;
		ballOptions.posX = tennisTag.getBoundingClientRect().left + racketOption.width;
	}

	ballOptions.posY -= ballOptions.speedY;
	// вылетел ли мяч ниже пола?
	if (ballOptions.posY + ballOptions.height > (tennisTag.getBoundingClientRect().top + areaH.height)) {
		ballOptions.speedY = - ballOptions.speedY;
		ballOptions.posY = tennisTag.getBoundingClientRect().top + areaH.height - ballOptions.height;
	}

	// вылетел ли мяч выше потолка?
	if (ballOptions.posY < tennisTag.getBoundingClientRect().top) {
		ballOptions.speedY = - ballOptions.speedY;
		ballOptions.posY = tennisTag.getBoundingClientRect().top;
	}

	ballOptions.update();

	requestAnimationFrame(tick);
}