from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Club, ClubLog

@api_view(['POST'])
def add_log(request, name):
    club = get_object_or_404(Club, name=name)
    log = ClubLog.objects.create(club=club, content=request.data.get('content'))
    return Response({"message": "Log added successfully"}, status=201)

@api_view(['GET'])
def get_club_info(request, name):
    club = get_object_or_404(Club, name=name)
    return Response({
        "name": club.name,
        "info": club.info,
        "teacher_id": club.teacher_id,
    })

@api_view(['PATCH'])
def update_club_info(request, name):
    club = get_object_or_404(Club, name=name)
    if 'info' in request.data:
        club.info = request.data['info']
    club.save()
    return Response({"message": "Club info updated successfully"})
