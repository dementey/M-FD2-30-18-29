// Игровая среда CANVAS и её размеры
var canvas;
var context;
var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;
var cvx = (window.innerWidth - viewportWidth) * .5;
var cvy = (window.innerHeight - viewportHeight) * .5;

// Объявляем DOM-элементы
var progress;
var menu;
var recordsMenu;
var recordsButton;
var storeUserNameButton;
var backToMenuButton;
var userName;
var title;
var startButton;
var audio;
var mute;
var isLoud = true;
var checkScore;
var checkTime;
var pause;

// Элементы игры  
var bubbles = [];
var player;
var img;

// Свойства определения игровых координат мыши
var mouseX = (window.innerWidth - viewportWidth);
var mouseY = (window.innerHeight - viewportHeight);
var mouseIsDown = false;

// Свойства игры, счета, игрового времени и частоты обновления
var playing = false;
var paused = false;
var score = 0;
var scoreCounter;
var frequency = 1000 / 60;

var circles = [];
var player2List = [];
var started = false;
var timer = 0;
var intervals = [];
var heartt = [];
var worms = [];
var masterList = [];
var wormScore = 0;
var highScore = 0;
var c = document.getElementById("canvas1");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");
var w = ctx.canvas.clientWidth;
var h = ctx.canvas.clientHeight;
var player2;

