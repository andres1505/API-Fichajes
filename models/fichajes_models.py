from pydantic import BaseModel

class Fichaje(BaseModel):  
    nombre: str
    publicacion: str
    imagen: str
    link: str