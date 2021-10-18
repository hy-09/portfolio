from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

def upload_avatar_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatars', str(instance.profileUser.id)+str(instance.name)+str('.')+str(ext)])
# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Email is required')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    
    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email
    
    class Meta:
        db_table = 'users'


class Profile(models.Model):
    name = models.CharField(max_length=20)
    profileUser = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name='profileUser',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(blank=True, null=True, upload_to=upload_avatar_path)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'profiles'
    

class Post(models.Model):
    content = models.CharField(max_length=200)
    postUser = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='postUser',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    likeUsers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='likeUsers',
        blank=True
    )
    
    def __str__(self):
        return self.content
    
    class Meta:
        db_table = 'posts'