# MEMORY.md — Athenaの長期記憶

_最終更新: 2026-02-25_

---

## 🧠 マスタープロファイル

### 基本情報
- **名前:** だいち
- **呼称:** マスター
- **タイムゾーン:** Asia/Tokyo (JST = UTC+9)
- **職業状況:** 転職活動中（2026-02時点）。Sky株式会社の面接を受けた経験あり。正社員 vs フリーランスで悩んでいた。
- **TikTokアカウント:** あり。AI anime画像での運用経験。

### 性格・思考パターン
- **行動派:** 「やってみたい」「面白そう」で即決する。計画より実行を重視。
- **効率重視:** 無駄な手順や冗長な説明を嫌う。結果を先に見たがる。
- **自律性を好む:** 「自分で考えてやって」と言うことが多い。指示を出すより任せたい。
- **ビジュアル重視:** UIの見た目、デザインの質にこだわる。「AI感のない」プロフェッショナルな仕上がりを求める。
- **深掘りを要求:** ニュースダイジェストで「浅い」とフィードバック。表面的な情報は不満。具体的な活用法まで欲しい。
- **日本語ベース:** やり取りは基本日本語。技術用語は英語OK。
- **好奇心旺盛:** 新技術・新ツールへの興味が強い（PixelLab、MCP、Remotion等）
- **ゲーム好き:** ドラクエ風UI、ピクセルアートに反応する。レトロゲーム感が好き。

### 意思決定スタイル
- 提案を聞いて「いいね」→ 即実行を期待する
- 5つ以上の選択肢より、ベスト1-2を推薦してほしい
- 「調べて」と言ったら徹底的にやれという意味
- 面倒な設定は自分でやりたくない → Athenaに任せたい

### コミュニケーション傾向
- 短文が多い（「やってみたい」「おけ」「いい感じ」）
- 不満があるときは具体的に言う（「浅い」「正しく参照できてない」）
- 興味がないときは反応しない or スルー
- 技術的な質問は具体的で的確

---

## 📋 プロジェクト一覧

### 稼働中
| プロジェクト | 場所 | 状態 |
|------------|------|------|
| #news X AIニュースダイジェスト | skills/x-news-digest/ | ✅ Cron稼働中 |
| #lab アイデアPDCA | skills/idea-workflow/ | ✅ Cron稼働中（朝昼晩） |
| #brain メモ自動分類 | /app/skills/brain-capture/ | ✅ 基本稼働 |
| #compass 朝レポート | channels/compass.md | 🔧 設計済み、テスト中 |
| Obsidian Vault | /mnt/vault/ | ✅ 24アイデア + ジャーナル |

### 実験・検討中
| プロジェクト | 状態 |
|------------|------|
| TikTok ピクセルアート動画 | パララックスプロトタイプ完成 |
| SNS自動投稿（X/TikTok/Instagram） | 調査済み、設計待ち |
| note/X記事投稿ワークフロー | Phase1設計済み（手動投稿） |
| PixelLab画像生成パイプライン | REST API透過PNG成功 |

### GitHubリポジトリ
- `takasaka-ctrl/slack-for-idea` — アイデアUIモックギャラリー
- `takasaka-ctrl/remotion-lofi-pixel` — TikTok向けピクセルアート動画
- `takasaka-ctrl/meetingcost` — 会議コスト計算Chrome拡張（push待ち）

---

## 🔧 技術的知見

### OpenClaw
- Docker内パス: `/mnt/vault/` = ホスト: `/home/ubuntu/vault/`
- Slack channelはIDで指定（#brain = `C0ADEH43WCU`、#setting = `C0918RCKFHT`）
- Claude Code Agent: `<@U0ADRLM7GE9>`
- PNG送信エラー: OpenClaw message toolで「Failed to optimize PNG image」→ JPEG変換で回避
- bot-to-bot メンション: 不安定。マスター経由で手動repost推奨。
- ディスク容量: 19GB EBS、常に90-95%。EBS拡張推奨。
- バージョン: 2026.2.9（Docker image pullで更新必要）

### PixelLab API
- `create_map_object` (MCP): max 400x400, 透過非対応
- `/create-image-pixflux` (REST): `no_background: true` + `background_removal_task` で透過PNG可能
- `create_character`: max 128x128, 4/8方向スプライト
- outline: `"single color outline"` or `"lineless"`（NOT `"single color black outline"`）
- view: `"low top-down"`（NOT `"low_top_down"`）
- コスト: ~$0.008/生成

