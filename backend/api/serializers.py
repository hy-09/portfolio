from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Company, Profile, Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        # fields = ('id', 'email', 'fund', 'profile', 'password')
        fields = ('id', 'email', 'fund', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validate_data):
        user = get_user_model().objects.create_user(**validate_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)
    
    class Meta:
        model = Profile
        fields = ('id', 'user', 'created_at', 'name', 'img')
        extra_kwargs = {
            'user': {'read_only': True}
        }


class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'content', 'user', 'created_at', 'likeUsers')
        extra_kwargs = {
            'postUser': {'read_only': True}
        }


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name')