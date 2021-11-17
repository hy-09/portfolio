## ポートフォリオの概要
簡易的な株取引のシミュレーションアプリです。  
実際のお金は使用せず、株価もJavaScriptでランダムに変動させています。 

#### 【機能1】ログイン、アカウント作成
![login](https://user-images.githubusercontent.com/72845995/141760872-136dc2f0-5d0b-48a5-b717-e842314b0d20.png)
#### 【機能2】プロフィール編集
![profile](https://user-images.githubusercontent.com/72845995/141910641-7efacc30-c94d-44f0-acc8-8ef3eb2bf77c.png)
#### 【機能3】株価の変動、評価損益額の計算
![profit-or-loss-price](https://user-images.githubusercontent.com/72845995/141912004-5a6da7b8-7640-49d7-b11c-3d949b260458.gif)
#### 【機能4】株の売買
・購入  
![buy](https://user-images.githubusercontent.com/72845995/141912348-3c0b1bfa-09a4-49a7-aa41-b6ce8f3c26a3.gif)

・売却  
![sell](https://user-images.githubusercontent.com/72845995/141912512-aa225d3e-cf8e-4fcd-ad56-46416b1b4dba.gif)
#### 【機能5】コメントの投稿・いいね・削除
![post](https://user-images.githubusercontent.com/72845995/141912737-49b66a9c-1f2f-457c-b9d9-c841b524e821.gif)
#### 【機能6】投稿の検索
![search](https://user-images.githubusercontent.com/72845995/141913042-d2b5990d-b0ba-4d79-81a2-49bd114d271b.gif)
## 使用技術
#### フロントエンド
- React（17.0.2）
- Redux（7.2.5）
- Redux Toolkit（1.6.2）
- TypeScript（4.1.6）
- react-chartjs-2（3.3.0）
- Formik（2.2.9）
- yup（0.32.11）
- axios（0.21.1）
- Material-UI（v4）
- レスポンシブ対応
#### バックエンド
- Django（3.0.7）
- Django REST framework（3.10）
- PyJWT（2.0.0）
#### サーバー
- Nginx（1.21）
- Gunicorn（20.1.0）
#### データベース
- MySQL（5.7.28）
#### インフラ
- Docker（Docker Compose）
- AWS（EC2）
## こだわりポイント
- 総資産や損益額の計算の整合性
- 存在しないURLやidへアクセスしたときのリダイレクト処理
- DRY原則を意識し、共通部分を関数化やコンポーネント化
- ダミーデータのリアルさ
- UI