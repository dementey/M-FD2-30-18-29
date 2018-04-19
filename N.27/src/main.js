"use strict";

import { validateText, validateUrl, validateDate, validateEmail } from './validate.js'

var formTag = document.forms['info'];
var authorField = formTag.elements['author'].addEventListener('blur', function () { validateAuthor(false); });;
var sitenameField = formTag.elements['sitename'].addEventListener('blur', function () { validateSitename(false); });
var siteurlField = formTag.elements['siteurl'].addEventListener('blur', function () { validateSiteurl(false); });
var startdateField = formTag.elements['startdate'].addEventListener('blur', function () { validateStartdate(false); });
var visitorsField = formTag.elements['visitors'].addEventListener('blur', function () { validateVisitors(false); });
var emailField = formTag.elements['email'].addEventListener('blur', function () { validateE_mail(false); });
var rubricField = formTag.elements['rubric'].addEventListener('change', function () { validateRubric(false); });
var placeField = document.getElementById('place').addEventListener('change', function () { validatePlace(false); });
var commentsField = formTag.elements['comments'].addEventListener('change', function () { validateСomments(false); });
var descriptionField = formTag.elements['description'].addEventListener('blur', function () { validateDescription(false); });;

function validateAuthor(ff) {
  console.log(ff);
  var formTag = document.forms['info'];
  var field = formTag.elements['author'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('authorErr');
  if (validateText(fieldValue) === false) {
    fieldError.innerHTML = 'Введены не корректные данные, повторите попытку ввода!';
    if (ff) field.focus();
    return false;
  }
  else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateSitename(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['sitename'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('sitenameErr');
  if (validateText(fieldValue) === false) {
    fieldError.innerHTML = 'Введены не корректные данные, повторите попытку ввода!';
    if (ff) field.focus();
    return false;
  }
  else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateSiteurl(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['siteurl'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('siteurlErr');
  if (validateUrl(fieldValue) === false) {
    fieldError.innerHTML = 'Введите пожалуйста в поле "URL сайта:" корректную дату в формате https://www.ваш_сайт.домен/!';
    if (ff) field.focus();
    return false;
  }
  else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateStartdate(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['startdate'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('startdateErr');
  if (validateDate(fieldValue) === false) {
    fieldError.innerHTML = 'Введите пожалуйста в поле "Посетителей в сутки:" корректную дату в формате ДД.MM.ГГГГ, например 18.04.2018!';
    if (ff) field.focus();
    return false;
  }
  else {
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
  }
  else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateE_mail(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['email'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('emailErr');
  if (validateEmail(fieldValue) === false) {
    fieldError.innerHTML = 'Введите пожалуйста в поле "E-mail для связи:" корректный емэйл в формате Info@it-academy.by!';
    if (ff) field.focus();
    return false;
  }
  else {
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
  }
  else {
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

  if (!document.getElementById('r1').checked&&!document.getElementById('r2').checked&&!document.getElementById('r3').checked) {
    fieldError.innerHTML = 'Выберите Ваш вариант размещения!';
    if (ff) {
      field.style.borderColor = 'blue';
    }
    return false;
  }
  else {
    fieldError.innerHTML = '';
    field.style.borderColor = 'white';
    return true;
  }
}

function validateСomments(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['comments']
  var isChecked = field.checked;
  var fieldError = document.getElementById('commentsErr');
  if (isChecked == false) {
    fieldError.innerHTML = 'Необходимо поддтвердить разрешение отзывов!';
    if (ff) field.focus();
    return false;
  }
  else {
    fieldError.innerHTML = '';
    return true;
  }
}

function validateDescription(ff) {
  var formTag = document.forms['info'];
  var field = formTag.elements['description'];
  var fieldValue = field.value.toString().trim();
  var fieldError = document.getElementById('descriptionErr');
  if (validateText(fieldValue) === false) {
    fieldError.innerHTML = 'Обязательно опишите сайт!';
    if (ff) field.focus();
    return false;
  }
  else {
    fieldError.innerHTML = '';
    return true;
  }
}



formTag.addEventListener('submit', fsubm, false);

function fsubm(EO) {
  EO = EO || window.event;
  var ok = true;

  validateAuthor(),
  validateSitename();
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