import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from django import setup
setup()

from api.models import Company
from api.models import User
from api.models import Profile
from api.models import BoughtStockInfo
from .company import companies
from .user import userNames
import random

# User, Profile
for i, name in enumerate(userNames):
    user = User(
        email = f'dammy{i+1}@dammy.com',
    )
    user.set_password('dammy')
    user.save()

    profile = Profile(
        name = name,
        user = user,
    )
    profile.save()


# Company
for company in companies:
    company = Company(
        name=company
    )
    company.save()


# BoughtStockInfo
users = User.objects.all()
companies = Company.objects.all()

for user in users:
    for _ in range(random.randrange(1, 6)):
        quantity = random.randrange(1, 10)*100

        info = BoughtStockInfo(
            price = random.randrange(500, 15000),
            quantity = quantity,
            remaining_quantity = quantity,
            user = user,
            company = random.choice(companies)
        )
        info.save()