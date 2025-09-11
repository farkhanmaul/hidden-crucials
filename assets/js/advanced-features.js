// Advanced Features for Hidden Crucials
// Reading Progress, Analytics, Recommendations, and More

class ReadingProgress {
  constructor() {
    this.progressBar = null;
    this.article = document.querySelector('.docs-content');
    this.init();
  }

  init() {
    if (!this.article) return;
    
    this.createProgressBar();
    this.bindEvents();
    this.trackReadingTime();
  }

  createProgressBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'reading-progress';
    this.progressBar.innerHTML = `
      <div class="reading-progress-bar"></div>
      <div class="reading-progress-info">
        <span class="reading-time">0 min read</span>
        <span class="reading-progress-text">0%</span>
      </div>
    `;
    document.body.appendChild(this.progressBar);
  }

  bindEvents() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  updateProgress() {
    const articleRect = this.article.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const articleHeight = this.article.offsetHeight;
    
    // Calculate reading progress
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const articleTop = this.article.offsetTop;
    const progress = Math.max(0, Math.min(100, 
      ((scrollTop - articleTop + windowHeight) / articleHeight) * 100
    ));
    
    // Update progress bar
    const progressBarElement = this.progressBar.querySelector('.reading-progress-bar');
    const progressText = this.progressBar.querySelector('.reading-progress-text');
    
    progressBarElement.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
    
    // Show/hide progress bar
    if (progress > 5 && progress < 95) {
      this.progressBar.classList.add('visible');
    } else {
      this.progressBar.classList.remove('visible');
    }
  }

  trackReadingTime() {
    const startTime = Date.now();
    const wordCount = this.article.textContent.trim().split(/\s+/).length;
    const estimatedTime = Math.ceil(wordCount / 200); // 200 words per minute
    
    this.progressBar.querySelector('.reading-time').textContent = `${estimatedTime} min read`;
    
    // Track actual reading time
    let readingTime = 0;
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        readingTime += 1;
      }
    }, 1000);
    
    // Send analytics when user leaves
    window.addEventListener('beforeunload', () => {
      this.sendReadingAnalytics({
        url: window.location.pathname,
        title: document.title,
        readingTime: readingTime,
        progress: this.getProgress(),
        wordCount: wordCount
      });
      clearInterval(interval);
    });
  }

  getProgress() {
    const progressText = this.progressBar?.querySelector('.reading-progress-text')?.textContent;
    return parseInt(progressText) || 0;
  }

  sendReadingAnalytics(data) {
    // Store in localStorage for now (can be sent to analytics service)
    const analytics = JSON.parse(localStorage.getItem('reading-analytics') || '[]');
    analytics.push({
      ...data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });
    
    // Keep only last 100 entries
    if (analytics.length > 100) {
      analytics.splice(0, analytics.length - 100);
    }
    
    localStorage.setItem('reading-analytics', JSON.stringify(analytics));
  }
}

class AdvancedSearch {
  constructor() {
    this.searchIndex = [];
    this.searchInput = document.getElementById('articles-search');
    this.init();
  }

  async init() {
    if (!this.searchInput) return;
    
    await this.buildSearchIndex();
    this.enhanceSearch();
  }

  async buildSearchIndex() {
    // Build search index from articles
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
      const title = article.querySelector('.article-title a')?.textContent || '';
      const description = article.querySelector('.article-description')?.textContent || '';
      const category = article.dataset.category || '';
      const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent);
      
