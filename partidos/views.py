from django.shortcuts import render
import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY   = os.getenv("SPORTMONKS_API_KEY")
BASE_URL  = os.getenv("SPORTMONKS_BASE_URL")

# Función auxiliar: toma el marcador “CURRENT” y lo deja listo en el fixture
def _agregar_marcador_actual(fixture):
    home_score = away_score = None

    for score in fixture.get("scores", []):
        if score.get("description") == "CURRENT":
            participant = score["score"]["participant"]
            goals       = score["score"]["goals"]
            if participant == "home":
                home_score = goals
            elif participant == "away":
                away_score = goals

    fixture["home_score"] = home_score
    fixture["away_score"] = away_score
    return fixture


# Obtener fixtures con marcador
def obtener_fixtures():
    url = f"{BASE_URL}/fixtures?api_token={API_KEY}&include=scores&per_page=10"
    try:
        resp = requests.get(url)
        print("FIXTURES STATUS:", resp.status_code)
        if resp.status_code == 200:
            data = resp.json().get("data", [])
            return [_agregar_marcador_actual(f) for f in data]
    except requests.RequestException as e:
        print("ERROR OBTENIENDO FIXTURES:", e)
    return []

# Obtener goleadores sin filtrar por temporada
def obtener_goleadores():
    url = f"{BASE_URL}/topscorers/stages/77457866?api_token={API_KEY}&include=player"
    try:
        response = requests.get(url)
        print("GOLEADORES STATUS:", response.status_code)
        if response.status_code == 200:
            goleadores_data = response.json()
            
            goleadores = []
            # Recorremos la lista de goleadores
            for item in goleadores_data.get("data", []):
                player = item.get("player", {})
                goleadores.append({
                    "id": item.get("id"),
                    "total": item.get("total"),
                    "name": player.get("name"),
                    "display_name": player.get("display_name"),
                    "image_path": player.get("image_path"),
                    "position": item.get("position")
                })
            return goleadores
        else:
            print("No se pudieron obtener los goleadores, código de estado:", response.status_code)
    except Exception as e:
        print("Error al obtener goleadores:", e)
    return []

# Vista partidos
def partidos_view(request):
    fixtures = obtener_fixtures()
    
    goleadores = obtener_goleadores()

    return render(request, "pages/partidos.html", {
        "fixtures": fixtures,
        "goleadores": goleadores
    })

# Vista para mostrar solo los goleadores
def goleadores_view(request):
    goleadores = obtener_goleadores()
    return render(request, "pages/goleadores.html", {
        "goleadores": goleadores
    })