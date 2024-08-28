from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Club
from joinus.permissions import HasAPIKey
from rest_framework.decorators import permission_classes, api_view

@api_view(['GET'])
@permission_classes([HasAPIKey])
def get_clubs(request):
    clubs = Club.objects.all()

    # 동아리 명 검색
    name = request.GET.get('name')
    if name:
        clubs = clubs.filter(name__icontains=name)

    # 담당 선생님 ID 검색
    teacher_id = request.GET.get('teacher_id')
    if teacher_id:
        clubs = clubs.filter(teacher__id=teacher_id)

    # 정렬
    order_by = request.GET.get('order_by', 'club_id')  # 기본값: club_id ASC
    clubs = clubs.order_by(order_by)

    club_list = [
        {
            'club_id': club.club_id,
            'name': club.name,
            'description': club.description,
            'teacher_id': club.teacher.id if club.teacher else None,  # teacher가 없을 경우 None 처리
            'capacity': club.capacity,
            'start_date': club.start_date,
            'end_date': club.end_date,
        } for club in clubs
    ]

    return JsonResponse(club_list, safe=False)

@api_view(['GET'])
@permission_classes([HasAPIKey])
def get_club_detail(request, club_id):
    club = get_object_or_404(Club, pk=club_id)

    club_detail = {
        'club_id': club.club_id,
        'name': club.name,
        'description': club.description,
        'teacher_id': club.teacher.id if club.teacher else None,
        'capacity': club.capacity,
        'start_date': club.start_date,
        'end_date': club.end_date,
    }

    return JsonResponse(club_detail)