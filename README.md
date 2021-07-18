# Audience
<a href='https://www.audience.cf' target="_blank">https://www.audience.cf</a>

映画、音楽、本、アニメの中から好きな作品と紐づけてレビューを投稿する、SNS風のWEBアプリです。CRUD機能の実装と4つの外部APIの利用, Docker, AWS, Auth0, GitHub Actionsの自動デプロイなどを試しました。
現在投稿されているレビューは開発時に用意したものです。
## 機能一覧
- CRUD
  - レビューの投稿、削除
  - プロフィールの変更
- ログイン機能
  - Auth0を利用したアカウント作成とログイン
- その他
  - AWS S3へプロフィール画像のアップロード
  - フォロー、いいね、検索、無限スクロールなど
## 使用技術
- 開発環境
  - フロントエンド React.js (Material-UI)
  - バックエンド Express.js
  - DB MySQL
  - Dockerで開発
  - GitHub Actionsで自動デプロイ

- インフラ
  - フロントエンド  
    Cloud Front + S3 (+ Lambda@Edge)
  - サーバー  
    ALB + ECS (+ ECR)
  - Route53 + ACMでHTTPS接続  

- 認証  
  - Auth0
- 外部API
  - TMDb(映画情報の取得)
  - Spotify(音楽)
  - Google Books(本)
  - Annict(アニメ)