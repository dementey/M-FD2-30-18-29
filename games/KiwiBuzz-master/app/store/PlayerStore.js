/**
 * Created by adamschreier on 15/04/2017.
 */
Ext.define('KiwiBuzz.store.PlayerStore', {
    extend: 'Ext.data.Store',
    storeId: 'playerStore',

    requires: [
        'KiwiBuzz.model.PlayerModel'
    ],

    model: 'KiwiBuzz.model.PlayerModel'


    /*
    Fields can also be declared without a model class:
    fields: [
        {name: 'firstName', type: 'string'},
        {name: 'lastName',  type: 'string'},
        {name: 'age',       type: 'int'},
        {name: 'eyeColor',  type: 'string'}
    ]
    */

    /*
    Uncomment to specify data inline
    data : [
        {firstName: 'Ed',    lastName: 'Spencer'},
        {firstName: 'Tommy', lastName: 'Maintz'},
        {firstName: 'Aaron', lastName: 'Conran'}
    ]
    */
});