from rest_framework import status
from rest_framework.decorators import permission_classes, api_view
from clubs import serializers
from users.models import User
from .firebase_auth import create_custom_token, verify_firebase_token
from rest_framework.response import Response
from rest_framework.views import APIView
from joinus.permissions import HasAPIKey
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

from clubs.serializers import ClubApplicationSerializer
from clubs.models import Club, ClubApplication

class UserCreate(APIView):
    permission_classes = [HasAPIKey]
    def post(self, request):
        # Firebase 소셜 로그인 후 전달받은 정보로 User 생성
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([HasAPIKey])
def get_custom_token(request):
    uid = request.GET.get('uid')
    if not uid:
        return Response({'error': 'UID is required'}, status=status.HTTP_400_BAD_REQUEST)

    token = create_custom_token(uid)
    if token:
        return Response({'token': token})
    else:
        return Response({'error': 'Failed to create token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def get_token(request):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

    # "Bearer " 접두사 제거
    if token.startswith('Bearer '):
        token = token[7:]

    return token

@api_view(['GET'])
@permission_classes([HasAPIKey])
def verify_token(request):
    token = get_token(request)

    uid = verify_firebase_token(token)
    if uid:
        return Response({'uid': uid})
    else:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['PATCH', 'GET'])
@permission_classes([HasAPIKey]) 
def me(request):
    if request.method == 'PATCH':
        return update_user_info(request)
    elif request.method == 'GET':
        return get_user_info(request) 

def update_user_info(request):
    token = get_token(request)

    uid = verify_firebase_token(token)
    if uid:
        try:
            user = User.objects.get(user_uid=uid)
            
            # 허용된 필드 외 데이터가 포함된 경우 오류 처리
            allowed_fields = ['name', 'language', 'password', 'like', 'role']
            for key in request.data.keys():
                if key not in allowed_fields:
                    return Response({'error': f'Invalid field: {key}'}, status=status.HTTP_400_BAD_REQUEST)

            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

def get_user_info(request):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

    # "Bearer " 접두사 제거
    if token.startswith('Bearer '):
        token = token[7:]

    uid = verify_firebase_token(token)
    if uid:
        try:
            user = User.objects.get(user_uid=uid)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

# Get user's applications
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_applications(request):
    applications = ClubApplication.objects.filter(
        student=request.user
    ).order_by('-applied_at')

    class ClubApplicationSerializer(serializer.ModelSerializer):
        club_name = serializers.CharField(source='club.name')

        class Meta:
            model = ClubApplication
            fields = ['application_id', 'club_id', 'club_name', 'status', 'applied_at', 'canceled_at']
    
    serializer = ClubApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)