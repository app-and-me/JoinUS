from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_clubs, name='get_clubs'),
    path('<int:club_id>', views.get_club_detail, name='get_club_detail'),
]