gameFunc = new function () {

    // Конструктор игры
    this.init = function () {
        // Находим необходимые DOM-элементы  
        canvas = document.getElementById('cvs');
        progress = document.getElementById('progress');
        menu = document.getElementById('menu');
        recordsMenu = document.getElementById('recordsMenu');
        title = document.getElementById('title');
        userName = document.getElementById('userName');
        startButton = document.getElementById('startButton');
        storeUserNameButton = document.getElementById('storeUserName');
        recordsButton = document.getElementById('showRecords');
        backToMenuButton = document.getElementById('backToMenu');
        checkScore = document.createElement('span');
        checkTime = document.createElement('span');
        progress.appendChild(checkScore);
        progress.appendChild(checkTime);
        audio = document.getElementById('audio');
        mute = document.getElementById('mute');
        scoreCounter = document.getElementById('scoreCounter');
        if (canvas && canvas.getContext) {
            context = canvas.getContext('2d');
            // Устанавливаем слушателей событий
            document.addEventListener('mousemove', mouseMoveHandler, false);
            document.addEventListener('mousedown', mouseDownHandler, false);
            document.addEventListener('mouseup', mouseUpHandler, false);
            document.addEventListener('keydown', keyDownHandler, false);
            document.addEventListener('keyup', keyUpHandler, false);
            canvas.addEventListener('touchstart', touchStartHandler, false);
            document.addEventListener('touchmove', touchMoveHandler, false);
            storeUserNameButton.addEventListener('click', storeUserNameButtonHandler, false);
            document.addEventListener('touchend', touchEndHandler, false);
            window.addEventListener('resize', resizeHandler, false);
            window.addEventListener('orientationchange', resizeHandler, false);
            mute.addEventListener('click', muteHandler, false);
            document.addEventListener('deviceorientation', deviceorientationHandler, true);
            // Инициируем игрока 
            player = new Player();//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Вызываем функцию принудительного пересчета размеров игрового поля для корректного отображения
            resizeHandler();
            // Устанавливаем интервал перерисовки
            window.setInterval(game, frequency);
        }
    };
    //Остановка игры
    this.stopGame = function () {
        if (playing) {
            playing = false;
        };
        resizeHandler();
    };
    //состояние игры
    this.isPlaying = function () {
        return playing;
    };
    //запрашиваем таблицу рекордов
    this.showRecords = function () {
        this.stopGame();
        records.getHighscores();
    };
    // Добавляем результат игрока по клику
    function storeUserNameButtonHandler(e) {
        e.preventDefault(e);
        records.addNewResult(userName.value, score);
    };
    // Функция для включения/выключения музыкального фона
    function muteHandler(e) {
        e.preventDefault();
        if (audio && isLoud) {
            mute.src = 'img/muteOff.png';
            audio.pause();
            isLoud = false;
            mute.setAttribute('title', 'Включить музыку');
        } else if (audio && !isLoud) {
            mute.src = 'img/muteOn.png';
            audio.play();
            isLoud = true;
            mute.setAttribute('title', 'Выключить музыку');
        };
    };
    // Функции обработчиков событий (управление мышью)
    function mouseMoveHandler(event) {
        mouseX = event.clientX - cvx;
        mouseY = event.clientY - cvy;
    };
    function mouseDownHandler(event) {
        mouseIsDown = true;
    };
    function mouseUpHandler(event) {
        mouseIsDown = false;
    };
    // Функции обработчиков событий (управление клавиатурой)
    function keyDownHandler(e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 37:
                mouseX -= 15;
                mouseIsDown = true;
                e.preventDefault();
                break;
            case 38:
                mouseY -= 15;
                mouseIsDown = true;
                e.preventDefault();
                break;
            case 39:
                mouseX += 15;
                mouseIsDown = true;
                e.preventDefault();
                break;
            case 40:
                mouseY += 15;
                mouseIsDown = true;
                e.preventDefault();
                break;
        };
    };
    function keyUpHandler(e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 37:
                mouseIsDown = false;
                e.preventDefault();
                break;
            case 38:
                mouseIsDown = false;
                e.preventDefault();
                break;
            case 39:
                mouseIsDown = false;
                e.preventDefault();
                break;
            case 40:
                mouseIsDown = false;
                e.preventDefault();
                break;
        };
    };
    // Функции обработчиков тач-событий (тач-управление)
    function touchStartHandler(event) {
        if (event.touches.length == 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - cvx;
            mouseY = event.touches[0].pageY - cvy;
            mouseIsDown = true;
        };
    };
    function touchMoveHandler(event) {
        if (event.touches.length == 1) {
            mouseX = event.touches[0].pageX - cvx;
            mouseY = event.touches[0].pageY - cvy;
        };
    };
    function touchEndHandler(event) {
        mouseIsDown = false;
    };
    //Событие акселерометра/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function deviceorientationHandler(event) {
        event.preventDefault();
        mouseX = cvx - event.gamma*0.5;
        mouseY = cvy - event.beta*0.5;
    };
    // Фунция обработчик события изменения размера 
    function resizeHandler() {
        var margin,
            desiredMenuWidth = 500;
        // Определяем игровое поле, присваиваем и позиционируем CANVAS в соответсвии с новыми размерами
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        canvas.width = viewportWidth;
        canvas.height = viewportHeight;
        canvas.style.position = 'absolute';
        canvas.style.left = cvx + 'px';
        canvas.style.top = cvy + 'px';
        // Корректируем отображение
        margin = Math.max(cvx + (viewportWidth - desiredMenuWidth) / 2, 0);
        menu.style.marginLeft = margin + 'px';
        menu.style.marginRight = margin + 'px';
        menu.style.marginTop = Math.max(0, (viewportHeight - menu.getBoundingClientRect().height) / 2) + 'px';
        recordsMenu.style.marginLeft = margin + 'px';
        recordsMenu.style.marginRight = margin + 'px';
        recordsMenu.style.marginTop = Math.max(0, (viewportHeight - recordsMenu.getBoundingClientRect().height) / 2) + 'px';
    };

    // Функция для воспроизведения виброотклика на соотвествующие события в игре 
    function vibro(check) {
        if (navigator.vibrate) {
            if (!check) {
                window.navigator.vibrate([100, 50, 100]);
            } else {
                window.navigator.vibrate(150);
            };
        };
    };
    // Метод запуска игры по клику на кнопку СТАРТ в
    this.startGame = function () {
        if (playing == false) {
            playing = true;
            // Обновляем игровые свойства
            bubbles = [];
            score = 0;
            // Корректируем отображение в соответствии с началом игрового процесса
            progress.style.display = 'block';
            if (!isLoud) {
                audio.pause();
            } else {
                audio.play();
            };
            if (playing == true) {
                var newElements = document.getElementsByClassName("data");
                for (var j = 0; j < newElements.length; j++) {
                    newElements[j].style.visibility = "visible";
                };
                player2 = new Player2();
                player2.x = mouseX;
                player2.y = mouseY;
                player2List.push(player2);
                masterList.push(player2)
                circleDraw = setInterval("renderCircles(masterList)", 20);
                circleGen = setInterval("createCircle(circles)", 2000);
                heartDropp = setInterval("dropHeart(heartt)", 6000);
                wormDrop = setInterval("dropWorm(worms)", 5000)
                gameTimer = setInterval("incrementTimer()", 1000);
                intervals.push(circleGen, circleDraw, gameTimer, heartDropp, wormDrop);
                started = true;
            };
        };
    };
    // Функция для обновления и отображения текущих свойств игры
    function game() {
        // Очищаем игровое поле CANVAS 
        context.clearRect(0, 0, canvas.width, canvas.height);
        var i, j;
        // Обновляем игровое поле и отрисовываем игрока только если игра активна
        if (playing) {
            // Задаём задержку перемещения игрока
            player.position.x += (mouseX - player.position.x) * 0.13;
            player.position.y += (mouseY - player.position.y) * 0.13;
            // Инкрементируем получение игровых очков за сложность и перемещение
            var total = wormScore + timer;
            if (total > highScore) {
                highScore = total;
                score = highScore;
            };
        };
        // Если игрок покидает видимые координаты игрового поля - игра прекращается1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        if (playing && (player.position.x < 0 || player.position.x > viewportWidth || player.position.y < 0 || player.position.y > viewportHeight)) {
            vibro(true); // задаем виброотклик
            gameOver();
        };
        //Пузыри и их поведение с учетом бонусов игрока в активном статусе игры
        for (i = 0; i < bubbles.length; i++) {
            p = bubbles[i];
            // Рисуем, позиционируем и задаём перемещение пузырей
            context.save();
            context.beginPath();
            context.fillStyle = '#ffff59';
            context.arc(p.position.x, viewportHeight - p.position.y, p.size, 0, 2 * Math.PI, false);
            context.stroke();
            context.restore();
            p.position.y += p.size * 0.1;
            // Если пузыри выходят за игровое поле - они пропадают
            if (p.position.x < 0 || p.position.y > viewportHeight) {
                bubbles.splice(i, 1);
                i--;
            };
        };
        // Если количество пузырей меньше 20 - создаем ещё пузырей
        if (bubbles.length < 30) {
            bubbles.push(positionNewElement(new Bubble()));
        };
        if (playing) {
            player2.x = mouseX;
            player2.y = mouseY;
        };
    };

    // функция для позиционирования новых элементов игры
    function positionNewElement(p) {
        if (Math.random() > 0.5) {
            p.position.x = Math.random() * viewportWidth;
            p.position.y = -20;
        }
        else {
            p.position.x = viewportWidth + 20;
            p.position.y = (-viewportHeight * 0.2) + (Math.random() * viewportHeight * 1.2);
        }
        return p;
    };
};

