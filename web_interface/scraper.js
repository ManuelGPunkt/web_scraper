'use strict';

class Behavior
{
    constructor()
    {   
        this.connect = new CreateConnection();
        document.addEventListener('DOMContentLoaded', init)
    }

    init(e)
    {
        /**
        let sForm = document.getElementsByName('sForm')[0];
        let url = document.getElementsByName('url')[0];
        let pwd = document.getElementsByName('pwdCheck')[0];
        */

        checkPWD(pwd)
        {
            /**
                es soll ein passwort eingeben werden und anschliessend ueberprueft werden.
                wenn es korrekt ist, soll zugelassen werden, dass das Programm die Website der gegebenen URL scraped.
            */
           if(sha256(pwd.value) == "f395c41bd385de8883ffbe089efa60d9fa809ef626135a9dd848bf5b10d5b793")
           {
            this.connect(url.value);
            return true; //wenn das Passwort stimmt, wird die Nachricht an den Server geschickt, ansonsten nicht.
           }
           false;
        }

        checkInput(url) //es muss fuer diese funktion der Wert uebergeben werden
        {
            if(url != "" && !(url.includes("'") || url.includes("\"")) && checkPWD(pwd))
            {
                checkPWD(pwd)
            }
        }

    }
}

class CreateConnection  //Diese Klasse stellt eine Verbindung zum python Web scraper her, dieser ist mit der Datenbank verbunden.
{
    constructor(url)
    {
        this.url = url
        this.socket = new WebSocket("ws://localhost:49153");

        this.socket.onopen = () =>
        {
            this.socket.send(url)    //hier muss die anzugebende URL als parameter drin stehen.
        };

        this.socket.addEventListener('error', (e) =>
            console.log("Server unreachable")
        );

        this.socket.onmessage = (event) =>
        {
            console.log("received data: ", event.data)   //hier muss als Antwort die gelieferten Daten stehen.
            //Die Daten sollen auf der Website und nicht in der Konsole stehen.
            document.getElementsByTagName('span')[0].innerHTML = event.data;
        };

        this.socket.onclose = () =>
        {
            console.log("connection closed");
        };
    }
}