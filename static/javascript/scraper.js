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

    checkPWD()
    {
        /**
         *es soll ein passwort eingeben werden und anschliessend ueberprueft werden.
         *wenn es korrekt ist, soll zugelassen werden, dass das Programm die Website der gegebenen URL scraped.
         */

        let PWD = this.pwd.value

        const hashedPW = CryptoJS.SHA256(PWD).toString();
        return hashedPW == "14a27a69e10e646c6407a17df5c62a5a356fb9b3387e5ced1f07ca381b75dee2"; // gibt true oder false zurueck. Das Passwort ist: 8h+H)=(+n-Y%DG78
    }

    checkURL() //es wird die gueltigkeit der URL ueberprueft
    {
        /**
         * Es wird ueberprueft ob der String ungueltige Zeichen enthaelt, wenn der Fall ist, wird false zurueckgegeben,
         * dadurch wird der komplette Programmablauf angehalten.
         * Wenn die Eingabe gueltig ist, true.
         */
        const URL = this.url.value;

        if(URL == "" || (URL.includes("'") || URL.includes("\"")))
        {
            window.alert("URL invalid!");
            return false; //der gesammte Ablauf des Programms wird unterbrochen
        }
        
        return true;
    }

    checkParameters() //wenn die Parameter gueltig sind, werden sie als einziger string an den web scraper geschickt und dort zerteilt.
    {
        /**
         * Es wird ueberprueft ob ungueltige Zeichen vorhanden sind, wenn ja wird false zurueckgeliefert.
         * Wenn die Parameter gueltig sind, liefert die Methode die Eingabe als einen einzigen String zurueck.
         */

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

class CreateConnection
{
    /**
     * 
     * @param {*} param
     * 
     * Diese Klasse stellt eine Verbindung zum python Web scraper her, dieser ist mit der Datenbank verbunden.
     */
    constructor()
    {
        this.url = document.getElementsByName('url')[0];
        this.tags = document.getElementsByName('param')[0];
        this.serverAddr = '/db'; //adresse, weil es innerhalb von einem docker container laeuft.
    }


    sendMessage(msg1, msg2)
    {
        /**
         * Es wird in einem try-catch block versucht, zwei Nachrichten zu schicken.
         * Die erste Nachricht msg1 soll die URL der zu-scrapenden Nachricht enthalten.
         * Die zweite Nachricht msg2 soll die, durch leerzeichen getrennten, Elementnamen enthalten ausgegeben werden sollen.
         * Falls die uebertragung fehlschlaegt, soll die Verbindung abgebrochen werden.
         */

       const req = {"url":msg1, "parameter":msg2}; //erstellen von der JSON client request.
        
       fetch(
        this.serverAddr,
        {
            method:"POST",
            headers:
            {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(req)
        })
        .then(response => response.text()
        )
        .then(data => {
            this.formatMSG(data);
            console.log(data);
        })
        .catch(error => console.error(error)
        )
    };

    formatMSG(serverMSG)
    {
        /**
         * hier soll die Nachricht vom Server (XML), mit Tags als "legend" in HTML dargestellt werden.
         * die formatierte Nachricht soll als return wert zurueckgeliefert werden.
         * Die Nachricht soll so auf der Website dargestellt werden.
         */
        document.getElementsByTagName('span')[0].innerHTML = serverMSG
    }

}