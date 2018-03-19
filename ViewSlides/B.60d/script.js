
    "use strict";

    function Car() {
        var self=this;

        self.num=null;
        self.color=null;
        
        self.setNum=function(_num) { self.num=_num; }
        self.setColor=function(_color) { self.color=_color; }
        self.beep=function() { console.log('Beeeep!'); }
        self.show=function() { console.log( 'num='+self.num+' color='+self.color ); }
    }

    var car1=new Car();
    car1.setNum('AAA111');
    car1.setColor('чёрный');
    car1.beep();
    car1.show();