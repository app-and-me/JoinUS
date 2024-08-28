import json
from rest_framework import status
from django.http import JsonResponse

from users.models import User
from .firebase_auth import create_custom_token, verify_firebase_token
from rest_framework.response import Response
from rest_framework.views import APIView
from users.permissions import HasAPIKey
from .serializers import UserSerializer

class UserCreate(APIView):
    permission_classes = [HasAPIKey]
    def post(self, request):
        # Firebase 소셜 로그인 후 전달받은 정보로 User 생성
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_custom_token(request):
    uid = request.GET.get('uid')
    if not uid:
        return JsonResponse({'error': 'UID is required'}, status=400)

    token = create_custom_token(uid)
    if token:
        return JsonResponse({'token': token})
    else:
        return JsonResponse({'error': 'Failed to create token'}, status=500)

def verify_token(request):
    token = request.headers.get('Authorization')
    if not token:
        return JsonResponse({'error': 'No token provided'}, status=400)

    # "Bearer " 접두사 제거
    if token.startswith('Bearer '):
        token = token[7:]

    uid = verify_firebase_token(token)
    if uid:
        return JsonResponse({'uid': uid})
    else:
        return JsonResponse({'error': 'Invalid token'}, status=401)

def get_user_info(request):
    response = verify_token(request)
    uid = json.loads(response.content)['uid']

    if uid:
        user = User.objects.get(user_uid=uid)
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    else:
        return JsonResponse({'error': 'Invalid token'}, status=401)