      this.searchIndex.push({
        element: article,
        title: title.toLowerCase(),
        description: description.toLowerCase(),
        category: category.toLowerCase(),
        tags: tags.map(tag => tag.toLowerCase()),
        searchText: `${title} ${description} ${category} ${tags.join(' ')}`.toLowerCase()
      });
    });
  }

  enhanceSearch() {
    let searchTimeout;
    
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performFuzzySearch(e.target.value);
      }, 150);
    });
  }

  performFuzzySearch(query) {
    if (!query.trim()) {
      this.showAllArticles();
      return;
    }

    const results = this.searchIndex
      .map(item => ({
        ...item,
        score: this.calculateScore(item.searchText, query.toLowerCase())
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    this.displaySearchResults(results);
  }

  calculateScore(text, query) {
    const words = query.split(' ').filter(word => word.length > 0);
    let score = 0;

    words.forEach(word => {
      if (text.includes(word)) {
        score += word.length;
        
        // Boost for exact matches
        if (text.indexOf(word) === 0) score += 10;
        
        // Boost for title matches
        if (text.indexOf(word) < 50) score += 5;
      } else {
        // Fuzzy matching for typos
        const fuzzyScore = this.fuzzyMatch(text, word);
        score += fuzzyScore;
      }
    });

    return score;
  }

  fuzzyMatch(text, pattern) {
    const patternLength = pattern.length;
    if (patternLength === 0) return 0;

    let score = 0;
    let patternIndex = 0;

    for (let i = 0; i < text.length && patternIndex < patternLength; i++) {
      if (text[i] === pattern[patternIndex]) {
        score += 1;
        patternIndex++;
      }
    }

    return patternIndex === patternLength ? score * 0.5 : 0;
  }

  displaySearchResults(results) {
    // Hide all articles
    this.searchIndex.forEach(item => {
      item.element.style.display = 'none';
    });

    // Show matching articles
    results.forEach(item => {
      item.element.style.display = 'block';
    });

    // Update search info
    this.updateSearchInfo(results.length);
  }

  showAllArticles() {
    this.searchIndex.forEach(item => {
      item.element.style.display = 'block';
    });
    this.updateSearchInfo(this.searchIndex.length);
  }

  updateSearchInfo(count) {
    let infoElement = document.querySelector('.search-info');
    if (!infoElement) {
      infoElement = document.createElement('div');
      infoElement.className = 'search-info';
      this.searchInput.parentNode.after(infoElement);
    }
    
    infoElement.textContent = count === this.searchIndex.length 
      ? '' 
      : `Found ${count} article${count !== 1 ? 's' : ''}`;
  }
}

class ArticleRecommendations {
  constructor() {
    this.currentArticle = document.querySelector('.docs-article');
    this.init();
  }

  init() {
    if (!this.currentArticle) return;
    
    this.generateRecommendations();
  }

  generateRecommendations() {
    const currentMeta = this.extractArticleMeta();
    const recommendations = this.findSimilarArticles(currentMeta);
    
    if (recommendations.length > 0) {
      this.renderRecommendations(recommendations);
    }
  }

  extractArticleMeta() {
    const title = document.querySelector('.docs-article-title')?.textContent || '';
    const content = document.querySelector('.docs-content')?.textContent || '';
    const category = document.querySelector('[data-category]')?.dataset.category || '';
    
    // Extract keywords from content
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 100);
    
    return {
      title: title.toLowerCase(),
      category: category.toLowerCase(),
      keywords: [...new Set(words)]
    };
  }

  findSimilarArticles(currentMeta) {
    // For demo, return mock recommendations
    // In real implementation, this would analyze all articles
    return [
      {
        title: "Building Mental Models for Complex Decisions",
        url: "/articles/mental-models-decisions/",
        category: "Cognitive Frameworks",
        similarity: 0.85
      },
      {
        title: "The Art of Information Filtering",
        url: "/articles/information-filtering/",
        category: "Digital Wisdom", 
        similarity: 0.78
      },
      {
        title: "Systems Thinking for Personal Growth",
        url: "/articles/systems-thinking-growth/",
        category: "Personal Systems",
        similarity: 0.72
      }
    ];
  }

  renderRecommendations(recommendations) {
    const container = document.createElement('div');
    container.className = 'article-recommendations';
    container.innerHTML = `
      <h3 class="recommendations-title">Related Articles</h3>
      <div class="recommendations-grid">
        ${recommendations.map(article => `
          <a href="${article.url}" class="recommendation-card">
            <div class="recommendation-category">${article.category}</div>
            <h4 class="recommendation-title">${article.title}</h4>
            <div class="recommendation-similarity">${Math.round(article.similarity * 100)}% match</div>
          </a>
        `).join('')}
      </div>
    `;
    
    // Insert after article content
    const insertPoint = document.querySelector('.docs-nav') || 
                       this.currentArticle.querySelector('.docs-content');
    if (insertPoint) {
      insertPoint.parentNode.insertBefore(container, insertPoint);
    }
  }
}

class BookmarkManager {
  constructor() {
    this.bookmarks = JSON.parse(localStorage.getItem('article-bookmarks') || '[]');
    this.init();
  }

  init() {
    this.addBookmarkButtons();
    this.bindEvents();
  }

  addBookmarkButtons() {
    // Add bookmark button to article header
    const articleHeader = document.querySelector('.docs-article-header');
    if (articleHeader) {
      const bookmarkBtn = document.createElement('button');
      bookmarkBtn.className = 'bookmark-btn';
      bookmarkBtn.innerHTML = `
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
        <span>Bookmark</span>
      `;
      
      const isBookmarked = this.isBookmarked(window.location.pathname);
      if (isBookmarked) {
        bookmarkBtn.classList.add('bookmarked');
        bookmarkBtn.querySelector('span').textContent = 'Bookmarked';
      }
      
      articleHeader.appendChild(bookmarkBtn);
    }

    // Add bookmark buttons to article cards
    document.querySelectorAll('.article-card').forEach(card => {
      const title = card.querySelector('.article-title a');
      if (title) {
        const url = title.getAttribute('href');
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn-small';
        bookmarkBtn.dataset.url = url;
        bookmarkBtn.innerHTML = `
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
          </svg>
        `;
        
        if (this.isBookmarked(url)) {
          bookmarkBtn.classList.add('bookmarked');
        }
        
        card.querySelector('.article-footer').appendChild(bookmarkBtn);
      }
    });
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.bookmark-btn') || e.target.closest('.bookmark-btn-small')) {
        e.preventDefault();
        this.toggleBookmark(e.target.closest('button'));
      }
    });
  }

  toggleBookmark(button) {
    const url = button.dataset.url || window.location.pathname;
    const title = document.querySelector('.docs-article-title')?.textContent || 
                  document.querySelector(`a[href="${url}"]`)?.textContent || 
                  'Untitled Article';
    
    if (this.isBookmarked(url)) {
      this.removeBookmark(url);
      button.classList.remove('bookmarked');
      if (button.querySelector('span')) {
        button.querySelector('span').textContent = 'Bookmark';
      }
    } else {
      this.addBookmark(url, title);
      button.classList.add('bookmarked');
      if (button.querySelector('span')) {
        button.querySelector('span').textContent = 'Bookmarked';
      }
    }
  }

  addBookmark(url, title) {
    this.bookmarks.push({
      url,
      title,
      timestamp: new Date().toISOString()
    });
    this.saveBookmarks();
  }

  removeBookmark(url) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.url !== url);
    this.saveBookmarks();
  }

  isBookmarked(url) {
    return this.bookmarks.some(bookmark => bookmark.url === url);
  }

  saveBookmarks() {
    localStorage.setItem('article-bookmarks', JSON.stringify(this.bookmarks));
  }

  getBookmarks() {
    return this.bookmarks;
  }
}

