#!/bin/bash
# AI News Digest - Master Runner Script
# 使い方: ./run-digest.sh [morning|noon|evening]

set -e

EDITION="${1:-default}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

case "$EDITION" in
  morning)  echo "🌅 朝刊モード：AIモデル最新動向" ;;
  noon)     echo "☀️  昼刊モード：実践Tips・ツール活用" ;;
  evening)  echo "🌙 夕刊モード：個人開発・iOS/Android事例" ;;
  *)        echo "📰 デフォルトモード（混合）" ;;
esac

echo "🚀 AI News Digest - Full Pipeline"
echo "=================================="

echo "📊 Step 1: データ生成..."
node collect-and-generate.js --edition="$EDITION"
echo ""

echo "🎨 Step 2: HTML生成..."
node generate-html.js --edition="$EDITION"
echo ""

LATEST_HTML=$(ls -t ../../news-output/*.html 2>/dev/null | head -1)
if [ -f "$LATEST_HTML" ]; then
  echo "✅ Pipeline complete!"
  echo "   JSON: $(ls -t ../../news-output/*.json | head -1)"
  echo "   HTML: $LATEST_HTML"
else
  echo "❌ HTML generation failed"
  exit 1
fi
