from django.urls import path
from . import views

urlpatterns = [
    path('/clubs/<int:club_id>', views.update_club_info, name='updateClubInfo'),
    path('/clubs/<int:club_id>', views.delete_club, name='deleteClub'),
    path('/clubs/<int:club_id>/contents', views.create_club_contents, name='createClubContents')
]
