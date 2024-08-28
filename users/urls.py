from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.UserCreate.as_view(), name='signup'),
    path('token/', views.get_custom_token, name='get_custom_token'),
    path('verify/', views.verify_token, name='verify_token'),
    path('me/', views.get_user_info, name='get_user_info')
]
