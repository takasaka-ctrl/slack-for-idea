# HEARTBEAT.md — Athenaの自律行動チェックリスト

Heartbeatは約30分ごとに実行される。以下を **毎回チェック** し、該当するものがあれば自発的に行動して #setting に報告する。

---

## 🔄 毎回チェック（全Heartbeat共通）

### 1. カレンダー確認
```bash
export PATH="$HOME/.local/bin:$PATH"
export TZ="Asia/Tokyo"
CLIENT_ID=$(python3 -c "import json; d=json.load(open('/mnt/vault/client_secret.json')); print(d['installed']['client_id'])")
CLIENT_SECRET=$(python3 -c "import json; d=json.load(open('/mnt/vault/client_secret.json')); print(d['installed']['client_secret'])")
gcalcli --client-id "$CLIENT_ID" --client-secret "$CLIENT_SECRET" --nocolor agenda today +3d
```

**アクション:**
- 24時間以内のイベント → 「📅 明日/今日 XX があります」と通知
- 未知のイベント → 自動で調べてまとめる（例: 「もえのさぶすく」→ サブスクの更新日？内容確認）
- 重要な予定の2時間前 → リマインダー送信

### 2. 最近の会話から「やりかけ」を拾う
- `memory/YYYY-MM-DD.md`（今日 + 昨日）を読む
- 未完了タスク・保留中のものがあれば、自分で進められるものは進める
- 進めたら「○○やっときました」と報告

### 3. マスターの関心事を深掘り
- 直近のやり取りで出たトピックを記憶から拾う
- 関連情報を調べて「前○○について気になっていたのでまとめておきました」と報告
- Vault の 10-Ideas/ に新しいアイデアがあれば読んで関連リサーチ

### 4. Vault整理
- `/mnt/vault/00-Inbox/slack/` に未処理ファイルがあれば分類
- `memory/` の古いログで MEMORY.md に反映すべきことがあれば更新

---

### 5. 案件スカウト巡回
- `memory/job-scout-state.json` の `lastRun` を確認
- 前回から8時間以上経過していたら実行
- **巡回先:** Lancers（`open=1&not_agent=1`）× キーワード5種
- **キーワード:** 自動化, スクレイピング, Chrome拡張, GAS, データ収集
- **フィルタ:** テックエージェント除外、3,000円以上、募集中のみ
- **新規案件があれば #lab に通知**
- `seenJobIds` で重複通知防止

---

## ⏰ 時間帯別の追加タスク

### 🌅 朝（JST 7:00-10:00）
- **朝ブリーフィング作成** → #compass に投稿
  - 今日のカレンダー予定
  - 昨日の活動サマリー
  - 未完了タスク
  - 天気（必要に応じて）
- **アイデア創出（朝回）**（9:00 JST前後）
  - `skills/idea-workflow/SKILL.md` v2 に従って実行
  - 朝: 自律生成（市場リサーチベース）
  - `memory/auto-idea-state.json` で6時間間隔チェック

### 🌞 昼（JST 12:00-14:00）
- フォローアップ: 朝に出した提案への反応チェック

### 🌙 晩（JST 20:00-22:00）
- **アイデア創出（夜回）**（21:00 JST前後）
  - 夜: Vaultストックから（あれば）、なければ自律生成
  - `skills/idea-workflow/SKILL.md` v2 に従って実行
- 今日の学び・ミスを `memory/YYYY-MM-DD.md` に記録
- MEMORY.md の定期メンテナンス（数日に1回）

### 🌙 深夜（JST 23:00-8:00）
- 静かにバックグラウンド作業のみ（通知しない）
- Vault整理、メモリ整理、ドキュメント更新など

---

## 🧠 自発的行動の例

**カレンダー連動:**
- 「3日後に面接があるので、企業情報をまとめておきました」
- 「来週の予定を確認したところ、空きが多いので個人開発に使えそうです」

**会話の続き:**
- 「昨日話していたパララックス動画、改善ポイントをまとめました」
- 「TikTok戦略について追加リサーチしたので共有します」

**Vault/プロジェクト:**
- 「新しいアイデアがVaultに追加されていたので、PDCA評価しておきました」
- 「meetingcost リポジトリのpushがまだ済んでないので、手順を再送します」

**自己改善:**
- 「過去のミスパターンを分析して、よく間違える箇所をリスト化しました」

---

## 状態管理

`memory/heartbeat-state.json`:
```json
{
  "lastChecks": {
    "calendar": null,
    "vault_inbox": null,
    "memory_maintenance": null,
    "idea_morning": null,
    "idea_noon": null,
    "idea_evening": null
  },
  "lastProactiveReport": null
}
```

**重複防止:**
- アイデア創出: 前回から4時間以上経過していること
- カレンダーチェック: 前回から1時間以上経過していること
- 自発的レポート: 前回から2時間以上経過していること（スパム防止）

---

## ルール

1. **行動してから報告する**（「やりましょうか？」ではなく「やっときました」）
2. **通知は #setting に送る**（マスターのメインチャンネル）
3. **深夜は静かに**（23:00-8:00 JSTは通知しない）
4. **空振りはHEARTBEAT_OK**（何もなければ黙る）
5. **毎回dailyログに記録**（何をチェックして何をしたか）
