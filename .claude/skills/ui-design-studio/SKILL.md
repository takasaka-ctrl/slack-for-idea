---
name: ui-design-studio
description: End-to-end UI design skill for transforming ideas into working UI mockups. Use when (1) receiving raw ideas from Slack/OpenClaw and need to create actual UI, (2) building interactive mockups from requirements, (3) reviewing and improving UI quality, or (4) eliminating generic AI aesthetics. Combines concept generation, quality evaluation, and actual UI implementation in one workflow.
---

# UI Design Studio

アイディア原案から**実際に動くUIモックアップ**を生成するための統合スキル。
Slackから送られてくるOpenClawのアイディアを、いけてるUIデザインに変換し、成果物として納品する。

---

## ワークフロー概要

```
アイディア入力 → 要件整理 → 複数コンセプト提案 → ユーザー選択 → 品質評価 → UI実装（成果物）
```

### Phase 1: インプット処理
- Slackから受け取ったアイディア原案を解析
- 要件の補完（不明点はデフォルト適用）

### Phase 2: 複数コンセプト提案
- 多様化軸で**3案**のコンセプトを生成
- 各案のスタイル/カラー/タイポグラフィを決定
- **比較表形式でユーザーに提示**

### Phase 3: ユーザー選択
- ユーザーが気に入った案を選択（1つまたは複数）
- フィードバックを反映して調整

### Phase 4: 品質評価
- AI感排除チェック
- UX原則との整合性確認

### Phase 5: UI実装（成果物）
- 選択された案をHTMLとして実装
- **複数案選択時は複数ファイルを生成**

---

## Phase 1: インプット処理

### 必須リファレンス読み込み

**CRITICAL**: 処理開始前に以下を必ず読み込む：

```bash
view references/styles.md          # スタイル定義
view references/colors.md          # カラーパレット
view references/typography.md      # フォントペアリング
view references/ai-detection.md    # AI感排除チェック
```

### 要件の整理

| 項目 | 必須度 | デフォルト |
|------|--------|------------|
| project_type | 必須 | - |
| target_user | 推奨 | 一般ユーザー（25-45歳） |
| target_market | 推奨 | グローバル |
| purpose | 推奨 | project_typeから推測 |
| tone_keywords | 任意 | professional, modern |

### 市場判定

日本市場の場合（「日本」「Japan」「JP」等が含まれる）：
- `references/japan-market.md` の参照が**必須**
- 情報密度を高めに調整

---

## Phase 2: 複数コンセプト提案

### 多様化軸（4軸）

```
軸1: 情報密度    [sparse ←→ dense]      スコア 1-5
軸2: トーン      [formal ←→ playful]    スコア 1-5
軸3: 時代感      [classic ←→ futuristic] スコア 1-5
軸4: 彩度        [muted ←→ vibrant]     スコア 1-5
```

### 3案の配置ルール

**必須**: 3案生成時、以下を満たすこと：
1. 各案の合計スコア（4軸の和）が最小と最大で**4以上の差**
2. 3案の軸スコアが完全一致しない
3. 少なくとも1案は「安全な選択」、1案は「挑戦的な選択」

**配置例（3案生成時）**:
```
案A: [2, 2, 3, 2] → 合計9  (安全・ミニマル)
案B: [3, 3, 4, 3] → 合計13 (バランス型)
案C: [4, 4, 5, 4] → 合計17 (挑戦的・未来的)

差分: 17 - 9 = 8 ✓
```

### ユーザーへの提示形式

**REQUIRED**: 以下の比較表形式で3案を提示する：

```
┌─────────────────────────────────────────────────────────────────┐
│                    3つのデザイン案                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  【案A】Safe Choice - Swiss Minimalism                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                   │
│  軸: 密度2 / トーン2 / 時代感3 / 彩度2                            │
│  カラー: Slate系モノトーン + Cyanアクセント                        │
│  フォント: Space Grotesk + DM Sans                               │
│  特徴: クリーンで読みやすい、スケーラブル                           │
│  リスク: インパクトに欠ける可能性                                  │
│                                                                 │
│  【案B】Balanced - Modern Corporate                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                   │
│  軸: 密度3 / トーン3 / 時代感4 / 彩度3                            │
│  カラー: Navy + White + Gold                                     │
│  フォント: Inter + Source Serif Pro                              │
│  特徴: プロフェッショナル感と親しみやすさのバランス                  │
│  リスク: 無難すぎる可能性                                         │
│                                                                 │
│  【案C】Bold Choice - Neo Brutalism                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                   │
│  軸: 密度4 / トーン4 / 時代感5 / 彩度4                            │
│  カラー: Black + Neon Yellow + White                             │
│  フォント: Clash Display + Work Sans                             │
│  特徴: 記憶に残る、差別化しやすい                                  │
│  リスク: 好みが分かれる                                           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  どの案がお好みですか？（複数選択可、「AとCを組み合わせて」等も可）     │
└─────────────────────────────────────────────────────────────────┘
```

