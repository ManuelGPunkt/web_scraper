import sqlite3

class DBconnect:
    '''
    dieses Modul soll die Schnittstelle zu einer relationalen Datenbank sein
    '''
    
    def __init__(self, name : str, url : str, params : str) -> None:
        self.db = sqlite3.Connection(name) #eine Datenbank Verbindung wird aufgebaut
        self.url = url  #query soll die URL der Website sein
        self.parameters = params  #queryResult sollen die Daten von der SQL-Abfrage sein

    def __DB_exists(self): #prueft ob die Datenbank bereits existiert, ansonsten wird eine erstellt.
        if self.name:
            pass
    
    def checkEntry(self, url) -> bool: #es soll ueberprueft werden, ob es fuer die URL bereits einen Eintrag gibt
        pass

    def buildQuery(self, url, args**):
        tags = ""
        for i in args:
            tags += args
        query = f'''
            SELECT {tags}
            FROM table'''

        return self.db.execute(query).fetchall()

    def returnQueryResult(self) -> None: #es sollen die Daten in JSON formatiert an den Client zurueck geschickt werden
        pass