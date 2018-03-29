"use strict";

var formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {label:'Опубликовать:',kind:'submit'},
];

var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
];

function DinFormCreate (_elem, _formDef) {
  console.log(_elem);
  var form=document.forms[_elem];
  //forms.innerHTML='_formDef';
  console.log(form);
  var self=this; // сохраняем ссылку на this в любой переменной, обычно self

  self.elem=_elem; // запоминаем, с каким IMG будем работать
}


console.log (document.getElementById('Form1'))
var formDef1=new DinFormCreate ( 'Form1', formDef1);
//var formDef2=new DinFormCreate ( document.forms.Form2, formDef2);



//document.getElementById('FOOTBALL').innerHTML+=" "+quadra(5);
