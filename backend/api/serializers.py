from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password')
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
        fields = ('id', 'name', 'profileUser', 'created_at', 'img')
        extra_kwargs = {
            'profileUser': {'read_only': True}
        }


class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'content', 'postUser', 'created_at', 'likeUsers') 
        extra_kwargs = {
            'postUser': {'read_only': True}
        }