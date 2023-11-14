'use strict';

document.addEventListener('DOMContentLoaded', init());

function main()
{
    const sButton = document.getElementsByName('sButton')[0];
    const URL = document.getElementsByName('url')[0].value;
    const param = document.getElementsByName('param')[0].value;

    const inputCheck = new Behavior();
    const connect = new CreateConnection();


    sButton.addEventListener('click', function everything(e)
    {
        /**
         * Hier steht die komplette Programmlogik zum Ablauf.
         */
        
        if(inputCheck.checkPWD() && inputCheck.checkURL())
        {
            connect.sendMessage(URL, param);   //es werden die URL und parameter als argument uebergeben
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