//К_Л_А_С_С_Ы__Н_А_Ч_А_Л_О//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Описываем класс cоздания новых элементов
function Element(x, y) {
    this.position = { x: x, y: y };
}

Element.prototype.distanceTo = function (p) { // описываем метод вычисления расстояния
    var dx = p.x - this.position.x;
    var dy = p.y - this.position.y;
    return Math.sqrt(dx * dx + dy * dy);
};

Element.prototype.clonePosition = function () { // описываем метод клонирования координат
    return { x: this.position.x, y: this.position.y };
};

// класс игрока
function Player() {
    this.position = { x: 0, y: 0 };
    this.size = 8;
}
Player.prototype = new Element();

// класс пузырьков
function Bubble() {
    this.position = { x: 0, y: 0 };
    this.size = 6 + (Math.random() * 4);
}
Bubble.prototype = new Element();

//Универсальный класс окружностей
function Circle(radius) {
    this.x = randomInt(0, w);
    this.y = randomInt(0, h);
    this.dx = randomInt(-2, 2) / 3;
    this.dx += levelUp()
    this.dy = randomInt(-2, 2) / 3;
    this.dy += levelUp()
    this.radius = radius;
    this.startRadius = radius;
    this.hit = false;
    this.type = "circle";
    this.alpha = 1
    this.colour = "rgba(" + randomRGB() + "," + this.alpha + ")";
    this.max = randomInt(2, 12);
    this.alive = true;
    this.draw = function () {
        this.radius += (1 / 500 * this.startRadius);
        if (this.radius >= this.startRadius * this.max) { this.alive = false }
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath()
    };
    this.bounding = function () {
        if ((this.x + this.radius + this.dx) > w || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
            if (this.type == "player") { this.life -= 1; }
        }
        if ((this.y + this.radius + this.dy) > h || this.y + this.dy < this.radius) {
            this.dy = -this.dy;
            if (this.type == "player") { this.life -= 1; }
        }
    };
    this.move = function () {
        this.x += this.dx;
        this.y += this.dy;
    };
}

