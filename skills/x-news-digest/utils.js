/**
 * 共通ユーティリティ関数
 */

function generateSparkline(values) {
  if (!values || values.length === 0) return '▁▁▁▁▁▁';
  const bars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  return values.map(v => {
    if (range === 0) return bars[0];
    const normalized = (v - min) / range;
    const index = Math.floor(normalized * (bars.length - 1));
    return bars[index];
  }).join('');
}

function calculateReadPercent(minutes) {
  if (minutes <= 5) return 25;
  if (minutes <= 10) return 50;
  if (minutes <= 15) return 75;
  return 100;
}

function getReadLabel(minutes) {
  if (minutes <= 3) return '速読';
  if (minutes <= 8) return '中程度';
  return '長文';
}

function getCategoryClass(category) {
  const map = {
    'OpenClaw': 'ai', 'Ollama': 'tech', 'Claude Code': 'ai',
    'AIツール': 'tech', 'AIモデル': 'ai', '研究': 'research',
    '業界': 'business', 'AI安全性': 'ai', 'プロダクト': 'tech',
    'OpenAI': 'openai', 'Gemini': 'gemini', 'Google AI': 'gemini',
    '個人開発': 'indie', 'インディー開発': 'indie',
    'モバイルアプリ': 'mobile', 'iOS開発': 'mobile', 'Android開発': 'mobile',
    'Claude': 'ai', 'Anthropic': 'ai'
  };
  return map[category] || 'ai';
}

module.exports = { generateSparkline, calculateReadPercent, getReadLabel, getCategoryClass };
