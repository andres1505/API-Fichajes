from fastapi import APIRouter, HTTPException, Form
from passlib.context import CryptContext
from db.database import database
from auth.jwt_handler import crear_token

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
usuarios_collection = database.get_collection("Users")

@router.post("/login")#aca se define el endpoint del login
def login(username: str = Form(...), password: str = Form(...)):
    user = usuarios_collection.find_one({"username": username})
    if not user or not pwd_context.verify(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token = crear_token({"sub": username, "rol": user["rol"]})
    return {"access_token": token}