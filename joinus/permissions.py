import os
from dotenv import load_dotenv
from rest_framework import permissions
from django.conf import settings

load_dotenv()

class HasAPIKey(permissions.BasePermission):
    def has_permission(self, request, view):
        api_key = request.GET.get('key')
        return api_key == os.environ.get('API_KEY')