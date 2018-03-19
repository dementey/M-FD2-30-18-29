"use strict";cd

var animals=[ 'собака', 'кошка', 'тушкан', 'собака', 'собака', 'тушкан' ];

var count={}; // ключ - животное, значение - сколько раз оно встретилось
for ( var i=0; i<animals.length; i++ ) {
    var animal=animals[i];
    if ( !(animal in count) )
        count[animal]=0;
    count[animal]++;
}

console.log( count );