var firstCanvas;		
var redCanvas;	
var blueCanvas;
var greenCanvas;
var yellowCanvas;										
var context;
var redcontext;
var bluecontext;
var greencontext;
var yellowcontext;
var timer = 500;
var p =0;
var t = 500;
var t2 = 5000;
var speeder = (window.innerHeight*0.95)/500;
var balls = [
    { x: 100, y:   0, dx: 3, dy: speeder, r: "red"}
];
var blasts = [];
var buttons = [];
var scoreElement = document.getElementById("score");
var scoreChanger = 0;
var intervalID2;
var intervalID1;
var startTime = -1;

function startGame()
{
    setTimeout(addBall,Math.floor(t*Math.random())+t2);
    redcontext.globalAlpha = 0.8;
    bluecontext.globalAlpha = 0.8;
    greencontext.globalAlpha = 0.8;
    yellowcontext.globalAlpha = 0.8;
    redcontext.fillStyle="red";
    bluecontext.fillStyle = "blue";
	greencontext.fillStyle = "green";
	yellowcontext.fillStyle = "yellow";
    var globalId = setInterval(repeatOften, 18);
}
function repeatOften() {
		var scorer;
    redcontext.clearRect(0, 0, redCanvas.width, redCanvas.height);
    bluecontext.clearRect(0, 0, blueCanvas.width, blueCanvas.height);
    greencontext.clearRect(0, 0, greenCanvas.width, greenCanvas.height);
    yellowcontext.clearRect(0, 0, yellowCanvas.width, yellowCanvas.height);
    redcontext.beginPath();
    bluecontext.beginPath();
    greencontext.beginPath();
    yellowcontext.beginPath();
    for (var e = 0; e < balls.length; e++)
    {
        moveBall(balls[e]);
        if(balls[e].r == "red"){
			drawBallPath(balls[e], redcontext);
			
		}
		else if(balls[e].r == "blue"){
			drawBallPath(balls[e], bluecontext);
		}
		else if(balls[e].r == "green"){
			drawBallPath(balls[e], greencontext);
		}
		else{
			drawBallPath(balls[e], yellowcontext);
		}
        if(balls[e].y>firstCanvas.height){
			setTimeout(restart,2000);
            clearInterval(globalId);
        }

        for(var g = 0; g < blasts.length; g++){
			moveBlast(blasts[g]);
			
			if(blasts[g].color == "red"){
				drawBlastPath(blasts[g], redcontext);
			}
			else if(blasts[g].color == "blue"){
				drawBlastPath(blasts[g], bluecontext);
			}
			else if(blasts[g].color == "green"){
				drawBlastPath(blasts[g], greencontext);
			}
			else{
				drawBlastPath(blasts[g], yellowcontext);
			}
			
				var distX = blasts[g].x - balls[e].x;
				var distY = blasts[g].y - balls[e].y;
				var xChange =blasts[g].width + 10;
				var yChange =blasts[g].height + 10;
				if(balls[e].x >= blasts[g].x-10 && balls[e].x <= blasts[g].x + blasts[g].width + 10){
					if(balls[e].y >= blasts[g].y-10 && balls[e].y <= blasts[g].y + blasts[g].height + 10){
					if(blasts[g].color === balls[e].r){
						blasts.splice(g,1);
						balls.splice(e,1);
						if(g>0){
								g = g-1;
						}
						if(e > 0){
								e = e - 1;
						}
						scoreChanger = scoreChanger + 1;
						scorer = scoreChanger.toString();
						document.getElementById("score").innerHTML = "Score: " + scorer;
					}
					else{
						setTimeout(restart,2000);
						clearInterval(globalId);
					}
				}
			}
				if(blasts.length>g){
					if(blasts[g].x>firstCanvas.width || blasts[g].x<0){
						blasts.splice(g,1);
					}	 
				}
			}
			
			
		}
    redcontext.closePath();
    bluecontext.closePath();
    greencontext.closePath();
    yellowcontext.closePath();
    redcontext.fill();
    bluecontext.fill();
	greencontext.fill();
	yellowcontext.fill();
	// Do whatever
}


function addBall(){
    if(t2>1000){
        t2= t2-250;
        p += 0.05;
    }
    else{
		if(t2>500){
			t2 = t2 - 25;
		}
		else if(t2>250 && t2 <= 500){
			t2 = t2 - 5;
		}
	}
	p += 0.05;
    var h = new Object(); // or just {}
    h['x'] = Math.floor(window.innerWidth*0.70)*Math.random()+window.innerWidth*0.15;
    h['y'] = 0;
    h['dx'] = 3;
    h['dy'] = Math.floor(Math.random()*p) + speeder;
    var rcol = Math.floor(Math.random()*4);
    h['r'] = rcol==0 ? "red" :rcol==1 ? "blue" : rcol==2 ?"green":"yellow";
    h['time'] = 2000;
    balls.push(h);
    setTimeout(addBall,Math.floor(t*Math.random())+t2);
}

