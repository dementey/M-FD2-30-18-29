var Rebus = {};
var obj = [];
var pos = 750;
var level = 1;
var difficulty = 1;

var sign = null
var uniqueCharacters = [];


var Letters = function(symbol,number, isVisible, x, y) {
	this.x = x; this.y = y;
	this.symbol = symbol;
	this.number = number;
	this.isVisible = isVisible;
	this.getSprite = null;                // Обект за буква
	this.getSpriteNumber = null;		  // Обект за цифра
	
	this.render = function (gameObj){
		
		this.getSprite = gameObj.add.text(x,y, this.symbol);
		
	}

	this.renderNumber = function (gameObj){
		
		this.getSpriteNumber = gameObj.add.text(x,y, this.number);
	
	}
	

	this.hide = function() {
		this.getSprite.visible = false;
	}

	this.show = function() {
		this.getSprite.visible = true;
	}
};



Rebus.loadState = function(game){
	
};

Rebus.loadState.prototype = {
	preload: function () {

		this.load.image('background', 'img/background.png');
	

		uniqueCharacters = create_unique_random_array(10, 65, 90);

		//console.log(uniqueCharacters);


		var n = []; 
		
		if(difficulty <= 1){ 
		 	do{
				generateNumbers(1, n); console.log("difficulty: " + difficulty + "  " +Math.ceil(chechForUniqueNumbers(n)));
			}while(Math.ceil(chechForUniqueNumbers(n)) < 59)
		}
		
		if(difficulty == 2){ 
			do{
		 		generateNumbers(1, n); console.log("difficulty 2: " + difficulty + "  " + Math.ceil(chechForUniqueNumbers(n)));
			}while(Math.ceil(chechForUniqueNumbers(n)) > 40);
		}

		if(difficulty == 3){ 
			do{
		 		generateNumbers(1, n); console.log("difficulty: " + difficulty + "  " + Math.ceil(chechForUniqueNumbers(n)));
			}while(Math.ceil(chechForUniqueNumbers(n))  > 40);
		}



		console.log(n[0] +""+ n[1] +""+ n[2]);
		console.log(n[3] +""+ n[4] +""+ n[5]);
		console.log(n[6] +""+ n[7] +""+ n[8]);


		var x = 0;
		for(var i = 0; i < 10; i++){
	
			if(i == 3){
				x = 0;
			}
			if( i == 6){
				x = 0;
			}
			
			if(i < 3){
				obj.push(new Letters(String.fromCharCode(uniqueCharacters[n[i]]), null, true, pos+x, 400));
			}else if(i > 2 && i < 6){
				obj.push(new Letters(String.fromCharCode(uniqueCharacters[n[i]]), null, true, pos+x, 450));
			}else if( i > 5 && i < 9){
				obj.push(new Letters(String.fromCharCode(uniqueCharacters[n[i]]), null, true, pos+x, 500));
			}
			x += 50;
	
		}


	},

	create: function() {
		this.state.start('play');	
	}

};


function generateNumbers(level, returnNumArr){

	var numOne = 0;
	var numTwo = 0;
	var numThree = 0;
	var arrOne = [];
	var arrTwo = [];
	var arrThree = [];

	if(level == 1){
		do{
			numOne = getRandomInt(100, 999);
			numTwo = getRandomInt(100, 999);
			numThree = numOne + numTwo;
		}while(numThree > 999)

			calc(numOne, arrOne);
			calc(numTwo, arrTwo);
			calc(numThree, arrThree);

			for(var i = 0; i < 9; i++){
				if( i < 3){
					returnNumArr[i] = arrOne[i];
				}else if( i > 2 && i < 6){
					returnNumArr[i] = arrTwo[i%3];
				}else if(i > 5 && i < 9){
					returnNumArr[i] = arrThree[i%3];
				}
			}
		}
	
}


function calc(n, ans) {
	while(n>0){ans.unshift(n%10);n=n/10|0;}
};


function chechForUniqueNumbers(numArr){

	var sameNumbers = [];
	var uniqueNumbers = null;
	var m = 0;var cnt = 0;
	var total = 0;

	for(var i = 0; i < numArr.length; i++){
		for(var j = 0; j < numArr.length; j++){	
			if(numArr[i] == numArr[j]){
				cnt++;
			}
		}	

		if(cnt > m){
			m = cnt;
		}	

		if(cnt < 2){
			uniqueNumbers++;
		}

		cnt = 0;
		
	}
	
	//console.log(m);
	var da = numArr.length - uniqueNumbers;
	
	return (100*da)/numArr.length;
	
}
function number_found (random_number,number_array) {

    for (var element=0; element<number_array.length; element++) {

        if (random_number==number_array[element]) {
            return true;
	}
   }

    return false;
};

function create_unique_random_array(num_elements,min,max) {

    var temp, nums = new Array;

    for (var element=0; element<num_elements; element++) {

        while((temp=isFound(game.rnd.integerInRange(min,max),nums))==-1);
        nums[element] = temp;
    }

    return (nums);
};

function isFound (random_number,number_array) {

    for (var element=0; element<number_array.length; element++) {

        if (random_number==number_array[element]) {
            return (-1);
	}
   }

    return (random_number);
};
