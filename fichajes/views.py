from django.shortcuts import render
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Create your views here.
load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB")

client = MongoClient(MONGO_URL)
db = client[MONGO_DB]

fichajes_collection = db['Fichajes']

def listar_fichajes(request):
   #buscar todos los fichajes de la colección Fichajes
    query = request.GET.get("q")#aca se obtiene un valor para filtrar los fichajes

    if query:
        fichajes = list(fichajes_collection.find({
            "nombre": {"$regex": query, "$options": "i"}#aca se filtran los fichajes por nombre o palabras clave
        }))
    else:
        fichajes = list(fichajes_collection.find())

    return render(request, 'pages/fichajes.html', {"fichajes": fichajes})

def inicio_view(request):
    return render(request, 'pages/inicio.html')

