# #compass チャンネル指示

**役割:** 毎朝、マスターの活動状況を整理して報告する「羅針盤」レポート。

## 報告内容

### 1. 📝 Vault メモ整理
- **対象:** 直近7日間に #brain 経由で保存されたメモ
- **参照パス:**
  - `/mnt/vault/10-Ideas/` - アイデア・観察
  - `/mnt/vault/20-Projects/` - 質問・調査済み項目
  - `/mnt/vault/30-Resources/` - ブックマーク
- **形式:** カテゴリ別にリスト化、ファイル名とタイトルを表示

### 2. 🧪 #lab 進行状況
- **参照:** `workspace/state/pending-ideas.json`
- **表示内容:**
  - マスター回答待ちのアイデア数
  - 各アイデアのタイトルと投稿日
  - スレッドリンク（可能なら）

### 3. 🎨 #imagelab 進行状況
- **参照:**
  - `workspace/memory/YYYY-MM-DD.md` - 当日の活動ログ
  - `/mnt/vault/50-Knowledge/imageLab/logs/` - 実験ログ（あれば）
- **表示内容:**
  - 直近の画像生成・動画制作実績
  - 実験中のスタイル・手法

## 実行タイミング
- **cron:** 毎朝 7:00 JST (UTC 22:00 前日)
- **チャンネル:** `#compass` (Slack)
- **形式:** Markdown形式で投稿

## レポートテンプレート

```markdown
# 🧭 Compass Report - YYYY年MM月DD日

## 📝 最近のメモ (過去7日)

### 💡 Ideas & Observations
- [2026-02-XX] タイトル - `10-Ideas/2026-02-XX-slug.md`

### 📂 Projects & Questions
- [2026-02-XX] タイトル - `20-Projects/2026-02-XX-slug.md`

### 🔖 Resources
- [2026-02-XX] タイトル - `30-Resources/2026-02-XX-slug.md`

---

## 🧪 Lab 進行状況

**回答待ちアイデア:** X件

- [タイトル] - 投稿: 2026-02-XX | [スレッド]

---

## 🎨 ImageLab 進行状況

**直近の活動:**
- 2026-02-XX: 背景パターン生成 (nature-forest, city-night, abstract-gradient, space-nebula)

---

_次の一歩を選んでください、マスター。_
```

## 処理スクリプト候補
- `scripts/generate-compass-report.sh` または
- cron job 内で直接 Athena に処理させる（推奨）
