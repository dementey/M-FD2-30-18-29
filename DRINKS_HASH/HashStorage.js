
function HashStorage (){
    var hashStore={};
    this.addValue = (key,value) => {hashStore[key]=value; return this;};
    this.getValue = (key) => {if (key in hashStore) return hashStore[key]; else return false;};
    this.deleteValue = (key) => {if (key in hashStore) {delete hashStore[key]; return true;} else return false;};
    this.getKeys = () => {return Object.keys(hashStore)};
}

var drinkStorage=new HashStorage();
drinkStorage.addValue('Лимонад', ['нет','Лимон, сахар, вода.']).addValue('Сидр', ['да','Получается в результате брожения яблочного сока определённых сортов, без добавления дрожжей.']);
drinkStorage.addValue('Чай', ['нет','Чай, это напиток, получаемый варкой, завариванием или настаиванием листа чайного куста,.']);
 
function inputDrink (){ 
  var alcohol;
  do var key = prompt('Введите название напитка на русском языке');
  while (nonCyrillicText(key)===false||Boolean(key)===Boolean);
  if(confirm('Если напиток алкогольный нажмите "Ок", безалкогольный "Отмена"')===true) alcohol = "Да";
  else alcohol = "Нет";
  do var recipe = prompt('Введите рецепт напитка на русском языке');
  while (nonCyrillicText(key)===false||Boolean(key)===false);
  return drinkStorage.addValue(key,[alcohol,recipe]);
}

function getDrink (){ 
  var drinkHash={}, alcohol='';
  do var key = prompt('Введите название напитка на русском языке');
  while (nonCyrillicText(key)===false||Boolean(key)===false);
  drinkHash=drinkStorage.getValue(key);
  if(drinkStorage.getValue(key)===false)  alert('Такого напитка нет в хранилище');
  else alert('Напиток - ' + key + '\nАлкогольный: ' + drinkHash[0] +  '\nРецепт приготовления: ' + drinkHash[1]);
  }

function deleteDrink (){ 
    do var key = prompt('Введите название напитка на русском языке');
    while (nonCyrillicText(key)===false||Boolean(key)===false);
    if(drinkStorage.deleteValue(key)===true) alert('Напиток успешно удален');
    else alert('Такого напитка нет в хранилище');
    }

function getAllDrinks (){ 
  var arr=drinkStorage.getKeys();
  if(arr.length==0) alert('В хранилище нет ни одного напитка');
  else alert(arr);
}

function nonCyrillicText(b){
  if (b===null) return false;
  else{
    var result=true,resultAll;
    for (var i=0;i<b.length;i++) resultAll=(result&&(b.charCodeAt(i)<1040||b.charCodeAt(i)>1103));
    return !resultAll;
  }
}




// N.13 Домашнее задание DRINKS_HASH
// Создать проект DRINKS_HASH.
// 1.
// Разработать класс HashStorage (в файле HashStorage.js) для хранения в хэше произвольных пар ключ-значение.
// Ключ может быть любой строкой; значение может иметь любой тип, в том числе векторный (хэш, массив и т.д.)
// Класс должен иметь следующий интерфейс (т.е. иметь следующие публичные методы):
// addValue(key,value) — сохраняет указанное значение под указанным ключом;
// getValue(key) — возвращает значение по указанному ключу либо undefined;
// deleteValue(key) — удаляет значение с указанным ключом, возвращает true если значение было удалено и false если такого значения не было 
//в хранилище;
// getKeys() — возвращает массив, состоящий из одних ключей.
// Класс должен быть чистым (не должен использовать никаких глобальных переменных, не, должен «пачкать экран»). 
// Класс должен быть универсальным, т.е. не зависеть ни от структуры хранимых данных, ни от способа их последующего использования (в т.ч. не
// должен содержать никаких ссылок на DOM, т.к. может использоваться и вообще без веб-страницы).
// 2.
// Создать объект drinkStorage класса HashStorage для хранения рецептов напитков.
// Ключом является название напитка; значением — информация о напитке (алкогольный напиток или нет, строка с рецептом приготовления и т.д.
// по желанию).
// 3.
// Разработать веб-страницу для работы с хранилищем рецептов напитков.
// На странице должны быть кнопки:
// «ввод информации о напитке» — последовательно спрашивает название напитка, алкогольный он или нет, рецепт его приготовления; 
//сохраняет информацию о напитке в хранилище.
// «получение информации о напитке» — спрашивает название напитка и выдаёт (на страницу, в консоль или в alert) либо информацию о 
//нём (по примеру, приведённому ниже), либо сообщение об отсутствии такого напитка в хранилище.
// «удаление информации о напитке» — спрашивает название напитка и удаляет его из хранилища (если он там есть) с выдачей соответствующего
// сообщения в информационное окно.
// «перечень всех напитков» — выдаёт в информационное окно перечень всех напитков из хранилища (только названия).

// Пример информации о напитке:

// напиток Маргарита
// алкогольный: да
// рецепт приготовления:
// продукт, продукт... смешать...