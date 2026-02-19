# #lab チャンネル指示

**役割:** アイデアをブレインストーミング・評価・改善するPDCAサイクル。

**使用スキル:** `workspace/skills/idea-workflow/SKILL.md`

**State ファイル:** `workspace/state/pending-ideas.json`

## 自動化フロー（毎日 2:00 JST / cron設定済み）

### Phase 1 - 質問生成（自動）
1. `/mnt/vault/10-Ideas/` から未処理のアイデアを1つ選択
2. 処理済みマーカー: `/mnt/vault/10-Ideas/.processed/{filename}.done`
3. アイデア内容を分析し、確認質問を生成
4. #lab に投稿（親: タイトル + 概要、スレッド: 原文 + 質問）
5. スレッドIDを `pending-ideas.json` に保存して待機

### Phase 2 - PDCA実行（マスター回答後）
1. マスターがスレッドで回答 → PDCAサイクル実行
2. 最終原案を `/mnt/vault/20-Projects/{日付}-{アイデア名}.md` に保存
3. `<@U0ADRLM7GE9>` (Claude Code Agent) にメンション
4. ⚠️ **原案MDの全文をコードブロックで投稿**（ファイルパスのみ不可）

**マスターが48時間以内に未回答の場合:** Phase 2 スキップ、`.done` は作成しない

## PDCA処理フロー
1. **Plan:** 問題起点でアイデア生成（3〜5個）
2. **Do:** PUGEF / ICE / Market / Advantage スコアで評価
3. **Check:** ギャップ分析・改善優先度決定
4. **Act:** 優先度に基づきアイデア改善
5. スコア ≥ 7.0 または最大3イテレーションで終了

## 手動トリガー例
- "〇〇のアイデアをブレストして評価したい" → 即座にPDCA実行
