lePetitWorld = new function () {
//debugger;
// Игровая среда CANVAS и её размеры
    var canvas;
    var context;
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var cvx = (window.innerWidth - viewportWidth) * .5;
    var cvy = (window.innerHeight - viewportHeight) * .5;

// Объявляем DOM-элементы UI
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
    var stars = [];
    var foxes = [];
    var roses = [];
    var boxes = [];
    var blasts = [];
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
    var time = 0;
    var frequency = 1000 / 60;

// Игровая скорость и сложность
    var velocity = {x: -1, y: 1};
    var difficulty = 1;

    var PreloadedImagesH = {};

    function PreloadImage(img) {
        // если такое изображение уже предзагружалось - ничего не делаем
      if (img in PreloadedImagesH) {
        return;
      }
      // предзагружаем - создаём невидимое изображение
        var Img = new Image();
        Img.src = img;
        // запоминаем, что изображение уже предзагружалось
        PreloadedImagesH[img] = true;
    }

    PreloadImage('img/fennec.png');
    PreloadImage('img/muteOff.png');
    PreloadImage('img/muteOn.png');
    PreloadImage('img/pause.png');
    PreloadImage('img/play.png');
    PreloadImage('img/rose.png');

// Функция-'конструктор' игры
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
        pause = document.getElementById('pause');
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
            storeUserNameButton.addEventListener('click', storeUserNameButtonHandler , false);
            document.addEventListener('touchend', touchEndHandler, false);
            window.addEventListener('resize', resizeHandler, false);
            window.addEventListener('orientationchange', resizeHandler, false);
            mute.addEventListener('click', muteHandler, false);
            pause.addEventListener('click', pauseGameHandler, false);

// Инициируем игрока 
            player = new Player();

// Вызываем функцию принудительного пересчета размеров игрового поля для корректного отображения UI
            resizeHandler();

// Устанавливаем интервал перерисовки
            window.setInterval(game, frequency);
        }
    };

// Метод запуска игры по клику на кнопку СТАРТ в UI
    this.startGame = function () {
        if (playing == false) {
            playing = true;

// Обновляем игровые свойства
            stars = [];
            foxes = [];
            roses = [];
            boxes = [];
            score = 0;
            difficulty = 1;

            player.tail = [];
            player.position.x = mouseX;
            player.position.y = mouseY;
            player.fox = 0;
            player.rose = 0;
            player.box = 0;

// Корректируем отображение UI в соответствии с началом игрового процесса
            progress.style.display = 'block';

            time = new Date().getTime();
            if (!isLoud) {
                audio.pause();
            } else {
                audio.play();
            }
        }
    };

    this.stopGame = function() {
        if (playing) {
            playing = false;
        }

        resizeHandler();
    };

    this.isPlaying = function() {
        return playing;
    };

    this.showRecords = function() {
        this.stopGame();
        records.getHighscores();
    };

// Добавляем результат игрока по клику
    function storeUserNameButtonHandler(e) {
        e.preventDefault(e);
        records.addNewResult(userName.value, score);
    }

    function toggleSaveControls(show) {
        userName.style.display = show ? 'block' : 'none';
        storeUserNameButton.style.display = show ? 'block' : 'none';
    }
    this.toggleSaveControls = toggleSaveControls;

// Функция для установки/снятия паузы по клику на кнопку в UI во время игры
    function pauseGameHandler(e) {
        e.preventDefault();
        if (playing) {
            playing = false;
            paused = true;
            pause.setAttribute('title', 'Продолжить игру');
            pause.src = 'img/pause.png';
        } else if (!playing) {
            playing = true;
            paused = false;
            pause.setAttribute('title', 'Остановить игру');
            pause.src = 'img/play.png';
        }
    }

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
        }
    }

// Функция останавливает текущую игру и выводит её результат
    function gameOver() {
        playing = false;
 
// Корректируем отображение UI в соответствии с окончанием игрового процесса
        toggleSaveControls(true);
        
        title.innerHTML = 'Игра окончена! (Вы набрали: ' + Math.round(score) + ' очков)';

        window.location.hash = '#Menu';
    }

