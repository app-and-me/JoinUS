from django.urls import path
from . import views

urlpatterns = [
    path('/clubs/<int:club_id>', views.update_club_info, name='update_club_info'),
    path('/clubs/<int:club_id>', views.delete_club, name='delete_club'),
    path('/clubs/<int:club_id>/contents', views.create_club_contents, name='create_club_contents')
]
