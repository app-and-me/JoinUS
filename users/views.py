from rest_framework import status
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
    