// Функции обработчиков событий (управление мышью)
    function mouseMoveHandler(event) {
        document.body.style.cursor = 'crosshair';
        mouseX = event.clientX - cvx;
        mouseY = event.clientY - cvy;
    }

    function mouseDownHandler(event) {
        console.log('mouseDownHandler');
        mouseIsDown = true;
    }

    function mouseUpHandler(event) {
        mouseIsDown = false;
    }

// Функции обработчиков событий (упраление клавиатурой)
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
        }
    }

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
        }
    }

// Функции обработчиков тач-событий (тач-управление)
    function touchStartHandler(event) {
        if (event.touches.length == 1) {
            event.preventDefault();

            mouseX = event.touches[0].pageX - cvx;
            mouseY = event.touches[0].pageY - cvy;

            mouseIsDown = true;
        }
    }

    function touchMoveHandler(event) {
        if (event.touches.length == 1) {

            mouseX = event.touches[0].pageX - cvx;
            mouseY = event.touches[0].pageY - cvy;
        }
    }

    function touchEndHandler(event) {
        mouseIsDown = false;
    }

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

// Корректируем отображение UI

        margin = Math.max(cvx + (viewportWidth - desiredMenuWidth) / 2, 0);
        menu.style.marginLeft = margin + 'px';
        menu.style.marginRight = margin + 'px';
        menu.style.marginTop = Math.max(0, (viewportHeight - menu.getBoundingClientRect().height) / 2) + 'px';

        recordsMenu.style.marginLeft = margin + 'px';
        recordsMenu.style.marginRight = margin + 'px';
        recordsMenu.style.marginTop = Math.max(0, (viewportHeight - recordsMenu.getBoundingClientRect().height) / 2) + 'px';
    }

// Функция для создания, определения поведения и позиционирования частиц после уничтожения звезды
    function createBlasts(position, spread, color) {
        var q = 10 + ( Math.random() * 15 );

        while (--q >= 0) {
            var p = new Blast();
            p.position.x = position.x + ( Math.sin(q) * spread );
            p.position.y = position.y + ( Math.cos(q) * spread );
            p.velocity = {x: -4 + Math.random() * 8, y: -4 + Math.random() * 8};
            p.alpha = 1;

            blasts.push(p);
        }
    }

// Функция для воспроизведения виброотклика на соотвествующие события в игре 
    function vibro(check) {
        if (navigator.vibrate) {
            if (!check) {
                window.navigator.vibrate([100, 50, 100]);
            } else {
                window.navigator.vibrate(150);
            }
        }
    }

