from datetime import datetime
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Club, ClubApplication
from joinus.permissions import HasAPIKey
from rest_framework.decorators import permission_classes, api_view
from django.http import HttpResponseForbidden, JsonResponse
from users.firebase_auth import verify_firebase_token
from users.views import get_token
from rest_framework.permissions import IsAuthenticated

# 전에 정의한 model을 import
from users.models import User
from clubs.models import ClubApplication
from clubs.models import Club

from .serializers import ClubApplicationSerializer, ClubSerializer
from rest_framework.response import Response
from rest_framework import status

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

# 동아리 컨텐츠(url) 수정
@api_view(['PATCH'])
def update_club_contents(request, club_id, application_id):
    token = get_token(request)
    uid = verify_firebase_token(token)

    if uid:
        try:
            user = get_object_or_404(User, user_uid=uid)
            if user.role == 'teacher':
                club = get_object_or_404(Club, pk=club_id)
                
                 # 위의 club과, application_id에 해당하는 동아리 신청을 가져옴
                application = get_object_or_404(ClubApplication, pk=application_id, club=club)

                # 요청 본문(body)에서 수정할 값을 가져옴
                url = request.data.get('url')

                # 전달된 값이 있으면 수정
                if url:
                    application.url = url
                    application.save()

                    return JsonResponse({'message':'Updated club contents successfully.'}, status=200)
                
                else:
                    return JsonResponse({'error': 'No contents provided to update.'}, status=400)

            else: 
                # status 403 : 권한이 없을때
                return HttpResponseForbidden({'message':'You do not have permission to update.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid token"}, status=401)

# 신청한 학생 확인
@api_view(['GET'])
def get_club_student(request, club_id):
    token = get_token(request)
    uid = verify_firebase_token(token)

    if uid:
        try:
            user = get_object_or_404(User, user_uid=uid)

            if user.role == 'teacher':
                club = get_object_or_404(Club, pk=club_id)

                # 해당 동아리에 신청한 학생을 가져옴
                applications = ClubApplication.objects.filter(club=club)
                students = [app.student for app in applications]

                # 학생 정보를 JSON 형태로 변환
                student_data = [{"id": stu.id, "name": stu.name} for stu in students]
                
                return JsonResponse({"students": student_data})

            else:
                return HttpResponseForbidden({"message": "You do not have permission to get."})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid token"}, status=401)
        
# Club application
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_club_application(request, club_id):
    club = Club.objects.get(pk=club_id)

    # Check the number of club applicants
    if club.capacity <= ClubApplication.objects.filter(club=club, status="application").count():
        return Response({'message': 'The club is full'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ClubApplicationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    application = serializer.save(
        club=club,
        student=request.user,
        status="applied"
    )

    return Response({'message': 'Application success'})

# Club cancellation
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def cancel_club_application(request, club_id):
    try:
        application = ClubApplication.objects.get(
            club_id=club_id,
            student=request.user,
            status="applied"
        )
    except ClubApplication.DoesNotExist:
        return Response({'message': 'There is no application history'}, status=status.HTTP_404_NOT_FOUND)
    
    application.status = "canceled"
    application.canceled_at = datetime.datetime.now()
    application.save()

    return Response({'message': 'application has been cancelled'}, status=status.HTTP_200_OK)

