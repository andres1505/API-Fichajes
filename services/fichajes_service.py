from models.fichajes_models import Fichaje
from bs4 import BeautifulSoup
import requests
from db.database import database

def get_fichajes():
    url = "https://www.fichajes.com/" #pagina de los fichajes

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36"}

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    fichajes_collection = database.get_collection("Fichajes") #Nombre de la colección en MongoDB
    fichajes = []

    for quote_block in soup.find_all("article", class_="articleInline articleInline--center"):
        try:
            nombre = quote_block.find("h3", class_="articleTitleMetas__title articleTitleMetas__title--3lines").text.strip()
            publicacion = quote_block.find("li", class_="articleTitleMetas__competitionDate").text.strip()
            imagen = quote_block.find("img")["data-src"]
            link = quote_block.find("a", class_="articleInline__imageLink")["href"] #se hace el escraping de la pagina

            fichaje = Fichaje(
                nombre=nombre,
                publicacion=publicacion,
                imagen=imagen,
                link=link
            ) #se crea el objeto Fichaje y se guardan usando el modelo de pydantic

            # Evita duplicados por 'link'
            if fichajes_collection.count_documents({"link": link}, limit=1) == 0:
                fichajes_collection.insert_one(fichaje.dict())# se guarda en la base de datos

            fichajes.append(fichaje)# #se agrega el objeto a la lista de fichajes
        except Exception as e:
            print(f"Error procesando un artículo: {e}")
            continue #Aca se maneja el error si no se encuentra el elemento, se continua con el siguiente

    return fichajes

#se obtiene los fichajes de la base de datos
def get_fichajes_from_db():
    fichajes_collection = database.get_collection("Fichajes")
    fichajes = list(fichajes_collection.find({}, {"_id": 0}))  # omitimos el _id 
    return fichajes

#Se eliminan todos los datos de la base de datos
def eliminar_fichajes():
    fichajes_collection = database.get_collection("Fichajes")
    resultado = fichajes_collection.delete_many({})
    return {"eliminados": resultado.deleted_count}




       

        
        
   

    

