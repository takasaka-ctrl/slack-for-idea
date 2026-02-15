# AI Slop Checklist

AI生成デザインの典型的パターンを検出・排除するためのチェックリスト。

## 概要

「AI Slop」「AI感」とは、AI生成コンテンツに見られる没個性的で画一的な特徴。以下のチェックリストで検出し、排除する。

**重要**: このチェックリストは「絶対禁止」ではなく「コンテキスト依存」で判断する。意図的な選択であれば許容される場合がある。

---

## 🚫 Critical（要正当化）

以下に該当する場合、**正当な理由がなければ修正**。理由があれば `justification` に記載：

### タイポグラフィ
| パターン | デフォルト判定 | 許容されるケース |
|----------|--------------|-----------------|
| Inter単独使用（見出し・本文両方） | ⚠️ 修正推奨 | 本文のみで、見出しに個性的フォントがある場合は可 |
| Roboto単独使用 | ⚠️ 修正推奨 | Googleプロダクト連携を意図した場合は可 |
| Arial/Helvetica単独使用 | ⚠️ 修正推奨 | ブランドガイドライン準拠の場合は可 |
| system-ui単独使用 | ⚠️ 修正推奨 | パフォーマンス最優先の場合は可 |
| フォント1種類のみ | ⚠️ 修正推奨 | Ultra Minimalスタイルで意図的な場合は可 |

### カラー
| パターン | デフォルト判定 | 許容されるケース |
|----------|--------------|-----------------|
| 白背景 + 紫→青グラデーション | ⚠️ 修正推奨 | AI/テック企業で意図的に使う、またはパロディ |
| blue-500単独アクセント | ⚠️ 修正推奨 | 企業ブランドカラーの場合は可 |
| 彩度100%原色のみ | ⚠️ 修正推奨 | Neo Brutalism等で意図的な場合は可 |
| gray-100/gray-900のみ | ⚠️ 修正推奨 | モノクロスタイルで意図的な場合は可 |

### レイアウト
| パターン | デフォルト判定 | 許容されるケース |
|----------|--------------|-----------------|
| 完全対称3カラムカード | ⚠️ 修正推奨 | **日本市場LP/比較表/料金プラン**では正当 |
| 左テキスト・右画像ヒーロー | ⚠️ 修正推奨 | 製品デモを見せる必要がある場合は可 |
| 全要素同一border-radius | ⚠️ 修正推奨 | デザインシステム統一の場合は可 |
| 均等配置のみ | ⚠️ 修正推奨 | グリッドシステム厳格遵守の場合は可 |

### コンテンツ
| パターン | デフォルト判定 | 許容されるケース |
|----------|--------------|-----------------|
| 「革新的」「シームレス」等 | 🚫 常に修正 | 許容されるケースなし |
| 「今日の急速に変化する世界で」 | 🚫 常に修正 | 許容されるケースなし |
| Lorem ipsum放置 | 🚫 常に修正 | プロトタイプ明示の場合のみ可 |
| 汎用ストックイラスト | ⚠️ 修正推奨 | カスタムイラスト不可の場合は可（要注記） |

---

## ⚠️ 警告パターン（Warning）

該当する場合は**改善を検討**：

### タイポグラフィ
- [ ] Open Sans単独使用
- [ ] Lato単独使用
- [ ] Montserrat単独使用（見出しのみなら可）
- [ ] フォントウェイトが2種類以下
- [ ] letter-spacing調整なし

### カラー
- [ ] Tailwindデフォルトカラーそのまま使用
- [ ] アクセントカラー1色のみ
- [ ] コントラスト比が全て同じ
- [ ] 背景が純白（#ffffff）のみ

### レイアウト
- [ ] 8pxグリッドに完全に乗っていない
- [ ] 余白が均一すぎる
- [ ] カードシャドウがデフォルト（shadow-md等）
- [ ] ホバーエフェクトなし

### コンテンツ
- [ ] プレースホルダー画像（placeholder.com等）
- [ ] 汎用アイコンセットのデフォルト使用
- [ ] CTA文言が「Get Started」「Learn More」のみ

---

## ✅ 必須要素（Must Have）

良いデザインには以下が含まれる：

### 明確な美的方向性
- [ ] スタイル名が言える（例：Swiss Minimal, Neo Brutalism）
- [ ] なぜそのスタイルを選んだか説明できる
- [ ] 参照したデザインがある

### 記憶に残る要素
- [ ] 1つ以上のユニークな視覚要素
- [ ] 予想外のデザイン選択が1つ以上
- [ ] コンテキストに応じたカスタマイズ

### カラーパレットの意図
- [ ] 3-5色の制限されたパレット
- [ ] 色の選択理由が説明できる
- [ ] 60-30-10ルールに近い配分

### タイポグラフィの個性
- [ ] 見出しと本文で異なるフォント
- [ ] 適切なフォントウェイトの使い分け
- [ ] 文脈に合ったフォント選択

---

## 検出アルゴリズム

### Step 1: 禁止パターンスキャン
```
FOR each prohibition IN critical_prohibitions:
  IF design MATCHES prohibition:
    FAIL with "Critical: {prohibition.name}"
```

### Step 2: 警告パターンスキャン
```
warning_count = 0
FOR each warning IN warning_patterns:
  IF design MATCHES warning:
    warning_count++
    ADD warning to issues

IF warning_count >= 3:
  SUGGEST major revision
```

