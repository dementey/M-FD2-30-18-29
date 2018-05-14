/**
 * Created by adamschreier on 03/05/2017.
 */
Ext.define('KiwiBuzz.model.TaskModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name',     type: 'string' },
            { name: 'taskId',      type: 'int' },
            { name: 'text',    type: 'string' },
            { name: 'type',   type: 'string' },
            { name: 'alive',    type: 'boolean', defaultValue: true }
        ]
    }

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    /*
    Uncomment to add a rest proxy that syncs data with the back end.
    proxy: {
        type: 'rest',
        url : '/users'
    }
    */
});