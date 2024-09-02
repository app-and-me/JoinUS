from django.shortcuts import render
from rest_framework import status
from django.http import HttpResponseForbidden, JsonResponse
from django.shortcuts import get_object_or_404
from users.firebase_auth import verify_firebase_token
from users.views import get_token
from rest_framework.decorators import api_view

# 전에 정의한 model을 import
from users.models import User
from clubs.models import ClubApplication
from clubs.models import Club
from clubs.serializers import ClubSerializer

# 유저 권한 체크
def is_admin_user(user):
    return user.role == 'admin'

# 동아리 정보 수정
@api_view(['PATCH'])
def update_club_info(request, club_id):
    token = get_token(request)
    uid = verify_firebase_token(token)

    if uid:
        try:
            user = get_object_or_404(User, user_uid=uid)
            if is_admin_user():
                club = get_object_or_404(Club, pk=club_id)

                # 요청 본문(body)에서 수정할 값을 가져옴
                name = request.data.get('name')
                description = request.data.get('description')
                capacity = request.data.get('capacity')

                # 전달된 값이 있으면 수정
                if name:
                    club.name = name
                if description:
                    club.description = description
                if capacity is not None:        # 숫자값이므로 구분
                    club.capacity = capacity

                club.save()

                return JsonResponse({'message':'updated club info successfully.'}, status=200)
            else: 
                # status 403 : 권한이 없을때
                return HttpResponseForbidden({'message':'You do not have permission to update.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid token"}, status=401)

# 동아리 삭제
@api_view(['DELETE'])
def delete_club(request, club_id):
    token = get_token(request)
    uid = verify_firebase_token(token)

    if uid:
        try:
            user = get_object_or_404(User, user_uid=uid)

            if is_admin_user():
                club = get_object_or_404(Club, pk=club_id)

                # 동아리 삭제
                club.delete()

                return JsonResponse({"message": "Club deleted successfully."})

            else:
                return HttpResponseForbidden({"message": "You do not have permission to update."})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid token"}, status=401)

# 동아리 컨텐츠(url) 추가
@api_view(['POST'])
def create_club_contents(request, club_id):
    token = get_token(request)
    uid = verify_firebase_token(token)

    if uid:
        try:
            user = get_object_or_404(User, user_uid=uid)

            if is_admin_user():
                url = request.data.get('url')

                # url이 포함되지 않았을 경우
                if not url:
                    return JsonResponse({"error": "url is required."}, status=400)
                
                club = get_object_or_404(Club, pk=club_id)

                # 새로운 ClubApplication 설정
                application = ClubApplication(
                    club=club,
                    url=url
                )

                application.save()

                return JsonResponse({"message": "Club application created successfully."}, status=201)
            else: 
                # status 403 : 권한이 없을때
                return HttpResponseForbidden({'message':'You do not have permission to update.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid token"}, status=401)

@api_view(['POST'])
def creat_club(request):
    token = get_token(request)
    uid = verify_firebase_token(token)

    if uid:
        try:
            user = get_object_or_404(User, user_uid=uid)

            if is_admin_user():
                serializer = ClubSerializer(data=request.data)
                if not serializer.is_valid():
                    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                # 동아리 생성
                club = serializer.save()

                return JsonResponse({'message': 'Club created successfully'}, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({'message': 'You do not have permission to update'}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return JsonResponse({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)