//Класс сердечек
function Heart() {
    this.radius = 20;
    this.x = randomInt(30, w - 30);
    this.y = -20
    this.hits = 0
    this.hit = false
    this.type = "heart";
}
Heart.prototype = new Circle();
Heart.prototype.move = function () {
    this.y += .25;
    if (randomInt(1, 10) < 6) {
        this.x += 1
    }
    else { this.x -= 1 }
};
Heart.prototype.draw = function () {
    ctx.drawImage(heart, this.x - 15, this.y - 15, 30, 30)
};
Heart.prototype.bounding = function () {
    if (this.y > (h + 20)) {
        this.alive = false
    }
};
function dropHeart(circleList) {
    var heart = new Heart()
    circleList.push(heart);
    masterList.push(heart);
};

//Класс игрока
function Player2() {
    this.radius = 20;
    //this.x = h / 2; this.y = w / 2;
    //this.colour = "black";
    this.alpha = 1
    this.type = "player2";
    this.life = 250;
    this.hits = 0;
};
Player2.prototype = new Circle();
// Player2.prototype.move = function (xx, yy) {
//     //this.x += ipx / 20;
//     //this.y += ipy / 20;
// };
Player2.prototype.draw = function () {
    ctx.fillStyle = this.colour
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.drawImage(fish, this.x - 15, this.y - 15, 30, 30)
};
//Класс червяка
function Worm() {

    this.type = "worm";
    this.x = randomInt(25, w - 30);
    this.y = -20
};
Worm.prototype = new Heart();
Worm.prototype.draw = function () {
    ctx.drawImage(worm, this.x - 25, this.y - 25, 50, 50)
};
function dropWorm(circleList) {
    var worm = new Worm();
    circleList.push(worm);
    masterList.push(worm);
};
//К_Л_А_С_С_Ы__К_О_Н_Е_Ц/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gameFunc.init();

