from django.http import JsonResponse
from .firebase_auth import create_custom_token, verify_firebase_token

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