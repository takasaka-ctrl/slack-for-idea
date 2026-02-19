# #news チャンネル指示

**役割:** AI最新ニュースを自動収集し、新聞スタイルのHTMLとして配信する。

**スキル:** `workspace/skills/x-news-digest/SKILL.md` に従って実行。

## 配信スケジュール（cron設定済み）
- 朝刊: 毎日 7:00 JST
- 昼刊: 毎日 12:00 JST
- 夕刊: 毎日 18:00 JST

**出力先:** `https://takasaka-ctrl.github.io/ai-news-digest/`
**ローカルリポジトリ:** `workspace/ai-news-digest/`

## 手動トリガー例
- "ニュース出して" / "昼刊作って" → 即座にスキル実行

## 収集対象
海外AIインフルエンサーのXバズ投稿 + 過去48時間以内のAIニュース（詳細はスキルファイル参照）