class ArticleExporter {
  constructor() {
    this.addExportButton();
  }

  addExportButton() {
    const articleHeader = document.querySelector('.docs-article-header');
    if (articleHeader) {
      const exportBtn = document.createElement('div');
      exportBtn.className = 'export-dropdown';
      exportBtn.innerHTML = `
        <button class="export-btn">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export
        </button>
        <div class="export-menu">
          <button data-format="markdown">Markdown</button>
          <button data-format="pdf">PDF</button>
          <button data-format="html">HTML</button>
          <button data-format="json">JSON</button>
        </div>
      `;
      
      articleHeader.appendChild(exportBtn);
      this.bindExportEvents();
    }
  }

  bindExportEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.export-btn')) {
        e.preventDefault();
        const dropdown = e.target.closest('.export-dropdown');
        dropdown.classList.toggle('active');
      }
      
      if (e.target.dataset.format) {
        e.preventDefault();
        this.exportArticle(e.target.dataset.format);
        e.target.closest('.export-dropdown').classList.remove('active');
      }
    });
  }

  exportArticle(format) {
    const article = {
      title: document.querySelector('.docs-article-title')?.textContent || '',
      description: document.querySelector('.docs-article-description')?.textContent || '',
      content: document.querySelector('.docs-content')?.innerHTML || '',
      url: window.location.href,
      exportDate: new Date().toISOString()
    };

    switch (format) {
      case 'markdown':
        this.exportAsMarkdown(article);
        break;
      case 'pdf':
        this.exportAsPDF(article);
        break;
      case 'html':
        this.exportAsHTML(article);
        break;
      case 'json':
        this.exportAsJSON(article);
        break;
    }
  }

  exportAsMarkdown(article) {
    const markdown = `# ${article.title}\n\n${article.description}\n\n${this.htmlToMarkdown(article.content)}`;
    this.downloadFile(`${this.slugify(article.title)}.md`, markdown, 'text/markdown');
  }

  exportAsHTML(article) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
               line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a1a; margin-bottom: 0.5rem; }
        .description { color: #666; font-size: 1.1rem; margin-bottom: 2rem; }
        .export-info { color: #999; font-size: 0.9rem; margin-bottom: 2rem; }
    </style>
</head>
<body>
    <h1>${article.title}</h1>
    <p class="description">${article.description}</p>
    <p class="export-info">Exported from ${article.url} on ${new Date(article.exportDate).toLocaleDateString()}</p>
    <div class="content">${article.content}</div>
</body>
</html>`;
    this.downloadFile(`${this.slugify(article.title)}.html`, html, 'text/html');
  }

  exportAsJSON(article) {
    this.downloadFile(`${this.slugify(article.title)}.json`, JSON.stringify(article, null, 2), 'application/json');
  }

  exportAsPDF(article) {
    // Simple PDF export (in real implementation, would use PDF library)
    window.print();
  }

  htmlToMarkdown(html) {
    // Simple HTML to Markdown conversion
    return html
      .replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, (match, level, text) => '#'.repeat(parseInt(level)) + ' ' + text + '\n\n')
      .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<code>(.*?)<\/code>/g, '`$1`')
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]*>/g, '');
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
  new ReadingProgress();
  new AdvancedSearch();
  new ArticleRecommendations();
  new BookmarkManager();
  new ArticleExporter();
});

// Add CSS for advanced features
const advancedCSS = `
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-surface-elevated);
  z-index: 100;
  opacity: 0;
  transition: opacity var(--transition-smooth);
  border-bottom: 1px solid var(--color-border-subtle);
}

