'use strict';

document.addEventListener('DOMContentLoaded', init);

function init(e)
{
    let sForm = document.getElementsByName('sForm')[0];
    let url = document.getElementsByName('url')[0];
    let pwd = document.getElementsByName('pwdCheck')[0];

    sForm.addEventListener('submit', (e) => //formular bekommt den Wert false, wenn die Eingabe nicht stimmt.
    {
        Behavior().checkInput(url);
    });
}