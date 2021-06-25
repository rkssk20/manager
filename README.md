# Audience
映画、音楽、本、アニメから好きな作品と紐づけて、レビューを投稿するSNS風のWEBアプリです。
このアプリを通して、CRUD機能と４つの外部API、Auth0やAWSなどを試しました。

## 機能一覧
### CRUD
- レビューの投稿、削除
- プロフィール画像のアップロード
- ユーザー名、ID、プロフィールの変更
### ログイン機能
- Auth0を利用したアカウント作成とログイン

## 使用技術
- React.js
- Express.js
- MySQL
- Docker
- AWS(RDS, EC2, ECS, ECR)
- CircleCI(テストなし。GithubからAWSへの自動デプロイのみ)
- Auth0
### 外部API
- TMDb(映画情報の取得)
- Spotify(音楽)
- Google Books(本)
- Annict(アニメ)

