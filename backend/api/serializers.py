from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import BoughtStockInfo, Company, Profile, Post, User


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
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'


class BoughtStockInfoSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        company_data = validated_data.pop('company')

        boughtStockInfo = BoughtStockInfo.objects.create(
            user = user_data,
            company = company_data,
            **validated_data
        )
        return boughtStockInfo

    class Meta:
        model = BoughtStockInfo
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'