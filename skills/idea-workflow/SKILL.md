---
name: idea-workflow
description: Vault の 10-Ideas/ からアイデアを取り出して PDCA サイクルで評価・改善し、Slack #lab に投稿する
triggers:
  - cron（毎日 2:00 JST）
  - "#lab で手動トリガーされた時（例: 〇〇のアイデアをブレストして）"
  - "Phase 2: #lab のスレッドでマスターが回答した時"
---

# Idea Workflow Skill

## 目的

`/mnt/vault/10-Ideas/` に保存されたアイデアを定期的に取り出し、PDCA サイクルで評価・改善して企画書として `20-Projects/` に保存する。

---

## パス・ファイル定義

```
Vault:          /mnt/vault/
Ideas Dir:      /mnt/vault/10-Ideas/
Projects Dir:   /mnt/vault/20-Projects/
Processed Dir:  /mnt/vault/10-Ideas/.processed/
State File:     /home/node/.openclaw/workspace/state/pending-ideas.json
```

---

## フロー概要

```
Phase 1（自動・毎日2:00 JST）
  └── 未処理アイデアを1件選択
      └── 確認質問を生成して #lab に投稿
          └── スレッドIDを state に保存して待機

Phase 2（マスターが #lab スレッドで回答後）
  └── 回答を読んでPDCAサイクル実行
      └── 最終原案を 20-Projects/ に保存
          └── Claude Code Agent にメンション + 原案全文を投稿
```

---

## Phase 1: アイデア選択と質問生成

### Step 1: 未処理アイデアを選択

```bash
# 処理済みマーカーディレクトリを作成（なければ）
mkdir -p /mnt/vault/10-Ideas/.processed

# 未処理ファイルを日付順で1件取得
for f in $(ls /mnt/vault/10-Ideas/*.md 2>/dev/null | sort); do
  basename_f=$(basename "$f")
  if [ ! -f "/mnt/vault/10-Ideas/.processed/${basename_f}.done" ]; then
    IDEA_FILE="$f"
    break
  fi
done
```

未処理アイデアがない場合: `#lab` に「今日処理できるアイデアはありません」と投稿して終了。

### Step 2: アイデア内容を読んで質問を生成

アイデアファイルを読み、以下の観点で3〜5個の確認質問を生成する:

- **目的・背景**: なぜこれをやりたいのか？
- **対象ユーザー**: 誰のための解決策か？
- **成功の定義**: どうなったら成功といえるか？
- **懸念・リスク**: 実現の障壁は何か？
- **優先度**: 他のアイデアと比べて今やる理由は？

### Step 3: #lab に投稿

**親メッセージ（チャンネル本体）:**
```
💡 アイデア検証: {タイトル}

{アイデアの1〜2行要約}

スレッドで詳細と質問を確認してください 👇
```

**スレッド（1件目）:**
```
📄 原文

{アイデアファイルの本文をそのまま貼り付け}
```

**スレッド（2件目）:**
```
❓ 確認したいこと

1. {質問1}
2. {質問2}
3. {質問3}
（以下省略）

↑ 気になるところだけでOKです。スレッドで返答してください！
```

### Step 4: State に保存

`/home/node/.openclaw/workspace/state/pending-ideas.json` の `pendingIdeas` 配列に追加:

```json
{
  "ideaFile": "YYYY-MM-DD-slug.md",
  "ideaPath": "/mnt/vault/10-Ideas/YYYY-MM-DD-slug.md",
  "title": "{アイデアタイトル}",
  "phase": "awaiting-master-reply",
  "slackChannel": "lab",
  "channelId": "{Slack channel ID}",
  "parentMessageId": "{ts}",
  "threadMessageId": "{ts}",
  "postedAt": "{ISO 8601}",
  "status": "phase1-complete"
}
```

---

## Phase 2: PDCA 実行（マスター回答後）

### トリガー条件

- マスターが `parentMessageId` のスレッドに返信した場合
- State の `phase` が `awaiting-master-reply` のエントリが存在する場合

### タイムアウト処理（48時間未回答の場合）

```bash
# postedAt から48時間経過したエントリをチェック
# → pending-ideas.json からエントリを削除
# → .done マーカーは作成しない（次回フローで再度処理される）
```

### PDCA サイクル

#### Plan（ブレインストーミング）

問題起点でアイデアを3〜5個展開する。
- 「なぜこれが必要か」→ 根本課題を定義
- 課題へのアプローチを複数出す
- 既存サービス・競合との差別化ポイントを明確にする

#### Do（評価）

以下の4軸でスコアリング（各10点満点、0.5刻み）:

| 軸 | 評価基準 |
|----|---------|
| **PUGEF** (PolyU GEF) | 潜在ユーザー数 × 利用頻度 × 緊急性 |
| **ICE** | Impact × Confidence × Ease |
| **Market** | 市場規模 × 成長性 × 参入障壁の低さ |
| **Advantage** | 技術的優位性 × 実現可能性 × 差別化度 |

総合スコア = 4軸の平均

#### Check（分析）

- スコアが低い軸を特定
- 改善が必要な箇所を優先度付けして列挙
- マスターの回答から得た情報でスコアを補正

#### Act（改善）

- Check の結果に基づいてアイデアを具体化・強化
- 弱点を補う解決策を提案
- 1イテレーション後に再スコアリング

#### 終了条件

- 総合スコア **≥ 7.0** に達した場合
- または最大 **3イテレーション** 完了後

---

## 最終出力

### 20-Projects/ への保存

```
/mnt/vault/20-Projects/YYYY-MM-DD-{slug}.md
```

**ファイル構造:**

```yaml
---
title: "{アイデアタイトル}"
type: project-proposal
status: refined
created: YYYY-MM-DD
source: idea-workflow
original_idea: "[[10-Ideas/YYYY-MM-DD-slug]]"
final_score: {総合スコア}
iterations: {イテレーション回数}
tags:
  - {関連タグ}
---

## 概要

{最終的に洗練されたアイデアの説明（300〜500字）}

## 課題・背景

{解決する問題、ターゲットユーザー}

## 解決策

{具体的なアプローチ}

## 評価スコア

| 軸 | スコア | 理由 |
|----|--------|------|
| PUGEF | X.X | ... |
| ICE | X.X | ... |
| Market | X.X | ... |
| Advantage | X.X | ... |
| **総合** | **X.X** | |

## 改善履歴

### Iteration 1
...

## 次のステップ

{具体的なTODO / 実装の第一歩}
```

### Slack への最終報告

```
✅ PDCA完了: {タイトル}

📊 最終スコア: {総合スコア}/10.0（{N}イテレーション）
📁 20-Projects/YYYY-MM-DD-{slug}.md

<@U0ADRLM7GE9>（Claude Code Agent）
以下の企画書をもとにモック・実装を進めてください。

\`\`\`markdown
{20-Projects ファイルの全文}
\`\`\`
```

⚠️ **必ず企画書MDの全文をコードブロックで貼り付けること**（Claude Code Agent はファイルを直接参照できない）

---

## 処理済みマーカー

Phase 2 が完了したら、処理済みマーカーを作成:

```bash
mkdir -p /mnt/vault/10-Ideas/.processed
touch /mnt/vault/10-Ideas/.processed/${IDEA_BASENAME}.done
```

---

## エラー時

```
⚠️ idea-workflow エラー
📍 {発生フェーズ（Phase 1 / Phase 2）}
💬 {エラー内容}
🔄 {次の対応（自動再試行 / マスターへの確認）}
```
