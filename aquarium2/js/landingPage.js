gameFunc = new function () {
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
    var time = 0;
    var frequency = 1000 / 60;

    // Игровая скорость и сложность!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var velocity = { x: 0, y: 1 };


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
            storeUserNameButton.addEventListener('click', storeUserNameButtonHandler, false);
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
            bubbles = [];
            score = 0;

            player.position.x = mouseX;
            player.position.y = mouseY;

            // Корректируем отображение UI в соответствии с началом игрового процесса
            progress.style.display = 'block';

            time = new Date().getTime();
            if (!isLoud) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        startUp();

    };

    this.stopGame = function () {
        if (playing) {
            playing = false;
        }

        resizeHandler();
    };

    this.isPlaying = function () {
        return playing;
    };

    this.showRecords = function () {
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
        mouseIsDown = true;
    }

    function mouseUpHandler(event) {
        mouseIsDown = false;
    }

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
    };


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
        var svelocity = { x: velocity.x, y: velocity.y };
        var i, j, ilen, jlen;

        // Обновляем игровое поле и отрисовываем игрока только если игра активна
        if (playing) {

            // Клонируем позицию игрока
            pp = player.clonePosition();

            // Задаём задержку перемещения игрока
            player.position.x += (mouseX - player.position.x) * 0.13;
            player.position.y += (mouseY - player.position.y) * 0.13;

            // Инкрементируем получение игровых очков за сложность и перемещение
            score += 0.1;
            score += player.distanceTo(pp) * 0.03;

            // Задаём свойство 'продолжительности' игровых бонусов
            player.fox = Math.max(player.fox - 1, 0);
            player.rose = Math.max(player.rose - 1, 0);
            player.box = 0;
            context.beginPath(); // игрок
            context.fillStyle = '#00ffcc';
            context.shadowColor = '#ffff59';
            context.arc(player.position.x, player.position.y, player.size / 2, 0, Math.PI * 2, true);
            context.fill();
        }

        // Если игрок покидает видимые координаты игрового поля - игра прекращается
        if (playing && (player.position.x < 0 || player.position.x > viewportWidth || player.position.y < 0 || player.position.y > viewportHeight)) {
            vibro(true); // задаем виброотклик
            gameOver();
        }

        // ЗВЁЗДЫ и их поведение с учетом бонусов игрока в активном статусе игры
        for (i = 0; i < bubbles.length; i++) {
            p = bubbles[i];

            if (playing) {

                // Если у игрока нет бонуса и он столкнулся со звездой - взрывается игрок 
                if (p.distanceTo(player.position) < (player.size + p.size) * 0.5) {
                    vibro(true); // задаем виброотклик
                    gameOver();
                }
            }

            // Рисуем, позиционируем и задаём перемещение ЗВЁЗД
            context.save();
            context.beginPath();
            context.fillStyle = '#ffff59';
            context.arc(p.position.x, p.position.y, p.size, 0, 2 * Math.PI, false);
            context.stroke();
            context.restore();

            p.position.x += svelocity.x;
            p.position.y += svelocity.y;

            // Если звёзды выходят за игровое поле - они пропадают
            if (p.position.x < 0 || p.position.y > viewportHeight) {
                bubbles.splice(i, 1);
                i--;
            }
        }

        // Если количество звёзд меньше чем сложность игры увеличенная на коэффициент - создаем ещё звёзд
        if (bubbles.length < 15) {
            bubbles.push(positionNewElement(new Bubble()));
        }

        // Обновляем и отображаем текущие игровые показатели активной игры    
        if (playing) {
            scoreText = 'Счёт: ' + Math.round(score);
            checkScore.innerHTML = scoreText;
            scoreText = ' Время: ' + Math.round(((new Date().getTime() - time) / 1000) * 100) / 100 + 'с';
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
            p.position.y = (-viewportHeight * 0.2) + (Math.random() * viewportHeight * 1.2);
        }
        return p;
    }
};

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

gameFunc.init();