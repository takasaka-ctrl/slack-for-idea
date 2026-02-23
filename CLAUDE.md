# slack-for-idea

Slackで議論されたアイデアをUIモックとして蓄積・公開するリポジトリ。

## リポジトリ構造のルール

### ギャラリー本体（触らない）

```
index.html            # ルートリダイレクト（projects/ へ）
projects/index.html   # Mock Gallery 一覧ページ
```

これらは **純粋な静的HTML** として維持すること。ビルドステップを必要とする変更はしない。

### 各プロジェクト（自由）

```
projects/<project-name>/
```

各プロジェクトフォルダの中身は **技術スタックを問わない**。

- 静的HTML / CSS / JS（ビルド不要）
- React / Vue / Svelte などのビルド済み成果物
- 複数案の比較（option-a, option-b, option-c など）

ただし GitHub Pages で配信するため、**ブラウザで直接開ける静的ファイル形式** であること。
ビルドが必要なフレームワークを使う場合は、ビルド済みの成果物をコミットする。

### 新しいプロジェクトを追加するとき

1. `projects/<project-name>/` フォルダを作成してモックを配置
2. `projects/index.html` のグリッドにカードを追記する

カードに必要な情報：
- プロジェクト名
- 日付
- 説明（1〜2文）
- 技術スタックタグ
- PDCAスコア（任意）
- リンク先（`<project-name>/` または `<project-name>/option-b/` など）
