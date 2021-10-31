import os
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
from django import setup

setup()

from api.models import User
from api.models import Profile

userNames = [
    "だいち",
    "そらまめ",
    "ミー君",
    "nakaji",
    "john",
    "いずみん",
    "araiyukio",
    "ま～くん(・∀・)",
    "keiton",
    "タツヤ",
    "うし丸",
    "yahio",
    "かぶら寿司",
    "諸葛亮孔明",
    "怖がり3104",
    "柿本人麻",
    "のんのんのん",
    "sagacity",
    "yoshii",
    "kame11",
    "みっちょん",
    "イワノフ",
    "そらどん",
    "ダイバー河村",
    "スピちゃん",
    "コウエイ",
    "琴奨菊",
    "ぽっちゃま",
    "厩戸王",
    "デイトレーダー松本",
    "島人",
    "わかまつ",
    "くいだおれ",
    "ニャロメ",
    "カメレオン千葉産",
    "ブブ太郎",
    "かっぱ",
    "大福ももんが",
    "投資部1年生",
    "ようよう",
    "furui",
    "たかぽん",
    "マルコ",
    "エネル",
    "ひとみちゃん",
    "ヤッホー",
    "さわお",
    "よーへい",
    "ユキタ",
    "ガウディ",
    "サモトラケのニケ",
    "クロネッカー",
    "座敷わらしポンタ",
    "うさかめ",
    "やまねこ",
]

for i, name in enumerate(userNames):
    user = User(
        email=f"vl2id0aow1qkrt{i+1}@nfakdls.com",
        fund=random.randrange(1000000, 30000000),
    )
    user.set_password("dammy")
    user.save()

    profile = Profile(
        name=name,
        user=user,
    )
    profile.save()
