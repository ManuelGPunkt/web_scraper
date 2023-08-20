from bs4 import BeautifulSoup
import csv
import requests

class Scraper:
    def __init__(self, url:str) -> None:
        self.url:str = url

        response = requests.get(url)
        html = BeautifulSoup(response.text, 'html.parser')

    def scrapeTags() -> None:
        pass

#-----------------------------------------------------------------------------------------------------

# url setzen
url = "https://quotes.toscrape.com/"

# GET-request ausfuehren
response = requests.get(url)

#html dokument parsen
html = BeautifulSoup(response.text, 'html.parser')

#classes von tag filtern
tag = html.find_all('div', class_="tag")

#in einer liste sammeln
tags = list()
for tags_ in tag:
    tags.append(tags_.text)

#Einträge ausgeben
for i in tags:
    print(i)

with open('./zitate.csv', 'w', newline='') as csv_file:
    csv_writer = csv.writer(csv_file, dialect='excel')
    csv_writer.writerows([[tag] for tag in tags])