import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from django import setup
setup()

from api.models import Company
from api.models import User
from api.models import Profile
from .company import companies
from .user import userNames


for i, name in enumerate(userNames):
    user = User(
        email = f'dammy{i+1}@dammy.com',
    )
    user.set_password('dammy')
    user.save()

    profile = Profile(
        name = name,
        user = user
    )
    profile.save()


for company in companies:
    company = Company(
        name=company
    )
    company.save()