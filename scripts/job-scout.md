# 案件スカウト自動巡回 — 設計書

## 概要
Lancers + Brave Search を使い、AI自動化で納品可能な案件を定期巡回し、
フィルタリング・評価した結果を Slack #lab に通知する。

## 巡回対象キーワード
1. Chrome拡張機能
2. スクレイピング
3. 自動化ツール
4. API連携
5. データ収集
6. LP コーディング
7. Google Apps Script (GAS)
8. 記事作成 AI

## 巡回ソース
### Lancers (直接フェッチ)
URL: `https://www.lancers.jp/work/search?keyword={kw}&sort=new&open=1`
- `open=1` で募集中のみ
- readability抽出でタイトル・単価・概要が取得可能

### Brave Search (補完)
Query: `site:crowdworks.jp {keyword} 募集中`
- CrowdWorksは直接フェッチ不可のためSearch経由
- 1秒間隔必須（Free plan rate limit）

## フィルタリング基準
### 自動化適性スコア（5段階）
- ★★★★★: データ収集、スクレイピング、GAS
- ★★★★☆: Chrome拡張、API連携、LP/HTML
- ★★★☆☆: 記事作成、翻訳
- ★★☆☆☆: デザイン、動画編集
- ★☆☆☆☆: 対面必要、法律相談等

### 除外条件
- 報酬 < 3,000円（コスパ悪い）
- 「本人確認が必要」かつマスター未認証の場合
- 長期常駐案件（週3日以上）
- 募集終了

## 出力フォーマット（Slack通知）
```
🔍 案件スカウトレポート（YYYY-MM-DD）

【★★★★★】データ収集・リスト作成
💰 5,000円 | 📅 あと2日
🔗 https://lancers.jp/work/detail/XXXXX
📝 保育施設サイトから施設名を抽出...
🤖 自動化ポイント: Pythonスクレイピングで完全自動化可能

---
該当案件: X件 / 巡回: Lancers Y件, CrowdWorks Z件
```

## スケジュール
- 朝 9:00 JST（Heartbeat内で実行）
- 夕方 18:00 JST（Heartbeat内で実行）

## 状態管理
`memory/job-scout-state.json`:
- lastRun: timestamp
- seenJobIds: [] (重複通知防止)
