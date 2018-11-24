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


var _validate = __webpack_require__(1);

var formTag = document.forms['info'];
var authorField = formTag.elements['author'].addEventListener('blur', function () {
  validateAuthor(false);
});;
var sitenameField = formTag.elements['sitename'].addEventListener('blur', function () {
  validateSitename(false);
});
var siteurlField = formTag.elements['siteurl'].addEventListener('blur', function () {
  validateSiteurl(false);
});
var startdateField = formTag.elements['startdate'].addEventListener('blur', function () {
  validateStartdate(false);
});
var visitorsField = formTag.elements['visitors'].addEventListener('blur', function () {
  validateVisitors(false);
});
var emailField = formTag.elements['email'].addEventListener('blur', function () {
  validateE_mail(false);
});
var rubricField = formTag.elements['rubric'].addEventListener('change', function () {
  validateRubric(false);
});
var placeField = document.getElementById('place').addEventListener('change', function () {
  validatePlace(false);
});
var commentsField = formTag.elements['comments'].addEventListener('change', function () {
  validateСomments(false);
});
var descriptionField = formTag.elements['description'].addEventListener('blur', function () {
  validateDescription(false);
});;

function validateAuthor(ff) {
  console.log(ff);
  var formTag = document.forms['info'];
  var field = formTag.elements['author'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('authorErr');
  if ((0, _validate.validateText)(fieldValue) === false) {
    fieldError.innerHTML = 'Введены не корректные данные, повторите попытку ввода!';
    if (ff) field.focus();
    return false;
  } else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateSitename(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['sitename'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('sitenameErr');
  if ((0, _validate.validateText)(fieldValue) === false) {
    fieldError.innerHTML = 'Введены не корректные данные, повторите попытку ввода!';
    if (ff) field.focus();
    return false;
  } else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateSiteurl(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['siteurl'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('siteurlErr');
  if ((0, _validate.validateUrl)(fieldValue) === false) {
    fieldError.innerHTML = 'Введите пожалуйста в поле "URL сайта:" корректную дату в формате https://www.ваш_сайт.домен/!';
    if (ff) field.focus();
    return false;
  } else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateStartdate(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['startdate'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('startdateErr');
  if ((0, _validate.validateDate)(fieldValue) === false) {
    fieldError.innerHTML = 'Введите пожалуйста в поле "Посетителей в сутки:" корректную дату в формате ДД.MM.ГГГГ, например 18.04.2018!';
    if (ff) field.focus();
    return false;
  } else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateVisitors(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['visitors'];
  var fieldValue = parseInt(field.value.trim());
  var fieldError = document.getElementById('visitorsErr');
  if (isNaN(fieldValue)) {
    fieldError.innerHTML = 'Введите пожалуйста в поле "Посетителей в сутки:" корректную цифру!';
    if (ff) field.focus();
    return false;
  } else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateE_mail(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['email'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('emailErr');
  if ((0, _validate.validateEmail)(fieldValue) === false) {
    fieldError.innerHTML = 'Введите пожалуйста в поле "E-mail для связи:" корректный емэйл в формате Info@it-academy.by!';
    if (ff) field.focus();
    return false;
  } else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateRubric(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['rubric'];
  var fieldValue = parseInt(field.value);
  var fieldError = document.getElementById('rubricErr');
  if (fieldValue == 0) {
    fieldError.innerHTML = 'Вы не выбрали рубрику!';
    if (ff) field.focus();
    return false;
  } else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validatePlace(ff) {
  var formTag = document.forms['info'];
  var field = document.getElementById('place');
  var fieldError = document.getElementById('placeErr');
  field.style.borderStyle = 'solid';
  field.style.borderColor = 'white';
  field.style.borderWidth = '1px';

  if (!document.getElementById('r1').checked && !document.getElementById('r2').checked && !document.getElementById('r3').checked) {
    fieldError.innerHTML = 'Выберите Ваш вариант размещения!';
    if (ff) {
      field.style.borderColor = 'blue';
    }
    return false;
  } else {
    fieldError.innerHTML = '';
    field.style.borderColor = 'white';
    return true;
  }
}

function validateСomments(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['comments'];
  var isChecked = field.checked;
  var fieldError = document.getElementById('commentsErr');
  if (isChecked == false) {
    fieldError.innerHTML = 'Необходимо поддтвердить разрешение отзывов!';
    if (ff) field.focus();
    return false;
  } else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateDescription(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['description'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('descriptionErr');
  if ((0, _validate.validateText)(fieldValue) === false) {
    fieldError.innerHTML = 'Обязательно опишите сайт!';
    if (ff) field.focus();
    return false;
  } else {
    fieldError.innerHTML = '';
    return true;
  }
}

formTag.addEventListener('submit', fsubm, false);

function fsubm(EO) {
  EO = EO || window.event;
  var ok = true;

  validateAuthor(), validateSitename();
  validateSiteurl();
  validateStartdate();
  validateVisitors();
  validateE_mail();
  validateRubric();
  validatePlace();
  validateСomments();
  validateDescription();

  ok = ok && validateAuthor(ok);
  ok = ok && validateSitename(ok);
  ok = ok && validateSiteurl(ok);
  ok = ok && validateStartdate(ok);
  ok = ok && validateVisitors(ok);
  ok = ok && validateE_mail(ok);
  ok = ok && validateRubric(ok);
  ok = ok && validatePlace(ok);
  ok = ok && validateСomments(ok);
  ok = ok && validateDescription(ok);

  if (!ok) EO.preventDefault();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function validateText(a) {
  while (Boolean(a) === false || a == "") {
    return false;
  }return true;
}

function nonCyrillicText(b) {
  for (var i = 0; i < b.length; i++) {
    if (b.charCodeAt(i) < 1040 || b.charCodeAt(i) > 1103) i++;
  }return true;
  return false;
}

function validateUrl(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}

function validateDate(value) {
  var arrD = value.split(".");
  arrD[1] -= 1;
  var d = new Date(arrD[2], arrD[1], arrD[0]);
  if (d.getFullYear() == arrD[2] && d.getMonth() == arrD[1] && d.getDate() == arrD[0]) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(val) {
  if (!val.match(/\S+@\S+\.\S+/)) {
    return false;
  }
  if (val.indexOf(' ') != -1 || val.indexOf('..') != -1) {
    return false;
  }
  return true;
}

exports.validateText = validateText;
exports.validateUrl = validateUrl;
exports.validateDate = validateDate;
exports.validateEmail = validateEmail;

/***/ })
/******/ ]);