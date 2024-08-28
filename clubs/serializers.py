from rest_framework import serializers
from .models import Club, ClubApplication, ClubContent

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

class ClubContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubContent
        fields = '__all__'