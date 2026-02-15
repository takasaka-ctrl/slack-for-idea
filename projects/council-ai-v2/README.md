# Council AI v2 - 複数AI自動議論プラットフォーム

## 概要

1つの質問に対して3つのAI（GPT-4, Claude, Gemini）が自動で議論し、賛成・反対・中立の視点を提示する意思決定支援プラットフォーム。

## デモ

[モックを見る](https://takasaka-ctrl.github.io/slack-for-idea/projects/council-ai-v2/)

## MVP機能

| 機能 | 説明 |
|------|------|
| 質問入力 | ユーザーが意思決定の質問を入力 |
| 3 AI自動議論 | GPT-4（楽観的）、Claude（慎重）、Gemini（バランス）が2-3往復で議論 |
| チャット形式表示 | LINE/Slackのようなインターフェースで議論を可視化 |
| 要約レポート | 結論サマリー + 主要論点 + 推奨アクション |

## 技術スタック

- **Frontend**: Next.js 14 + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + LangChain
- **AI**: OpenAI + Anthropic + Google APIs
- **Database**: PostgreSQL (Supabase)

## デザイン仕様

- **スタイル**: Glassmorphism + LINE Style Chat
- **AI固有カラー**: GPT-4(緑), Claude(オレンジ), Gemini(青)
- **フォント**: Space Grotesk + DM Sans + Noto Sans JP

詳細は [design-spec.yaml](./design-spec.yaml) を参照。

## ターゲット

- **Phase 1**: 個人（進路、転職、大きな買い物）- 無料
- **Phase 2**: 企業（経営判断、戦略立案）- 有料

## PDCAスコア

**8.4 / 10**

## ファイル構成

```
council-ai-v2/
├── index.html          # モックUI
├── README.md           # このファイル
└── design-spec.yaml    # 設計仕様
```
