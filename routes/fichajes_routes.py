from fastapi import APIRouter, Depends
from auth.dependencies import obtener_usuario_actual
from models.fichajes_models import Fichaje
from services.fichajes_service import get_fichajes, get_fichajes_from_db, eliminar_fichajes

router = APIRouter()

@router.get("/prueba")
async def prueba():
    return {"message": "Hello, pruebaaa!"}

@router.get("/fichajes",response_model=list[Fichaje])
async def fichajes(usuario: dict = Depends(obtener_usuario_actual)):#se pide el token
    fichajes = get_fichajes()
    return fichajes

@router.get("/fichajes/db")
def obtener_fichajes_guardados():
    return get_fichajes_from_db()

@router.delete("/fichajes/eliminar")
def eliminar_datos(usuario: dict = Depends(obtener_usuario_actual)):#se pide el token
    return eliminar_fichajes()