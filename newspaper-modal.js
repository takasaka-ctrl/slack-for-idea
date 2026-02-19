/**
 * Article Detail Modal Controller
 * Handles modal open/close, rendering, and copy functionality
 */

const ArticleModal = {
  modal: null,
  overlay: null,
  content: null,
  closeBtn: null,
  copyBtn: null,
  articlesData: null,
  currentArticle: null,

  /**
   * Initialize modal
   */
  init(articlesData) {
    this.articlesData = articlesData;
    this.modal = document.getElementById('article-modal');
    if (!this.modal) { console.error('Modal element not found'); return; }

    this.overlay = this.modal.querySelector('.modal-overlay');
    this.content = this.modal.querySelector('.modal-content');
    this.closeBtn = this.modal.querySelector('.modal-close');
    this.copyBtn = this.modal.querySelector('.modal-copy');

    // Event listeners
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    this.copyBtn.addEventListener('click', () => this.copyToClipboard());

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) this.close();
    });

    // Prevent content scroll when modal is open
    this.content.addEventListener('click', (e) => e.stopPropagation());

    // Register click events on all articles
    this.registerArticleClicks();
  },

  /**
   * Register click events on all articles
   */
  registerArticleClicks() {
    // Hero article
    const heroHeadline = document.querySelector('.hero-headline');
    const heroImage = document.querySelector('.hero-image');
    if (heroHeadline) {
      heroHeadline.style.cursor = 'pointer';
      heroHeadline.addEventListener('click', () => this.open(this.articlesData.hero));
    }
    if (heroImage) {
      heroImage.style.cursor = 'pointer';
      heroImage.addEventListener('click', () => this.open(this.articlesData.hero));
    }

    // Sidebar articles
    document.querySelectorAll('.sidebar-item').forEach((item, index) => {
      if (this.articlesData.sidebar[index]) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => this.open(this.articlesData.sidebar[index]));
      }
    });

    // Middle articles
    document.querySelectorAll('.middle-article').forEach((item, index) => {
      if (this.articlesData.middle[index]) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => this.open(this.articlesData.middle[index]));
      }
    });

    // Opinion articles
    document.querySelectorAll('.opinion-item').forEach((item, index) => {
      if (this.articlesData.opinions[index]) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => this.open(this.articlesData.opinions[index]));
      }
    });
  },

  /**
   * Open modal with article data
   */
  open(articleData) {
    if (!articleData) return;

    // If no fullContent, build a minimal one from available fields
    if (!articleData.fullContent) {
      articleData = {
        ...articleData,
        fullContent: {
          introduction: articleData.summary || articleData.excerpt || articleData.deck || '',
          sections: [],
          keyTakeaways: [],
          sourceUrl: null,
          relatedLinks: []
        }
      };
    }

    this.currentArticle = articleData;
    this.render(articleData);
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Scroll modal to top
    this.content.scrollTop = 0;
  },

  /**
   * Close modal
   */
  close() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.currentArticle = null;
  },

  /**
   * Render article content into modal
   */
  render(article) {
    const { category, categoryClass, headline, author, readTime, authorLabel, fullContent } = article;

    // Category tag
    const categoryTag = this.modal.querySelector('.modal-category-tag');
    categoryTag.textContent = category;
    categoryTag.className = `modal-category-tag category-tag--${categoryClass || 'ai'}`;

    // Headline
    this.modal.querySelector('.modal-headline').textContent = headline;

    // Meta
    const byline = authorLabel ? `${authorLabel} ${author}` : `By ${author}`;
    const readPart = readTime ? ` · ${readTime} min read` : '';
    this.modal.querySelector('.modal-meta').textContent = byline + readPart;

    // Introduction
    const introEl = this.modal.querySelector('.modal-introduction');
    if (fullContent.introduction) {
      introEl.textContent = fullContent.introduction;
      introEl.style.display = '';
    } else {
      introEl.style.display = 'none';
    }

    // Sections
    const sectionsEl = this.modal.querySelector('.modal-sections');
    sectionsEl.innerHTML = '';
    if (fullContent.sections && fullContent.sections.length > 0) {
      fullContent.sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'modal-section';

        const headingEl = document.createElement('h2');
        headingEl.className = 'modal-section-heading';
        headingEl.textContent = section.heading;
        sectionDiv.appendChild(headingEl);

        if (section.content) {
          const contentEl = document.createElement('p');
          contentEl.className = 'modal-section-content';
          contentEl.textContent = section.content;
          sectionDiv.appendChild(contentEl);
        }
        if (section.steps && section.steps.length > 0) {
          const stepsList = document.createElement('ol');
          stepsList.className = 'modal-section-steps';
          section.steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            stepsList.appendChild(li);
          });
          sectionDiv.appendChild(stepsList);
        }
        if (section.code) {
          const codeEl = document.createElement('pre');
          codeEl.className = 'modal-section-code';
          codeEl.textContent = section.code;
          sectionDiv.appendChild(codeEl);
        }
        if (section.warning) {
          const warningEl = document.createElement('div');
          warningEl.className = 'modal-section-warning';
          warningEl.textContent = section.warning;
          sectionDiv.appendChild(warningEl);
        }

        sectionsEl.appendChild(sectionDiv);
      });
    }

    // Personal Tips ("あなたへの活用アイデア")
    const tipsBox = this.modal.querySelector('.modal-personal-tips');
    if (tipsBox) {
      const tipsUl = tipsBox.querySelector('ul');
      if (tipsUl) tipsUl.innerHTML = '';
      if (fullContent.personalTips && fullContent.personalTips.length > 0 && tipsUl) {
        fullContent.personalTips.forEach(tip => {
          const li = document.createElement('li');
          li.textContent = tip;
          tipsUl.appendChild(li);
        });
        tipsBox.style.display = '';
      } else if (tipsBox) {
        tipsBox.style.display = 'none';
      }
    }

    // Key Takeaways
    const takeawaysBox = this.modal.querySelector('.modal-key-takeaways');
    const takeawaysUl = takeawaysBox.querySelector('ul');
    takeawaysUl.innerHTML = '';
    if (fullContent.keyTakeaways && fullContent.keyTakeaways.length > 0) {
      fullContent.keyTakeaways.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        takeawaysUl.appendChild(li);
      });
      takeawaysBox.style.display = '';
    } else {
      takeawaysBox.style.display = 'none';
    }

    // Related Links
    const linksUl = this.modal.querySelector('.modal-links');
    const footerEl = this.modal.querySelector('.modal-footer');
    linksUl.innerHTML = '';
    const hasLinks = fullContent.sourceUrl || (fullContent.relatedLinks && fullContent.relatedLinks.length > 0);

    if (hasLinks) {
      if (fullContent.sourceUrl) {
        const sourceLi = document.createElement('li');
        const sourceA = document.createElement('a');
        sourceA.href = fullContent.sourceUrl;
        sourceA.target = '_blank';
        sourceA.rel = 'noopener noreferrer';
        sourceA.textContent = '→ 元ポスト（X / Twitter）';
        sourceLi.appendChild(sourceA);
        linksUl.appendChild(sourceLi);
      }
      if (fullContent.relatedLinks) {
        fullContent.relatedLinks.forEach(link => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = link.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = `→ ${link.title}`;
          li.appendChild(a);
          linksUl.appendChild(li);
        });
      }
      footerEl.style.display = '';
    } else {
      footerEl.style.display = 'none';
    }
  },

  /**
   * Copy article to clipboard as formatted memo
   */
  copyToClipboard() {
    if (!this.currentArticle) return;

    const { category, headline, fullContent } = this.currentArticle;
    const date = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    let text = `📰 AI Daily Chronicle - 保存メモ\n`;
    text += `${'═'.repeat(50)}\n\n`;
    text += `■ タイトル\n${headline}\n\n`;
    text += `■ カテゴリ\n${category}\n\n`;

    if (fullContent && fullContent.personalTips && fullContent.personalTips.length > 0) {
      text += `■ 活用アイデア（自分への応用）\n`;
      fullContent.personalTips.forEach(tip => { text += `→ ${tip}\n`; });
      text += `\n`;
    }

    if (fullContent && fullContent.keyTakeaways && fullContent.keyTakeaways.length > 0) {
      text += `■ 重要ポイント\n`;
      fullContent.keyTakeaways.forEach(point => { text += `• ${point}\n`; });
      text += `\n`;
    }

    if (fullContent && fullContent.introduction) {
      text += `■ 概要\n${fullContent.introduction}\n\n`;
    }

    if (fullContent && fullContent.sections && fullContent.sections.length > 0) {
      text += `■ 詳細\n`;
      fullContent.sections.forEach(section => {
        text += `\n【${section.heading}】\n`;
        if (section.content) text += `${section.content}\n`;
        if (section.steps) {
          section.steps.forEach((step, i) => { text += `${i + 1}. ${step}\n`; });
        }
        if (section.code) text += `\n\`\`\`\n${section.code}\n\`\`\`\n`;
        if (section.warning) text += `\n⚠️ ${section.warning}\n`;
      });
      text += `\n`;
    }

    if (fullContent && (fullContent.sourceUrl || (fullContent.relatedLinks && fullContent.relatedLinks.length > 0))) {
      text += `■ 参考リンク\n`;
      if (fullContent.sourceUrl) text += `- 元ポスト: ${fullContent.sourceUrl}\n`;
      if (fullContent.relatedLinks) {
        fullContent.relatedLinks.forEach(link => { text += `- ${link.title}: ${link.url}\n`; });
      }
      text += `\n`;
    }

    text += `${'─'.repeat(50)}\n`;
    text += `保存日時: ${date}\n`;
    text += `出典: AI Daily Chronicle\n`;

    navigator.clipboard.writeText(text).then(() => {
      const originalText = this.copyBtn.innerHTML;
      this.copyBtn.innerHTML = '✅ コピーしました';
      this.copyBtn.classList.add('copied');
      setTimeout(() => {
        this.copyBtn.innerHTML = originalText;
        this.copyBtn.classList.remove('copied');
      }, 2500);
    }).catch(() => {
      // Fallback for non-secure contexts
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      const originalText = this.copyBtn.innerHTML;
      this.copyBtn.innerHTML = '✅ コピーしました';
      this.copyBtn.classList.add('copied');
      setTimeout(() => {
        this.copyBtn.innerHTML = originalText;
        this.copyBtn.classList.remove('copied');
      }, 2500);
    });
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  if (typeof ARTICLES_DATA !== 'undefined') {
    ArticleModal.init(ARTICLES_DATA);
  }
});
