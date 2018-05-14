/**
 * Created by adamschreier on 13/04/2017.
 */
Ext.define('KiwiBuzz.view.desk.GameView', {
    extend: 'Ext.Container',
    xtype: 'gameview',

    requires: [
        'KiwiBuzz.view.desk.Board',
        'KiwiBuzz.view.desk.Dice',
        'KiwiBuzz.view.desk.PlayersStats'
    ],

    cls: 'desk',
    fullscreen: true,

    avatars: null,
    fields: null,


    config: {
        gameModel: null,

        items: [
            {
                xtype: 'button',
                text: 'Pause Game',
                cls: 'pauseButton',
                id: 'pauseButton'
                //badgeText: '2'
            },
            {
                xtype: 'taskcard',
                id: 'taskCard',
                hidden: true
            },{
                xtype: 'playersstats',
                id: 'playerStats'
            },{
                xtype: 'dice'
            },{
                xtype: 'board',
                id: 'board'
            }
        ]
    },
    
    initialize: function () {
        var me = this,
            gameModel = this.getGameModel();

        //this.getBoard().setFieldsCount(KiwiBuzz.model.GameSettings.getFieldsCount());
        this.getBoard().setFieldsCount(gameModel.getFieldsCount());
        this.getBoard().setPlayers(gameModel.getPlayersCount(), gameModel.getPlayersColors());
        this.getPlayerStats().setStore(this.getGameModel().players());
        this.getPlayerStats().select(this.getGameModel().getActivePlayer());

        this.avatars = Ext.ComponentQuery.query('.avatar');
        this.fields = Ext.ComponentQuery.query('.field');



        this.getPauseButton().on('tap', me.onPauseButtonTap, me);
    },

    getBoard: function () {
        if(this.board) return this.board;

        var board = this.down('#board');
        this.board = board;
        return this.board;
    },

    getPlayerStats: function () {
        if(this.playerStats) return this.playerStats;

        var playerStats = this.down('#playerStats');
        this.playerStats = playerStats;
        return this.playerStats;
    },

    getPauseButton: function () {
        if(this.pauseButton) return this.pauseButton;

        var pauseButton = this.down('#pauseButton');
        this.pauseButton = pauseButton;
        return this.pauseButton;
    },

    onPauseButtonTap: function () {
        this.fireEvent('pauseButtonTaped');
    },

    movePlayer: function (playerNumber, fieldNumber) {
        var me = this,
            avatarToMove = this.avatars[playerNumber - 1],
            avatarElement = $('#'+avatarToMove.getId()),
            fieldToMoveAt = this.fields[fieldNumber],
            duration = 1000,
            fieldsToMoveThrough = [],
            fieldsCoordinates = KiwiBuzz.model.GameSettings.getFieldsCoordinates();

        if(avatarToMove.getCurrentFieldNumber() < fieldNumber){
            if(avatarToMove.getCurrentFieldNumber() >= 0){
                this.fields[avatarToMove.getCurrentFieldNumber()].decreaseAvatarsCount();
                for (var i = avatarToMove.getCurrentFieldNumber()+1; i <= fieldNumber; i++) {
                    if(this.fields[i]) fieldsToMoveThrough.push(this.fields[i]);
                }
            }else{
                fieldsToMoveThrough.push(this.fields[0]); // REPLACE THE ARRAY BY FIND BY FIELD ID (START FIELD)
            }

        } else{
            this.fields[avatarToMove.getCurrentFieldNumber()].decreaseAvatarsCount();
            for (var i = avatarToMove.getCurrentFieldNumber(); i >= fieldNumber; i--) {
                if(this.fields[i]) fieldsToMoveThrough.push(this.fields[i]);
            }
        }

        if(fieldsToMoveThrough > 12) {
            duration = 200;
        }

        Ext.Array.each(fieldsToMoveThrough, function (item, index, array) {

            var avatarsOnField = item.getAvatarsCount(),
                left = fieldsCoordinates[item.getFieldNumber()].left + 3 * avatarsOnField%4,
                top = fieldsCoordinates[item.getFieldNumber()].top + 3 * Math.floor(avatarsOnField/4) ;

            if(index < array.length - 1) {
                avatarElement.animate({
                    left: left + '%',
                    top: top + '%'
                }, duration, 'swing');
            } else{
                avatarElement.animate({
                    left: left + '%',
                    top: top + '%'
                }, duration, 'swing', function () {
                    //console.log('animationEnd');
                    //me.fireEvent('animationEnd');
                });
            }

        });

        avatarToMove.setCurrentFieldNumber(fieldNumber);
        me.fields[fieldNumber].addAvatarsCount();


    }
});