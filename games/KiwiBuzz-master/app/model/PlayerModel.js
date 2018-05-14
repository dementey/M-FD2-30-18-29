/**
 * Created by adamschreier on 14/04/2017.
 */
Ext.define('KiwiBuzz.model.PlayerModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            /*The fields for this model. This is an Array of Ext.data.field.Field definition objects or simply the field name.
             If just a name is given, the field type defaults to auto.  For example:*/

            {name: 'name', type: 'string'},
            {name: 'number', type: 'int'},
            {name: 'currentFieldNumber', type: 'int', defaultValue: 0},
            {name: 'color', type: 'string'},
            {name: 'drinks', type: 'int'},
            {name: 'turns', type: 'int'},
            {name: 'active', type: 'boolean', defaultValue: false},
            {name: 'alive', type: 'boolean', defaultValue: true}
        ],
        validations: [
            {type: 'length',    field: 'number',     max: KiwiBuzz.model.GameSettings.getFieldsCount()-1}
        ]
    },

    rolled: function (rolledValue) {
        var currentField = this.get('currentFieldNumber');
        if(currentField + rolledValue > KiwiBuzz.model.GameSettings.getFieldsCount()){
            this.set('currentFieldNumber', KiwiBuzz.model.GameSettings.getFieldsCount()-1);
        } else{
            this.set('currentFieldNumber', currentField + rolledValue);
        }

    }
});