// Функция для обновления и отображения текущих свойств игры
    function game() {
        if (paused) {
            return;
        }

// Очищаем игровое поле CANVAS 
        context.clearRect(0, 0, canvas.width, canvas.height);
        var svelocity = {x: velocity.x * difficulty, y: velocity.y * difficulty};
        var i, j, ilen, jlen;

// Обновляем игровое поле и отрисовываем игрока только если игра активна
        if (playing) {

//Инкрементируем сложность игрового процесса
            difficulty += 0.0003;

// Клонируем позицию игрока
            pp = player.clonePosition();

// Задаём задержку перемещения игрока
            player.position.x += ( mouseX - player.position.x ) * 0.13;
            player.position.y += ( mouseY - player.position.y ) * 0.13;

// Инкрементируем получение игровых очков за сложность и перемещение
            score += 0.1 * difficulty;
            score += player.distanceTo(pp) * 0.03;

// Задаём свойство 'продолжительности' игровых бонусов
            player.fox = Math.max(player.fox - 1, 0);
            player.rose = Math.max(player.rose - 1, 0);
            player.box = 0;

// Если игрок подбирает Лиса, то создается щит
            if (player.fox > 0 && ( player.fox > 100 || player.fox % 3 != 0 )) {
                context.beginPath();
                context.fillStyle = '#ff911c';
                context.strokeStyle = '#00ffcc';
                context.shadowBlur = 5.5;
                context.arc(player.position.x, player.position.y, player.size * 2, 0, Math.PI * 2, true);
                context.fill();
                context.stroke();
            }

// Если игрок подбирает Розу, то создается щит
            if (player.rose > 0 && ( player.rose > 100 || player.rose % 4 != 0 )) {
                context.beginPath();
                context.fillStyle = '#a1082e';
                context.strokeStyle = '#00ffcc';
                context.shadowBlur = 5.5;
                context.arc(player.position.x, player.position.y, player.size * 3, 0, Math.PI * 2, true);
                context.fill();
                context.stroke();
            }

// Задаём, позиционируем и отображаем хвост, следующий за игроком, и его самого
            player.tail.push(new Element(player.position.x, player.position.y));

            context.beginPath(); // хвост
            context.strokeStyle = '#ff911c';
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.lineWidth = 0.5;

            for (i = 0, ilen = player.tail.length; i < ilen; i++) {
                p = player.tail[i];

                context.lineTo(p.position.x, p.position.y);

                p.position.x += svelocity.x;
                p.position.y += svelocity.y;
            }

            context.stroke();
            context.closePath();

            if (player.tail.length > 23) {
                player.tail.shift();
            }

            context.beginPath(); // игрок
            context.fillStyle = '#00ffcc';
            context.shadowColor = '#ffff59';
            context.shadowBlur = 10.5;
            context.arc(player.position.x, player.position.y, player.size / 2, 0, Math.PI * 2, true);
            context.fill();
        }

// Если игрок покидает видимые координаты игрового поля - игра прекращается
        if (playing && ( player.position.x < 0 || player.position.x > viewportWidth || player.position.y < 0 || player.position.y > viewportHeight )) {
            vibro(true); // задаем виброотклик
            gameOver();
        }

// ЗВЁЗДЫ и их поведение с учетом бонусов игрока в активном статусе игры
        for (i = 0; i < stars.length; i++) {
            p = stars[i];

            if (playing) {

// Если игрок забрал бонусного Лиса - звёзды взрываются от столкновения со щитом
                if (player.fox > 0 && p.distanceTo(player.position) < ( ( player.size * 4 ) + p.size ) * 0.5) {
                    vibro(false); // задаем виброотклик при получении бонуса
                    createBlasts(p.position, 10);
                    stars.splice(i, 1);
                    i--;
                    score += 10; // получаем дополнительные очки
                    continue;

// Если игрок забрал бонусную Розу - звёзды взрываются от столкновения со щитом
                } else if (player.rose > 0 && p.distanceTo(player.position) < ( ( player.size * 6) + p.size) * 0.5) {
                    vibro(false); // задаем виброотклик при получении бонуса
                    createBlasts(p.position, 10);
                    stars.splice(i, 1);
                    i--;
                    score += 15; // получаем дополнительные очки
                    continue;

// Если игрок забрал бонусного Барашка - происходит взрыв звёзд в заданном радиусе
                } else if (player.box > 0 && p.distanceTo(player.position) < ( ( player.size * 20 ) + p.size ) * 0.5) {
                    vibro(false); // задаем виброотклик при получении бонуса
                    createBlasts(p.position, 10);
                    stars.splice(i, 1);
                    i--;
                    score += 5; // получаем дополнительные очки
                    continue;

// Если у игрока нет бонуса и он столкнулся со звездой - взрывается игрок 
                } else if (p.distanceTo(player.position) < ( player.size + p.size ) * 0.5) {
                    vibro(true); // задаем виброотклик
                    createBlasts(player.position, 10);
                    gameOver();
                }
            }

// Рисуем, позиционируем и задаём перемещение ЗВЁЗД
            context.save();
            context.beginPath();
            context.fillStyle = '#ffff59';
            context.shadowBlur = 0;
            context.translate(p.position.x, p.position.y);
            context.moveTo(0, 0 - p.size);
            for (var u = 0; u < 5; u++) {
                context.rotate(Math.PI / 5);
                context.lineTo(0, 0 - (p.size * 0.5));
                context.rotate(Math.PI / 5);
                context.lineTo(0, 0 - p.size);
            }
            context.fill();
            context.restore();

            p.position.x += svelocity.x * p.force;
            p.position.y += svelocity.y * p.force;

// Если звёзды выходят за игровое поле - они пропадают
            if (p.position.x < 0 || p.position.y > viewportHeight) {
                stars.splice(i, 1);
                i--;
            }
        }

// ЛИСЫ
        for (i = 0; i < foxes.length; i++) {
            f = foxes[i];

            if (f.distanceTo(player.position) < ( player.size * 1.5 + f.size) * 0.5 && playing) { // взяли бонус
                player.fox = 300; // обновили его временное свойство

                for (j = 0; j < stars.length; j++) {
                    s = stars[j];

                    if (s.distanceTo(f.position) < 100) { // если в момент взятия бонуса в заданном радиусе были звёзды - взрываем их
                        vibro(false); // задаем виброотклик
                        createBlasts(s.position, 10);
                        stars.splice(j, 1);
                        j--;
                        score += 10; // получаем дополнительные очки
                    }
                }
            }

// Рисуем, позиционируем и задаём перемещение ЛИС
            img = new Image();
            img.src = "img/fennec.png";
            context.shadowBlur = 0;
            context.drawImage(img, f.position.x, f.position.y, f.size, f.size);

            f.position.x += svelocity.x * f.force;
            f.position.y += svelocity.y * f.force;

// Если лисы выходят за игровое поле - они пропадают
            if (f.position.x < 0 || f.position.y > viewportHeight || player.fox != 0) {
                foxes.splice(i, 1);
                i--;
            }
        }

// РОЗЫ
        for (i = 0; i < roses.length; i++) {
            r = roses[i];

            if (r.distanceTo(player.position) < ( player.size * 3 + r.size) * 0.5 && playing) { // взяли бонус
                player.rose = 400; // обновили его временное свойство
                difficulty -= 0.2; // временно декрементируем сложность игры

                for (j = 0; j < stars.length; j++) {
                    s = stars[j];

                    if (s.distanceTo(r.position) < 10) { // если в момент взятия бонуса в заданном радиусе были звёзды - взрываем их
                        vibro(false); // задаем виброотклик
                        createBlasts(s.position, 10);
                        stars.splice(j, 1);
                        j--;
                        score += 15; // получаем дополнительные очки
                    }
                }
            }

// Рисуем, позиционируем и задаём перемещение РОЗ
            img = new Image();
            img.src = "img/rose.png";
            context.shadowBlur = 0;
            context.drawImage(img, r.position.x, r.position.y, r.size, r.size);

            r.position.x += svelocity.x * r.force;
            r.position.y += svelocity.y * r.force;

// Если розы выходят за игровое поле - они пропадают
            if (r.position.x < 0 || r.position.y > viewportHeight || player.rose != 0) {
                roses.splice(i, 1);
                i--;
            }
        }

// БАРАШКИ
        for (i = 0; i < boxes.length; i++) {
            b = boxes[i];

            if (b.distanceTo(player.position) < (player.size + b.width + b.height) * 0.5 && playing) {  // взяли бонус
                player.box = 200; // обновили его временное свойство

                for (j = 0; j < stars.length; j++) {
                    s = stars[j];

                    if (s.distanceTo(b.position) < 500) { // если в момент взятия бонуса в заданном радиусе были звёзды - взрываем их
                        vibro(false); // задаем виброотклик
                        createBlasts(s.position, 10);
                        stars.splice(j, 1);
                        j--;
                        score += j * 5; // получаем дополнительные очки
                    }
                }
            }

// Рисуем, позиционируем и задаём перемещение БАРАШКОВ
            context.beginPath();
            context.fillStyle = '#e3c010';
            context.shadowBlur = 0;
            context.fillRect(b.position.x, b.position.y, b.width, b.height);
            context.strokeStyle = '#000';
            context.lineWidth = 1;
            context.strokeRect(b.position.x, b.position.y, b.width, b.height);
            context.fill();

            b.position.x += svelocity.x;
            b.position.y += svelocity.y;

// Если барашки выходят за игровое поле - они пропадают
            if (b.position.x < 0 || b.position.y > viewportHeight || player.box != 0) {
                boxes.splice(i, 1);
                i--;
            }
        }

// Если количество звёзд меньше чем сложность игры увеличенная на коэффициент - создаем ещё звёзд
        if (stars.length < 15 * difficulty) {
            stars.push(positionNewElement(new Star()));
        }

// Если количество свободных бонусов меньше одного, и его действие закончилось - создаем бонус с учетом рандомной вероятности
        if (foxes.length < 1 && Math.random() > 0.998 && player.fox == 0) {
            foxes.push(positionNewElement(new Fox()));
        }

// Если количество свободных бонусов меньше одного, и его действие закончилось - создаем бонус с учетом рандомной вероятности
        if (roses.length < 1 && Math.random() > 0.999 && player.rose == 0) {
            roses.push(positionNewElement(new Rose()));
        }

// Если количество свободных бонусов меньше одного, и его действие закончилось - создаем бонус с учетом рандомной вероятности
        if (boxes.length < 1 && Math.random() > 0.996 && player.box == 0) {
            boxes.push(positionNewElement(new Box()));
        }

// Задаём исчезновение частиц, возникших после взрыва звезды
        for (i = 0; i < blasts.length; i++) {
            p = blasts[i];

            p.velocity.x += ( svelocity.x - p.velocity.x ) * 0.04;
            p.velocity.y += ( svelocity.y - p.velocity.y ) * 0.04;

            p.position.x += p.velocity.x;
            p.position.y += p.velocity.y;

            p.alpha -= 0.01;

            context.fillStyle = 'rgba(255,255,89,' + Math.max(p.alpha, 0) + ')';
            context.shadowBlur = 0;
            context.fillRect(p.position.x, p.position.y, 1, 1);

            if (p.alpha <= 0) {
                blasts.splice(i, 1);
            }
        }

// Обновляем и отображаем текущие игровые показатели активной игры    
        if (playing) {
            scoreText = 'Счёт: ' + Math.round(score);
            checkScore.innerHTML = scoreText;
            scoreText = ' Время: ' + Math.round(( ( new Date().getTime() - time ) / 1000 ) * 100) / 100 + 'с';
            checkTime.innerHTML = scoreText;
        }
    }

