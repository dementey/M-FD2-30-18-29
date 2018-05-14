/**
 * Created by adamschreier on 13/04/2017.
 */
Ext.define('KiwiBuzz.view.desk.Board', {
    extend: 'Ext.Container',
    xtype: 'board',

    requires: [
        'KiwiBuzz.view.desk.boardComponents.Avatar',
        'KiwiBuzz.view.desk.boardComponents.Field'
    ],

    startField: null,
    playersCount: 0,
    avatars: [],

    config: {
        cls: 'board',
        fieldsCount: 0
    },

    updateFieldsCount: function (fieldsCount) {
        var me = this,
            fieldsCoordinates = KiwiBuzz.model.GameSettings.getFieldsCoordinates();

        for (var i = 0; i < fieldsCount; i++) {

            var field = Ext.create('KiwiBuzz.view.desk.boardComponents.Field', {
                fieldNumber: i,
                left: fieldsCoordinates[i].left + '%',
                top: fieldsCoordinates[i].top + '%'
            });

            if (i == 0) {
                field.addCls('startField');
                field.setLabelText('START');
                this.startField = field;
            } else if (i == fieldsCount - 1) {
                field.addCls('finishField');
                field.setLabelText('FINISH');
            } else {
                field.setLabelText(i);
            }

            me.add(field);
        }
    },

    getAvatars: function () {
       return this.avatars;
    },

    setPlayers: function (playersCount, playersColors) {
        var me = this;

        for (var i = 0; i < playersCount; i++) {
            var avatar = Ext.create('KiwiBuzz.view.desk.boardComponents.Avatar', {
                avatarNumber: i,
                currentFieldNumber: -1
            });

            //avatar.addCls(playersColors[i]);
            me.add(avatar);
            this.avatars.push(avatar);
            avatar.el.setStyle( { backgroundColor: playersColors[i] });
        }

        this.playersCount = playersCount ;
    }
});