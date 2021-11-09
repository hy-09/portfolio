import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
from django import setup

setup()

from api.models import BoughtStockInfo
from api.models import User
from api.models import Company
import random

users = User.objects.all()
companies = Company.objects.all()

for user in users:
    for _ in range(random.randint(1, 8)):
        quantity = random.randint(1, 10) * 100

        info = BoughtStockInfo(
            price=random.randint(500, 14000),
            quantity=quantity,
            user=user,
            company=random.choice(companies),
        )
        info.save()