### スタイル選択と整合性検証

`references/styles.md` の軸スコア早見表を参照し、Manhattan距離が**4以下**であることを確認。

```yaml
validation:
  style_check:
    chosen: "Swiss Minimalism"
    expected_axes: [2, 2, 3, 2]
    actual_axes: [2, 3, 3, 2]
    manhattan_distance: 1
    status: "PASS"  # 4以下でPASS
```

---

## Phase 3: ユーザー選択

### 選択パターン

| ユーザーの回答 | アクション |
|--------------|-----------|
| 「Aで」 | 案Aを実装 |
| 「BとCで迷う」 | 両方実装して比較できるように |
| 「Aベースで、Cのカラーを使いたい」 | ハイブリッド案を作成 |
| 「全部作って」 | 3案すべて実装 |
| 「もっと違う案が見たい」 | 別の軸配置で再提案 |

### フィードバック対応

ユーザーからの具体的なフィードバックを反映：
- 「もっと落ち着いた感じ」→ 彩度・トーンを下げる
- 「もっとモダンに」→ 時代感を上げる
- 「情報量を増やしたい」→ 密度を上げる

---

## Phase 4: 品質評価

### 4.1 AI感排除チェック

**REQUIRED**: `references/ai-detection.md` を参照し、以下を確認：

#### Critical（該当したら修正必須）
- [ ] 紫〜青グラデーション on 白背景（意図的でない場合）
- [ ] Inter/Roboto/Arialの単独使用
- [ ] 完全対称の3カラムカードレイアウト（日本LP除く）
- [ ] 「革新的」「シームレス」等の空虚なコピー

#### 必須要素
- [ ] 明確な美的方向性（スタイル名 + 選択理由）
- [ ] 記憶に残る要素が1つ以上
- [ ] カラーパレットの意図
- [ ] フォントペアリングの根拠

### 4.2 UX原則チェック

`references/good-design.md` の原則に照らして確認：

- ユーザビリティ: 目的達成までのステップ数
- 視覚的品質: 階層構造の明確さ
- 独自性: ブランドの個性
- インタラクション: CTAの明確さ

### 4.3 アンチパターンチェック

`references/bad-design.md` の問題パターンを回避：

- 一貫性の欠如
- 視覚的階層の不在
- 低いコントラスト
- 情報過多（クラッター）

---

## Phase 5: UI実装（成果物）

### 技術スタック

成果物は以下の技術で実装：

| 技術 | 用途 |
|------|------|
| **HTML** | 構造 |
| **Tailwind CSS** | スタイリング（CDN経由） |
| **Google Fonts** | タイポグラフィ |
| **Vanilla JS** | インタラクション（必要時） |

### 出力ファイル

```
projects/
├── index.html              # ポータル（全モック一覧）← 新規カード追加
└── {project_name}/
    ├── index.html          # メインUI
    ├── README.md           # アプリ説明（必須）
    └── design-spec.yaml    # 設計仕様
```

### GitHub Pages URL

成果物は `main` ブランチにマージ後、以下のURLで閲覧可能：
- ポータル: `https://takasaka-ctrl.github.io/slack-for-idea/projects/`
- モック: `https://takasaka-ctrl.github.io/slack-for-idea/projects/{project_name}/`

### 成果物の要件

1. **単一HTMLファイル**: 依存関係なしで開ける
2. **Tailwind CDN**: `<script src="https://cdn.tailwindcss.com">`
3. **Google Fonts埋め込み**: 選択したフォントペアリング
4. **レスポンシブ対応**: モバイル〜デスクトップ
5. **ダークモード対応**: 可能な限り
6. **README.md**: アプリ概要・MVP機能・技術スタック・デザイン仕様を記載
7. **ポータル更新**: `projects/index.html` に新規モックのカードを追加

### 設計仕様（design-spec.yaml）

```yaml
project:
  name: "プロジェクト名"
  type: "dashboard"
  market: "japan"

design:
  style: "Swiss Minimalism"
  axes:
    density: 2
    tone: 2
    era: 3
    saturation: 2

  colors:
    primary: "#1e293b"
    secondary: "#64748b"
    accent: "#0ea5e9"
    background: "#f8fafc"

  typography:
    heading: "Space Grotesk"
    body: "DM Sans"

quality_check:
  ai_detection: "PASS"
  ux_principles: "PASS"
  overall: "PASS"

design_rationale:
  why_this_works: |
    ターゲットユーザーとの適合性...
  differentiator: |
    記憶に残る要素...
```

