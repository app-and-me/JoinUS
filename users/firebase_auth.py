from django.http import JsonResponse
from dotenv import load_dotenv
import requests
import firebase_admin
from firebase_admin import credentials, auth
import os
from django.conf import settings

load_dotenv()

BASE_DIR = settings.BASE_DIR
cred = credentials.Certificate(os.path.join(BASE_DIR, 'users', 'firebase.json'))
firebase_admin.initialize_app(cred)

def create_custom_token(uid):
    try:
        custom_token = auth.create_custom_token(uid).decode('utf-8')
        response = requests.post(
            f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key={os.environ.get('FIREBASE_API_KEY')}",
            json={
                "token": custom_token,
                "returnSecureToken": True
            }
        )

        token = response.json().get('idToken')

        return token
    except Exception as e:
        print(f"Error creating custom token: {e}")
        return JsonResponse({'error': str(e)}, status=500)

def verify_firebase_token(id_token):
    try:
        # ID 토큰 검증
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return uid
    except auth.InvalidIdTokenError:
        # 토큰이 유효하지 않음
        return None
    except Exception as e:
        # 기타 예외 처리
        print(f"Token verification error: {e}")
        return None
