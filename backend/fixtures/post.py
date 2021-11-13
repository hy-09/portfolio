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


def getContent(companyName, buyOrSell, profit_or_loss_price):
    shortName = getShortName(companyName)
    profit_or_loss = (
        "profit"
        if profit_or_loss_price > 0
        else "loss"
        if profit_or_loss_price < 0
        else "flat"
    )
    price = abs(int(profit_or_loss_price / 10000))

    content = {
        "buy": [
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
            "今が狙い目",
            "たのむよ",
            "go! go!",
        ],
        "sell": {
            "profit": [
                f"{shortName}ありがとう(^_-)-☆",
                f"ちょっと{shortName}あやしいな～",
                f"お前を信じてついてきて本当によかったぜ、{shortName}",
                f"{shortName}ナイスゥ～",
                f"{shortName}様様～",
                f"これから毎日{shortName}の商品使います",
                f"{price}万の利益",
                f"{price}万勝った♪",
                "利確",
                "というか利益が下がってる<br>これは損切り日だな！",
                "下がる前に売っとこ",
                "高騰、天井？",
                "何故上がった？",
                "欲張らずに、そこそこに",
                "よしよし",
                "急騰！",
                "まあ確実にいきます",
                "上昇中",
                "怖い",
            ],
            "loss": [
                f"{shortName}…",
                f"{shortName}ああああああ！！！！！！",
                f"{shortName}の雲行きが…",
                f"{shortName}そろそろ損切りすべき…？",
                f"{price}万の損失…",
                f"逆に{price}万の損失で抑えたと捉えるか…",
                "とりあえず売ります",
                "誰か助けて( ;∀;)",
                "少しカット",
                "あかん",
                "うり",
                "(;´∀｀)",
            ],
        },
        "common": [
            f"{shortName} + {shortName} = 2{shortName}",
            f"{shortName}。",
            f"{shortName}が私のことを嫌いになっても、私は{shortName}のことが嫌いになれません！",
            "暇だー",
            "なんかいい株が見当たらない<br>おススメの株ってある？",
            "ほい",
            "(; ･`д･´)",
            "アイコンかえたぁー",
            "また買う",
            "もうわかんねぇ",
            "株ムズイ",
            "こんにちは",
            "下がる？上がる",
            "あれ、みんなやってないなー",
            "問題！僕のアイコンは一体何でしょう！",
            "コメントをしたいという感情から無心に同じ株を売り買いしている今日この頃",
            "暇すぎて寝ながらチャートを見ている今日この頃",
            "！！！",
            "うんうん",
        ],
    }

    if buyOrSell == "buy":
        return random.choice(content["buy"] + content["common"])
    else:
        if profit_or_loss == "profit":
            return random.choice(content["sell"]["profit"] + content["common"])
        elif profit_or_loss == "loss":
            return random.choice(content["sell"]["loss"] + content["common"])
        else:
            return "プラマイゼロ"


def getShortName(companyName):
    deleteWords = [
        "(株)",
        "ＮＴＴ",
        "工業",
        "製作所",
        "商事",
        "グループ",
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

    buyOrSell = random.choice(["buy", "sell"])
    profit_or_loss_price = randint(-30000, 60000) * 100
    content = getContent(companyName, buyOrSell, profit_or_loss_price)
    created_at = postedDateTimes[i]

    post = Post(
        content=content,
        user=random.choice(users),
        company=company,
        price=randint(500, 15000),
        quantity=randint(1, 20) * 100,
        buy_or_sell=buyOrSell,
        created_at=created_at,
    )

    if buyOrSell == "sell":
        post.profit_or_loss_price = profit_or_loss_price

    post.save()

    for user in getLikeUsers(users):
        post.likeUsers.add(user)
