'use strict';

document.addEventListener('DOMContentLoaded', function init(e) {
    
    let sForm = document.getElementsByName('sForm')[0];
    
    const URL = document.getElementsByName('url')[0];
    const param = document.getElementsByName('param')[0];

    sForm.addEventListener('submit', (e) => //formular bekommt den Wert false, wenn die Eingabe nicht stimmt.
    {
        //e.preventDefault();

        const inputCheck = new Behavior();
        
        if(inputCheck.checkPWD() && inputCheck.checkURL())
        {
            if(inputCheck.checkParameters()) //wenn die parameter gesetzt und gueltig sind
            {
                const connect = new CreateConnection(URL, param);   //es wird die URL und parameter als argument uebergeben
            }

            else    //wenn die parameter nicht gesetzt oder ungueltig sind
            {
                const connect = new CreateConnection(URL); //es wird die URL als argument uebergeben
            }
        }

        else    //wenn die Bedingungen fuer das Formular nicht erfuellt sind.
        {
            const elements = document.getElementsByClassName('textfield');

            Array.from(elements).forEach((element) => { //alle Eingabefelder werden der Klasse error zugeordnet und rot gefaerbt.
                element.classList.add("error");
            });


            return false;   //das Formular wird nicht abgeschickt.
        }
    });

});