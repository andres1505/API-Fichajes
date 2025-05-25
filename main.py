from fastapi import FastAPI
from routes.fichajes_routes import router as fichajes_router

app = FastAPI()



@app.get("/")
def read_root():
    return {"Hello": "Sapa"}

#router de fichajes
app.include_router(fichajes_router, prefix="/fut", tags=["fichajes"])