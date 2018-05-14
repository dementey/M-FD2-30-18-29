/**
 * Created by adamschreier on 14/04/2017.
 */
Ext.define('KiwiBuzz.controller.GameController', {
    extend: 'Ext.app.Controller',

    requires: [
        'KiwiBuzz.model.GameModel',
        'KiwiBuzz.view.desk.Dice',
        'KiwiBuzz.view.desk.PlayersStats'
    ],

    gameModel: KiwiBuzz.model.GameModel,

    config: {
        refs: {
            newGameView: 'newgameview',
            gameView: 'gameview',
            dice: 'dice',
            playersStat: 'playersstats',
            board: 'board',
            taskCardView: 'taskcard'
        },

        control: {
            newGameView: {
                newGameButtonTaped: 'startNewGame',
                resumeButtonTaped: 'resumeGame'
            },
            gameView: {pauseButtonTaped: 'pauseGame'},
            dice: {diceRolled: 'play'},
            taskCardView: {
                taskDone: 'endTurn',
            }
        }
    },

    /**
     * Called when the view is created
     */
    init: function() {
/*        var me = this;
        debugger;
        Ext.ComponentQuery.query('main')[0].on('onNewGameTap', me.startNewGame, me);*/
        KiwiBuzz.model.GameSettings.createFieldsCoordinates(10,7);

    },

    play: function () {
        var diceValue = this.getDice().getValue(),
            activePlayer = this.gameModel.getActivePlayer();

        activePlayer.rolled(diceValue);
        this.getDice().disable();

        this.movePlayers();

        this.activateTask(activePlayer, diceValue);
        //End of any task is with event (TaskDone, TaskFailed);

        this.gameModel.activateNextPlayer();


    },

    activateTask: function (fieldNumber, fieldMovements) {
        var me = this,
            records = this.getTaskStore().getRange(),
            randomTaskText = records[Math.floor((Math.random() * (records.length -1)) + 1)].get('text'),
            delay = (fieldMovements + 1) * 1000,
            cardView = me.getTaskCardView();

        setTimeout(function () {
            console.log('task to do at field ' + fieldNumber.get('currentFieldNumber') + ' is: \n' + randomTaskText);
            cardView.setText(randomTaskText);
            cardView.show();
        }, delay);
    },

    endTurn: function () {
        var me = this,
            cardView = me.getTaskCardView(),
            dice = me.getDice();

        cardView.hide();

        me.getPlayersStat().select(me.gameModel.getActivePlayer());
        dice.enable();
        dice.reset();
    },

    getPlayerStore: function () {
        if(this.playerStore) return this.playerStore;

        return this.playerStore = this.getGameModel().players();
    },

    getTaskStore: function () {
        if(this.taskStore) return this.taskStore;

        return this.taskStore = Ext.getStore('taskStore');
    },

    startNewGame: function () {
        this.fillGameModel();
        this.initializeGame();

        console.log('newGameStarted');
    },

    pauseGame: function () {
        var newGameView = this.getNewGameView();
        newGameView.getResumeButton().setHidden(false);

        Ext.Viewport.setActiveItem(this.getNewGameView());
    },
    resumeGame: function () {
        Ext.Viewport.setActiveItem(this.getGameView());
    },

    fillGameModel: function () {
        var gameModel = this.getGameModel();

        gameModel.setPlayersCount(this.getNewGameView().getPlayersCount());
        gameModel.setFieldsCount(KiwiBuzz.model.GameSettings.getFieldsCount());
        /*TO DO OTHERS*/
    },

    initializeGame: function () {
        var gameView = this.createGameView(this.gameModel);

        Ext.Viewport.add(gameView);
        this.createTaskCardsDeck();
        this.movePlayers();

        this.startGame();
    },

    createGameView: function (gameModel) {
        var gameView = Ext.create('KiwiBuzz.view.desk.GameView',{
            gameModel: gameModel
        });

        return gameView;
    },

    createTaskCardsDeck: function () {

    },

    movePlayers: function () {
        var me = this,
            playerStore = this.getGameModel().players(),
            avatars = this.getBoard().getAvatars();

        playerStore.each(function (item, index) {
            if(item.get('currentFieldNumber') != avatars[index].getCurrentFieldNumber()){
                me.getGameView().movePlayer(index + 1, item.get('currentFieldNumber'));
            }
        })
    },
    startGame: function () {
        Ext.Viewport.setActiveItem(this.getGameView());
    },

    getGameModel: function () {
        if(this.gameModel) return this.gameModel;

        return this.gameModel = KiwiBuzz.model.GameModel;
    }
});