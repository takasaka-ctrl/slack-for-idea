# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Slack User IDs

### Bots
- **Claude (Code Agent)**: `<@U0ADRLM7GE9>`
- **Athena (Me)**: `<@U092A4W37LB>` (if needed)

### Master
- **だいち**: `U0918RCEHQD`

**Note:** Slackでbotにメンションする際は `<@USER_ID>` 形式が必要。単なる `@name` では通知が届かない。

## Slack Channel IDs

| チャンネル | ID |
|-----------|-----|
| #brain | `C0ADEH43WCU` |
| #news | `C0ADV3F8Y02` |
| #lab | `C0918RCL2MT` |
| #setting | `C0918RCKFHT` |
| #imagelab | `C0AFN18FEUB` |
| #compass | `C0AGU1PT99P` |

## Google Calendar (gcalcli)

- **インストール先:** `~/.local/bin/gcalcli` (v4.5.1)
- **OAuth token:** `~/.local/share/gcalcli/oauth` (pickle形式)
- **client_secret:** `/mnt/vault/client_secret.json` (installed type)
- **タイムゾーン:** Asia/Tokyo (JST = UTC+9) — **常に設定必須**
- **実行時に必要:**
  ```bash
  export PATH="$HOME/.local/bin:$PATH"
  export TZ="Asia/Tokyo"
  CLIENT_ID=$(python3 -c "import json; d=json.load(open('/mnt/vault/client_secret.json')); print(d['installed']['client_id'])")
  CLIENT_SECRET=$(python3 -c "import json; d=json.load(open('/mnt/vault/client_secret.json')); print(d['installed']['client_secret'])")
  gcalcli --client-id "$CLIENT_ID" --client-secret "$CLIENT_SECRET" --nocolor <command>
  ```
- **時刻指定時の注意:** ISO8601形式でタイムゾーンを明示（例: `2026-02-26T19:00+09:00`）
- **曜日確認:** 日付と曜日を記載する際は必ず確認
  ```bash
  export TZ="Asia/Tokyo"
  date -d "2026-02-26" '+%Y-%m-%d (%a) %A'  # 2026-02-26 (Thu) Thursday
  ```
- **マスターのGmail:** daichi.100ai@gmail.com
- **デフォルトカレンダー:** daichi224.bado@icloud.com
- **確認済みカレンダー:** デフォルト + 雛祭り等の祝日カレンダー

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