### Brave Search API
- 連続検索は1秒間隔必要（Rate limit: Free plan）
- サイト指定: `@handle site:x.com OR site:twitter.com`

---

## 📝 過去の重要な決定

1. **Vault構造:** 20-Research → 20-Projects にリネーム（意味の明確化）
2. **PDCAアプローチ:** 単一SKILL.md方式（Approach B）採用
3. **#labの出力:** MD要件書のみ。Claude Code Agentへの自動ハンドオフはしない。
4. **画像生成API:** Tensor.art却下 → FAL.ai/Replicate推奨
5. **TikTok戦略:** AI anime wallpaper/slideshow。SFW + AIGC labeling必須。
6. **SNS投稿:** Buffer（X+Instagram）+ Playwright（TikTok）
7. **note API:** 公式なし → Phase1は手動投稿、AI下書き支援

---

## ⚠️ 過去のミス・学び

### Athenaのミス
- **パス間違い:** 相対パス `10-Ideas/` で参照できず → 絶対パス `/mnt/vault/10-Ideas/` を使う
- **Slackチャンネル参照:** `target="#brain"` → `channel_not_found` → channelId使用必須
- **ニュースの浅さ:** 初期の #news は表面的すぎた → 「活用アイデア」セクション追加で改善
- **PNG送信失敗:** PixelLab生成PNGがSlack送信でエラー → JPEG変換で回避
- **ディスク容量無視:** 大きなプロジェクトを放置して100%到達 → 定期クリーンアップ必要
- **壊れたシンボリックリンク:** remotion-lofi-pixel の assets リンク先が間違い → 修正
- **タイムゾーン設定ミス:** gcalcli実行時に `export TZ="Asia/Tokyo"` を設定せず、UTC時刻で登録 → 常にTZ環境変数を設定し、ISO8601形式（`+09:00`）で時刻指定すること
- **曜日記載ミス:** 手動で曜日を推測して記載したため、全て1日ずれていた（2026-02-26を水曜と記載したが実際は木曜）→ 日付と曜日を記載する際は必ず `date -d "YYYY-MM-DD" '+%Y-%m-%d (%a)'` で確認すること

### 自己改善ルール
- 調査を頼まれたら「徹底的に」やる。表面的はNG。
- 提案は3-5個に絞り、ベスト推薦を明確に。
- ファイルパスは常に絶対パスで記述。
- SlackチャンネルはID参照。名前は使わない。
- 画像送信はJPEGで。PNGは問題が起きる可能性あり。
- **時刻指定時は必ずJST（Asia/Tokyo）で設定。gcalcli実行時は必ず `export TZ="Asia/Tokyo"` を設定する。**
- **曜日を記載する際は必ず `date` コマンドで確認する。推測で書かない。**
- **状態ファイルの同期:** cronジョブで `auto-idea-state.json` を更新したら、必ず `heartbeat-state.json` も同期更新する。片方だけ更新すると重複実行やステータス不整合が起きる。複数の状態ファイルが関連する場合は、常に全てを一括更新すること。
- **技術情報の鮮度検証:** MEMORY.mdの技術情報（モデル名・価格・ランキング等）は記録時点のスナップショット。提示前に必ずウェブ検索で最新情報を確認する。特にAIモデルは数週間で世代交代するため、記憶を鵜呑みにしない。

---

## 🔮 マスターが興味を示しそうなこと（推測）

- Gmailとカレンダーの自動統合（→ 朝ブリーフィング完成）
- 音声メモの自動文字起こし
- ピクセルアート動画の自動量産パイプライン
- 個人開発プロダクトの収益化
- AI SaaSのアイデア実装
- note.com でのテック記事発信

---

_この記憶は定期的に見直し、不要な情報は削除、新しい学びは追加する。_

### 追加の学び (2026-02-27)
- **情報の鮮度:** AIモデル比較では「最新」を徹底的に調べること。GPT-4oやGemini 2.5の情報は既に古い。2026年2月時点ではClaude Sonnet 4.6、Gemini 3.1 Pro、GPT-5.2が最新。
- **最新モデル（2026-02時点）:** Claude Sonnet 4.6 ($3/$15)、Claude Opus 4.6 ($5/$25)、Gemini 3.1 Pro ($1.25/$10)、GPT-5.2 ($5/$15)、Grok 4.1 ($0.20/$0.50)
