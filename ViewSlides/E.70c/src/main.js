"use strict";
var tag=document.getElementById('But');
addEventListener('click', weather.change(), false);



function Weather() {
    var self=this;

    var num=1; // погода: 1=солнце 2=дождь; приватная!

    // кому интересно изменение погоды?
    var listeners=[]; // здесь список функций, которые надо вызвать
    self.addListener=function(func) { 
        listeners.push(func);
        func(num); // и сразу вызываем функцию, передаём погоду и что ещё надо
    }

    self.change=function() {
        num=3-num; // меняем на противоположную

        self.update();

        for ( var f=0; f<listeners.length; f++ ) {
            var func=listeners[f]; // func - это функция-слушатель
            func(num); // вызываем её, передаём погоду и что ещё надо
        }
    }

    self.update=function() {
        var weatherElem=document.getElementById('IWeather');
        weatherElem.src=((num==1)?'./src/img/weather_sun.jpg':'./src/img/weather_rain.jpg');
    }

}

var weather=new Weather;
weather.update();

function Cat() {
    var self=this;

    var state=11; // состояние: 11=загар 12=зонтик; приватная!

    self.checkWeather=function(weatherNum) {
        // здесь this не будет указывать на объект кота
        // т.к. функция вызывается не в виде объект.метод()
        console.log('Кот узнал, что новая погода: '+weatherNum);
        state=weatherNum+10;
        self.update();
    }

    self.update=function() {
        var catElem=document.getElementById('ICat');
        catElem.src=((state==11)?'./src/img/cat_sun.jpg':'./src/img/cat_rain.jpg');
    }
}

var cat=new Cat;
weather.addListener(cat.checkWeather);