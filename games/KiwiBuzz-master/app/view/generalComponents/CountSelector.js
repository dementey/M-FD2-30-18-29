/**
 * Created by adamschreier on 14/04/2017.
 */
Ext.define('KiwiBuzz.view.generalComponents.CountSelector', {
    extend: 'Ext.Container',
    xtype: 'countselector',

    value:2,

    config:{
        minValue: 2,
        defaultValue: 2,
        maxValue: 8,
        cls: 'countSelector',
        layout: {
            type: 'hbox',
            align: 'middle'
        },

        items: [
            {
                xtype:'button',
                text: '-',
                cls: 'arrowDown'
                // listeners: {
                //     tap  : this.onDecreaseTap
                // }
            },{
                xtype: 'label',
                html: '2',
                cls: 'playersCount',
                id:'playersCount'
            },{
                xtype:'button',
                text: '+',
                cls: 'arrowUp'
            }
        ]
    },

    initialize: function () {
        var me = this,
            buttons = this.query('button');

        buttons[0].on('tap', me.onDecreaseTap, me);
        buttons[1].on('tap', me.onIncreaseTap, me);
    },

    getCounter: function () {
        if(this.counter) return this.counter;

        var counter = this.down('#playersCount');
        this.counter = counter;
        return this.counter;
    },

    getValue: function () {
        return this.value;
    },

    setValue: function (value) {
        if(value >= this.getMinValue() && value <= this.getMaxValue) this.getCounter().value = value;
    },

    onDecreaseTap: function () {
        if(this.value > this.getMinValue()) this.countOfPlayersChange(false);
    },

    onIncreaseTap: function () {
        if(this.value < this.getMaxValue()) this.countOfPlayersChange(true);
    },

    countOfPlayersChange: function (bool) {
        var me = this,
            value = this.value;
        bool ? value++ : value--;
        this.value = value;
        this.getCounter().setHtml(this.value);
        //this.fireEvent('valueChanged', me);
    }

});