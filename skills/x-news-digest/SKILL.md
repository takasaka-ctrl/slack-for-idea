# AI News Digest - Real-Time Collection Skill

## 概要
`web_search` を使って最新のAIニュース（過去48時間以内）をリアルタイム収集し、新聞スタイルのHTMLダイジェストを生成・デプロイするスキル。
**海外AIインフルエンサーのXバズ投稿を必ず含めること。**

---

## 🌍 優先収集ターゲット：海外インフルエンサーのXバズ投稿

以下の人物のXポストが特に重要。名前 + キーワードでweb_searchして見つける。

### AIモデル・研究系
| ハンドル | 名前 | 専門 |
|---------|------|------|
| @karpathy | Andrej Karpathy | AI研究、元Tesla・OpenAI |
| @sama | Sam Altman | OpenAI CEO |
| @darioamodei | Dario Amodei | Anthropic CEO |
| @demishassabis | Demis Hassabis | Google DeepMind CEO |
| @gdb | Greg Brockman | OpenAI |
| @alexalbert__ | Alex Albert | Anthropic |

### 開発者・エンジニア系
| ハンドル | 名前 | 専門 |
|---------|------|------|
| @swyx | swyx | AI Engineering |
| @simonw | Simon Willison | AI Tools、LLM CLI |
| @steipete | Peter Steinberger | OpenClaw、iOS |
| @eugeneyan | Eugene Yan | AI Engineering |
| @mckaywrigley | Mckay Wrigley | AI Tools |

### 個人開発・インディーハッカー系
| ハンドル | 名前 | 専門 |
|---------|------|------|
| @levelsio | Pieter Levels | 個人開発の伝説、Nomad List |
| @marc_louvion | Marc Lou | AI SaaS構築 |
| @dannypostmaa | Danny Postma | AI Products |
| @tdinh_me | Tony Dinh | インディーハッカー |
| @NickADobos | Nick Dobos | AI Productivity |

### iOS/Android開発系
| ハンドル | 名前 | 専門 |
|---------|------|------|
| @twostraws | Paul Hudson | Swift/iOS |
| @johnsundell | John Sundell | Swift |
| @rudrankriyam | Rudrank Riyam | iOS AI |

---

## 実行手順

### Step 1: Xバズ投稿の収集（最優先）

**各editionの前に、以下の「Xバズ検索」を必ず実行する（全edition共通）:**

```
Xバズ検索クエリ（freshness: "pd" で実行）:
1. "karpathy" AI (freshness: pd)
2. "swyx" OR "simonw" AI tweet viral (freshness: pd)
3. "levelsio" indie AI (freshness: pd)
4. "sama" OpenAI announcement (freshness: pd)
5. site:x.com AI viral trending (freshness: pd)
6. "@steipete" OR "@alexalbert__" Claude (freshness: pd)
```

**ヒットしたXポストは積極的に記事化する。**
- ツイートのURL（x.com/...）を `sourceUrl` に使用
- 著者は `@handle (本名)` 形式で記載
- バズってる内容（いいね・RTが多そうなもの）を優先

### Step 2: editionテーマ別の追加収集

editionに応じて以下のクエリも実行する（freshness: "pd"）。

#### 朝刊 (morning) — AIモデル最新動向
```
1. "Claude Anthropic" new (freshness: pd)
2. "OpenAI" release announcement (freshness: pd)
3. "Gemini Google" update (freshness: pd)
4. AI model benchmark released (freshness: pd)
5. "AI news" today viral (freshness: pd)
```

#### 昼刊 (noon) — 実践Tips・ツール活用
```
1. "Claude Code" tips workflow (freshness: pd)
2. Ollama model release (freshness: pd)
3. AI coding productivity (freshness: pd)
4. LLM developer tool (freshness: pd)
5. AI prompt engineering trick (freshness: pd)
```

#### 夕刊 (evening) — 個人開発・iOS/Android
```
1. indie developer AI SaaS launched (freshness: pd)
2. SwiftUI AI app (freshness: pd)
3. Android Gemini integration (freshness: pd)
4. "built with AI" product launch (freshness: pd)
5. AI startup MRR revenue (freshness: pd)
```

**情報が少なければ freshness: "pw"（1週間）に拡大して再検索する。**

---

### Step 3: 記事の選定・構成

以下の優先順位で記事を選定する:

1. **海外インフルエンサーのXバズ投稿** → hero / opinions に配置
2. **公式発表（Anthropic/OpenAI/Google）** → hero / sidebar に配置
3. **技術記事・チュートリアル** → middle / sidebar に配置
4. **短いニュース** → briefs に配置

**必ず1記事以上を「X（Twitter）バズ投稿」から選ぶこと。**

---

### Step 4: JSON生成

以下の構造に従ってJSONを作成する。

