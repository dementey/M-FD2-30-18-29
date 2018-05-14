/**
 * Created by adamschreier on 13/04/2017.
 */
Ext.define('KiwiBuzz.view.desk.Dice', {
    extend: 'Ext.Container',
    xtype: 'dice',
    id: 'dice',

    requires: [
        'KiwiBuzz.model.GlobalHelper'
    ],

    currentRoll: 0,
    value: 0,
    changeValueAnimationDelay: 100,
    delayBetweenAnimationEndsAndEventIsFired: 10000,

    config:{
        sides: 6,
        rollsToAnimate: 10,
        cls: 'dice',
        items: [
            {
                xtype: 'label',
                id: 'diceField',
                cls: 'diceField',
                html: 'Roll'
            }
        ]
    },

    initialize: function () {
        var me = this,
            el = Ext.get("dice");

        el.on('doubletap', me.roll, me);
    },

    getDiceField: function () {
        if(this.diceField) return this.diceField;

        this.diceField = this.down('#diceField');
        return this.diceField;
    },

    getValue: function () {
      return this.value;
    },

    roll: function () {
        if(this.getDisabled()) return;

        var me = this;

        me.value = Math.floor(Math.random() * this.getSides()) + 1;

        var animateRoll = function() {
            setTimeout(function () {
                if (me.getRollsToAnimate() > me.currentRoll) {
                    me.getDiceField().setHtml(Math.floor(Math.random() * me.getSides()) + 1);
                    me.currentRoll++;
                    animateRoll();
                } else {
                    me.currentRoll = 0;
                    me.getDiceField().setHtml(me.value);
                    me.animationEnded();
                }
            }, me.changeValueAnimationDelay);
        }

        animateRoll();
    },

    reset: function () {
        this.getDiceField().setHtml('Roll');
    },

    animationEnded: function () {
        var me = this;

        me.fireEvent('diceRolled', me), (me.getRollsToAnimate() * me.changeValueAnimationDelay + me.delayBetweenAnimationEndsAndEventIsFired)
    }

});