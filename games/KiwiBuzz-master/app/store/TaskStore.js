/**
 * Created by adamschreier on 03/05/2017.
 */
Ext.define('KiwiBuzz.store.TaskStore', {
    extend: 'Ext.data.Store',
    storeId:'taskStore',

    requires: [
        'KiwiBuzz.model.TaskModel'
    ],


    model: 'KiwiBuzz.model.TaskModel',

    autoLoad: true,
    proxy: {
        type:'rest',
        url:'http://localhost:1841/tasks/NZWHS',
        reader: {
            type:'json'
        }
    }

    /*
    Uncomment to use a specific model class
    model: 'User',
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