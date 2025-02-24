#!/usr/bin/env python3

from flask import Flask, request, jsonify, render_template
from lxml import etree
from scraping import Scraper

def validate_client_data(xml : str, xsd : str) -> bool:
    """
    Diese Methode soll die empfange Nachricht (XML Datei) gegen die vorhandene DTD validieren.
    """

    xsdscema_source = etree.parse(xsd)
    xsdscema = etree.XMLSchema(xsdscema_source)

    xml_source = etree.parse(xml)

    return xsdscema.validate(xml_source)



app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def get_data():
    '''
    rendert das Template (die Website) und gibt sie zurueck.
    '''

    return render_template('scraper.html')

@app.route('/db', methods=['POST'])
def return_value():
    '''
    soll die Anfrage verarbeiten und eine fertiggestellte Antwort zurueckliefern.
    '''

    print(f"fetch request incoming: {request.json}")
    req = request.json
    scrape = Scraper(req["url"], req["parameter"])
    return jsonify(scrape.selectTags())

#Server starten
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=49154, debug=True)