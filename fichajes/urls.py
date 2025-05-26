from django.urls import path
from .views import listar_fichajes

urlpatterns = [
    path('', listar_fichajes, name='listar_fichajes'),
]
