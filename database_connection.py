
class DBconnect:
    '''
    dieses Modul soll die Schnittstelle zu einer relationalen Datenbank sein
    '''
    
    def __init__(self, url : str, *parameters : str) -> None:
        self.url = url  #query soll die URL der Website sein
        self.parameters = parameters  #queryResult sollen die Daten von der SQL-Abfrage sein

    def checkEntry(url) -> bool: #es soll ueberprueft werden, ob es fuer die URL bereits einen Eintrag gibt
        pass

    def buildQuery(url : str, parameters : str):
        pass

    def returnQueryResult() -> None:    #es sollen die Daten in JSON formatiert an den Client zurueck geschickt werden
        pass