// функция для позиционирования новых элементов игры
    function positionNewElement(p) {
        if (Math.random() > 0.5) {
            p.position.x = Math.random() * viewportWidth;
            p.position.y = -20;
        }
        else {
            p.position.x = viewportWidth + 20;
            p.position.y = (-viewportHeight * 0.2) + ( Math.random() * viewportHeight * 1.2 );
        }
        return p;
    }
};

// Описываем класс cоздания новых элементов
function Element(x, y) {
    this.position = {x: x, y: y};
}
Element.prototype.distanceTo = function (p) { // описываем метод вычисления расстояния
    var dx = p.x - this.position.x;
    var dy = p.y - this.position.y;
    return Math.sqrt(dx * dx + dy * dy);
};
Element.prototype.clonePosition = function () { // описываем метод клонирования координат
    return {x: this.position.x, y: this.position.y};
};

// класс игрока
function Player() {
    this.position = {x: 0, y: 0};
    this.tail = [];
    this.size = 8;
    this.fox = 0;
    this.rose = 0;
    this.box = 0;
}
Player.prototype = new Element();

// класс звёзд
function Star() {
    this.position = {x: 0, y: 0};
    this.size = 6 + ( Math.random() * 4 );
    this.force = 1 + ( Math.random() * 0.4 );
}
Star.prototype = new Element();

// класс лис
function Fox() {
    this.position = {x: 0, y: 0};
    this.size = 20 + ( Math.random() * 12 );
    this.force = 2 + ( Math.random() * 0.4 );
}
Fox.prototype = new Element();

// класс роз
function Rose() {
    this.position = {x: 0, y: 0};
    this.size = 13 + ( Math.random() * 7 );
    this.force = 3 + ( Math.random() * 0.3 );
}
Rose.prototype = new Element();

// класс коробок=барашков
function Box() {
    this.position = {x: 0, y: 0};
    this.width = 16 + ( Math.random() * 4 );
    this.height = 8 + ( Math.random() * 2 );
}
Box.prototype = new Element();

// класс взрыва
function Blast() {
    this.position = {x: 0, y: 0};
    this.force = 1 + ( Math.random() * 0.4 );
}
Blast.prototype = new Element();

lePetitWorld.init();