"use strict";
var car1= {
    model : 'Mercedes',
    number : '1111-AAA',
    price : 10000,
    show : function() {
      alert( this.model + " / "
        + this.number + " / " + this.price );
    } 
  };

  var car2= {
    model : 'BMW',
    number : '222-BBB',
    price : 9000,
    show : function() {
      alert( this.model + " / "
        + this.number + " / " + this.price );
    } 
  };

  var car3= {
    model : 'Skoda',
    number : '333-CCC',
    price : 4000,
    show : function() {
      alert( this.model + " / "
        + this.number + " / " + this.price );
    } 
  };

  car1.show();
  car2.show();
  car3.show();
  console.log(getClassName(car1));

  function fillCar(car,_model,_number,_price) {
    car.model=_model;
    car.number=_number;
    car.price=_price;
    car.show=function() {
      alert( this.model + " / "
        + this.number + " / " + this.price );
    } 
  }

  var car1={};
  fillCar(car1,'Mercedes','1111-AAA',10000);

  var car2={};
  fillCar(car2,'BMW','222-BBB',9000);

  var car3={};
  fillCar(car3,'Skoda','333-CCC',4000);

  car1.show();
  car2.show();
  car3.show();
  console.log(getClassName(car1));

  function TCar(_model,_number,_price) {
    this.model=_model;
    this.number=_number;
    this.price=_price;
    this.show=function() {
      alert( this.model + " / "
        + this.number + " / " + this.price );
    } 
  }

  var car1=new TCar('Mercedes','1111-AAA',10000);
  var car2=new TCar('BMW','222-BBB',9000);
  var car3=new TCar('Skoda','333-CCC',4000);

  car1.show();
  car2.show();
  car3.show();


  function getClassName(obj) { 
    if ( obj.constructor && obj.constructor.name ) 
        return obj.constructor.name; 
    var c=Object.prototype.toString.apply(obj); 
    return c.substring(8,c.length-1); 
}

console.log(getClassName(car1));
