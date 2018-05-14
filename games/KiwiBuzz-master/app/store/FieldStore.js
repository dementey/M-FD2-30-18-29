/**
 * Created by adamschreier on 17/04/2017.
 */
Ext.define('KiwiBuzz.store.FieldStore', {
    extend: 'Ext.data.Store',
    storeId:'fieldStore',

    requires: [
        'KiwiBuzz.model.FieldModel'
    ],


    model: 'KiwiBuzz.model.FieldModel'

    /*
    Uncomment to use a specific model class

    */

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