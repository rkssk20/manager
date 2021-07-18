# Audience
https://www.audience.cf

映画、音楽、本、アニメの中から好きな作品と紐づけてレビューを投稿する、SNS風のWEBアプリです。CRUD機能と4つの外部API, Docker, AWSやAuth0などを試しました。
現在投稿されているレビューは開発時に用意したものです。
## 機能一覧
### CRUD
- レビューの投稿、削除
- プロフィールの変更
### ログイン機能
- Auth0を利用したアカウント作成とログイン

- AWS S3へプロフィール画像のアップロード
- フォロー、いいね、検索、無限スクロールなど
## 使用技術
### フロントエンド
React.js  
(Material-UI)
### バックエンド
Express.js
### DB
MySQL
### インフラ
#### フロント  
  Cloud Front + S3 (+ Lambda@Edge)
#### サーバー  
  ALB + ECS (+ ECR)
#### その他
- Docker 
- Route53 + ACMでHTTPS接続  
- GitHub Actionsで自動デプロイ
### 認証
Auth0
### 外部API
- TMDb(映画情報の取得)
- Spotify(音楽)
- Google Books(本)
- Annict(アニメ)