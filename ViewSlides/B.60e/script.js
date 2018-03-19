function Car() {
    var self=this;

    self.num=null;
    self.color=null;
    
    self.setNum=function(_num) { self.num=_num; return self; }
    self.setColor=function(_color) { self.color=_color; return self; }
    self.beep=function() { console.log('Beeeep!'); return self; }
    self.show=function() { console.log( 'num='+self.num+' color='+self.color ); return self; }
}

var сar1=new Car();
сar1.setNum('AAA111').setColor('чёрный').beep().show();