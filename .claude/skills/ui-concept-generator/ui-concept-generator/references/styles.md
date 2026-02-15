# UI Styles Reference

50+のUIスタイル定義。各スタイルには軸スコア、特徴、CSS実装のヒントを含む。

## 目次
1. [Minimal系](#minimal系)
2. [Morphism系](#morphism系)
3. [Bold/Expressive系](#boldexpressive系)
4. [Classic/Editorial系](#classiceditorial系)
5. [Dark/Tech系](#darktech系)
6. [Playful/Friendly系](#playfulfriendly系)
7. [Japanese/Asian系](#japaneseasian系)

---

## Minimal系

### Swiss Minimalism
- **軸スコア**: density=2, tone=2, era=3, saturation=2
- **特徴**: グリッドベース、余白重視、タイポグラフィ中心、装飾排除
- **カラー**: モノクロ＋1アクセント
- **フォント**: Helvetica Neue, Univers, Aktiv Grotesk
- **CSS**: `max-width: 1200px; margin: 0 auto; padding: 4rem;`
- **適用**: コーポレートサイト、ポートフォリオ、ドキュメント

### Japanese Minimalism (和モダン)
- **軸スコア**: density=2, tone=2, era=2, saturation=1
- **特徴**: 余白（間）の美学、非対称、自然素材感
- **カラー**: 墨色、生成り、抹茶、藍
- **フォント**: Noto Serif JP, Shippori Mincho
- **CSS**: `background: #faf8f5; color: #1a1a1a;`
- **適用**: 和食店、旅館、伝統工芸

### Ultra Minimal
- **軸スコア**: density=1, tone=2, era=4, saturation=1
- **特徴**: 極限まで要素を削減、1-2色のみ、大きな余白
- **カラー**: 白＋黒、または白＋グレー1色
- **フォント**: システムフォント、または1つのみ
- **CSS**: `font-size: clamp(1rem, 2vw, 1.25rem);`
- **適用**: アートギャラリー、建築事務所

---

## Morphism系

### Glassmorphism
- **軸スコア**: density=3, tone=3, era=4, saturation=3
- **特徴**: 半透明背景、ブラー効果、微細なボーダー、奥行き
- **カラー**: 鮮やかな背景＋白/半透明カード
- **フォント**: SF Pro, Inter（例外的に可）
- **CSS**: `backdrop-filter: blur(10px); background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);`
- **適用**: ダッシュボード、金融アプリ、音楽アプリ

### Neumorphism
- **軸スコア**: density=2, tone=3, era=4, saturation=2
- **特徴**: ソフトな凹凸、同系色のシャドウ、触覚的
- **カラー**: 淡いグレー/ベージュベース
- **フォント**: Poppins, Quicksand
- **CSS**: `box-shadow: 8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff;`
- **適用**: スマートホーム、設定画面、計算機

### Claymorphism
- **軸スコア**: density=3, tone=4, era=4, saturation=4
- **特徴**: 粘土のような3D感、丸み、ポップな色、インナーシャドウ
- **カラー**: パステル、ビビッド
- **フォント**: Nunito, Varela Round
- **CSS**: `border-radius: 30px; box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1);`
- **適用**: 子供向けアプリ、ゲーム、教育

---

## Bold/Expressive系

### Neo Brutalism
- **軸スコア**: density=4, tone=3, era=4, saturation=5
- **特徴**: 太いボーダー、ハードシャドウ、ビビッドカラー、意図的な粗さ
- **カラー**: 黒＋原色（赤、黄、青）
- **フォント**: Space Mono, JetBrains Mono, Archivo Black
- **CSS**: `border: 3px solid black; box-shadow: 4px 4px 0 black;`
- **適用**: スタートアップ、クリエイティブエージェンシー、NFT

### Maximalist / Vibrant Block
- **軸スコア**: density=5, tone=4, era=4, saturation=5
- **特徴**: 高密度、大胆な色ブロック、オーバーラップ、視覚的カオス
- **カラー**: 複数の鮮やかな色を大胆に使用
- **フォント**: Bebas Neue, Anton, Oswald
- **CSS**: `background: linear-gradient(135deg, #ff6b6b, #4ecdc4);`
- **適用**: イベント、音楽フェス、ファッション

### Bento Grid
- **軸スコア**: density=4, tone=3, era=4, saturation=3
- **特徴**: 不均等グリッド、Apple風、カード内に異なるコンテンツタイプ
- **カラー**: ダーク背景＋カラフルカード
- **フォント**: SF Pro Display, Satoshi
- **CSS**: `display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;`
- **適用**: 製品紹介、機能一覧、ポートフォリオ

---

## Classic/Editorial系

### Editorial / Magazine
- **軸スコア**: density=4, tone=2, era=2, saturation=2
- **特徴**: 雑誌のようなレイアウト、大見出し、コラム、ドロップキャップ
- **カラー**: 白＋黒＋1アクセント
- **フォント**: Playfair Display + Source Serif Pro
- **CSS**: `column-count: 2; column-gap: 2rem;`
- **適用**: メディア、ブログ、出版社

### Art Deco
- **軸スコア**: density=3, tone=2, era=1, saturation=3
- **特徴**: 幾何学パターン、金/黒、対称性、ラグジュアリー
- **カラー**: 黒＋金、ネイビー＋金
- **フォント**: Poiret One, Josefin Sans
- **CSS**: `border: 2px solid gold; background: linear-gradient(to bottom, #1a1a2e, #16213e);`
- **適用**: ホテル、レストラン、ジュエリー

### Corporate Classic
- **軸スコア**: density=3, tone=1, era=2, saturation=2
- **特徴**: 信頼感、保守的、整然、プロフェッショナル
- **カラー**: ネイビー、グレー、白
- **フォント**: Merriweather + Open Sans
- **CSS**: `background: #f5f5f5; color: #333;`
- **適用**: 金融機関、法律事務所、コンサルティング

---

## Dark/Tech系

### Dark Mode OLED
- **軸スコア**: density=3, tone=2, era=4, saturation=2
- **特徴**: 純黒背景、省電力、高コントラスト、アクセントカラーが映える
- **カラー**: #000000 + グレー + 1アクセント
- **フォント**: Inter（例外）, SF Mono
- **CSS**: `background: #000; color: #fff;`
- **適用**: 開発者ツール、音楽アプリ、映画

### Cyberpunk / Neon
- **軸スコア**: density=4, tone=3, era=5, saturation=5
- **特徴**: ネオンカラー、グリッチエフェクト、未来的、テクノ
- **カラー**: 黒＋ネオンピンク/シアン/パープル
- **フォント**: Orbitron, Audiowide, Press Start 2P
- **CSS**: `text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;`
- **適用**: ゲーム、テック企業、NFT

### Terminal / Hacker
- **軸スコア**: density=4, tone=2, era=3, saturation=2
- **特徴**: モノスペース、緑on黒、コマンドライン風
- **カラー**: 黒＋緑、または黒＋アンバー
- **フォント**: JetBrains Mono, Fira Code, IBM Plex Mono
- **CSS**: `background: #0d1117; color: #00ff00; font-family: monospace;`
- **適用**: 開発者向けサービス、セキュリティ

---

## Playful/Friendly系

### Soft Pastel
- **軸スコア**: density=2, tone=4, era=3, saturation=3
- **特徴**: パステルカラー、丸み、やさしい印象、女性向け
- **カラー**: ピンク、ラベンダー、ミント、ピーチ
- **フォント**: Quicksand, Comfortaa, Nunito
- **CSS**: `border-radius: 20px; background: #fce4ec;`
- **適用**: 美容、ウェルネス、子供向け

### Cartoon / Illustrated
- **軸スコア**: density=3, tone=5, era=3, saturation=4
- **特徴**: イラスト中心、手書き風、ストーリーテリング
- **カラー**: 鮮やかでフレンドリー
- **フォント**: Fredoka One, Baloo 2
- **CSS**: `border-radius: 50px;`
- **適用**: 教育、子供向け、エンタメ

### Rounded Friendly
- **軸スコア**: density=3, tone=4, era=4, saturation=3
- **特徴**: 大きな角丸、フレンドリー、アクセシブル
- **カラー**: 明るいプライマリ＋ニュートラル
- **フォント**: Nunito, DM Sans
- **CSS**: `border-radius: 1rem;`
- **適用**: フィンテック、ヘルスケア、SaaS

---

## Japanese/Asian系

### Japanese Corporate (日本企業風)
- **軸スコア**: density=4, tone=1, era=2, saturation=2
- **特徴**: 情報密度高、青ベース、信頼感、控えめ
- **カラー**: 青、グレー、白
- **フォント**: Noto Sans JP, Hiragino Sans
- **CSS**: `font-size: 14px; line-height: 1.8;`
- **適用**: 日本の大企業、金融機関、官公庁

### LINE Style (日本モバイルアプリ風)
- **軸スコア**: density=4, tone=3, era=4, saturation=3
- **特徴**: 角丸、グリーンアクセント、チャット風UI、情報密度
- **カラー**: 白＋LINE緑＋グレー
- **フォント**: Hiragino Sans, Apple SD Gothic Neo
- **CSS**: `border-radius: 12px; background: #00b900;`
- **適用**: コミュニケーションアプリ、日本向けモバイル

### Kawaii (かわいい)
- **軸スコア**: density=3, tone=5, era=3, saturation=4
- **特徴**: パステル、キャラクター、丸み、ポップ
- **カラー**: ピンク、水色、黄色
- **フォント**: M PLUS Rounded 1c, Kosugi Maru
- **CSS**: `border-radius: 30px; box-shadow: 0 4px 0 #ffb6c1;`
- **適用**: 女性向けサービス、エンタメ、SNS

---

## 軸スコア早見表

| スタイル | Density | Tone | Era | Saturation |
|----------|---------|------|-----|------------|
| Swiss Minimalism | 2 | 2 | 3 | 2 |
| Japanese Minimalism | 2 | 2 | 2 | 1 |
| Glassmorphism | 3 | 3 | 4 | 3 |
| Neumorphism | 2 | 3 | 4 | 2 |
| Claymorphism | 3 | 4 | 4 | 4 |
| Neo Brutalism | 4 | 3 | 4 | 5 |
| Maximalist | 5 | 4 | 4 | 5 |
| Bento Grid | 4 | 3 | 4 | 3 |
| Editorial | 4 | 2 | 2 | 2 |
| Art Deco | 3 | 2 | 1 | 3 |
| Dark Mode OLED | 3 | 2 | 4 | 2 |
| Cyberpunk | 4 | 3 | 5 | 5 |
| Soft Pastel | 2 | 4 | 3 | 3 |
| Japanese Corporate | 4 | 1 | 2 | 2 |
| Kawaii | 3 | 5 | 3 | 4 |
