
    "use strict";

    function insertText() {
        var blockElement=document.getElementById('Block');
        var newTextElement=document.createTextNode('новый текст');
        blockElement.appendChild(newTextElement);
    }

    function insertTag() {
        var blockElement=document.getElementById('Block');
        var newTagElement=document.createElement('p');
        var newTextElement=document.createTextNode('новый абзац');
        newTagElement.appendChild(newTextElement);
        blockElement.appendChild(newTagElement);
    }

    function removeFirst() {
        var blockElement=document.getElementById('Block');
        var deletingElement=blockElement.firstChild;
        blockElement.removeChild(deletingElement);
    }

    function removeLast() {
        var blockElement=document.getElementById('Block');
        var deletingElement=blockElement.lastChild;
        blockElement.removeChild(deletingElement);
    }