### HTML テンプレート構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{project_name}</title>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="{google_fonts_url}" rel="stylesheet">

  <!-- Custom Tailwind Config -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '{primary_color}',
            secondary: '{secondary_color}',
            accent: '{accent_color}',
          },
          fontFamily: {
            heading: ['{heading_font}', 'sans-serif'],
            body: ['{body_font}', 'sans-serif'],
          },
        }
      }
    }
  </script>
</head>
<body class="font-body bg-{background}">
  <!-- UI Implementation -->
</body>
</html>
```

### 実装ガイドライン

1. **AI感を排除**: `references/ai-detection.md` のチェックをクリア
2. **視覚的階層**: 明確なサイズ・色・余白の差
3. **インタラクション**: ホバー状態、フォーカス状態を実装
4. **アクセシビリティ**: コントラスト比4.5:1以上、適切なaria属性

---

## リファレンス一覧

| ファイル | 内容 | フェーズ |
|----------|------|----------|
| `references/styles.md` | 50+ UIスタイル定義、軸スコア早見表 | Phase 2 |
| `references/colors.md` | 90+ カラーパレット | Phase 2 |
| `references/typography.md` | 50+ フォントペアリング | Phase 2 |
| `references/ai-detection.md` | AI感排除チェックリスト | Phase 3 |
| `references/good-design.md` | UXデザイン原則 | Phase 3 |
| `references/bad-design.md` | アンチパターン集 | Phase 3 |
| `references/visual-fundamentals.md` | 余白・色・タイポ基礎 | Phase 2-3 |
| `references/japan-market.md` | 日本市場向けルール | Phase 1-2 |
| `references/layouts.md` | project_type別レイアウト | Phase 2 |
| `references/project-types.md` | project_type一覧 | Phase 1 |
| `references/v0-prompt-examples.md` | v0プロンプト実例 | Phase 4 |

---

## クイックスタート

### 入力例
```
Slackからのメッセージ:
「SaaS向けのダッシュボード。PM向け。KPI監視がメイン。freeeっぽい感じで」
```

### 処理フロー
```
1. 要件抽出:
   - project_type: dashboard
   - target_user: PM
   - target_market: 日本（freee参照）
   - purpose: KPIモニタリング

2. 複数コンセプト提案（3案）:
   - 案A: Swiss Minimalism（安全）
   - 案B: Modern Corporate（バランス）
   - 案C: Neo Brutalism（挑戦的）
   → ユーザーに比較表形式で提示

3. ユーザー選択:
   - ユーザー：「AとBで迷う、両方見たい」
   → 両案を実装することに決定

4. 品質評価:
   - AI感チェック
   - UX原則確認

5. UI実装（成果物）:
   - projects/kpi-dashboard/index.html
   - projects/kpi-dashboard/README.md
   - projects/kpi-dashboard/design-spec.yaml
   - projects/index.html にカードを追加
```

### 成果物例（単一案）

```
projects/
├── index.html            # ポータル（新規カード追加済み）
└── kpi-dashboard/
    ├── index.html        # モックUI
    ├── README.md         # アプリ説明
    └── design-spec.yaml  # 設計仕様
```

### 成果物例（複数案）

```
projects/
├── index.html            # ポータル（新規カード追加済み）
└── kpi-dashboard/
    ├── option-a/
    │   ├── index.html        # 案A: Swiss Minimalism
    │   ├── README.md
    │   └── design-spec.yaml
    ├── option-b/
    │   ├── index.html        # 案B: Modern Corporate
    │   ├── README.md
    │   └── design-spec.yaml
    └── comparison.md         # 比較サマリー
```

---

## 注意事項

1. **リファレンス参照は必須**: `referenced_files` に記載のないファイルの知識は使用しない
2. **品質評価は省略不可**: quality_check フィールドは必須
3. **設計根拠は具体的に**: 「モダン」「クリーン」等の曖昧語を避ける
4. **日本市場は別扱い**: `japan-market.md` のルールを優先
5. **複数案提示は必須**: 必ず3案を比較表形式で提示し、ユーザーに選択してもらう
6. **README.md必須**: 各モックにアプリ説明ドキュメントを含める
7. **ポータル更新必須**: `projects/index.html` に新規モックのカードを追加する

---

## 関連スキル

### ux-psychology

心理学的な根拠が必要な場合に参照：

```bash
# 使用タイミング
- コンバージョン最適化が目的のとき（損失回避、アンカー効果等）
- オンボーディングフローを設計するとき（段階的要請、目標勾配効果等）
- 「なぜこのデザインが効くのか」を説明したいとき

# 参照方法
view ../ux-psychology/ux-psychology/SKILL.md
view ../ux-psychology/ux-psychology/references/principles.md
```
