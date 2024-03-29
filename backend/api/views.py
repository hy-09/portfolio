from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from . import serializers
from .models import BoughtStockInfo, Company, Profile, Post, User
from logs.logging_debug import logger

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = serializers.CompanySerializer
    permission_classes = (AllowAny,)


class BoughtStockInfoViewSet(viewsets.ModelViewSet):
    queryset = BoughtStockInfo.objects.all()
    serializer_class = serializers.BoughtStockInfoSerializer


class MyBoughtStockInfoListView(generics.ListAPIView):
    queryset = BoughtStockInfo.objects.all()
    serializer_class = serializers.BoughtStockInfoSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer


class MyPostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
