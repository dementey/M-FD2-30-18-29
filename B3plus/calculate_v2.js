"use strict";

function calc(str){
    var i=0;

    var currentSymbol = () => str.charAt(i++);

    var additionAndASubtraction = function (){
        var t1 = multiplicationAndDivision();
        var t2;
        while ( (c == "+") || (c == "-")) {
            var h = c;
            c =currentSymbol();
            t2 = multiplicationAndDivision();
            if (h=="+") t1 = t1 + t2;
            else t1= t1 - t2;
        }
    return Number(t1); 
    }

    var multiplicationAndDivision = function (){
        var t1 = calcFragment();
        var t2;
        while (c == "*" || (c == "/")){
            var h = c;
            c = currentSymbol();
            t2 = calcFragment();
            if (h=="*") t1 = t1 * t2;
            else t1 = t1 / t2;
        }
    return Number(t1); 
    }

    var calcFragment = function (){
        if ((c >= "0") && (c <= "9")){
            var h = Number(c);
            c = currentSymbol();
            return Number(h); 
        }
        else{
            if (c == "("){
                c = currentSymbol();
                var t = additionAndASubtraction();
                if (c = ")")  {
                    c = currentSymbol ();
                    return Number(t);
                } 
            }
        } 
    }

   
    var c = currentSymbol();
    var result = additionAndASubtraction();
    return result;
 }

 alert('Результат вычисления равен '+calc(prompt("Введите строку","2*(1+3)")));
 alert('Результат вычисления равен '+calc(prompt("Введите строку","(1+3)*2")));
 alert('Результат вычисления равен '+calc(prompt("Введите строку","2+3*4")));
 alert('Результат вычисления равен '+calc(prompt("Введите строку","3*4+2")));

//B3+
//Написать функцию-калькулятор вручную введённого выражения (без использования функции eval и динамического описания функции new Function, 
//если вы знаете о них).
//Должны работать операции + - * / и скобки, числа должны приниматься целые, дробные (через точку), отрицательные
//Например, вызываем функцию, передавая ей строку "2*(3+1)", функция возвращает 8.
