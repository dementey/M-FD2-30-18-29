window.onhashchange = SwitchToStateFromURLHash;

function SwitchToStateFromURLHash(param) {
    var URLHash = window.location.hash;

    console.log('Закладка изменилась: ', URLHash);

    function changeRepresentation(state) {
        var title,
            prefix = state + ' | ',
            stateElements = [
                {state: 'Menu', 'id': 'menu'},
                {state: 'Start', 'id': 'start'},
                {state: 'Records', 'id': 'recordsMenu'}
            ];

        stateElements.forEach(function(entry) {
            var showElement = entry.state === state;
            document.getElementById(entry.id).style.display = showElement ? 'block' : 'none';
        });

        if (state === 'Start') {
            prefix = 'Game | ';
        }
        title = prefix + 'Les aventures du Petit Prince';
        document.getElementsByTagName('title')[0].innerHTML = title;
    }

    var state = decodeURIComponent(URLHash.substr(1)),
        confirmFlag = true;

    switch (state) {
        case 'Menu':
            if (lePetitWorld.isPlaying()) {
                if (!(confirm('Внимание! Текущий прогресс игры будет потерян'))) {
                    confirmFlag = false;
                }
            }

            if (confirmFlag) {
                changeRepresentation(state);
                lePetitWorld.stopGame();
            } else {
                history.replaceState('Start');
            }
            break;

        case 'Start':
            if (param === true) {
                window.location.hash = 'Menu';
            } else {
                changeRepresentation(state);
                lePetitWorld.startGame();
            }
            break;

        case 'Records':
            changeRepresentation(state);
            lePetitWorld.showRecords();
            break;

        default:
            window.location.hash = '#Menu';
            break;
    }
}

window.onbeforeunload = beforeUnload;
var reloadMsg = 'В случае перезагрузки страницы прогресс игры будет утрачен';
function beforeUnload(e) {
    e=e || window.event;
    if (lePetitWorld.isPlaying()) {
        e.returnValue = reloadMsg;
        return reloadMsg;
    }
}

SwitchToStateFromURLHash(true);
