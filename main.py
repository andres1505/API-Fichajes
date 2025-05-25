from fastapi import FastAPI
from routes.fichajes_routes import router as fichajes_router
from routes.auth_routes import router as auth_router

app = FastAPI()



@app.get("/")
def read_root():
    return {"Hello": "Andres"}

#router de fichajes
app.include_router(fichajes_router, prefix="/fut", tags=["fichajes"])
app.include_router(auth_router, prefix="/fut", tags=["auth"])