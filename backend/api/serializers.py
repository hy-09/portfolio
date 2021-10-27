from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import BoughtStockInfo, Company, Profile, Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
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
            'user': {'read_only': True},
        }


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name')


class BoughtStockInfoSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    class Meta:
        model = BoughtStockInfo
        fields = ('id', 'price', 'quantity', 'remaining_quantity', 'user', 'company', 'created_at')
        extra_kwargs = {
            'user': {'read_only': True},
            'company': {'read_only': True},
        }


class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'content', 'user', 'company', 'likeUsers', 'price', 'created_at')
        extra_kwargs = {
            'user': {'read_only': True},
        }