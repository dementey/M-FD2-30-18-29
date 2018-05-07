'use strict';

function createTennisRacquet(_width, _height, _position, _backgroundColor) {
    var self=this;
    self = document.createElement("div")
    self.style.width = _width;
    self.style.sheight = _height;
    self.style.backgroundColor = _backgroundColor;
};
export { createTennisRacquet };
//var tennisRacquet1 = new createTennisRacquet('10px', '100px', 'absolute','#09AA57');
//var tennisRacquet2 = new createTennisRacquet('10px', '100px', 'absolute','#191497');

