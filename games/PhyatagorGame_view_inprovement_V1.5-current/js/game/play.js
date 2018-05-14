


var numbers = [];
var chosenNumber = null;
var _1,_2,_3,_4,_5,_6,_7,_8,_9,_0;
var ctl = 0;
var textLevel=null;


Rebus.playState = function(game){
	
	
};

var da = 1;

Rebus.playState.prototype = {

	create: function(){
		
		this.add.image(0,0,'background');

		if(level < 2){
			for(var i = 0; i < 9; i++)
			{
				this.add.text(700, 415, "+",
						{ font: '28px Verdana', fill: '#000000'});

				var graphics = this.add.graphics(100, 100);
				graphics.beginFill(0xFF3300);
		    	graphics.lineStyle(3, 0x000000, 1);

				graphics.moveTo(600,390);
		    	graphics.lineTo(800, 390);
		    	graphics.endFill();
			
				obj[i].render(this);
				//console.log(obj[i].symbol);
			
				//obj[i].renderNumber(this);
				
				//console.log(obj[i].getSprite);
			}	
		}

		if(level == 2){
			this.add.text(680, 415, "Under Construction!!!",
						{ font: '28px Verdana', fill: '#000000'});
		
		}

		textLevel =  this.add.text(750, 200, "Level: "+level,
						{ font: '28px Verdana', fill: '#000000'});
		
		//numbers.push(_0 = this.add.text(550, 335, 0,
		//				{ font: '28px Verdana', fill: '#000000'}));
		


		

		numbers.push(this.add.text(550, 335, 0,
						{ font: '28px Verdana', fill: '#000000'}));
		
		numbers.push(this.add.text(550, 390, 1,
						{ font: '28px Verdana', fill: '#000000'}));
		
		numbers.push(this.add.text(550, 445, 2,
						{ font: '28px Verdana', fill: '#000000'}));
		
		numbers.push(this.add.text(550, 500, 3,
						{ font: '28px Verdana', fill: '#000000'}));

		numbers.push(this.add.text(550, 555, 4,
						{ font: '28px Verdana', fill: '#000000'}));

		numbers.push(this.add.text(1050, 335, 5,
						{ font: '28px Verdana', fill: '#000000'}));

		numbers.push(this.add.text(1050, 390, 6,
						{ font: '28px Verdana', fill: '#000000'}));

		numbers.push(this.add.text(1050, 445, 7,
						{ font: '28px Verdana', fill: '#000000'}));

		numbers.push(this.add.text(1050, 500, 8,
						{ font: '28px Verdana', fill: '#000000'}));

		numbers.push(this.add.text(1050, 555, 9,
						{ font: '28px Verdana', fill: '#000000'}));

		//console.log("Lenght: " + obj.length);

		numbers[0].inputEnabled = true; numbers[0].input.enableDrag();
		numbers[1].inputEnabled = true; numbers[1].input.enableDrag();	
		numbers[2].inputEnabled = true; numbers[2].input.enableDrag();
		numbers[3].inputEnabled = true; numbers[3].input.enableDrag();
		numbers[4].inputEnabled = true; numbers[4].input.enableDrag();
		numbers[5].inputEnabled = true; numbers[5].input.enableDrag();
		numbers[6].inputEnabled = true; numbers[6].input.enableDrag();
		numbers[7].inputEnabled = true; numbers[7].input.enableDrag();
		numbers[8].inputEnabled = true; numbers[8].input.enableDrag();
		numbers[9].inputEnabled = true; numbers[9].input.enableDrag();
	

		numbers[0].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 0; da=1;
		}, this);
		numbers[1].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 1; da=1;
		}, this);
		numbers[2].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 2; da=1;
		}, this);
		numbers[3].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 3; da=1;
		}, this);
		numbers[4].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 4; da=1;
		}, this);
		numbers[5].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 5; da=1;
		}, this);
		numbers[6].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 6; da=1;
		}, this);
		numbers[7].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 7; da=1;
		}, this);
		numbers[8].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 8; da=1;
		}, this);
		numbers[9].events.onDragStart.add(function(sprite,result) {
			chosenNumber = 9; da=1;
		}, this);

      

		//var esckey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
		//esckey.onDown.addOnce(this.escape, this);

	
	
	},
	

	update: function() {
		
		if(ctl >= 9){
			ctl = 0;
		}

		for(var i = 0; i < 9; i++){
			if(obj[i].getSpriteNumber != null)
			{
				obj[i].getSpriteNumber.inputEnabled = true; obj[i].getSpriteNumber.input.enableDrag();
			}
		}
		
		

		if(da > 0 && chosenNumber != null){
					
			if(checkOverlap(numbers[chosenNumber], obj[ctl].getSprite) && game.input.activePointer.leftButton.isDown == false && obj[ctl].number==null){
					da--;
					
					obj[ctl].number = chosenNumber;
					obj[ctl].getSprite.visible = false;
					numbers[chosenNumber].visible = false;
					obj[ctl].renderNumber(this);
					
					for (var j = 0; j < obj.length; j++) {
						if(ctl != j && obj[j].symbol == obj[ctl].symbol){
							obj[j].number = chosenNumber;
							obj[j].getSprite.visible = false;
							obj[j].renderNumber(this);
							
						}
					}
				chosenNumber = null;
			}	
		}

		

		
		hide(0);
		hide(1);
		hide(2);
		hide(3);
		hide(4);
		hide(5);
		hide(6);
		hide(7);
		hide(8);

		
		

		textLevel.setText("Level: "+level);


		if(isGameObjFullWithNum(obj) == true){

			

			console.log("Your answer: " + returnNumFromArr(obj, 0, 2) + " + " + returnNumFromArr(obj, 3, 5) + " = " + returnNumFromArr(obj, 6, 8));
			if((returnNumFromArr(obj, 0, 2) + returnNumFromArr(obj, 3, 5)) == returnNumFromArr(obj, 6, 8)){
				console.log("You win the game!!!");
				difficulty++;
				
				obj = [];
				numbers = [];

				if(difficulty==4)
				{
					level++;
					console.log("You go to the next level");
					this.state.start('load');
				}else{	
					this.state.start('load');
				}
			}else{
				obj = [];
				numbers = [];
				console.log("You lose the game!!!");
				this.state.start('load');
			}
			

			

			
		}
		
		//chosenNumber = null;
		if(ctl <= 9){
			ctl++;      	
		}
	}
};


