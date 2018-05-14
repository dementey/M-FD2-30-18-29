/**
 * Created by adamschreier on 16/04/2017.
 */
Ext.define('KiwiBuzz.model.GlobalHelper', {
    extend: 'Ext.data.Model',
    singleton: true,


    sleep: function (miliseconds) {
        var currentTime = new Date().getTime();

        while (currentTime + miliseconds >= new Date().getTime()) {}
    }
});