---
name: ui-concept-generator
description: Generate multiple distinct UI concept proposals from requirements. Use when (1) starting a new UI/UX design project, (2) exploring different design directions for a page/component/app, (3) needing v0-ready prompts for mockup generation, or (4) wanting to avoid generic AI aesthetics by intentionally diversifying style choices. Outputs structured concepts with layout, style direction, and v0 API prompts.
---

# UI Concept Generator

構造化された要件から、複数の異なるUIコンセプト案を生成するスキル。各コンセプトにはレイアウト設計、スタイル方向性、設計根拠（design rationale）、およびv0 API用プロンプトが含まれる。

---

## コア思想

このスキルが最も重視すること：

1. **多様性の保証**: 「安全な選択」への収束を防ぎ、対角線上に配置された明確に異なる選択肢を提示
2. **内部整合性**: 軸スコア↔スタイル↔カラー↔フォントの論理的一貫性を検証可能な形で維持
3. **設計根拠の明文化**: 「なぜこの選択か」「何を犠牲にしたか」を言語化し、意思決定を支援
4. **AI感の排除**: 没個性的なパターンを検出・回避し、記憶に残るデザインを生成

---

## ワークフロー概要

```
要件入力 → 要件補完 → 市場判定 → 多様化軸の配置 → リファレンス参照（必須）
    → スタイル選択 → 整合性検証 → コンセプト生成 → v0プロンプト出力 → 最終チェック
```

---

## Step 0: リファレンスファイルの事前読み込み（必須）

**CRITICAL**: コンセプト生成前に、以下のリファレンスファイルを必ず `view` コマンドで読み込むこと。

```bash
# 最低限必須
view references/styles.md      # スタイル定義と軸スコア早見表
view references/colors.md      # カラーパレット
view references/typography.md  # フォントペアリング

# 状況に応じて必須
view references/japan-market.md     # 日本市場向けの場合
view references/layouts.md          # レイアウト詳細が必要な場合
view references/ai-slop-checklist.md # 最終チェック時
```

出力に `referenced_files` を含めることで、実際に参照したことを証明する。

---

## Step 1: 要件の確認と補完

ユーザーから以下の情報を収集（不明な場合はデフォルト適用）：

| 項目 | 必須度 | デフォルト |
|------|--------|------------|
| project_type | 必須 | - |
| target_user | 推奨 | 一般ユーザー（25-45歳、中程度のテックリテラシー） |
| target_market | 推奨 | グローバル（日本の場合は明示） |
| purpose | 推奨 | project_typeから推測 |
| framework | 任意 | React + Tailwind + shadcn/ui |
| tone_keywords | 任意 | professional, modern |
| references | 任意 | なし |

**project_type一覧**: `references/project-types.md`

### 市場判定

`target_market` または `target_user` に以下が含まれる場合、**日本市場モード**を有効化：
- 「日本」「Japan」「JP」
- 日本企業名（freee, MoneyForward, LINE等）
- 「日本語」「和風」

日本市場モードでは `references/japan-market.md` の参照が**必須**となる。

---

## Step 2: 多様化軸の配置

3-5個のコンセプトを生成する際、以下の4軸で意図的に分散させる：

```
軸1: 情報密度    [sparse ←→ dense]      スコア 1-5
軸2: トーン      [formal ←→ playful]    スコア 1-5
軸3: 時代感      [classic ←→ futuristic] スコア 1-5
軸4: 彩度        [muted ←→ vibrant]     スコア 1-5
```

### 軸の具体的定義

**情報密度 (density)**
- 1: 極限ミニマル、1画面1メッセージ
- 2: 余白重視、視線誘導明確
- 3: バランス型、標準的なWeb
- 4: 情報豊富、スキャンしやすい密度
- 5: 高密度、ダッシュボード/日本LP的

**トーン (tone)**
- 1: 極めてフォーマル、官公庁/法律
- 2: プロフェッショナル、B2B
- 3: ニュートラル、幅広い層向け
- 4: フレンドリー、B2C
- 5: 遊び心、エンタメ/子供向け

