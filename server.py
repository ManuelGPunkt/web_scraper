import asyncio  #asyncio ist eine Bibliothek zum Ausfuehren asynchroner Aufgaben
import websockets
from database_connection import DBconnect
#from http.server import BaseHTTPRequestHandler, HTTPServer

class Activate(DBconnect):
    '''
    diese Klasse soll die Netzwerkfaehigkeit des Server Programmes bieten
    '''

    def __init__(self, address: str, port: int) -> any:    #address = "localhost", port = 49153
        self.address: str = address
        self.port: int = port
        self.websocket = websockets.websocket
        self.path = websockets.__path__
        #self.mkQuery = DBconnect()

        async def server(websocket, path) -> any:
            try:
                async for message in websocket:
                    print(f"incomming message: {message}")
                    #self.mkQuery(message) hier soll die URL und die Parameter an den Datenbank Klasse gesendet werden

            except websockets.exceptions.ConnectionClosedError:
                print("Verbindung wurde geschlossen!")

        start_server = websockets.serve(server, address, port)
        print("python server is running at {} on port {}".format(address, port))
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()

#print(Connect("localhost", 49153))