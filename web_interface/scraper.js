'use strict';

class Behavior
{
    constructor()
    {   
        this.connect = new CreateConnection();

        this.sForm = document.getElementsByName('sForm')[0];
        this.url = document.getElementsByName('url')[0];
        this.pwd = document.getElementsByName('pwdCheck')[0];
    }

    async checkPWD(pwd)
    {
            /**
                es soll ein passwort eingeben werden und anschliessend ueberprueft werden.
                wenn es korrekt ist, soll zugelassen werden, dass das Programm die Website der gegebenen URL scraped.
            */
        const hashedPW = CryptoJS.SHA256(pwd.value).toString();
        return hashedPW === "f395c41bd385de8883ffbe089efa60d9fa809ef626135a9dd848bf5b10d5b793"; // gibt true oder false zurueck
        
    }

    async checkInput(url) //es muss fuer diese funktion der Wert uebergeben werden
    {
        let urlValue = this.url.value;

        if(urlValue == "" || (urlValue.includes("'") || urlValue.includes("\"")))
        {
            alert("URL invalid!");
            return; //der gesammte Ablauf des Programms wird unterbrochen
        }

        const pwdCorrect = await this.checkPWD(this.pwd); //wenn das Passwort korrekt ist, wird eine Verbindung aufgebaut
        if(pwdCorrect)
        {
            this.connect().send(urlValue);
        }
    }

}

class CreateConnection  //Diese Klasse stellt eine Verbindung zum python Web scraper her, dieser ist mit der Datenbank verbunden.
{
    constructor()
    {
        this.url = document.getElementsByName('url')[0];
        this.socket = new WebSocket("ws://localhost:49153");

        this.socket.onopen = () =>
        {
            console.log("connection established");
            this.socket.send(url.value);    //hier muss die anzugebende URL als parameter drin stehen.
        };

        this.socket.onerror = () =>
        {
            //alert("connection to server could not be astablished!");
            console.log("Server unreachable");
        };

        this.socket.onmessage = (event) =>
        {
            console.log("received data: ", event.data);   //hier muss als Antwort die gelieferten Daten stehen.
            alert("eine Nachricht ist eingegangen");
            //Die Daten sollen auf der Website und nicht in der Konsole stehen.
            document.getElementsByTagName('span')[0].innerHTML = event.data;
        };

        this.socket.onclose = () =>
        {
            //alert("Die Verbindung wurde getrennt");
            console.log("connection closed");
        };
    }
}