#!/usr/bin/env python3

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.json
    #Daten verarbeiten
    response_data = {'message': 'received data', 'received_data': data}
    print(jsonify(response_data))

    #der return wert ist die Antwort des Servers
    return jsonify(response_data)

#Server starten
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=49153, debug=True)