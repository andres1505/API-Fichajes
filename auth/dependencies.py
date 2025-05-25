from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from auth.jwt_handler import verificar_token

aouth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def obtener_usuario_actual(token: str = Depends(aouth2_scheme)):
    payload = verificar_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    return payload