```json
{
  "date": "<日本語日付 例: 2026年2月18日（水曜日）>",
  "edition": "<朝刊|昼刊|夕刊>",
  "volume": "1",
  "tickerText": "<速報タイトルを5〜7個、 ── で区切る。最後に最初のものを繰り返す>",

  "dataPanel": [
    {
      "label": "<指標名（日本語）>",
      "value": "<値>",
      "sparkline": "▁▂▃▅▇█",
      "change": "▲ <変化の説明>",
      "changeClass": "up"
    }
  ],

  "hero": {
    "id": "<英数字のID>",
    "category": "<カテゴリ名（日本語）>",
    "categoryClass": "<ai|tech|research|business|openai|gemini|indie|mobile>",
    "headline": "<見出し（日本語、インパクトのある表現で）>",
    "deck": "<リード文（日本語、2〜3文で記事の要点を伝える）>",
    "author": "<情報源 例: @karpathy (Andrej Karpathy)>",
    "readTime": "<数字（分）>",
    "readPercent": 50,
    "readLabel": "<速読|中程度|長文>",
    "updateTime": "<例: 本日 06:30 または X時間前>",
    "fullContent": {
      "introduction": "<記事の概要（3〜5文）>",
      "sections": [
        {
          "heading": "<セクションタイトル>",
          "content": "<本文（日本語）>",
          "steps": ["<ステップ1>", "<ステップ2>"],
          "code": "<コードがある場合>",
          "warning": "<警告がある場合>"
        }
      ],
      "keyTakeaways": ["<重要ポイント1>", "<重要ポイント2>", "<重要ポイント3>"],
      "sourceUrl": "<元ツイートURL（x.com/...）または記事URL>",
      "relatedLinks": [{"title": "<タイトル>", "url": "<URL>"}]
    }
  },

  "sidebar": [
    {
      "id": "<英数字のID>",
      "category": "<カテゴリ名>",
      "categoryClass": "<ai|tech|research|business|openai|gemini|indie|mobile>",
      "headline": "<見出し（日本語）>",
      "summary": "<2〜3文の要約（日本語）>",
      "readTime": "<数字>",
      "timeAgo": "<X時間前 または 本日HH:MM>",
      "fullContent": {
        "introduction": "<概要>",
        "sections": [{"heading": "<h>", "content": "<c>"}],
        "keyTakeaways": ["<pt1>", "<pt2>"],
        "sourceUrl": "<URL>"
      }
    }
  ],

  "middle": [
    {
      "id": "<英数字のID>",
      "category": "<カテゴリ名>",
      "categoryClass": "<ai|tech|research|business|openai|gemini|indie|mobile>",
      "gradient": "<categoryClassに対応するgradient>",
      "headline": "<見出し（日本語）>",
      "summary": "<2〜3文の要約>",
      "author": "<著者・情報源>",
      "readTime": "<数字>",
      "fullContent": {
        "introduction": "<概要>",
        "sections": [{"heading": "<h>", "content": "<c>"}],
        "keyTakeaways": ["<pt1>", "<pt2>"],
        "sourceUrl": "<URL>"
      }
    }
  ],

  "briefs": [
    {"headline": "<見出し（短め）>", "text": "<1〜2文の説明>"}
  ],

  "opinions": [
    {
      "id": "<英数字のID>",
      "authorLabel": "X投稿：",
      "author": "<@handle (本名)>",
      "headline": "<オピニオンのタイトル（日本語）>",
      "excerpt": "<ツイートや分析の要点を日本語で2〜3文>",
      "fullContent": {
        "introduction": "<概要>",
        "sections": [{"heading": "<h>", "content": "<c>", "steps": []}],
        "keyTakeaways": ["<pt1>", "<pt2>"],
        "sourceUrl": "<ツイートURL>"
      }
    }
  ]
}
```

### 記事数の規定
- `hero`: 1記事（最も重要なニュース or バズ投稿）
- `sidebar`: 3記事
- `middle`: 3記事
- `briefs`: 4件（短いニュース）
- `opinions`: 2件（**必ず海外インフルエンサーのXポストから**）
- `dataPanel`: 4項目

### グラジエントの選択
- ai: `linear-gradient(135deg, #2d5a27 0%, #4a8a3f 100%)`
- tech: `linear-gradient(135deg, #1e3a5f 0%, #3498db 100%)`
- research: `linear-gradient(135deg, #5b2c6f 0%, #8e44ad 100%)`
- openai: `linear-gradient(135deg, #10a37f 0%, #1a7a5e 100%)`
- gemini: `linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)`
- indie: `linear-gradient(135deg, #c07000 0%, #e09020 100%)`
- mobile: `linear-gradient(135deg, #0f4c75 0%, #1b6ca8 100%)`
- business: `linear-gradient(135deg, #8b4513 0%, #a0522d 100%)`

---

### Step 5: ファイル保存・HTML生成・デプロイ

```bash
# 1. WriteツールでJSONを保存
# パス: /home/node/.openclaw/workspace/news-output/YYYY-MM-DD-{edition}.json

# 2. HTML生成
cd /home/node/.openclaw/workspace
node skills/x-news-digest/generate-html.js --edition={edition}

# 3. デプロイ
bash skills/x-news-digest/deploy-to-github.sh {edition}
```

---

## ⚠️ 重要ルール

1. **海外インフルエンサーのXバズ投稿を必ず含める** — opinions欄は特にXポスト優先
2. **情報は実在するもの** — 検索で見つかった実際の記事・ツイートのみ。架空禁止
3. **sourceUrlは実際のURL** — web_searchで得られたURL。架空URL禁止
4. **全フィールド日本語** — headline, deck, summary, sections全て日本語で記述
5. **48時間以内優先** — freshness: "pd" → 情報不足なら "pw" に拡大
6. **Athena自身の話は書かない** — このシステム自体の話題は除外
7. **sparklineは固定値OK** — データが入手できない場合 `"▁▂▃▅▇█"` を使用
