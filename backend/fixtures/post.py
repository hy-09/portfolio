import os
import random
from random import randint
from datetime import datetime, timedelta

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
from django import setup

setup()

from api.models import Post
from api.models import User
from api.models import Company


def getContent(companyName, buyOrSell):
    shortName = getShortName(companyName)
    randomPrice = randint(10, 800)

    buycontent = [
        f"{shortName}あがれー",
        f"もうちょっと{shortName}高くなったら売ろ",
        f"普段{shortName}にはお世話になっているので買ってみました",
        f"{shortName}は伸びる！",
        f"わたしは{shortName}を信じてる…(´_ゝ｀)",
        f"{shortName}……？",
        f"{shortName}が狙い目",
        f"{shortName}安くなってるやん",
        f"{shortName}はこれから伸びると思いますか？",
        f"僕は{shortName}と一心同体",
        f"{shortName}これから上がるかな",
        f"{shortName}がいいと聞いたので買いました",
        f"これは{shortName}には追い風",
        f"{shortName}買ってみたけど大丈夫？",
        f"{shortName}いけええええええ！！！！！",
        "回復基調や",
        "成長性を加味",
        "どうなるか？",
        "下がったら困るな～",
        "長期投資銘柄",
        "いけいけ",
        "行けるか！？",
        "買った",
        "買ってみた…これといった大きな理由はないがチャートが良さげ？",
        "この株買いです。",
        "なぜか二回買ってしまった",
        "今が底",
        "久しぶりの爆買い",
        "上がるかも？",
        "買ってすぐ売る",
        "上がる予感",
        "とりあえず試し",
        "ジワジワ",
        "これから",
        "上がるだろうなー",
        "短期決戦",
        "頑張ろうぜwwwww",
        "うまくいけー",
        "安く買い増しできれば",
        "間違いない",
        "また買うよ",
        "ちょっと買っときますわ",
        "歴史は繰り返す。絶対上がるって！",
    ]

    sellcontent = [
        f"{shortName}ありがとう(^_-)-☆",
        f"{shortName}…",
        f"{shortName}ああああああ！！！！！！",
        f"ちょっと{shortName}あやしいな～",
        f"お前を信じてついてきて本当によかったぜ、{shortName}",
        f"{shortName}ナイスゥ～",
        f"{shortName}の雲行きが…",
        f"{shortName}様様～",
        f"{shortName}そろそろ損切りすべき…？",
        f"{randomPrice}万の利益",
        f"{randomPrice}万の損失…",
        "とりあえず売ります",
        "利確",
        "というか利益が下がってるこれは損切り日だな！",
        "下がる前に売っとこ",
        "誰か助けて( ;∀;)",
        "少しカット",
        "高騰、天井？",
        "あかん",
        "よしよし",
        "うり",
        "何故上がった？",
        "欲張らずに、そこそこに",
    ]

    commoncontent = [
        f"{shortName} + {shortName} = 2{shortName}",
        f"{shortName}。",
        f"これから毎日{shortName}の商品使います",
        f"{shortName}が私のことを嫌いになっても、私は{shortName}のことが嫌いになれません！",
        "暇だー",
        "なんかいい株が見当たらないおススメの株ってある？",
        "ほい",
        "(; ･`д･´)",
        "アイコンかえたぁー",
        "また買う",
        "もうわかんねぇ",
        "株ムズイ",
        "こんにちは",
        "急騰！",
        "下がる？上がる",
        "まあ確実にいきます",
        "あれ、みんなやってないなー",
        "問題！僕のアイコンは一体何でしょう！",
        "コメントをしたいという感情から無心に同じ株を売り買いしている今日この頃",
        "暇すぎて寝ながらチャートを見ている今日この頃",
        "！！！",
        "今が狙い目",
        "上昇中",
        "怖い",
        "(;´∀｀)",
        "たのむよ",
        "うんうん",
        "go! go!",
    ]

    if buyOrSell == "buy":
        return random.choice(buycontent + commoncontent)
    else:
        return random.choice(sellcontent + commoncontent)


def getShortName(companyName):
    deleteWords = [
        "(株)",
        "ＮＴＴ",
        "工業",
        "製作所",
        "商事",
    ]

    for word in deleteWords:
        companyName = companyName.replace(word, "")

    return companyName


def getLikeUsers(users):
    likeUsers = []
    likeCount = random.randint(0, 3)
    while len(likeUsers) < likeCount:
        likeUser = random.choice(users)
        if not likeUser in likeUsers:
            likeUsers.append(likeUser)

    return likeUsers


users = User.objects.all()
companies = Company.objects.all()

postCount = 500
postedDateTimes = []
postedDatetime = datetime.now()


for _ in range(postCount):
    diff = timedelta(minutes=randint(1, 180))
    postedDatetime -= diff
    postedDateTimes.insert(0, postedDatetime)

for i in range(postCount):
    companyIndex = random.randrange(0, len(companies))
    companyId = companyIndex + 1
    company = companies[companyIndex]
    companyName = company.__dict__["name"]

    buyOrSell = "buy" if randint(1, 10) <= 6 else "sell"
    created_at = postedDateTimes[i]
    content = getContent(companyName, buyOrSell)

    post = Post(
        content=content,
        user=random.choice(users),
        company=company,
        price=randint(500, 15000),
        quantity=randint(1, 20) * 100,
        buy_or_sell=buyOrSell,
        created_at=created_at,
    )
    post.save()

    for user in getLikeUsers(users):
        post.likeUsers.add(user)
