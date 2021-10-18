from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('profile', views.ProfileviewSet)
router.register('post', views.PostViewSet)

urlpatterns = [
    path('register/', views.CreateUserView.as_view()),
    path('myprofile/', views.MyProfileListView.as_view()),
    path('', include(router.urls)),
]