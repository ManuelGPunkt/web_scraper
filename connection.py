import aiohttp
import asyncio


async def incomingMsg(server_url: str) -> bool:
    async with aiohttp.ClientSession() as session:
        response = await session.get(f"{server_url}/receive")
        return response.status == 200

async def sendMsg(msg: str) -> None:
    pass

async def recMsg(server_url: str) -> list:
    messages = []
    for _ in range(2):
        async with aiohttp.ClientSession() as session:
            response = await session.get(f"{server_url}/receive")
            messages.append(await response.text())
    return messages

async def emptyMsg(messages: list) -> None: #loescht alle Nachrichten aus der Liste, damit wieder neue empfangen werden koennen.
    i = 0
    while(len(messages) is not 0):
        del messages[i]