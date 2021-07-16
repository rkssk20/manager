# Audience
映画、音楽、本、アニメから好きな作品と紐づけてレビューを投稿する、SNS風のWEBアプリです。CRUD機能と４つの外部API, Docker, AWSやAuth0などを試しました。  
現在投稿されているレビューは開発時に用意したものです。

## 機能一覧
### CRUD
- レビューの投稿、削除
- プロフィールの変更、プロフィール画像のアップロード
### ログイン機能
- Auth0を利用したアカウント作成とログイン

## 使用技術
### フロントエンド
React.js  
(Material-UI)
### バックエンド
Express.js
### DB
MySQL
### インフラ
- Docker
- フロント
  Cloud Front + S3
- サーバー
  ALB + ECS (+ ECR)
- その他
  Route53 + ACMでHTTPS接続
  GitHub Actionsで自動デプロイ
### 認証
Auth0
### 外部API
- TMDb(映画情報の取得)
- Spotify(音楽)
- Google Books(本)
- Annict(アニメ)
