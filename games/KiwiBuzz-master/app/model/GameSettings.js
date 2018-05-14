/**
 * Created by adamschreier on 17/04/2017.
 */
Ext.define('KiwiBuzz.model.GameSettings', {
    singleton: true,

    /*fieldsCoordinates: [{left: 0, top: 0},{left: 30, top: 0},{left: 60, top: 0},{left: 10, top: 10},{left: 20, top: 20},{left: 30, top: 30},
        {left: 30, top: 50},{left: 50, top: 50},{left: 60, top: 50},{left: 30, top: 70},{left: 50, top: 80}],*/

    fieldsCoordinates: [{"left":0,"top":0,"type":"original","functionId":0},
        {"left":30,"top":0,"type":"original","functionId":1},
        {"left":40,"top":0,"type":"original","functionId":2},
        {"left":50,"top":0,"type":"original","functionId":3},
        {"left":60,"top":0,"type":"original","functionId":4},
        {"left":70,"top":0,"type":"original","functionId":5},
        {"left":80,"top":0,"type":"original","functionId":6},
        {"left":90,"top":0,"type":"original","functionId":7},
        {"left":0,"top":20,"type":"original","functionId":8},
        {"left":10,"top":20,"type":"original","functionId":9},
        {"left":20,"top":20,"type":"original","functionId":10},
        {"left":30,"top":20,"type":"original","functionId":11},
        {"left":40,"top":20,"type":"original","functionId":12},
        {"left":50,"top":20,"type":"original","functionId":13},
        {"left":60,"top":20,"type":"original","functionId":14},
        {"left":70,"top":20,"type":"original","functionId":15},
        {"left":80,"top":20,"type":"original","functionId":16},
        {"left":90,"top":20,"type":"original","functionId":17},
        {"left":0,"top":40,"type":"original","functionId":19},
        {"left":10,"top":40,"type":"original","functionId":20},
        {"left":20,"top":40,"type":"original","functionId":21},
        {"left":30,"top":40,"type":"original","functionId":22},
        {"left":40,"top":40,"type":"original","functionId":23},
        {"left":50,"top":40,"type":"original","functionId":24},
        {"left":60,"top":40,"type":"original","functionId":25},
        {"left":70,"top":40,"type":"original","functionId":26},
        {"left":80,"top":40,"type":"original","functionId":27},
        {"left":90,"top":40,"type":"original","functionId":28},
        {"left":0,"top":60,"type":"original","functionId":30},
        {"left":10,"top":60,"type":"original","functionId":31},
        {"left":20,"top":60,"type":"original","functionId":32},
        {"left":30,"top":60,"type":"original","functionId":33},
        {"left":40,"top":60,"type":"original","functionId":34},
        {"left":50,"top":60,"type":"original","functionId":35},
        {"left":60,"top":60,"type":"original","functionId":36},
        {"left":70,"top":60,"type":"original","functionId":37},
        {"left":80,"top":60,"type":"original","functionId":38},
        {"left":90,"top":60,"type":"original","functionId":39},
        {"left":0,"top":80,"type":"original","functionId":41},
        {"left":10,"top":80,"type":"original","functionId":42},
        {"left":20,"top":80,"type":"original","functionId":43},
        {"left":30,"top":80,"type":"original","functionId":44},
        {"left":40,"top":80,"type":"original","functionId":45},
        {"left":50,"top":80,"type":"original","functionId":46},
        {"left":60,"top":80,"type":"original","functionId":47},
        {"left":70,"top":80,"type":"original","functionId":48}],
    getFieldsCount: function () {
        return this.fieldsCoordinates.length;
    },
    getFieldsCoordinates: function () {
        return this.fieldsCoordinates;
    },

    createFieldsCoordinates: function (marginTop, marginLeft) {
        var field,
            id = 0,
            currentFieldMarginTop = marginTop,
            currentFieldMarginLeft = marginLeft;

        this.fieldsCoordinates = [];

        for(var i = 0; currentFieldMarginTop < 100 - marginTop; i++){
            for(var j = 0; currentFieldMarginLeft < 100 - marginLeft; j++){
                if(id = 0){
                    field = {"left":1,"top":1,"type":"original","functionId":id};
                }
                field = {"left":currentFieldMarginLeft,"top":currentFieldMarginTop,"type":"original","functionId":id};
                this.fieldsCoordinates.push(field);
                id++;
                currentFieldMarginLeft += marginLeft;
            }
            currentFieldMarginTop += marginTop;
            currentFieldMarginLeft = marginLeft;
        }


        //defining start and finish
        this.fieldsCoordinates[0].top = 1;
        this.fieldsCoordinates[0].left = 5;
        this.fieldsCoordinates[this.fieldsCoordinates.length-1].top = 90;
        this.fieldsCoordinates[this.fieldsCoordinates.length-1].left = 70;

        console.log(this.getFieldsCount() + ' fields created');
    }



});