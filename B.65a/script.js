"use strict";

function Wrapper(prefix,postfix) {

    this.prefix=prefix;
    this.postfix=postfix;

    this.wrap=function(texts) {
        var s="";
        for ( var i=0; i<texts.length; i++ )
            s += this.prefix + texts[i] + this.postfix;
        return s;
    }
    
}

var divWrapper=new Wrapper("{","}");
console.log(divWrapper);
console.log( divWrapper.wrap( ["hello","goodbye"] ) );