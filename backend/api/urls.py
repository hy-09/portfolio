from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('user', views.UserViewSet)
router.register('profile', views.ProfileViewSet)
router.register('post', views.PostViewSet) 
router.register('company', views.CompanyViewSet) 
router.register('boughtstockinfo', views.BoughtStockInfoViewSet) 

urlpatterns = [
    path('register/', views.CreateUserView.as_view()),
    path('myprofile/', views.MyProfileListView.as_view()),
    path('myboughtstockinfo/', views.MyBoughtStockInfoListView.as_view()),
    path('', include(router.urls)),
]