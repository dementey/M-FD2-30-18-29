"use strict";

function validateText(a) {
  while (Boolean(a) === false || a == "") return false;
  return true;
}

function nonCyrillicText(b) {
  for (var i = 0; i < b.length; i++) if (b.charCodeAt(i) < 1040 || b.charCodeAt(i) > 1103) i++;
  return true;
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
  if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
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

export { validateText, validateUrl, validateDate, validateEmail };