.reading-progress.visible {
  opacity: 1;
}

.reading-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-light));
  transition: width 150ms ease-out;
  width: 0%;
}

.reading-progress-info {
  position: absolute;
  top: 8px;
  right: var(--space-4);
  display: flex;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  background: var(--color-surface);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius);
  border: 1px solid var(--color-border-subtle);
}

.search-info {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--color-accent-subtle);
  border-radius: var(--radius);
  border-left: 3px solid var(--color-accent);
}

.article-recommendations {
  margin: var(--space-16) 0;
  padding: var(--space-8);
  background: var(--color-surface-elevated);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-subtle);
}

.recommendations-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
}

.recommendation-card {
  display: block;
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.recommendation-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.recommendation-category {
  font-size: var(--text-xs);
  color: var(--color-accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.recommendation-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  line-height: var(--leading-snug);
}

.recommendation-similarity {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.bookmark-btn, .export-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: var(--transition-smooth);
  font-size: var(--text-sm);
  margin-top: var(--space-4);
}

.bookmark-btn:hover, .export-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-text-primary);
}

.bookmark-btn.bookmarked {
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.bookmark-btn-small {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.bookmark-btn-small:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.bookmark-btn-small.bookmarked {
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.export-dropdown {
  position: relative;
  display: inline-block;
}

.export-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-medium);
  padding: var(--space-2);
  min-width: 120px;
  z-index: 50;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: var(--transition-smooth);
}

.export-dropdown.active .export-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.export-menu button {
  display: block;
  width: 100%;
  padding: var(--space-2) var(--space-3);
  background: none;
  border: none;
  border-radius: var(--radius);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: var(--transition-smooth);
  font-size: var(--text-sm);
  text-align: left;
}

.export-menu button:hover {
  background: var(--color-surface-subtle);
  color: var(--color-text-primary);
}

@media (max-width: 768px) {
  .reading-progress-info {
    position: relative;
    top: auto;
    right: auto;
    margin-top: var(--space-2);
    justify-content: center;
  }
  
  .recommendations-grid {
    grid-template-columns: 1fr;
  }
  
  .bookmark-btn, .export-btn {
    width: 100%;
    justify-content: center;
    margin-top: var(--space-3);
  }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = advancedCSS;
document.head.appendChild(styleSheet);