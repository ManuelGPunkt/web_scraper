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
        /**
         *es soll ein passwort eingeben werden und anschliessend ueberprueft werden.
         *wenn es korrekt ist, soll zugelassen werden, dass das Programm die Website der gegebenen URL scraped.
         */

        let PWD = this.pwd.value
        
        const hashedPW = CryptoJS.SHA256(PWD).toString();
        return hashedPW === "f395c41bd385de8883ffbe089efa60d9fa809ef626135a9dd848bf5b10d5b793"; // gibt true oder false zurueck. Das Passwort ist: 8h+H)=(+n-Y%DG78
    }

    async checkURL() //es wird die gueltigkeit der URL ueberprueft
    {
        /**
         * Es wird ueberprueft ob der String ungueltige Zeichen enthaelt, wenn der Fall ist, wird false zurueckgegeben,
         * dadurch wird der komplette Programmablauf angehalten.
         * Wenn die Eingabe gueltig ist, true.
         */
        const URL = this.url.value;

        if(URL == "" || (URL.includes("'") || URL.includes("\"")))
        {
            alert("URL invalid!");
            return false; //der gesammte Ablauf des Programms wird unterbrochen
        }
        
        return true;
    }

    async checkParameters() //wenn die Parameter gueltig sind, werden sie als einziger string an den web scraper geschickt und dort zerteilt.
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
     * @param {*} msg1 
     * @param {*} msg2 
     * 
     * Diese Klasse stellt eine Verbindung zum python Web scraper her, dieser ist mit der Datenbank verbunden.
     */
    constructor()
    {
        this.url = document.getElementsByName('url')[0];
        this.socket = new WebSocket("ws://localhost:49153");

        //Methoden an Ereignisse binden
        this.socket.onmessage = this.handleMessage.bind(this);
    }

    closeConnection()
    {
        /**
         *Diese Funktion dient lediglich um die Verbindung zu schliessen.
         */

        this.socket.close();
        console.log("connection closed");
        
        return true;    //return true damit nachdem die Verbindung geschlossen wurde, dass Programm komplett beendet wird.
    }

    sendMessage(msg1, msg2)
    {
        /**
         * Es wird in einem try-catch block versucht, zwei Nachrichten zu schicken.
         * Die erste Nachricht msg1 soll die URL der zu-scrapenden Nachricht enthalten.
         * Die zweite Nachricht msg2 soll die, durch leerzeichen getrennten, Elementnamen enthalten ausgegeben werden sollen.
         * Falls die uebertragung fehlschlaegt, soll die Verbindung abgebrochen werden.
         */

        try
        {
            this.socket.send(msg1); //in msg1 soll die URL stehen
            this.socket.send(msg2); //in msg2 sollen der Parameter string stehen. Wenn dieser leer ist, wird er vom scraper ignoriert (nicht verarbeitet)
        }
        
        catch(error)
        {
            console.log(error);
            this.closeConnection();
        }
    };

    formatMSG(serverMSG)
    {
        /**
         * hier soll die Nachricht vom Server (JSON), mit Tags als "legend" in HTML dargestellt werden.
         * die formatierte Nachricht soll als return wert zurueckgeliefert werden.
         * */
    }

    handleMessage(event)
    {
        /**
         * Wenn eine Nachricht eintrifft, soll diese in einer Variable gespeichert werden,
         * an eine Funktion zum Formatieren geschickt werden und das Ergebnis als return Wert zurueckgeliefert werden.
         */
        
        console.log("incomming message"+event.data);

        let plainMSG = event.data;

        //return formatMSG(plainMSG);
        //es muss noch eine methode zur Formatierung der Nachricht implementiert werden
    }
}