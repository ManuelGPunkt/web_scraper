'use strict';

document.addEventListener('DOMContentLoaded', function init(e) {
    
    let sForm = document.getElementsByName('sForm')[0];

    sForm.addEventListener('submit', (e) => //formular bekommt den Wert false, wenn die Eingabe nicht stimmt.
    {
        e.preventDefault();

        const inputCheck = new Behavior();
        inputCheck.checkInput();
    });

});