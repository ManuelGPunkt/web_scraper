'use strict';

class Behavior
{
    constructor()
    {   
        this.sForm = document.getElementsByName('sForm')[0];
        this.url = document.getElementsByName('url')[0];
        this.pwd = document.getElementsByName('pwdCheck')[0];
        this.param = document.getElementsByName('param')[0];
    }

    async checkPWD()
    {
        let PWD = this.pwd.value;
            /**
                es soll ein passwort eingeben werden und anschliessend ueberprueft werden.
                wenn es korrekt ist, soll zugelassen werden, dass das Programm die Website der gegebenen URL scraped.
            */
        const hashedPW = CryptoJS.SHA256(pwd.value).toString();
        return hashedPW === "f395c41bd385de8883ffbe089efa60d9fa809ef626135a9dd848bf5b10d5b793"; // gibt true oder false zurueck. Das Passwort ist: 8h+H)=(+n-Y%DG78
    }

    async checkURL() //es wird die gueltigkeit der URL ueberprueft
    {
        const URL = this.url.value;

        if(URL == "" || (URL.includes("'") || URL.includes("\"")))
        {
            alert("URL invalid!");
            return false; //der gesammte Ablauf des Programms wird unterbrochen
        }
    }

    async checkParameters() //wenn die Parameter gueltig sind, werden sie als einziger string an den web scraper geschickt und dort zerteilt.
    {
        const PARAM = this.param.value;

        if((PARAM.includes("'") || PARAM.includes("\""))) //ueberpruefen ob der String ungueltige Zeichen enthaelt, ', " (SQL Injection) oder leer ist.
        {
            return false;
        }

        else
        {
            return PARAM; //die einzelnen Parameter sollen dann vom Web Scraper selbst verarbeitet werden
        }
    }
}

class CreateConnection  //Diese Klasse stellt eine Verbindung zum python Web scraper her, dieser ist mit der Datenbank verbunden.
{
    constructor(msg1, msg2)
    {
        this.url = document.getElementsByName('url')[0];
        this.socket = new WebSocket("ws://localhost:49153");
        this.msg1 = msg1;
        this.msg2 = msg2;

        //Methoden an Ereignisse binden
        this.socket.onmessage = this.handleMessage.bind(this);
    }

    closeConnection()
    {
        console.log("connection closed");
    }

    connect()
    {
        try
        {
            this.socket.send(msg1); //in msg1 soll die URL stehen
            this.socket.send(msg2); //in msg2 sollen der Parameter string stehen. Wenn dieser leer ist, wird er vom scraper ignoriert (nicht verarbeitet)
        }
        
        catch(error)
        {
            console.log("Server unreachable");
            this.closeConnection();
        }
    };

    handleMessage(event)
    {
        console.log("incomming message");

        //es muss noch eine methode zur Formatierung der Nachricht implementiert werden
    }
}