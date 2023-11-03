'use strict';

document.addEventListener('DOMContentLoaded', init());

function main()
{
    const sForm = document.getElementsByName('sForm')[0];
    const URL = document.getElementsByName('url')[0];
    const param = document.getElementsByName('param')[0];

    const inputCheck = new Behavior();
    const connect = new CreateConnection(URL, param);

    sForm.addEventListener('submit', (e) => //formular bekommt den Wert false, wenn die Eingabe nicht stimmt.
    {   //es gibt kein Formular, muss noch geandert werden.
        //e.preventDefault();
        
        if(inputCheck.checkPWD() && inputCheck.checkURL())
        {
            connect.connect();   //es wird die URL und parameter als argument uebergeben
        }

        else    //wenn die Bedingungen fuer das Formular nicht erfuellt sind.
        {
            Array.from(elements).forEach((element) => { //alle Eingabefelder werden der Klasse error zugeordnet und rot gefaerbt.
                element.classList.add("error");
            });

            return false;   //das Formular wird nicht abgeschickt.
        }
    });

};

function init(e)
{
    main();
}