# #lab チャンネル指示

**役割:** エビデンスベースのアイデア生成 → PDCA評価 → 実装仕様書(MD) → Claude Code Agent実装 → ギャラリー追加

**使用スキル:** `skills/idea-workflow/SKILL.md` (v2)

## 自動化フロー（1日2回: 朝9:00 / 夜21:00 JST）

### 供給モード
- **朝（9:00 JST）:** 自律生成 — 市場リサーチベースで新規アイデア
- **夜（21:00 JST）:** Vaultストック優先 — `/mnt/vault/10-Ideas/` から。なければ自律生成

### フロー
```
① idea-learning.md を読む（過去の学び）
② カテゴリ + 着想メソッド をローテーション決定
③ web_search × 2（トレンド + 競合）
④ web_fetch × 1-2（エビデンス深掘り）
⑤ アイデア着想（制約条件 + エビデンスベース）
⑥ 定量PDCA評価（最大2イテレーション）
⑦ スコア 7.5+: MD仕様書生成 → #lab投稿 → #setting通知
⑧ idea-learning.md 更新（必須）
⑨ auto-idea-state.json 更新
```

### 投稿フォーマット
```
💡 新アイデア提案: {タイトル}

📊 スコア: {総合}/10.0
🏷 カテゴリ: {カテゴリ}
🔍 着想: {メソッド名}
📎 エビデンス: {URL 1-2個}

{2-3行サマリー}

---
実装仕様書:
（コードブロックでMD全文）
---

マスターの承認後、Claude Code Agentに転送してください。
```

### Claude Code Agent連携
- **bot-to-botメンションは不安定** → マスターが手動転送
- Athenaは #setting に承認依頼を送る
- マスター承認後、#lab のMD仕様書をClaude Code Agentに渡す

### 出力先
- Vault: `/mnt/vault/20-Projects/YYYY-MM-DD-{slug}.md`
- GitHub: `takasaka-ctrl/slack-for-idea` → `projects/{name}/`
- ギャラリー: `projects/index.html` にカード追加（Claude Code Agentが実装）

## 手動トリガー
- 「〇〇のアイデアをブレストして」→ 即座にPDCA実行
- 「アイデア出して」→ 自律生成フロー実行
- 「〇〇を評価して」→ Step 4 から実行

## State管理
- `memory/auto-idea-state.json` — 実行履歴、重複防止
- `memory/idea-learning.md` — 学びの蓄積
- `memory/idea-keywords.json` — キーワードプール、ローテーション
