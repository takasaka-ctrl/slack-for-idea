# Smart Receipt Scanner

**領収書AI読み取り → CSV出力のWebアプリ**

## PDCAスコア: 7.7/10
- PUGEF: 7.5（フリーランス・個人事業主ニーズ）
- ICE: 8.0（GPT-4 Vision で実装容易）
- Market: 7.5（個人向け経費精算は穴場）
- Advantage: 7.8（AI精度 × シンプルUI）

## 技術スタック
- HTML / CSS / JavaScript
- Tailwind CSS（CDN）
- GPT-4 Vision（AI OCR）

## フォント
- **見出し**: Space Grotesk
- **本文**: DM Sans
- **数字**: JetBrains Mono
- **日本語**: Noto Sans JP

## カラーパレット
- **Primary**: #0a0f1e（Dark Navy - サイドバー）
- **Brand**: #635bff（Indigo - アクセント）
- **Success**: #10b981（Mint - 成功状態）
- **Background**: #f8fafc（Slate-50 - ワークスペース）

## 機能
- 領収書アップロード（ドラッグ&ドロップ、カメラ、ファイル選択）
- GPT-4 Vision による自動テキスト抽出
- 抽出データテーブル（日付・店舗名・金額・税額・明細）
- CSV出力機能（会計ソフト連携用）
- 処理履歴・節約時間の可視化
- KPIダッシュボード（読取精度・合計金額・税額）

## デザインスタイル
**Stripe-Inspired Precision**
- ダークサイドバー + ライトワークスペースの2ペイン構成
- Glassmorphism効果の統計カード
- モノスペースフォントによる数値表示
- ホバーリフトエフェクトのKPIカード
