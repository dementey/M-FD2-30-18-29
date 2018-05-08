'use strict';


import { createDOM } from './createGameDOM.js';

var hash = createDOM();
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
window.addEventListener("keydown", function (EO) {
	EO = EO || window.event;
	//EO.preventDefault();

	if (EO.keyCode === 17) {
		racketOption.r1Speed = 10
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
window.addEventListener("keyup", function (EO) {
	EO = EO || window.event;
	//EO.preventDefault();

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
function scoreBoardInnerHTML() {
	scoreBoard.innerHTML = player1 + ":" + player2;
}



function tick() {
	racketOption.update();

	racketOption.r1PosY += racketOption.r1Speed;
	// ракетка 1 ниже пола?
	if (racketOption.r1PosY + racketOption.height > (positionTop + racquetZone.height)) {
		racketOption.r1PosY = positionTop + racquetZone.height - racketOption.height;
	}
	// ракетка 1 выше потолка?
	if (racketOption.r1PosY < positionTop) {
		racketOption.r1PosY = positionTop;
	}

	racketOption.r2PosY += racketOption.r2Speed;
	// ракетка 2 ниже пола?
	if (racketOption.r2PosY + racketOption.height > (positionTop + racquetZone.height)) {
		racketOption.r2PosY = positionTop + racquetZone.height - racketOption.height;
	}

	// ракетка 2 выше потолка?
	if (racketOption.r2PosY < positionTop) {
		racketOption.r2PosY = positionTop;
	}


	ballOptions.posX -= ballOptions.speedX;
	// мяч правее стены?
	if ((ballOptions.posY + ballOptions.height < racketOption.r2PosY
		|| ballOptions.posY > (racketOption.r2PosY + racketOption.height))
		&& ballOptions.posX + ballOptions.width >= (positionLeft + positionWidth)) {
		player1 += 1;
		scoreBoardInnerHTML();
		ballOptions.speedX = 0;
		ballOptions.speedY = 0;
		ballOptions.posX = positionLeft + positionWidth - ballOptions.width - 1;
	} else if (!(ballOptions.posY + ballOptions.height < racketOption.r2PosY
		|| ballOptions.posY > (racketOption.r2PosY + racketOption.height))
		&& ballOptions.posX + ballOptions.width > (racketOption.r2PosX)) {
		ballOptions.speedX = - ballOptions.speedX;
		ballOptions.posX = positionLeft + positionWidth - racketOption.width - ballOptions.width;
	}

	// мяч левее стены
	if ((ballOptions.posY + ballOptions.height < racketOption.r1PosY
		|| ballOptions.posY > (racketOption.r1PosY + racketOption.height))
		&& ballOptions.posX <= (positionLeft)) {
		player2 += 1;
		scoreBoardInnerHTML();
		ballOptions.speedX = 0;
		ballOptions.speedY = 0;
		ballOptions.posX = positionLeft + 1;
	} else if (!(ballOptions.posY + ballOptions.height < racketOption.r1PosY
		|| ballOptions.posY > (racketOption.r1PosY + racketOption.height))
		&& ballOptions.posX < (racketOption.width + racketOption.r1PosX)) {
		ballOptions.speedX = - ballOptions.speedX;
		ballOptions.posX = positionLeft + racketOption.width;
	}

	ballOptions.posY -= ballOptions.speedY;
	//  мяч ниже пола?
	if (ballOptions.posY + ballOptions.height > (positionTop + ballZone.height)) {
		ballOptions.speedY = - ballOptions.speedY;
		ballOptions.posY = positionTop + ballZone.height - ballOptions.height;
	}

	// мяч выше потолка?
	if (ballOptions.posY < positionTop) {
		ballOptions.speedY = - ballOptions.speedY;
		ballOptions.posY = positionTop;
	}

	ballOptions.update();

	requestAnimationFrame(tick);
}