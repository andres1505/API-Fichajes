from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()# Cargar variables de entorno desde el archivo .env

class Database:
    def __init__(self):
        mongo_url = os.getenv("MONGO_URL")
        db_name = os.getenv("MONGO_DB")
        self.client = MongoClient(mongo_url, tlsAllowInvalidCertificates=True)
        self.db = self.client[db_name]

    def get_collection(self, Fichajes):
        return self.db[Fichajes]
    
database = Database()