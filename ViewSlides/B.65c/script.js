
    "use strict";

    function Wrapper(prefix,postfix) {
        var self=this;

        self.prefix=prefix;
        self.postfix=postfix;

        self.wrap=function(texts) {
            var s="";
            texts.forEach( function(v){ s += self.prefix + v + self.postfix } )
            return s;
        }
        
    }

    var divWrapper=new Wrapper("{","}");
    console.log( divWrapper.wrap( ["hello","goodbye"] ) );

    let sym = Symbol("name");
    console.log(sym);