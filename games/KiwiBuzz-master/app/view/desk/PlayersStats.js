/**
 * Created by adamschreier on 13/04/2017.
 */
Ext.define('KiwiBuzz.view.desk.PlayersStats', {
    extend: 'Ext.List',
    xtype: 'playersstats',

    requires: [
        'KiwiBuzz.store.PlayerStore'
    ],

    config:{
        itemTpl: '<div class="player"><div class="avatarColor" style="background-color: {color}"></div><strong>{name}</strong></div>',
        store: 'playerStore',
        fullscreen: true,
        cls: 'playersStats',
        mode : 'SINGLE'
    }
});



/*    '<div class="resourceLabel' +
 '<tpl if="imageId &gt; 0">" style="background-image: url({0}{imageId})">' +
 '<tpl else>' +
 ' noProfileImage">' +
 '</tpl>' +
 '</div>' +
 '<div class="displayName"> {displayName} </div>';*/