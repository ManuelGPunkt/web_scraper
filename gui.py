from tkinter import *

class JInputWindow():   
    
    '''
    diese klasse ist zum Erzeugen des input fensters und soll die parameter
    url und parameter
    an die web scraper funktionen weitergeben.
    '''

    def __init__(self, posX:int, posY:int, title:str) -> None:
        self.posX = posX
        self.posY = posY
        self.title = title

        window = Tk()

        window.geometry(
            f"{posX}x{posY}"
            )
        
        progName = Label(window, font=('Kristen ITC', 15, 'bold'), text=title, fg="blue")
        progName.grid(row=1, column=3, padx=posX, pady=posY)

        url_text = Label(window, font=('Kristen ITC', 15, 'bold'), text="URL:")
        url_text.place(relx=.03, rely=.3)

        window.mainloop()

ex = JInputWindow(1500, 800, "Web Scraper")