function drawBlastPath(blast, ctx){
	ctx.moveTo(blast.x, blast.y);
	ctx.rect(blast.x, blast.y, blast.width, blast.height);
}

function moveBlast(blast){
	blast.x += blast.speed;
}

function drawBallPath(ball, ctx)
{
    ctx.moveTo(ball.x, ball.y);
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2, true);
}

function moveBall(ball)
{
    ball.y += ball.dy;
}

function restart(){
		document.location.href = "index.html";
}
									
function init(){
	firstCanvas  = document.getElementById("firstCan");
	redCanvas = document.getElementById("redCan");
	blueCanvas = document.getElementById("blueCan");
	greenCanvas = document.getElementById("greenCan");
	yellowCanvas = document.getElementById("yellowCan");
	context= firstCanvas.getContext('2d');
	redcontext = redCanvas.getContext('2d');
	bluecontext = blueCanvas.getContext('2d');
	greencontext = greenCanvas.getContext('2d');
	yellowcontext = yellowCanvas.getContext('2d');
	redcontext.fillStyle = 'red';
	bluecontext.fillStyle = "blue";
	greencontext.fillStyle = "green";
	yellowcontext.fillStyle = "yellow";
	firstCanvas.width = window.innerWidth;
	firstCanvas.height = window.innerHeight*0.95;
    redCanvas.width = firstCanvas.width;
	redCanvas.height = firstCanvas.height;
	blueCanvas.width = firstCanvas.width;
	blueCanvas.height = firstCanvas.height;
	greenCanvas.width = firstCanvas.width;
	greenCanvas.height = firstCanvas.height;
	yellowCanvas.width = firstCanvas.width;
	yellowCanvas.height = firstCanvas.height;
	firstCanvas.addEventListener('touchstart', findClick1,false);
	var rightButtonXPos = firstCanvas.width;
	var buttonRadius = window.innerWidth*0.10;
	var firstButtonsYPos = window.innerHeight*0.45;
	var firstButtonsColor = 'blue';
	var secondButtonsYPos = window.innerHeight*0.60;
	var secondButtonsColor = 'red';
	var thirdButtonsYPos = window.innerHeight*0.75;
	var thirdButtonsColor = 'green';
	var fourthButtonsYPos = window.innerHeight*0.90;
	var fourthButtonsColor = 'yellow';
	var button1 = new Object();
	button1['x'] = 0;
	button1['y'] = firstButtonsYPos;
	button1['radius'] = buttonRadius;
	button1['color'] = firstButtonsColor;
	var button2 = new Object();
	button2['x'] = rightButtonXPos;
	button2['y'] = firstButtonsYPos;
	button2['radius'] = buttonRadius;
	button2['color'] = fourthButtonsColor;
	var button3 = new Object();
	button3['x'] = 0;
	button3['y'] = secondButtonsYPos;
	button3['radius'] = buttonRadius;
	button3['color'] = secondButtonsColor;
	var button4 = new Object();
	button4['x'] = rightButtonXPos;
	button4['y'] = secondButtonsYPos;
	button4['radius'] = buttonRadius;
	button4['color'] = thirdButtonsColor;
	var button5 = new Object();
	button5['x'] = 0;
	button5['y'] = thirdButtonsYPos;
	button5['radius'] = buttonRadius;
	button5['color'] = thirdButtonsColor;
	var button6 = new Object();
	button6['x'] = rightButtonXPos;
	button6['y'] = thirdButtonsYPos;
	button6['radius'] = buttonRadius;
	button6['color'] = secondButtonsColor;
	var button7 = new Object();
	button7['x'] = 0;
	button7['y'] = fourthButtonsYPos;
	button7['radius'] = buttonRadius;
	button7['color'] = fourthButtonsColor;
	var button8 = new Object();
	button8['x'] = rightButtonXPos;
	button8['y'] = fourthButtonsYPos;
	button8['radius'] = buttonRadius;
	button8['color'] = firstButtonsColor;
	buttons.push(button1);
	buttons.push(button2);
	buttons.push(button3);
	buttons.push(button4);
	buttons.push(button5);
	buttons.push(button6);
	buttons.push(button7);
	buttons.push(button8);
	for(var i = 0; i < buttons.length; i++){
		context.beginPath();
		context.fillStyle=buttons[i].color;
		context.arc(buttons[i].x,buttons[i].y,buttons[i].radius,0,Math.PI*2,true); 
		context.fill();
		context.closePath();
	}
	(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
// Add event listener for `click` events.
    startGame();
}

function drawBlast0(){
	var blast0 = new Object();
	blast0['x'] = buttons[0].x+buttons[0].radius+5;
	blast0['y'] = buttons[0].y;
	blast0['color'] = buttons[0].color;
	blast0['speed'] = 5;
	blast0['width'] = 20;
	blast0['height'] = 10;
	blasts.push(blast0);
}

function drawBlast1(){
	var blast1 = new Object();
	blast1['x'] = buttons[1].x-buttons[1].radius-25;
	blast1['y'] = buttons[1].y;
	blast1['color'] = buttons[1].color;
	blast1['speed'] = -5;
	blast1['width'] = 20;
	blast1['height'] = 10;
	blasts.push(blast1);
}

function drawBlast2(){
	var blast2 = new Object();
	blast2['x'] = buttons[2].x+buttons[2].radius+5;
	blast2['y'] = buttons[2].y;
	blast2['color'] = buttons[2].color;
	blast2['speed'] = 5;
	blast2['width'] = 20;
	blast2['height'] = 10;
	blasts.push(blast2);
}

function drawBlast3(){
	var blast3 = new Object();
	blast3['x'] = buttons[3].x-buttons[3].radius-25;
	blast3['y'] = buttons[3].y;
	blast3['color'] = buttons[3].color;
	blast3['speed'] = -5;
	blast3['width'] = 20;
	blast3['height'] = 10;
	blasts.push(blast3);
}

function drawBlast4(){
	var blast1 = new Object();
	blast1['x'] = buttons[4].x+buttons[4].radius+5;
	blast1['y'] = buttons[4].y;
	blast1['color'] = buttons[4].color;
	blast1['speed'] = 5;
	blast1['width'] = 20;
	blast1['height'] = 10;
	blasts.push(blast1);
}

function drawBlast5(){
	var blast5 = new Object();
	blast5['x'] = buttons[5].x-buttons[5].radius-25;
	blast5['y'] = buttons[5].y;
	blast5['color'] = buttons[5].color;
	blast5['speed'] = -5;
	blast5['width'] = 20;
	blast5['height'] = 10;
	blasts.push(blast5);
}

function drawBlast6(){
	var blast6 = new Object();
	blast6['x'] = buttons[6].x+buttons[6].radius+5;
	blast6['y'] = buttons[6].y;
	blast6['color'] = buttons[6].color;
	blast6['speed'] = 5;
	blast6['width'] = 20;
	blast6['height'] = 10;
	blasts.push(blast6);
}

function drawBlast7(){
	var blast7 = new Object();
	blast7['x'] = buttons[7].x-buttons[7].radius-25;
	blast7['y'] = buttons[7].y;
	blast7['color'] = buttons[7].color;
	blast7['speed'] = -5;
	blast7['width'] = 20;
	blast7['height'] = 10;
	blasts.push(blast7);
}
function findClick1(event){
	event.preventDefault();
	this.moved = false;
	firstCanvas.addEventListener('touchmove',clickMoved,false);
	firstCanvas.addEventListener('touchend', findClick,false);
}

function clickMoved(event){
		this.moved = true;
}

function findClick(event){
	firstCanvas.removeEventListener('touchmove', clickMoved,false);
	firstCanvas.removeEventListener('touchend', findClick,false);
	var firstCanvasLeft = firstCanvas.offsetLeft;
    var firstCanvasTop = firstCanvas.offsetTop;
	var a = event.changedTouches[0].clientX - firstCanvasLeft;
	var b = event.changedTouches[0].clientY - firstCanvasTop;
        for(var i = 0; i<buttons.length; i++){
			
			if(b>buttons[i].y-buttons[i].radius && b<buttons[i].y+buttons[i].radius){
				if(a>buttons[i].x-(window.innerWidth*0.5) && a<buttons[i].x+(window.innerWidth*0.5)){
					if(i == 0){
						drawBlast0();
					}
					if(i == 1){
						drawBlast1();
					}
					if(i == 2){
						drawBlast2();
					}
					if(i == 3){
						drawBlast3();
					}
					if(i == 4){
						drawBlast4();
					}
					if(i == 5){
						drawBlast5();
					}
					if(i == 6){
						drawBlast6();
					}
					if(i == 7){
						drawBlast7();
					}
					else{
						drawBlast8();
					}
				}
			}
		}    
}

window.onload=init;