**時代感 (era)**
- 1: 1920-1960年代（Art Deco, Mid-Century）
- 2: 1970-2000年代（Swiss, Corporate Classic）
- 3: 2000-2015年（Web 2.0, Skeuomorphism末期）
- 4: 2015-現在（Flat, Material, 現在の主流）
- 5: 未来/SF的（Cyberpunk, Aurora, 実験的）

**彩度 (saturation)**
- 1: モノクロ/グレースケール
- 2: 抑えた色、1アクセント
- 3: バランスの取れた配色
- 4: 鮮やかな色使い
- 5: ビビッド、ネオン、原色

### 配置ルール

**必須**: 5コンセプト生成時、以下を満たすこと：
1. 各軸で最低1回は「2以下」と「4以上」が登場する
2. 合計スコア（4軸の和）が最小と最大で6以上の差がある
3. 2つのコンセプトの軸スコアが完全一致しない

**配置例（5コンセプト生成時）**:
```
Concept A: [2, 2, 3, 2] → 合計9  (控えめ)
Concept B: [4, 4, 4, 4] → 合計16 (活発)
Concept C: [3, 1, 2, 3] → 合計9  (クラシック)
Concept D: [2, 5, 5, 5] → 合計17 (未来的・遊び心)
Concept E: [5, 3, 3, 2] → 合計13 (高密度・落ち着き)

差分: 17 - 9 = 8 ✓
```

---

## Step 3: スタイル・カラー・タイポグラフィの選択

**REQUIRED**: この時点で `references/styles.md` の「軸スコア早見表」を参照すること。

各コンセプトの軸スコアに基づいて、以下から選択：

- **UIスタイル**: `references/styles.md`（50+スタイル定義）
- **カラーパレット**: `references/colors.md`（業界別90+パレット）
- **フォントペアリング**: `references/typography.md`（50+組み合わせ）
- **日本市場**: `references/japan-market.md`（日本市場の場合必須）

### 選択ロジック

```
IF 情報密度 >= 4 AND トーン <= 2:
  → Data-Dense styles (Dashboard, Japanese Corporate)
  → Monospace or tabular fonts for numbers
  → 日本市場なら japan-market.md 参照必須
  
IF トーン >= 4 AND 彩度 >= 4:
  → Playful styles (Claymorphism, Vibrant Block)
  → Rounded, friendly fonts (Quicksand, Nunito)
  
IF 時代感 <= 2:
  → Classic styles (Swiss, Editorial, Art Deco)
  → Serif or geometric sans fonts
  
IF 時代感 >= 4 AND 彩度 >= 4:
  → Futuristic styles (Cyberpunk, Aurora)
  → Display fonts, neon colors

IF 日本市場モード:
  → 情報密度 +1 を基本とする
  → 日本語フォント必須（Noto Sans JP等）
  → 信頼バッジ、電話番号配置を考慮
```

---

## Step 4: 整合性検証（CRITICAL）

**CRITICAL**: スタイル選択後、以下の検証を実施。失敗した場合は再選択。

### 検証1: 軸スコアとスタイルの整合性

`references/styles.md` の「軸スコア早見表」と比較し、Manhattan距離が**4以下**であることを確認。

```yaml
# 検証例（PASS）
chosen_style: "Swiss Minimalism"
style_expected_axes: [2, 2, 3, 2]  # styles.mdから
actual_axes: [2, 3, 3, 2]
manhattan_distance: |2-2| + |2-3| + |3-3| + |2-2| = 1  → PASS

# 検証例（FAIL）
chosen_style: "Neo Brutalism"
style_expected_axes: [4, 3, 4, 5]  # styles.mdから
actual_axes: [2, 2, 3, 2]
manhattan_distance: |4-2| + |3-2| + |4-3| + |5-2| = 2+1+1+3 = 7  → FAIL
→ スタイル再選択が必要
```

