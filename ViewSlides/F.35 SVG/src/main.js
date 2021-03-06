"use strict";


document.getElementsByTagName('input').addEventListener('click',createSVG,false);
 
function createSVG() {
    var SVGElem = document.getElementById("SSS");

    var circle = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
    circle.setAttribute("stroke", "green");
    circle.setAttribute("fill", "yellow");
    circle.setAttribute("rx", 50);
    circle.setAttribute("ry", 50);
    circle.setAttribute("cx", 100);
    circle.setAttribute("cy", 60);
    SVGElem.appendChild(circle);

    var smile = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    smile.setAttributeNS("http://www.w3.org/1999/xlink", "href", "Examples/smile1.gif");
    smile.setAttribute("width", "20");
    smile.setAttribute("height", "24");
    smile.setAttribute("x", 20);
    smile.setAttribute("y", 60);
    SVGElem.appendChild(smile);

    var txt = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    txt.setAttribute("x", 50);
    txt.setAttribute("y", 130);
    txt.style.fill = "red";
    txt.textContent = 'Всем привет!';
    SVGElem.appendChild(txt);
}
