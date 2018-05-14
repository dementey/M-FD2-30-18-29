/**
 * Created by adamschreier on 18/04/2017.
 */
Ext.define('KiwiBuzz.view.desk.boardComponents.Field', {
    extend: 'Ext.Container',
    xtype: 'field',

    avatarsCount: 0,

    config: {
        cls: 'field',
        fieldNumber: 0,


        items: [
            {
                xtype: 'label',
                cls: 'label',
                id: 'label'
            }
        ]
    },

    getLabel: function () {
        if(this.label) return this.label;

        this.label = this.down('#label');
        return this.label;
    },

    setAvatarsCount: function (avatarsCount) {
        this.avatarsCount = avatarsCount;
    },

    getAvatarsCount: function () {
        return this.avatarsCount;
    },

    addAvatarsCount: function () {
        this.avatarsCount++;
    },

    decreaseAvatarsCount: function () {
        if(this.avatarsCount > 0) {
            this.avatarsCount--;
        }
    },

    setLabelText: function (text) {
        this.getLabel().setHtml(text);
    }

});