### 検証2: カラーと彩度の整合性

```yaml
# 彩度スコア1-2 なら:
- パレットの彩度が低いこと（Slate, Mono, Neutral系）
- アクセントカラーは1色まで

# 彩度スコア4-5 なら:
- 複数の鮮やかな色を使用
- グラデーション使用可
```

### 検証3: フォントとトーンの整合性

```yaml
# トーン1-2（フォーマル）なら:
- Serif または Geometric Sans
- 避ける: Rounded fonts, Display fonts

# トーン4-5（プレイフル）なら:
- Rounded fonts 推奨
- Display fonts 可
```

### 検証結果の出力形式

```yaml
validation:
  style_check:
    chosen: "Swiss Minimalism"
    expected_axes: [2, 2, 3, 2]
    actual_axes: [2, 3, 3, 2]
    manhattan_distance: 1
    status: "PASS"  # 4以下でPASS
  color_check:
    saturation_score: 2
    palette_type: "muted"
    status: "PASS"
  typography_check:
    tone_score: 3
    font_category: "geometric-sans"
    status: "PASS"
  overall: "PASS"  # 全てPASSで初めてPASS
```

---

## Step 5: 情報設計テンプレートの適用

project_typeに応じた標準的な情報構造を適用：

- **LP/Landing Page**: Hero → Features → Social Proof → CTA
- **Dashboard**: Nav → Header → KPI Cards → Main Content → Activity
- **Mobile App**: Bottom Nav → Header → Content → FAB
- **E-commerce**: Header → Search → Grid → Filters → Cart

**日本市場LP**: `references/japan-market.md` の構造を優先（電話番号ヘッダー、信頼バッジ、会社概要等）

詳細: `references/layouts.md`

---

## Step 6: v0プロンプトの生成

各コンセプトに対して、v0 APIに渡すプロンプトを生成。

### v0プロンプト品質ガイドライン

- **推奨語数**: 200-350語
- **最大語数**: 450語（これ以上は品質低下の可能性）
- **優先順位**: Layout > Color > Typography > Interactions（後半は削減可能）

### v0プロンプトテンプレート

```
Create a [project_type] with the following specifications:

**Layout Structure:**
[layout_description from Step 5]

**Visual Style:** [style_name]
- [characteristic_1]
- [characteristic_2]
- [characteristic_3]

**Color Palette:**
- Primary: [hex_code] ([color_name])
- Secondary: [hex_code]
- Accent: [hex_code]
- Background: [hex_code]

**Typography:**
- Headings: [font_family], [weight]
- Body: [font_family], [weight]
- Import: [google_fonts_url]

**Key Components:**
1. [component_1_description]
2. [component_2_description]
3. [component_3_description]

**Interactions:**
- [hover_effect]
- [animation]

**Constraints:**
- Use shadcn/ui components
- Use Tailwind CSS
- Responsive design (mobile-first)
- Accessibility: WCAG AA compliant

**Contextual Guidelines:**
[context_specific_guidelines - see below]

This design should feel [tone_keywords] and be memorable for [differentiation_element].
```

### Contextual Guidelines（コンテキスト別ガイドライン）

従来の「Avoid」セクションを、コンテキスト付きガイドラインに置き換え：

```yaml
# デフォルト（ほとんどのケース）
contextual_guidelines:
  - "Prefer solid colors over purple-blue gradients unless intentionally referencing AI/tech aesthetic"
  - "Use Inter only for body text when paired with a distinctive heading font"
  - "Break symmetry in card layouts - vary sizes or use bento grid"

# 日本市場LP
contextual_guidelines:
  - "3-column layouts acceptable for feature comparisons"
  - "Higher information density expected - include trust badges, company logos"
  - "Phone number should be prominent in header"
  - "Include company overview section"

# クリエイティブ/実験的
contextual_guidelines:
  - "Purple-blue gradients acceptable if used ironically or as AI aesthetic commentary"
  - "Symmetric layouts can be used for intentional visual rhythm"
  - "Rule-breaking is encouraged if intentional"
```

