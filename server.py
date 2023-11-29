import asyncio  #asyncio ist eine Bibliothek zum Ausfuehren asynchroner Aufgaben
from websockets.server import serve
from websockets.client import connect
#from http.server import BaseHTTPRequestHandler, HTTPServer

class Server():
    '''
    diese Klasse soll die Netzwerkfaehigkeit des Server Programmes bieten.
    Sie dient nur zum versenden und empfangen von Nachrichten.
    '''

    def __init__(self, address: str, port: int) -> any:    #address = "localhost", port = 49153
        self.address: str = address
        self.port: int = port

        async def sendMsg(websocket, msg):
            try:
                async for message in websocket:
                    await websocket.send(msg)

            except:
                print("Fehler beim Senden der Nachricht")

        async def receiveMsg():
            with connect(address + port) as receiver:
                message = receiver.recv()
                print(f"Received: {message}")

        '''
        start_server = websockets.serve(msgReceived, address, port)
        print("python server is running at {} on port {}".format(address, port))
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()
        '''

#messenger = Server("localhost", 49153)
#print(Connect("localhost", 49153))