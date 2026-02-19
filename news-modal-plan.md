# 記事詳細モーダル実装計画

## 🎯 目標

見出しクリック → 1記事だけの詳細新聞モーダルを表示

---

## 📋 要件定義

### ユーザー体験
1. **トリガー:** 記事見出し・画像をクリック
2. **表示:** 画面全体にモーダルオーバーレイ
3. **内容:** 
   - 記事の完全版（要約ではなく全文）
   - 元ツイート引用
   - 実装手順（コード例含む）
   - 関連リンク
4. **デザイン:** 新聞風を維持（1カラムの読みやすいレイアウト）
5. **閉じる:** 
   - ×ボタン
   - 背景クリック
   - ESCキー

### 技術要件
- Pure JavaScript（フレームワーク不要）
- レスポンシブ対応
- ダークモード対応
- アクセシビリティ（ARIA属性）

---

## 🏗️ 実装アーキテクチャ

### 1. データ構造拡張

**JSON に fullContent フィールド追加:**

```json
{
  "hero": {
    "id": "article-001",
    "headline": "...",
    "deck": "...",
    "fullContent": {
      "introduction": "導入文...",
      "sections": [
        {
          "heading": "セクション1",
          "content": "詳細...",
          "code": "```bash\n...\n```"
        }
      ],
      "sourceUrl": "https://x.com/...",
      "relatedLinks": [...]
    }
  }
}
```

### 2. HTML構造

**モーダルコンテナ（ページ下部に追加）:**

```html
<div id="article-modal" class="modal" aria-hidden="true">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <button class="modal-close" aria-label="閉じる">×</button>
    <div class="modal-newspaper">
      <!-- 新聞風レイアウト -->
      <header class="modal-header">
        <div class="modal-category"></div>
        <h1 class="modal-headline"></h1>
        <div class="modal-meta"></div>
      </header>
      <article class="modal-body">
        <!-- 本文コンテンツ -->
      </article>
      <footer class="modal-footer">
        <!-- 関連リンク -->
      </footer>
    </div>
  </div>
</div>
```

### 3. CSS設計

```css
/* モーダルオーバーレイ */
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 1000;
  display: none;
}

.modal.active { display: flex; }

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  margin: auto;
  background: var(--bg-paper);
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  z-index: 1001;
}

/* 新聞風スタイルを継承 */
.modal-newspaper {
  padding: 40px;
}
```

### 4. JavaScript機能

```javascript
// モーダル制御
const ArticleModal = {
  modal: null,
  overlay: null,
  content: null,
  
  init() {
    // モーダル要素取得
    // イベントリスナー登録
  },
  
  open(articleId) {
    // JSONからデータ取得
    // モーダル内容生成
    // 表示アニメーション
  },
  
  close() {
    // 非表示アニメーション
  },
  
  render(data) {
    // HTML生成
  }
}
```

---

## 📐 モーダルレイアウト（1カラム新聞風）

```
┌──────────────────────────────────┐
│  ×  ← 閉じるボタン                │
├──────────────────────────────────┤
│                                  │
│  [CATEGORY TAG]                  │
│                                  │
│  ■■■ タイトル ■■■             │
│  ━━━━━━━━━━━━━━━━━━━         │
│                                  │
│  By Author · 12 min read         │
│  Updated 2 hours ago             │
│                                  │
├──────────────────────────────────┤
│                                  │
│  【導入】                        │
│  本文本文本文本文...             │
│                                  │
│  【セクション1: セットアップ】   │
│  ステップバイステップ...         │
│                                  │
│  ```bash                         │
│  コード例                        │
│  ```                             │
│                                  │
│  【セクション2: 実践例】         │
│  具体的な使い方...               │
│                                  │
│  【ポイント】                    │
│  • 重要な学び1                   │
│  • 重要な学び2                   │
│                                  │
├──────────────────────────────────┤
│  🔗 関連リンク                   │
│  → 元ツイート                    │
│  → 公式ドキュメント              │
│  → GitHub リポジトリ             │
└──────────────────────────────────┘
```

---

## 🚀 実装手順

### Phase 1: データ準備
1. JSON構造に fullContent 追加
2. モックデータで詳細コンテンツ作成
3. collect-and-generate.js 更新

### Phase 2: モーダルUI
1. HTML構造追加
2. CSS実装（アニメーション含む）
3. レスポンシブ対応

### Phase 3: JavaScript実装
1. モーダル制御クラス作成
2. クリックイベント登録
3. データレンダリング

### Phase 4: 統合テスト
1. 全記事タイプで動作確認
2. ダークモード対応確認
3. モバイル表示確認

---

## 🎨 デザイン詳細

### アニメーション
- **開く:** フェードイン + スライドアップ（0.3s）
- **閉じる:** フェードアウト + スライドダウン（0.2s）

### タイポグラフィ
- **見出し:** 32px, Playfair Display, Bold
- **本文:** 16px, Source Serif 4, line-height: 1.7
- **コード:** 14px, IBM Plex Mono

### カラー
- **オーバーレイ:** rgba(0,0,0,0.8) + backdrop-filter
- **背景:** 新聞と同じ --bg-paper
- **アクセント:** --accent-red

---

## 📊 データ例（Hero記事の fullContent）

```json
{
  "id": "openclaw-setup-guide",
  "introduction": "OpenClawを本番環境で動かすまでの完全ガイド。AWS EC2、Docker、Google Workspaceの連携からセキュリティ設定まで、実際に動作する設定を30分で構築できます。",
  "sections": [
    {
      "heading": "1. AWS EC2インスタンスの準備",
      "content": "t2.mediumインスタンスを推奨。Ubuntu 22.04 LTSで動作確認済み。",
      "steps": [
        "EC2ダッシュボードでインスタンス作成",
        "セキュリティグループで22番ポート開放",
        "Elastic IPを割り当て"
      ]
    },
    {
      "heading": "2. Dockerセットアップ",
      "content": "OpenClawはDockerで動作します。",
      "code": "# Dockerインストール\ncurl -fsSL https://get.docker.com -o get-docker.sh\nsudo sh get-docker.sh\n\n# Docker Compose\nsudo apt install docker-compose"
    },
    {
      "heading": "3. 重要な注意点",
      "content": "Tailscale設定で「Serve」を選択しないこと。これが最大のハマりポイント。",
      "warning": "⚠️ Serveオプションを選ぶとプロキシロジックが複雑化してクラッシュします。必ず「Off」を選択してください。"
    }
  ],
  "keyTakeaways": [
    "Tailscale は「Off」設定が必須",
    "初回起動時はHTTPブロッキングに注意",
    "Google Workspace連携で生産性が10倍"
  ],
  "sourceUrl": "https://x.com/petergyang/status/2019070963753848838",
  "relatedLinks": [
    {
      "title": "OpenClaw公式ドキュメント",
      "url": "https://docs.openclaw.ai"
    },
    {
      "title": "元ツイートスレッド",
      "url": "https://x.com/petergyang/status/..."
    }
  ]
}
```

---

## ✅ チェックリスト

### 開発
- [ ] JSON構造拡張
- [ ] モーダルHTML追加
- [ ] CSS実装
- [ ] JavaScript実装
- [ ] アニメーション調整

### テスト
- [ ] Hero記事
- [ ] Sidebar記事
- [ ] Middle記事
- [ ] Brief記事
- [ ] Opinion記事

### 品質
- [ ] ダークモード対応
- [ ] モバイル表示
- [ ] アクセシビリティ
- [ ] パフォーマンス（大量記事でも快適）

---

*実装開始しますか？*