function hide(pos){
	if(obj[pos].getSpriteNumber != null){
				obj[pos].getSpriteNumber.events.onDragStop.add(function(sprite,result) {
					

						//console.log("Event " + obj[0].number);

						numbers[obj[pos].number].position.x = game.input.mousePointer.x;
						numbers[obj[pos].number].position.y = game.input.mousePointer.y;
						numbers[obj[pos].number].visible = true;
						
						for(var i = 0; i < obj.length; i++){
							if(obj[pos].number == obj[i].number && i != pos){
								obj[i].getSpriteNumber.visible = false;
								obj[i].getSpriteNumber.destroy();
								obj[i].getSpriteNumber = null;
								obj[i].getSprite.visible = true;
								obj[i].number = null;
							}
						}
						
						obj[pos].getSpriteNumber.visible = false;
						obj[pos].getSpriteNumber.destroy();
						obj[pos].getSpriteNumber = null;
						obj[pos].getSprite.visible = true;
						obj[pos].number = null;
						
				}, this);

			}
			
		
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    
   	return Phaser.Rectangle.intersects(boundsA, boundsB);

};


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function renderNum(num, gameObj, x, y) {
	return gameObj.add.text(x, y, num,
						{ font: '28px Verdana', fill: '#000000'});			
};


function isGameObjFullWithNum(gmObj) {

	for(var i=0; i < gmObj.length; i++){
		if(gmObj[i].number == null){
			return false;
		}
	}


	return true;
}


function returnNumFromArr(gameObj, fIndex, lIndex) {
	
	var sumA = 0;
	var mn = 100;

	for (var i = fIndex; i <= lIndex; i++) {
		sumA += gameObj[i].number * mn;
		mn /= 10;
	}
		
	return sumA;
}