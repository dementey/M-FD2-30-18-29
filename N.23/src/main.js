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

DinFormCreate ( document.forms.Form1, formDef1);
DinFormCreate ( document.forms.Form2, formDef2);

function DinFormCreate (elem, formDef) {
  
  var temp='';//создаем временную текстовую переменуу, куда будем сууммировать весь html 
  formDef.forEach(f);//перебираем все содержимое массива

    function f (v,i,a){//для каждого элемента массива формируем свой html
      var variantsCombo='';
      var variantsRadio='';
      if('variants' in v) //проверяем вложенность, а именно варианты
        if(v.kind=='combo') v.variants.forEach((v,i,a)=>variantsCombo+='<option value='+v.value+'>'+v.text+'</option>');
        else
          if(v.kind=='radio')  v.variants.forEach((v,i,a)=>variantsRadio+='<input type="radio"  name="public" value='+v.value+'><span>'+v.text+'</span>');

      switch(v.kind){//формируем html в зависимости от атрибутов
        case 'longtext':  temp+='<tr><td>'+v.label+'</td><td><input style="width: 453px" type="'+v.kind+'" name="'+v.name+'"></td></tr>'; break;
        case 'number':    temp+='<tr><td>'+v.label+'</td><td><input style="width: 80px" type="'+v.kind+'" name="'+v.name+'"></td></tr>'; break;
        case 'shorttext': temp+='<tr><td>'+v.label+'</td><td><input style="width: 200px" type="'+v.kind+'" name="'+v.name+'"></td></tr>'; break;
        case 'combo':     temp+='<tr><td>'+v.label+'</td><td style="padding-left: 1px"><select style="width: 200px; margin-left: 0px" type="'+v.kind+'" name="'+v.name+'">'+variantsCombo+'</select>'; break;
        case 'radio':     temp+='<tr><td>'+v.label+'</td><td  type="'+v.kind+'" name="'+v.name+'">'+variantsRadio+'</td></tr>'; break;
        case 'check':     temp+='<tr><td>'+v.label+'</td><td><input type="checkbox" name="'+v.name+'" checked></td></tr>'; break;
        case 'memo':      temp+='<tr><td colspan=2>'+v.label+'<br><textarea  type="'+v.kind+'" name="'+v.name+'"style="width: 608px; height: 50px"></textarea></td></tr>'; break;
        case 'submit':    temp+='<tr><td><input  type="'+v.kind+'" value='+v.label+'></td></tr>'; break;
      }
    }

  elem.innerHTML+='<table>'+temp+'</table><hr style="margin: 15px 0 15px 0">';//добавляем в DOM елемент <form> cформированный из массива html-код
  console.log(elem);
}

//N.23 Домашнее задание DYN_FORM
//Создать проект DYN_FORM. Разработать функцию, которая в переданном ей теге <form> динамически строит элементы формы по переданному ей массиву. 
//Вызвать эту функцию дважды с указанными ниже массивами, чтобы она построила на веб-странице две формы по указанным ниже образцам. Точном 
//соответствия внешнего вида форм образцам добиваться не обязательно. 
//В качестве скрипта, обрабатывающего данные форм (атрибут action тега form), можно указывать http://fe.it-academy.by/TestForm.php 
