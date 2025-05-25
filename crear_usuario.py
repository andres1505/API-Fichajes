from pymongo import MongoClient
from passlib.context import CryptContext

# Configuración
client = MongoClient("mongodb+srv://juan:Andres1505@clusterumb.c5fy0.mongodb.net/")  # cambia si tu conexión es distinta
db = client["RedGol"]
users = db["Users"]

# Hasher
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Función para insertar usuario
def insertar_usuario(username, password, rol):
    hashed_password = pwd_context.hash(password)
    users.insert_one({
        "username": username,
        "hashed_password": hashed_password,
        "rol": rol
    })
    print(f"Usuario '{username}' insertado.")

# Ejecutar
insertar_usuario("admin", "123", "admin")
insertar_usuario("lector", "123", "lector")
