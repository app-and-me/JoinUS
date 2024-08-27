from django.urls import path
from . import views

urlpatterns = [
    path('token/', views.get_custom_token, name='get_custom_token'),
    path('verify/', views.verify_token, name='verify_token')
]
