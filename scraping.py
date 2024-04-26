from bs4 import BeautifulSoup
import requests
import xml.etree.ElementTree as Et

class Scraper:
    def __init__(self, url:str, params:str) -> None:
        self.url:str = url
        self.params = params
        self.tags_filtered = [] #hier werden die Tags ohne wiederholung gespeichert.
        self.contentString = "" #hier wird der komplette Inhalt in einem String zwischengespeichert.

        response = requests.get(url)
        html = BeautifulSoup(response.text, 'html.parser')

    #private Methode
    def __stripTags(self) -> None:
        used = set() #damit tags nicht mehrfach gescraped werden
        tags_unfiltert = self.params.split()
        
        #hier werden doppelte tags entfernt
        for i in tags_unfiltert:
            if i not in used:
                used.add(i)
                self.tags_filtered.append(i)

    
    def selectTags(self) -> str: 
        """
        diese Methode gibt einen String zurueck,
        damit dieser in der Datenbank gespeichert werden kann.
        """
        
        self.__stripTags()
    
        for tags in self.tags_filtered:
            placeHolder = html.find_all(f"{tags}", class_='')
            for w in placeHolder:
                self.contentString += str(w) + "\n"

        return self.contentString

    
    def format_to_XML(self) -> str:
        """
        Diese Methode erstellt eine XML Format aus den Daten,
        damit diese an der Client zurueck geschickt werden koennen.
        """

        self.selectTags()
        
        return self.contentString
        

#-----------------------------------------------------------------------------------------------------

# url setzen
url = "https://quotes.toscrape.com/"
#url = "file:///home/mark/Desktop/testit"

# GET-request ausfuehren
response = requests.get(url)

#print(response.text)

#html dokument parsen
html = BeautifulSoup(response.text, "html.parser")

#print(type(html.text)) #fuer die Datenbank html.text verwenden, datentyp String

#classes von tag filtern
tag = html.find_all('a', class_="tag")

#print(type(str(tag)))

testit = Scraper(url, "a a p br span _")
print(testit.format_to_XML())
