# idea-learning.md — アイデア生成の学び

_最終更新: 2026-02-26_

---

## うまくいったパターン

### ✅ MemoryScope (2026-02-26) — スコア 8.6/10
- **戦略:** Integration/Bridge + Trend Riding
- **What worked:**
  - 既存ツール(LangSmith/Arize)にピギーバックする戦略 → 自前でインフラ不要
  - Chrome拡張という配信手段 → 発見されやすい、導入障壁低い
  - ニッチに絞る(メモリ特化) → 競合(LangSmith等)は汎用、差別化できる
  - エビデンスベース → memU 10K stars, Medium記事で「Memory≠vector DB」確認
  - Freemium SaaSモデル → 開発ツールで実績ある価格帯($9-19/mo)
- **Key insight:**
  - "汎用ツールのニッチ機能を専門化したChrome拡張"は勝てる構図
  - トレンド(context engineering)とギャップ(toolingが追いついてない)の交点を狙う
  - Standalone SaaSより拡張機能の方が早く作れて配信も有利(Chrome Web Store)
- **Evidence quality:** 高 — GitHub stars(10K+) + 専門家記事 + 既存ツール市場の存在

---

## うまくいかなかったパターン

- **OpenClaw自己改善ツール** — 収益化スコアが常に低い。"never" リストに追加済み。
  - Slack Memory Sync (8.2) → 内向きすぎ
  - Context-Aware Heartbeat Responder (8.5) → 内向きすぎ
  - Auto-Vault Curator (8.25) → 内向きすぎ
- **評価スコアが甘い傾向** — v1の平均8.33/10は高すぎ。定量基準を導入して是正。

---

## マスターの反応パターン

- ピクセルアート/ゲーム系 → 興味を示す
- 地味なBtoB → 反応薄い
- 「すぐ試せる」「すぐ動く」系 → 即「やってみたい」
- 収益化の話 → 強い関心
- UI/UXの品質 → こだわる。「AI感のない」が最重要

---

## スコア傾向分析

- v1平均: 8.33（サンプル3）— 定量基準なしで甘くなった
- v2初回: 8.6（サンプル1）— Integration戦略 + エビデンス充実で高スコア達成
- **健全な範囲:** 平均6.5-7.5、7.5超えは本当にいいアイデア
- **今回の教訓:** 既存市場へのピギーバック戦略はスコアが高くなりやすい(市場実証済み)

---

## メタ学習（フロー自体の改善）

- v1: cronスクリプト → heartbeat委譲 → 実行率低い
- v2: heartbeat直接トリガー + SKILL.md参照で改善
- **今回:** cronから直接実行 — 確実に動く ✅

---

## 次回への提案

### カテゴリ・メソッドのローテーション
- 今回使用: **Developer Tool** × **Integration/Bridge + Trend Riding**
- 次回避けるべき: 同じカテゴリ・メソッド(多様性のため)
- 推奨: Productivity, Business Tool, Content Creation等

### エビデンス収集のコツ
- GitHub stars(10K+)は強い指標
- Medium/専門家ブログは教育ギャップを証明
- 既存ツールの存在 = 市場が実証済み
- web_search → web_fetch の2段階が効果的

### Chrome拡張戦略の汎用化
- 他の汎用ツール(Notion, Figma, VSCode)でも使えるか?
- 「〇〇に特化した機能を拡張機能で追加」パターンは強い

### 2026-02-27 morning — ZeiQ（AI仕訳アシスタント Chrome拡張）
- カテゴリ: 業務効率化ツール
- メソッド: F（高いサービスの安い代替）
- スコア: 6.8/10（7.5未満 → 仕様書見送り）
- エビデンス: freee時価総額2,139億円、462万フリーランス、請求書ツール13+存在
- 反省:
  - 請求書・会計市場は**レッドオーシャン**。既存プレイヤーが強すぎる
  - 「安い代替」メソッドは大手が相手だと差別化スコアが伸びにくい
  - Chrome拡張は模倣容易 → Advantage が構造的に低い
  - **教訓: 大手プラットフォーム上の寄生型は、プラットフォーム自体が機能追加したら死ぬ**
  - 次回は「既存大手が参入しにくいニッチ」を狙うべき
- マスター反応: （後日追記）

### 2026-02-27 evening — VoiceSnap（Voice Notes for Figma Plugin）
- カテゴリ: Productivity Tool（Figma Plugin）
- メソッド: Combination/Remix（Voice + Visual + Async + Ecosystem leverage）
- スコア: **7.83/10** ✅（7.5超え → プロトタイプ作成済み）
- エビデンス: Voice adoption 50% daily (YouGov), Async 61% preferred (Gartner), Figma 4M users
- **イテレーション改善**: 初回7.33 (Chrome拡張) → 7.83 (Figma Plugin) = +0.5pt
- 成功要因:
  - **Pivot戦略が効いた**: Chrome拡張 → Figma Plugin で Distribution+8.5, Build-7.5 改善
  - **エコシステム活用**: Figmaの4M userbase = 既存市場にピギーバック（MemoryScopeパターン再現）
  - **トレンド合致**: Voice (50% adoption) + Async (61% preference) = 2026年の流れに乗る
  - **First-mover advantage**: Figma音声プラグインは存在しない（ニッチ独占可能）
  - **"Boring" micro-SaaS**: AI感なし、シンプルなツール = 収益化しやすい
- プロトタイプ品質:
  - Figma Plugin完全実装（manifest, code.ts/js, ui.html）
  - プロフェッショナルUI（AI感ゼロ、Figmaネイティブスタイル）
  - Free tier制限実装（10 notes/month, 60s max）
  - Git commit済み、GitHub push待ち
- 収益モデル: Free (10/mo) → Pro ($9/mo) → Team ($39/mo for 5 users)
- マスター反応: （後日追記）

### プロトタイプ品質
- 今回: 完全に動くChrome拡張(manifest, content script, styles完備)
- UI: プロフェッショナル品質、AI感なし ✅
- ドキュメント: README, LICENSE完備 ✅
- Git commit済み(GitHub push待ち)
