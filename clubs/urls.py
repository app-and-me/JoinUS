from django.urls import path
from . import views

urlpatterns = [
    path('<str:name>/logs/', views.add_log, name='add_log'),
    path('<str:name>/', views.get_club_info, name='get_club_info'),
    path('<str:name>/info', views.update_club_info, name='update_club_info'),
]