---

## Step 7: Design Rationale（設計根拠）の作成

**REQUIRED**: 各コンセプトに対して、以下の構造で設計根拠を明文化する。

```yaml
design_rationale:
  why_this_works: |
    [ターゲットユーザーとの適合性]
    [参照デザインとの関連]
    [project_typeとの整合性]
  
  trade_offs:
    sacrificed: "[何を犠牲にしたか]"
    gained: "[何を得たか]"
  
  differentiator: |
    [このコンセプトを記憶に残らせる要素]
    [競合との差別化ポイント]
  
  risks:
    - "[想定されるリスクや懸念]"
```

### Design Rationale 例

```yaml
design_rationale:
  why_this_works: |
    ターゲットの「30代PM、Linear/Notion愛用者」は
    既にダークモードUIに慣れており、情報密度の高い
    インターフェースを好む。Space Groteskは
    Linearのフォントに近く、親和性が高い。
  
  trade_offs:
    sacrificed: "初見のインパクト（控えめな色使い）"
    gained: "長時間使用での目の疲労軽減、既存ツールとの一貫性"
  
  differentiator: |
    KPI数字を「JetBrains Mono + Cyan」で強調。
    数字の視認性に特化したデザインで、
    「データを見る」体験を最適化。
  
  risks:
    - "ダークモード未対応環境での体験低下"
    - "ブランドカラーとの整合性要確認"
```

---

## 出力フォーマット

```yaml
# メタ情報
generation_meta:
  referenced_files:
    - "styles.md"
    - "colors.md"
    - "typography.md"
    - "japan-market.md"  # 日本市場の場合
  market_mode: "japan"  # または "global"
  diversity_check:
    min_total_score: 9
    max_total_score: 17
    score_difference: 8  # >= 6 必須

# コンセプト
concepts:
  - id: A
    name: "コンセプト名（具体的に）"
    
    # 軸スコアと検証
    axes:
      density: 2
      tone: 2
      era: 3
      saturation: 2
      total: 9
    
    # スタイル選択と整合性検証
    style:
      name: "Swiss Minimalism"
      expected_axes: [2, 2, 3, 2]  # styles.mdから
      characteristics:
        - "グリッドベース"
        - "余白重視"
        - "タイポグラフィ中心"
    
    # 整合性検証（必須）
    validation:
      style_check:
        manhattan_distance: 0
        status: "PASS"
      color_check:
        status: "PASS"
      typography_check:
        status: "PASS"
      overall: "PASS"
    
    # カラー（HEXコード必須）
    colors:
      palette_name: "Slate Mono"
      primary: "#1e293b"
      secondary: "#64748b"
      accent: "#0ea5e9"
      background: "#f8fafc"
    
    # タイポグラフィ
    typography:
      heading: "Space Grotesk"
      heading_weight: "600, 700"
      body: "DM Sans"
      body_weight: "400, 500"
      import_url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=DM+Sans:wght@400;500&display=swap"
      # 日本市場の場合
      japanese_font: "Noto Sans JP"
      japanese_import: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
    
    # レイアウト
    layout:
      structure: "sidebar-left"
      sections:
        - "header"
        - "kpi-cards"
        - "main-chart"
        - "activity-feed"
    
    # 設計根拠（必須）
    design_rationale:
      why_this_works: |
        ターゲットユーザーとの適合性の説明...
      trade_offs:
        sacrificed: "..."
        gained: "..."
      differentiator: |
        このデザインの記憶に残る要素...
      risks:
        - "リスク1"
    
    # v0プロンプト
    v0_prompt: |
      Create a dashboard...
    
    # 評価
    pros:
      - "クリーンで読みやすい"
      - "スケーラブル"
    cons:
      - "インパクトに欠ける可能性"
```

---

## AI感排除チェック（最終確認）

