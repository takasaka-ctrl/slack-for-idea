#!/usr/bin/env node
/**
 * AI News Digest - HTML Generator
 * Takes JSON data and generates newspaper HTML
 */

const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, '../../newspaper-template.html');
const MODAL_CSS_PATH = path.join(__dirname, '../../newspaper-modal.css');
const MODAL_HTML_PATH = path.join(__dirname, '../../newspaper-modal.html');
const MODAL_JS_PATH = path.join(__dirname, '../../newspaper-modal.js');
const OUTPUT_DIR = path.join(__dirname, '../../news-output');

/**
 * Simple template engine (Handlebars-like)
 * Supports: {{variable}}, {{#each array}}, conditional classes
 */
function renderTemplate(template, data) {
  let html = template;
  
  // Replace simple variables
  html = html.replace(/\{\{DATE\}\}/g, data.date);
  html = html.replace(/\{\{VOLUME\}\}/g, data.volume);
  html = html.replace(/\{\{TICKER_TEXT\}\}/g, data.tickerText);
  
  // Render data panel
  if (data.dataPanel) {
    const dataPanelHtml = data.dataPanel.map(item => `
    <div class="data-item">
      <div class="data-label">${item.label}</div>
      <div class="data-value">${item.value}</div>
      <div class="data-sparkline">${item.sparkline}</div>
      <div class="data-change ${item.changeClass}">${item.change}</div>
    </div>
    `).join('');
    html = html.replace(/\{\{#each dataPanel\}\}[\s\S]*?\{\{\/each\}\}/g, dataPanelHtml);
  }
  
  // Render hero section
  if (data.hero) {
    const hero = data.hero;
    html = html.replace(/\{\{hero\.category\}\}/g, hero.category);
    html = html.replace(/\{\{hero\.categoryClass\}\}/g, hero.categoryClass);
    html = html.replace(/\{\{hero\.headline\}\}/g, hero.headline);
    html = html.replace(/\{\{hero\.deck\}\}/g, hero.deck);
    html = html.replace(/\{\{hero\.author\}\}/g, hero.author);
    html = html.replace(/\{\{hero\.readTime\}\}/g, hero.readTime);
    html = html.replace(/\{\{hero\.readPercent\}\}/g, hero.readPercent);
    html = html.replace(/\{\{hero\.readLabel\}\}/g, hero.readLabel);
    html = html.replace(/\{\{hero\.updateTime\}\}/g, hero.updateTime);
  }
  
  // Render sidebar
  if (data.sidebar) {
    const sidebarHtml = data.sidebar.map(item => `
    <div class="sidebar-item">
      <span class="category-tag category-tag--${item.categoryClass}">${item.category}</span>
      <h3 class="sidebar-headline">${item.headline}</h3>
      <p class="sidebar-summary">${item.summary}</p>
      <div class="sidebar-meta">${item.readTime} min read · ${item.timeAgo}</div>
    </div>
    `).join('');
    html = html.replace(/\{\{#each sidebar\}\}[\s\S]*?\{\{\/each\}\}/g, sidebarHtml);
  }
  
  // Render middle articles
  if (data.middle) {
    const middleHtml = data.middle.map(item => `
    <article class="middle-article">
      <div class="middle-image" style="background: ${item.gradient};"></div>
      <span class="category-tag category-tag--${item.categoryClass}">${item.category}</span>
      <h3 class="middle-headline">${item.headline}</h3>
      <p class="middle-summary">${item.summary}</p>
      <div class="middle-meta">By ${item.author} · ${item.readTime} min read</div>
    </article>
    `).join('');
    html = html.replace(/\{\{#each middle\}\}[\s\S]*?\{\{\/each\}\}/g, middleHtml);
  }
  
  // Render briefs
  if (data.briefs) {
    const briefsHtml = data.briefs.map(item => `
    <div class="brief-item">
      <h4 class="brief-headline"><span class="brief-bullet"></span>${item.headline}</h4>
      <p class="brief-text">${item.text}</p>
    </div>
    `).join('');
    html = html.replace(/\{\{#each briefs\}\}[\s\S]*?\{\{\/each\}\}/g, briefsHtml);
  }
  
  // Render opinions
  if (data.opinions) {
    const opinionsHtml = data.opinions.map(item => `
    <div class="opinion-item">
      <div class="opinion-author">${item.authorLabel} ${item.author}</div>
      <h3 class="opinion-headline">${item.headline}</h3>
      <p class="opinion-excerpt">${item.excerpt}</p>
    </div>
    `).join('');
    html = html.replace(/\{\{#each opinions\}\}[\s\S]*?\{\{\/each\}\}/g, opinionsHtml);
  }
  
  return html;
}

/**
 * Generate HTML from JSON file
 * @param {string} jsonPath - Path to JSON data file
 * @returns {string} Path to generated HTML file
 */
function generateHTML(jsonPath) {
  console.log(`📄 Reading JSON: ${jsonPath}`);
  
  // Read data
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // Read template
  console.log(`📝 Reading template: ${TEMPLATE_PATH}`);
  let template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  
  // Read modal components
  const modalCSS = fs.readFileSync(MODAL_CSS_PATH, 'utf8');
  const modalHTML = fs.readFileSync(MODAL_HTML_PATH, 'utf8');
  const modalJS = fs.readFileSync(MODAL_JS_PATH, 'utf8');
  
  // Inject modal CSS before </style>
  template = template.replace('</style>', `\n${modalCSS}\n</style>`);
  
  // Inject modal HTML before </body>
  const articlesDataScript = `<script>const ARTICLES_DATA = ${JSON.stringify(data)};</script>`;
  template = template.replace('</body>', `${modalHTML}\n${articlesDataScript}\n<script>\n${modalJS}\n</script>\n</body>`);
  
  // Render
  console.log('🔨 Rendering HTML...');
  const html = renderTemplate(template, data);
  
  // Output path
  const basename = path.basename(jsonPath, '.json');
  const outputPath = path.join(OUTPUT_DIR, `${basename}.html`);
  
  // Write HTML
  fs.writeFileSync(outputPath, html);
  console.log(`✅ Generated HTML: ${outputPath}`);
  
  return outputPath;
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  
  // --edition=morning|noon|evening を受け取る
  const editionArg = args.find(a => a.startsWith('--edition=') || a === '--edition');
  let edition = null;
  if (editionArg) {
    edition = editionArg.startsWith('--edition=')
      ? editionArg.split('=')[1]
      : (args[args.indexOf('--edition') + 1] || null);
  }

  // ファイルパスが直接指定されている場合
  const filePath = args.find(a => a.endsWith('.json'));
  if (filePath) {
    return generateHTML(filePath);
  }

  // editionに対応するJSONファイルを探す
  const date = new Date().toISOString().split('T')[0];
  const suffix = edition && edition !== 'default' ? `-${edition}` : '';
  const targetFile = path.join(OUTPUT_DIR, `${date}${suffix}.json`);
  
  if (fs.existsSync(targetFile)) {
    return generateHTML(targetFile);
  }

  // 最新ファイルにフォールバック
  const files = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse();
  
  if (files.length === 0) {
    console.error('❌ No JSON files found in news-output/');
    process.exit(1);
  }
  
  return generateHTML(path.join(OUTPUT_DIR, files[0]));
}

// Run if executed directly
if (require.main === module) {
  const outputPath = main();
  console.log(`\n🎉 Success! Open in browser: ${outputPath}`);
}

module.exports = { generateHTML, renderTemplate };
