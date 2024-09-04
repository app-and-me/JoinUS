from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_clubs, name='get_clubs'),
    path('<int:club_id>', views.get_club_detail, name='get_club_detail'),
    path('<int:club_id>/contents/<int:application_id>', views.update_club_contents, name='update_club_contents'),
    path('clubs/<int:club_id>/applications', views.get_club_student, name='get_club_student'),
    path('<int:club_id>/applications', views.create_club_application, name='create_club_application'),
    path('<int:club_id>/applications', views.cancel_club_application, name='create_club_application'),
]