**REQUIRED**: 出力前に `references/ai-slop-checklist.md` を参照し、以下を確認。

### Critical（該当したら修正必須）

- [ ] 紫〜青グラデーション on 白背景（意図的でない場合）
- [ ] Inter/Roboto/Arialの**単独**使用（ペアリングなら可）
- [ ] 完全対称の3カラムカードレイアウト（日本LP/比較表を除く）
- [ ] 「革新的」「シームレス」「次世代」等の空虚なコピー

### 必須要素（満たさないと不完全）

- [ ] 明確な美的方向性（スタイル名 + 選択理由）
- [ ] 記憶に残る要素が1つ以上（differentiatorに記載）
- [ ] カラーパレットの意図（なぜこの色か）
- [ ] フォントペアリングの根拠（なぜこの組み合わせか）

詳細: `references/ai-slop-checklist.md`

---

## リファレンス一覧

| ファイル | 内容 | 参照タイミング | 必須度 |
|----------|------|----------------|--------|
| `references/styles.md` | 50+ UIスタイル定義、軸スコア早見表 | Step 3, 4 | **必須** |
| `references/colors.md` | 90+ カラーパレット | Step 3 | **必須** |
| `references/typography.md` | 50+ フォントペアリング | Step 3 | **必須** |
| `references/japan-market.md` | 日本市場向け設計ルール | Step 1, 3, 5 | **日本市場で必須** |
| `references/layouts.md` | project_type別レイアウト | Step 5 | 推奨 |
| `references/project-types.md` | project_type一覧と特徴 | Step 1 | 推奨 |
| `references/ai-slop-checklist.md` | AI感排除チェックリスト | 最終確認 | **必須** |
| `references/v0-prompt-examples.md` | v0プロンプト実例集 | Step 6 | 推奨 |

---

## 使用例

### 入力例
```yaml
project_type: dashboard
target_user: SaaSプロダクトマネージャー（30-40代）
target_market: 日本
purpose: チームのKPIモニタリング
tone_keywords: professional, trustworthy, modern
references: Linear, Notion, freee
```

### 出力例（抜粋）
```yaml
generation_meta:
  referenced_files: ["styles.md", "colors.md", "typography.md", "japan-market.md"]
  market_mode: "japan"
  diversity_check:
    min_total_score: 9
    max_total_score: 16
    score_difference: 7

concepts:
  - id: A
    name: "Monochrome Data Focus"
    axes:
      density: 4
      tone: 2
      era: 4
      saturation: 1
      total: 11
    style:
      name: "Dark Mode OLED"
      expected_axes: [3, 2, 4, 2]
    validation:
      style_check:
        manhattan_distance: 2
        status: "PASS"
      overall: "PASS"
    design_rationale:
      why_this_works: |
        freeeユーザーは情報密度の高いUIに慣れている。
        ダークモードは長時間のデータ分析に適し、
        Cyanアクセントで重要指標を強調。
      trade_offs:
        sacrificed: "親しみやすさ（ダークは威圧感の可能性）"
        gained: "プロフェッショナル感、データ視認性"
      differentiator: |
        「数字がCyanで浮き上がる」体験。
        KPIカードのスパークラインが特徴的。
      risks:
        - "ライトモード未対応だと一部ユーザーに不評"
    typography:
      heading: "Space Grotesk"
      body: "DM Sans"
      japanese_font: "Noto Sans JP"
```

---

## 注意事項

1. **リファレンス参照は必須**: `referenced_files` に記載のないファイルの知識は使用しない
2. **整合性検証は省略不可**: validation フィールドは必須、FAILなら再選択
3. **設計根拠は具体的に**: 「モダン」「クリーン」等の曖昧語を避け、具体的な理由を述べる
4. **日本市場は別扱い**: `japan-market.md` のルールは他のルールより優先
5. **v0プロンプトは簡潔に**: 450語以下を厳守
6. **多様性を検証**: diversity_check で score_difference >= 6 を確認
