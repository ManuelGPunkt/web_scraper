#!/usr/bin/env python3

from flask import Flask, request, jsonify
from lxml import etree

def validate_client_data(xml : str, xsd : str) -> bool:
    """
    Diese Methode soll die empfange Nachricht (XML Datei) gegen die vorhandene DTD validieren.
    """

    xsdscema_source = etree.parse(xsd)
    xsdscema = etree.XMLSchema(xsdscema_source)

    xml_source = etree.parse(xml)

    return xsdscema.validate(xml_source)



app = Flask(__name__)

@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.json() #darf nicht in json format sein, muss geandert werden.

    #empfangene Daten validieren
    if not validate_client_data(data, 'clientData.xsd'):
        return False

    #Daten verarbeiten
    response_data = {'message': 'received data', 'received_data': data}
    print(jsonify(response_data))

    #der return wert ist die Antwort des Servers
    return jsonify(response_data)

#Server starten
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=49154, debug=True)