Ext.define('KiwiBuzz.view.NewGameView', {
    extend: 'Ext.Container',
    xtype: 'newgameview',

    config: {
        cls: 'newGameView',
        tabBarPosition: 'bottom',

        items: [
            {
                xtype: 'label',
                html: 'Kiwi Buzz',
                cls: 'mainLabel'
            },
            {
                xtype: 'button',
                text: 'Resume game',
                id: 'resumeButton',
                hidden: true,
                cls: 'resumeButton',
            },
            {
                xtype: 'button',
                text: 'New game',
                id: 'newGameButton',
                cls: 'newGameButton'
            },
            {
                xtype: 'label',
                html: 'Players',
                cls: 'playersLabel'
            },
            {
                xtype: 'countselector',
                defaultValue: 2,
                cls: 'countOfPlayersSelector'
            }
        ],
    },

    initialize: function () {
        var me = this;

        this.getNewGameButton().on('tap', me.onNewGameButtonTap, me);
        this.getResumeButton().on('tap', me.onResumeButtonTap, me);
    },

    getNewGameButton: function () {
        if(this.newGameButton) return this.newGameButton;

        var newGameButton = this.down('#newGameButton');
        this.newGameButton = newGameButton;
        return this.newGameButton;
    },
    getResumeButton: function () {
        if(this.resumeButton) return this.resumeButton;

        var resumeButton = this.down('#resumeButton');
        this.resumeButton = resumeButton;
        return this.resumeButton;
    },

    getCountSelector: function () {
        if (this.countSelector) return this.countSelector;

        var countSelector = this.down('countselector');
        this.countSelector = countSelector;
        return this.countSelector;

    },

    getPlayersCount: function () {
        return this.getCountSelector().getValue();
    },

    onNewGameButtonTap: function () {
        var me = this;

        this.fireEvent('newGameButtonTaped', me);
    },
    onResumeButtonTap: function () {
        var me = this;

        this.fireEvent('resumeButtonTaped', me);
    }

});
