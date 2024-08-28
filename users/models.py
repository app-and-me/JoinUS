from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

class User(AbstractBaseUser, PermissionsMixin):
    user_uid = models.CharField(max_length=128, unique=True, primary_key=True)  # Firebase UID as primary key
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=[('student', '학생'), ('teacher', '선생님'), ('admin', '관리자')])
    language = models.CharField(max_length=10, null=True, blank=True)
    like = models.JSONField(default=dict, blank=True)

    is_staff = models.BooleanField(default=False)  # Django admin 접근 권한
    is_active = models.BooleanField(default=True)  # 계정 활성화 여부
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'user_uid'
    REQUIRED_FIELDS = ['email', 'name', 'role']