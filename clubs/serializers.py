from rest_framework import serializers
from .models import Club, ClubApplication

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class ClubApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubApplication
        fields = ['status']
        extra_kwargs = {
            'status': {'read_only' : True}
        }