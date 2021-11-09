import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
from django import setup

setup()

from api.models import Company

companies = [
    "トEタ自動車(株)",
    "ソフトパンクグループ(株)",
    "任天丼(株)",
    "ンニー(株)",
    "(株)ＮＴＴコドモ",
    "中内製薬(株)",
    "アマテラス製薬(株)",
    "丈田薬品工業(株)",
    "(株)目立製作所",
    "(株)木寸田製作所",
    "エヌスリー(株)",
    "往友商事(株)",
]


for company in companies:
    company = Company(name=company)
    company.save()