//Ф_У_Н_К_Ц_И_И__Н_А_Ч_А_Л_О///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Функция останавливает текущую игру и выводит её результат
function gameOver() {
    playing = false;
    // Корректируем отображение в соответствии с окончанием игрового процесса
    toggleSaveControls(true);
    title.innerHTML = 'Игра окончена! Ваш результат: ' + Math.round(score);
    window.location.hash = '#Menu';
    reset();
};
function toggleSaveControls(show) {
    userName.style.display = show ? 'block' : 'none';
    storeUserNameButton.style.display = show ? 'block' : 'none';
};
//уровни
function levelUp() {
    var adjust = timer / 45
    return adjust
};
//формируем лист фигур
function createCircle(circleList) {
    var circle = new Circle(randomInt(5, 12));
    circleList.push(circle);
    masterList.push(circle);
};
//функция сканирования прикосновения объектов
function scanCollisions() {
    p = player2List[0];
    p.hit = false
    collisionCheck(heartt, p);
    if (p.hit) { p.life += 50; if (p.life > 275) { p.life = 275 } }
    p.hit = false;
    collisionCheck(worms, p);
    if (p.hit) { p.colour = "green"; p.alpha = 1; wormScore += 10 };
    p.hit = false
    collisionCheck(circles, p);
    if (p.hit) { p.colour = "red"; p.alpha = 1; p.life -= 3.5 }
    else { p.colour = "white"; p.alpha = 0 }
};
//функция удаления елементов из листа
function remove(element, list) {
    var index = list.indexOf(element);
    list.splice(index, 1);
    return list;
};
//функция удаления елементов из игры
function renderCircles(list) {
    ctx.clearRect(0, 0, w, h);
    scanCollisions();
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.alive == false) {
            list.splice(i, 1)
            //удаление из списка
            if (item.type == "heart") {
                remove(item, heartt)
            }
            else if (item.type == "circle") {
                remove(item, circles)
            }
            else if (item.type == "worm") {
                remove(item, worms)
            }
        };

        for (var j = 0; j < list.length; j++) {
            list[j].bounding();
            list[j].move();
            list[j].draw();
        };
    };
    p = player2List[0];
    if (p.life <= 0) {
        //gameOver2();
        gameOver();
    }
};
//Функция сброса игры
function reset() {
    for (i = 0; i < intervals.length; i++) {
        clearInterval(intervals[i])
    };
    list = [];
    circles = [];
    heartt = [];
    player2List = [];
    masterList = [];
    worms = [];
    wormScore = 0;
    timer = 0;
    started = false;
    var xx, yy;
    ctx.clearRect(0, 0, w, h);
};
//Увеличиваем счетчик игры
function incrementTimer() {
    timer += 1;
    document.getElementById("timer").innerHTML = ("Счетчик: " + timer + "cек.");
};
//Функция столкновений
function collision(p1x, p1y, r1, p2x, p2y, r2) {
    var a;
    var x;
    var y;
    a = r1 + r2;
    x = p1x - p2x;
    y = p1y - p2y;
    if (a > Math.sqrt(x * x + y * y)) {
        return true;
    } else {
        return false;
    }
};
//Функция проверки столкновений
function collisionCheck(circleInput, player2) {
    var startHits = player2.hits;
    for (var k = 0; k < circleInput.length; k++) {
        c = circleInput[k];
        if (collision(c.x, c.y, c.radius, player2.x, player2.y, player2.radius)) {
            player2.hits += 1;
            if (c.type == "heart" || c.type == "worm") { c.alive = false }
        }
        if (player2.hits > startHits) {
            player2.hit = true;
        }
        else { player2.hit = false; }
        document.getElementById("score").innerHTML = ("Бонус: " + wormScore);
        document.getElementById("highscore").innerHTML = ("Рекорд: " + highScore);

        var elem = document.getElementById("life");
        elem.style.width = player2.life + "px";
        if (player2.life > 200) { elem.style.background = "green" }
        else if (player2.life < 200 && player2.life > 100) { elem.style.background = "yellow" }
        else if (player2.life < 100) { elem.style.background = "red" }

    };

};
//Функция вычисления случайного цвета
function randomRGB() {
    var r = function () { return Math.floor(Math.random() * 256) };
    return r() + "," + r() + "," + r();
};
//Функция вычисления случайного числа
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//Ф_У_Н_К_Ц_И_И__К_О_Н_Е_Ц///////////////////////////////////////////////////////////////////////////////////////////////////////////////
