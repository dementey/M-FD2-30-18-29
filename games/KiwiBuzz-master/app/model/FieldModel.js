/**
 * Created by adamschreier on 17/04/2017.
 */
Ext.define('KiwiBuzz.model.FieldModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'name',     type: 'string' },
        { name: 'number',      type: 'int' },
        { name: 'task',    type: 'string' },
        { name: 'avatars',   type: 'auto' },
        { name: 'startField', type: 'boolean' },
        { name: 'finishField', type: 'boolean' },
        { name: 'alive',    type: 'boolean', defaultValue: true }
    ]

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