### Step 3: 必須要素確認
```
must_have_count = 0
FOR each requirement IN must_have:
  IF design HAS requirement:
    must_have_count++

IF must_have_count < 3:
  SUGGEST adding unique elements
```

---

## 修正ガイドライン

### タイポグラフィの修正

**Before（AI感あり）**:
```css
font-family: Inter, sans-serif;
```

**After（個性あり）**:
```css
/* 見出し */
font-family: "Space Grotesk", sans-serif;
/* 本文 */
font-family: "DM Sans", sans-serif;
```

### カラーの修正

**Before（AI感あり）**:
```css
background: linear-gradient(135deg, #8b5cf6, #3b82f6);
```

**After（個性あり）**:
```css
/* オプション1: ソリッドカラー */
background: #0f172a;

/* オプション2: 独自のグラデーション */
background: linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%);

/* オプション3: テクスチャ追加 */
background: #1a1a2e;
background-image: url("data:image/svg+xml,..."); /* noise */
```

### レイアウトの修正

**Before（AI感あり）**:
```html
<div class="grid grid-cols-3 gap-4">
  <Card /><Card /><Card />
</div>
```

**After（個性あり）**:
```html
<!-- オプション1: 非対称グリッド -->
<div class="grid grid-cols-4 gap-4">
  <Card class="col-span-2" />
  <Card />
  <Card />
</div>

<!-- オプション2: Bento Grid -->
<div class="grid grid-cols-4 grid-rows-2 gap-4">
  <Card class="col-span-2 row-span-2" />
  <Card />
  <Card />
  <Card class="col-span-2" />
</div>
```

---

## スコアリング

### 計算方法
```
base_score = 10

# 禁止パターン: -2点/each
FOR each critical_violation:
  base_score -= 2

# 警告パターン: -0.5点/each
FOR each warning:
  base_score -= 0.5

# 必須要素不足: -1点/each missing
FOR each missing_must_have:
  base_score -= 1

final_score = max(0, base_score)
```

### スコア解釈
- **9-10**: 優秀 - 個性的で記憶に残る
- **7-8**: 良好 - 小さな改善で優秀に
- **5-6**: 普通 - AI感が残る、要改善
- **3-4**: 要注意 - 大幅な見直し必要
- **0-2**: 不可 - 根本的な再設計必要

---

## クイックチェック質問

以下の質問にすべて「はい」と答えられるか確認：

1. このデザインを見て、どのスタイル/ジャンルか説明できるか？
2. 他のAI生成サイトと見分けがつくか？
3. 1週間後に思い出せる要素があるか？
4. なぜこのフォントを選んだか説明できるか？
5. なぜこのカラーを選んだか説明できるか？
6. ターゲットユーザーにとって適切か？
7. ブランドの個性が表現されているか？

---

## 市場別コンテキストガイドライン

### グローバル/欧米市場

**厳格に適用**:
- 3カラム対称レイアウトは避ける
- 紫青グラデーションは避ける
- 情報密度は抑えめ

**許容**:
- 余白を大きく取る
- シンプルなCTA（"Get Started"等）

### 日本市場

**許容される例外**:
- 3カラム対称レイアウト（比較表、料金プラン）
- 高い情報密度（信頼バッジ、FAQ大量）
- 電話番号の目立つ配置

**厳格に適用**:
- 空虚なコピーは避ける（「革新的」等）
- 汎用イラストは避ける

### クリエイティブ/実験的

**許容される例外**:
- 紫青グラデーション（AIパロディとして）
- 対称レイアウト（意図的なリズム）
- ルール破り（明示的な意図があれば）

**必須**:
- 意図の明文化（design_rationale.justification）

---

## 正当化（Justification）の書き方

Criticalパターンに該当するが許容する場合、以下の形式で正当化を記載：

```yaml
ai_slop_check:
  violations:
    - pattern: "3カラム対称レイアウト"
      status: "JUSTIFIED"
      justification: |
        日本市場向けLPであり、料金プランの比較表として
        3カラム対称が最も情報を比較しやすい。
        japan-market.md のガイドラインに準拠。
    - pattern: "Inter使用"
      status: "JUSTIFIED"
      justification: |
        本文のみでの使用。見出しにはSpace Groteskを
        使用しており、ペアリングとして成立。
  unjustified_count: 0
  overall: "PASS"
```

正当化なしで Critical に該当する場合：

```yaml
ai_slop_check:
  violations:
    - pattern: "紫青グラデーション"
      status: "FAIL"
      justification: null
  unjustified_count: 1
  overall: "FAIL - 修正が必要"
```

---

## 自動検出のためのパターンマッチング

### カラーパターン検出

```javascript
// 紫青グラデーション検出
const purpleBlueGradient = /linear-gradient.*#[89ab][0-9a-f]{4}[56].*#[23][0-9a-f]{4}[56f]/i;

// Tailwindデフォルト紫青
const tailwindPurpleBlue = /(violet|purple|indigo|blue)-(4|5|6)00/;
```

### フォント検出

```javascript
// 単独使用検出
const singleFontPattern = /font-family:\s*["']?(Inter|Roboto|Arial|Helvetica)["']?\s*[,;]/;

// ペアリング検出（許容）
const fontPairingPattern = /font-family:.*,.*sans-serif/;
```

### レイアウト検出

```javascript
// 3カラム対称検出
const threeColumnSymmetric = /grid-cols-3.*gap-\d/;

// Bento Grid（許容）
const bentoGrid = /col-span-\d|row-span-\d/;
```
