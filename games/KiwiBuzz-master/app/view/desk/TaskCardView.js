/**
 * Created by adamschreier on 11/05/2017.
 */
Ext.define('KiwiBuzz.view.desk.TaskCardView', {
    extend: 'Ext.Container',
    xtype: 'taskcard',

    config: {
        cls: 'taskCard',

        layout: {
            type: 'hbox',
            align: 'center',
            pack: 'center'
        },

        items: [
            {
                xtype: 'button',
                id: 'taskDoneButton',
                cls: 'taskDoneButton',
                text: 'Done'
            },
            {
                xtype: 'label',
                cls: 'taskLabel',
            },
            {
                xtype: 'button',
                id: 'taskRejectedButton',
                cls: 'taskRejectedButton',

                text: 'Reject'
            }
        ]
    },

    initialize: function(){
        this.callParent();
        var me = this;

        this.getTaskDoneButton().on('tap', me.taskCompleted, me);
        this.getTaskRejectedButton().on('tap', me.taskRejected, me);
    },
    getTaskDoneButton: function () {
        if(this.taskDoneButton) return this.taskDoneButton;

        return this.taskDoneButton = this.down('#taskDoneButton');
    },
    getTaskRejectedButton: function () {
        if(this.taskRejectedButton) return this.taskRejectedButton;

        return this.taskRejectedButton = this.down('#taskRejectedButton');
    },

    taskCompleted: function () {
        this.fireEvent('taskDone');
    },
    taskRejected: function () {
        this.fireEvent('taskDone');
    },

    setText: function (text) {
        this.getLabel().setHtml(text);
    },

    getLabel: function () {
        if(this.label) return this.label;

        var label = this.down('label');
        this.label = label;
        return this.label;
    }

});