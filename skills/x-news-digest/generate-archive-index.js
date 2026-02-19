#!/usr/bin/env node
/**
 * AI News Digest - Archive Index Generator
 * Creates archive/index.html with list of past editions
 */

const fs = require('fs');
const path = require('path');

const REPO_DIR = path.join(__dirname, '../../ai-news-digest');
const ARCHIVE_DIR = path.join(REPO_DIR, 'archive');
const DATA_DIR = path.join(REPO_DIR, 'data');

/**
 * Generate archive index page
 */
function generateArchiveIndex() {
  console.log('📚 Generating archive index...');
  
  // Get all HTML files in archive
  const htmlFiles = fs.readdirSync(ARCHIVE_DIR)
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .sort()
    .reverse(); // Newest first
  
  if (htmlFiles.length === 0) {
    console.log('ℹ️  No archive files found');
    return;
  }
  
  // Group by month
  const byMonth = {};
  const editions = [];
  
  htmlFiles.forEach(filename => {
    const date = filename.replace('.html', '');
    const [year, month, day] = date.split('-');
    const monthKey = `${year}-${month}`;
    
    if (!byMonth[monthKey]) {
      byMonth[monthKey] = [];
    }
    
    // Try to read JSON data for article count
    let articleCount = 0;
    let headline = '';
    try {
      const jsonPath = path.join(DATA_DIR, `${date}.json`);
      if (fs.existsSync(jsonPath)) {
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        articleCount = (data.sidebar?.length || 0) + (data.middle?.length || 0) + (data.briefs?.length || 0);
        headline = data.hero?.headline || '';
      }
    } catch (err) {
      console.warn(`Warning: Could not read data for ${date}`);
    }
    
    byMonth[monthKey].push({
      date,
      filename,
      articleCount,
      headline: headline.substring(0, 60) + (headline.length > 60 ? '...' : '')
    });
    
    editions.push({ date, filename, articleCount, headline });
  });
  
  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Daily Chronicle - アーカイブ</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>
:root {
  --bg-paper: #faf7f2;
  --bg-cream: #f5f0e8;
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-caption: #777;
  --rule-color: #c8c0b4;
  --accent-red: #c41e1e;
  --accent-gold: #b8860b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #e8e3db;
  font-family: 'DM Sans', sans-serif;
  color: var(--text-primary);
  line-height: 1.6;
  padding: 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: var(--bg-paper);
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 3px double var(--text-primary);
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--text-caption);
}

.nav {
  margin-bottom: 32px;
  text-align: center;
}

.nav a {
  display: inline-block;
  padding: 10px 20px;
  background: var(--accent-gold);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.2s;
}

.nav a:hover {
  background: var(--accent-red);
  transform: translateY(-2px);
}

.month-group {
  margin-bottom: 40px;
}

.month-header {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--accent-gold);
}

.edition-list {
  list-style: none;
}

.edition-item {
  padding: 16px;
  margin-bottom: 12px;
  background: var(--bg-cream);
  border-left: 4px solid var(--accent-gold);
  transition: all 0.2s;
  cursor: pointer;
}

.edition-item:hover {
  background: #fff;
  border-left-color: var(--accent-red);
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.edition-date {
  font-weight: 600;
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.edition-headline {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.edition-meta {
  font-size: 12px;
  color: var(--text-caption);
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--rule-color);
  font-size: 12px;
  color: var(--text-caption);
}

@media (max-width: 768px) {
  .container {
    padding: 24px;
  }
  
  .title {
    font-size: 36px;
  }
}
</style>
</head>
<body>
<div class="container">
  <header class="header">
    <h1 class="title">The AI Chronicle</h1>
    <p class="subtitle">Archive</p>
  </header>
  
  <div class="nav">
    <a href="../">← 最新版に戻る</a>
  </div>
  
  ${Object.keys(byMonth).sort().reverse().map(monthKey => {
    const [year, month] = monthKey.split('-');
    const monthName = new Date(year, month - 1).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });
    
    return `
  <section class="month-group">
    <h2 class="month-header">${monthName}</h2>
    <ul class="edition-list">
      ${byMonth[monthKey].map(edition => {
        const dateObj = new Date(edition.date);
        const dayOfWeek = dateObj.toLocaleDateString('ja-JP', { weekday: 'short' });
        
        return `
      <li class="edition-item" onclick="location.href='${edition.filename}'">
        <div class="edition-date">📰 ${edition.date} (${dayOfWeek})</div>
        <div class="edition-headline">「${edition.headline}」</div>
        <div class="edition-meta">記事数: ${edition.articleCount}</div>
      </li>
        `;
      }).join('')}
    </ul>
  </section>
    `;
  }).join('')}
  
  <footer class="footer">
    <p>The AI Chronicle · Total editions: ${editions.length} · Auto-generated by Athena</p>
  </footer>
</div>
</body>
</html>`;
  
  // Write file
  const outputPath = path.join(ARCHIVE_DIR, 'index.html');
  fs.writeFileSync(outputPath, html);
  console.log(`✅ Generated: ${outputPath}`);
  console.log(`📊 Total editions: ${editions.length}`);
  
  return outputPath;
}

// Run if executed directly
if (require.main === module) {
  generateArchiveIndex();
}

module.exports = { generateArchiveIndex };
