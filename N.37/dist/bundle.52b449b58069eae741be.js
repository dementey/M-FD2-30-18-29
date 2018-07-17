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


var _createSVG = __webpack_require__(1);

// формат выводимой даты
var dateTimeFormat = function dateTimeFormat(time) {
	return str0l(time.getHours(), 2) + ":" + str0l(time.getMinutes(), 2) + ":" + str0l(time.getSeconds(), 2);
};

//дописываем недастоющие нули в значения даты
function str0l(val, len) {
	var strVal = val.toString();
	while (strVal.length < len) {
		strVal = '0' + strVal;
	}return strVal;
}

var link = (0, _createSVG.createSVGAnalogClock)(dateTimeFormat(new Date()));
//отрисовываем SVG и передаем цыфровые часы для полноценного отображения часов при первичной загрузки

var updateСlock = function updateСlock() {
	var dd = new Date();
	link.digitalClock.textContent = dateTimeFormat(dd);
	link.secHand.setAttribute("transform", "rotate(" + dd.getSeconds() * 6 + ")");
	link.minuteHand.setAttribute("transform", "rotate(" + dd.getMinutes() * 6 + ")");
	link.hourHand.setAttribute("transform", "rotate(" + (dd.getHours() % 12 * 30 + dd.getMinutes() / 2) + ")");
};

setInterval(updateСlock, 1000);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




Object.defineProperty(exports, "__esModule", {
	value: true
});
function createSVGAnalogClock(currentTime) {

	var hourHandLength = 0.45; // относительный размер часовой стрелки
	var minuteHandLength = 0.7; // относительный размер минутной стрелки
	var secHandLength = 0.9; // относительный размер секундной стрелки
	var blackColor = '#000'; //черный цвет
	var bgColor = '#fccb66'; //цвет фона часового табло
	var bgColorNumCirck = '#46b483'; //цвет окружностей для цыфр

	// создаем SVG тег
	var svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svgContainer.setAttribute('viewBox', '-1 -1 2 2');

	// создаем окружность (часовое табло)
	var clockPanel = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	clockPanel.setAttribute('cx', '0');
	clockPanel.setAttribute('cy', '0');
	clockPanel.setAttribute('r', '1');
	clockPanel.setAttribute('style', 'fill:' + bgColor + '; stroke:none;');
	svgContainer.appendChild(clockPanel);

	// выводим цыфры от 1 до 12 с окружностями
	for (var i = 0; i < 12; i++) {
		var rad = 2 * Math.PI / 12 * (i - 2);
		var hourCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		hourCircle.setAttribute('cx', (Math.cos(rad) * 0.8).toString());
		hourCircle.setAttribute('cy', (Math.sin(rad) * 0.8).toString());
		hourCircle.setAttribute('r', '8%');
		hourCircle.setAttribute('style', 'fill:' + bgColorNumCirck + '; stroke:none;');
		svgContainer.appendChild(hourCircle);

		var hourNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		hourNumber.setAttribute('x', (Math.cos(rad) * 0.8).toString());
		hourNumber.setAttribute('y', (Math.sin(rad) * 0.8 + 0.05).toString());
		hourNumber.setAttribute('font-size', '1%');
		hourNumber.setAttribute('font-family', 'arial');
		hourNumber.setAttribute('text-anchor', 'middle');
		hourNumber.textContent = i + 1;
		svgContainer.appendChild(hourNumber);
	};

	// Часовая стрелка
	var hourHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	hourHand.setAttribute('x1', '0');
	hourHand.setAttribute('y1', '0');
	hourHand.setAttribute('x2', '0');
	hourHand.setAttribute('y2', (-1 * hourHandLength).toString());
	hourHand.setAttribute('style', 'stroke:' + blackColor + '; stroke-width:5%;stroke-linecap:round');
	hourHand.setAttribute('transform', 'rotate(' + (new Date().getHours() % 12 * 30 + new Date().getMinutes() / 2) + ')');
	svgContainer.appendChild(hourHand);

	// Минутная стрелка
	var minuteHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	minuteHand.setAttribute('x1', '0');
	minuteHand.setAttribute('y1', '0');
	minuteHand.setAttribute('x2', '0');
	minuteHand.setAttribute('y2', (-1 * minuteHandLength).toString());
	minuteHand.setAttribute('style', 'stroke:' + blackColor + '; stroke-width:3%;stroke-linecap:round');
	minuteHand.setAttribute('transform', 'rotate(' + new Date().getMinutes() * 6 + ')');
	svgContainer.appendChild(minuteHand);

	// Секундная стрелка
	var secHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	secHand.setAttribute('x1', '0');
	secHand.setAttribute('y1', '0');
	secHand.setAttribute('x2', '0');
	secHand.setAttribute('y2', (-1 * secHandLength).toString());
	secHand.setAttribute('style', 'stroke:black; stroke-width:1%;stroke-linecap:round');
	secHand.setAttribute('transform', 'rotate(' + new Date().getSeconds() * 6 + ')');
	svgContainer.appendChild(secHand);

	//Цифровые часы на панели 
	var digitalClock = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	digitalClock.setAttribute('y', '-0.3');
	digitalClock.setAttribute('font-size', '1.5%');
	digitalClock.setAttribute('font-family', 'arial');
	digitalClock.setAttribute('text-anchor', 'middle');
	digitalClock.textContent = currentTime;
	svgContainer.appendChild(digitalClock);

	document.getElementById('svgClock').appendChild(svgContainer);

	return { 'digitalClock': digitalClock, 'secHand': secHand, 'minuteHand': minuteHand, 'hourHand': hourHand };
}

exports.createSVGAnalogClock = createSVGAnalogClock;

/***/ })
/******/ ]);