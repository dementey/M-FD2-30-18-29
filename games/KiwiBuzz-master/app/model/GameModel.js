/**
 * Created by adamschreier on 15/04/2017.
 */
Ext.define('KiwiBuzz.model.GameModel', {
    extend: 'Ext.data.Model',
    singleton: true,

    activePlayer: 1,
    playerStore: null,

    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'playersCount', type: 'int'},
            {name: 'playersNames', type: 'auto', defaultValue: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8']}, //Array of names\
            {name: 'playersColors', type: 'auto', defaultValue: ['red', 'blue', 'yellow', 'black', 'white', 'purple', 'green', 'pink']}, //Array of colors
            {name: 'fieldsCount', type: 'int'},
            {name: 'active', type: 'boolean', defaultValue: true}
        ],

        associations: [
            {
                type: 'hasMany',
                model : 'KiwiBuzz.model.PlayerModel',
                name  : 'players',
                associationKey : 'players'
            },
            {
                type: 'hasMany',
                model : 'KiwiBuzz.model.FieldModel',
                name  : 'fields',
                associationKey : 'fields'
            },
        ]
    },

    init: function () {

    },

    getPlayerStore: function () {
      if(this.playerStore) return this.playerStore;

      return this.playerStore = Ext.getStore('playerStore');
    },

    setPlayersCount: function (playersCount) {
        var playerStore = this.players();
        playerStore.removeAll();

        for (var i = 0; i < playersCount; i++) {
            var player = Ext.create('KiwiBuzz.model.PlayerModel',{
                number: i+1,
                name: this.get('playersNames')[i],
                color: this.get('playersColors')[i]
            });

            if(i==0){
                player.set('active', true);
            }

            playerStore.add(player);
        }

        //this.set('playersCount', playersCount);
    },
    getPlayersCount: function (playersCount) {
        return this.players().getRange().length;
    },


    setActivePlayer: function (playerNumber){
        this.players().each(function (record) {
            if(record.get('active') === true){
                record.set('active', false);
                return false;
            }
        });

        this.players().getAt(playerNumber-1).set('active', true);
    },

    getActivePlayer: function () {
        var activePlayer = null;

        this.players().each(function (record) {
            if(record.get('active') === true){
                activePlayer = record;
                return false;
            }
        });

        return activePlayer;
    },

    activateNextPlayer: function () {
        var activePlayerNumber = this.getActivePlayer().get('number'),
            nextPlayerNumber = null;

        if(activePlayerNumber < this.getPlayersCount()){
            nextPlayerNumber = activePlayerNumber + 1;
        } else{
            nextPlayerNumber = 1;
        }

        this.setActivePlayer(nextPlayerNumber);
    },

    getPlayersColors: function () {
        return this.get('playersColors');
    },

    setFieldsCount: function (fieldsCount) {
        var fieldStore = this.fields();
        fieldStore.removeAll();

        for (var i = 0; i < fieldsCount; i++) {
            var field = Ext.create('KiwiBuzz.model.FieldModel',{
                number: i,
                task: 'some TASK here!'
            });

            fieldStore.add(field);
        }

        //this.set('fieldsCount', fieldsCount);
    },
    getFieldsCount: function (fieldsCount) {
        return this.fields().getRange().length;
    }
});