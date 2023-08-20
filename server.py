import asyncio  #asyncio ist eine Bibliothek zum Ausfuehren asynchroner Aufgaben
import websockets
#from http.server import BaseHTTPRequestHandler, HTTPServer

class Connect:
    '''
    diese Klasse soll die Netzwerkfaehigkeit des Server Programmes bieten
    '''

    def __init__(self, address: str, port: int) -> any:    #address = "localhost", port = 49153
        self.address: str = address
        self.port: int = port
        self.websocket = websockets.websocket
        self.path = websockets.__path__

        async def _server(websocket, path) -> any:
            while True:
                message = await websocket.recv()    #hier sollte die sql anfrage empfangen werden
                print (f"received request: {message}")
                await websocket.send("server received: " + message)
                return message

        server_start = websockets.serve(_server, address, port)

        return _server(websockets.websocket, websockets.path)

        # print("python server is running at {} on port {}".format(address, port))
        # asyncio.get_event_loop().run_until_complete(server_start)
        # asyncio.get_event_loop().run_forever()

print(Connect("localhost", 49153))