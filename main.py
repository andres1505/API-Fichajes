from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

from routes.fichajes_routes import router as fichajes_router
from routes.auth_routes import router as auth_router

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "Andres"}


# routers de fichajes y autenticación
app.include_router(fichajes_router, prefix="/fut", tags=["fichajes"])
app.include_router(auth_router, prefix="/fut", tags=["auth"])


# Personalizar Swagger para que solo pida el token JWT
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="RedGol",
        version="1.0.0",
        description="Documentación de la API con autenticación JWT",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    # Agregar el esquema de seguridad a todos los endpoints
    for path in openapi_schema["paths"].values():
        for operation in path.values():
            operation["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
