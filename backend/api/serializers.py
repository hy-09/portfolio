from logging import log
from logs.logging_debug import logger
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import BoughtStockInfo, Company, Profile, Post, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "email", "fund", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validate_data):
        user = get_user_model().objects.create_user(**validate_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"
        extra_kwargs = {"user": {"read_only": True}}


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class BoughtStockInfoSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    user = UserSerializer(many=False, read_only=True)
    company = CompanySerializer(many=False, read_only=True)

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True
    )

    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), write_only=True
    )

    def create(self, validated_data):
        validated_data["user"] = validated_data.pop("user_id")
        validated_data["company"] = validated_data.pop("company_id")

        boughtStockInfo = super().create(validated_data)
        return boughtStockInfo

    class Meta:
        model = BoughtStockInfo
        fields = (
            "id",
            "price",
            "quantity",
            "created_at",
            "user",
            "company",
            "user_id",
            "company_id",
        )
        extra_kwargs = {"user": {"read_only": True}, "company": {"read_only": True}}


class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
