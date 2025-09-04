// Documentation Site JavaScript
// Handles theme toggle, search, mobile menu, and table of contents

(function() {
  'use strict';

  // Theme Management
  class ThemeManager {
    constructor() {
      this.themeToggle = document.querySelector('.theme-toggle');
      this.currentTheme = localStorage.getItem('theme') || 'light';
      this.themes = ['light', 'dark', 'reading'];
      
      this.init();
    }

    init() {
      this.setTheme(this.currentTheme);
      this.bindEvents();
      this.updateThemeIcon();
    }

    bindEvents() {
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', () => {
          this.cycleTheme();
        });
      }
    }

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.currentTheme = theme;
      this.updateThemeIcon();
    }

    cycleTheme() {
      const currentIndex = this.themes.indexOf(this.currentTheme);
      const nextIndex = (currentIndex + 1) % this.themes.length;
      this.setTheme(this.themes[nextIndex]);
    }

    updateThemeIcon() {
      if (!this.themeToggle) return;
      
      const sunIcon = this.themeToggle.querySelector('.theme-toggle-sun');
      const moonIcon = this.themeToggle.querySelector('.theme-toggle-moon');
      const readingIcon = this.themeToggle.querySelector('.theme-toggle-reading');
      
      // Hide all icons
      [sunIcon, moonIcon, readingIcon].forEach(icon => {
        if (icon) icon.style.display = 'none';
      });
      
      // Show appropriate icon
      switch (this.currentTheme) {
        case 'light':
          if (sunIcon) sunIcon.style.display = 'block';
          break;
        case 'dark':
          if (moonIcon) moonIcon.style.display = 'block';
          break;
        case 'reading':
          if (readingIcon) readingIcon.style.display = 'block';
          break;
      }
    }
  }

  // Mobile Menu Management
  class MobileMenu {
    constructor() {
      this.toggleButton = document.querySelector('.mobile-menu-toggle');
      this.sidebar = document.querySelector('.docs-sidebar');
      this.isOpen = false;
      
      this.init();
    }

    init() {
      this.bindEvents();
    }

    bindEvents() {
      if (this.toggleButton) {
        this.toggleButton.addEventListener('click', () => {
          this.toggle();
        });
      }

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.sidebar.contains(e.target) && !this.toggleButton.contains(e.target)) {
          this.close();
        }
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }

    open() {
      this.sidebar.classList.add('open');
      this.toggleButton.setAttribute('aria-expanded', 'true');
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    }

    close() {
      this.sidebar.classList.remove('open');
      this.toggleButton.setAttribute('aria-expanded', 'false');
      this.isOpen = false;
      document.body.style.overflow = '';
    }
  }

  // Table of Contents Generator
  class TableOfContents {
    constructor() {
      this.container = document.getElementById('toc-container');
      this.content = document.querySelector('.docs-content');
      this.headings = [];
      this.activeHeading = null;
      
      if (this.container && this.content) {
        this.init();
      }
    }

    init() {
      this.generateTOC();
      this.bindEvents();
      this.updateActiveHeading();
    }

    generateTOC() {
      // Find all headings in content
      this.headings = Array.from(this.content.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      
      if (this.headings.length === 0) {
        this.container.style.display = 'none';
        return;
      }

      // Generate IDs for headings if they don't exist
      this.headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = this.generateId(heading.textContent) || `heading-${index}`;
        }
      });

      // Build TOC HTML
      const tocHTML = this.buildTOCHTML();
      this.container.innerHTML = tocHTML;
    }

    buildTOCHTML() {
      let html = '<ul class="toc-list">';
      let currentLevel = 0;

      this.headings.forEach((heading) => {
        const level = parseInt(heading.tagName.substring(1));
        const text = heading.textContent;
        const id = heading.id;

        if (level > currentLevel) {
          html += '<ul class="toc-list">';
        } else if (level < currentLevel) {
          html += '</ul>'.repeat(currentLevel - level);
        }

        html += `<li class="toc-item toc-level-${level}">
          <a href="#${id}" class="toc-link" data-heading="${id}">${text}</a>
        </li>`;

        currentLevel = level;
      });

      html += '</ul>';
      return html;
    }

    generateId(text) {
      return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    bindEvents() {
      // Smooth scroll for TOC links
      this.container.addEventListener('click', (e) => {
        if (e.target.classList.contains('toc-link')) {
          e.preventDefault();
          const targetId = e.target.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            this.scrollToElement(targetElement);
          }
        }
      });

      // Update active heading on scroll
      let throttleTimer;
      window.addEventListener('scroll', () => {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
          this.updateActiveHeading();
          throttleTimer = null;
        }, 10);
      });
    }

    scrollToElement(element) {
      const headerHeight = document.querySelector('.docs-header').offsetHeight;
      const elementTop = element.offsetTop - headerHeight - 16;
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }

    updateActiveHeading() {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let activeHeading = null;

      // Find the currently active heading
      for (let i = this.headings.length - 1; i >= 0; i--) {
        const heading = this.headings[i];
        if (heading.offsetTop <= scrollPos) {
          activeHeading = heading;
          break;
        }
      }

      // Update active states
      if (activeHeading !== this.activeHeading) {
        // Remove previous active
        const prevActive = this.container.querySelector('.toc-link.active');
        if (prevActive) {
          prevActive.classList.remove('active');
        }

        // Add new active
        if (activeHeading) {
          const newActive = this.container.querySelector(`[data-heading="${activeHeading.id}"]`);
          if (newActive) {
            newActive.classList.add('active');
          }
        }

        this.activeHeading = activeHeading;
      }
    }
  }

  // Simple Search Implementation
  class SearchManager {
    constructor() {
      this.searchInput = document.getElementById('docs-search');
      this.searchResults = null;
      this.pages = [];
      
      if (this.searchInput) {
        this.init();
      }
    }

    init() {
      this.createSearchResults();
      this.bindEvents();
      this.loadSearchIndex();
    }

    createSearchResults() {
      this.searchResults = document.createElement('div');
      this.searchResults.className = 'search-results';
      this.searchResults.innerHTML = `
        <div class="search-results-content">
          <div class="search-results-list"></div>
        </div>
      `;
      document.body.appendChild(this.searchResults);
    }

    bindEvents() {
      let searchTimeout;
      
      this.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length > 2) {
          searchTimeout = setTimeout(() => {
            this.performSearch(query);
          }, 300);
        } else {
          this.hideResults();
        }
      });

      this.searchInput.addEventListener('focus', () => {
        if (this.searchInput.value.trim().length > 2) {
          this.showResults();
        }
      });

      // Close search on outside click
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container') && !e.target.closest('.search-results')) {
          this.hideResults();
        }
      });
    }

    loadSearchIndex() {
      // In a real implementation, this would load from a search index file
      // For now, we'll use a simple placeholder
      this.pages = [
        {
          title: "Getting Started",
          url: "/getting-started/",
          content: "Introduction to Hidden Crucials documentation",
          category: "Getting Started"
        }
        // More pages would be loaded here
      ];
    }

    performSearch(query) {
      const results = this.pages.filter(page => {
        const searchText = `${page.title} ${page.content}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      }).slice(0, 8);

      this.displayResults(results, query);
    }

    displayResults(results, query) {
      const resultsList = this.searchResults.querySelector('.search-results-list');
      
      if (results.length === 0) {
        resultsList.innerHTML = `
          <div class="search-no-results">
            <p>No results found for "${query}"</p>
          </div>
        `;
      } else {
        resultsList.innerHTML = results.map(result => `
          <a href="${result.url}" class="search-result-item">
            <div class="search-result-title">${this.highlightQuery(result.title, query)}</div>
            <div class="search-result-category">${result.category}</div>
            <div class="search-result-content">${this.highlightQuery(result.content, query)}</div>
          </a>
        `).join('');
      }
      
      this.showResults();
    }

    highlightQuery(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

    showResults() {
      this.searchResults.classList.add('active');
    }

    hideResults() {
      this.searchResults.classList.remove('active');
    }
  }

  // Navigation State Management
  class NavigationManager {
    constructor() {
      this.currentPath = window.location.pathname;
      this.init();
    }

    init() {
      this.setActiveNavItem();
    }

    setActiveNavItem() {
      const navLinks = document.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (this.currentPath === href || this.currentPath.startsWith(href + '/'))) {
          link.classList.add('active');
          
          // Expand parent section if needed
          const section = link.closest('.nav-section');
          if (section) {
            section.classList.add('active');
          }
        }
      });
    }
  }

  // Initialize all components when DOM is ready
  function init() {
    new ThemeManager();
    new MobileMenu();
    new TableOfContents();
    new SearchManager();
    new NavigationManager();
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// Add styles for search results and TOC
const additionalCSS = `
/* Search Results */
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
  display: none;
}

.search-results.active {
  display: block;
}

.search-result-item {
  display: block;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border-light);
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}

.search-result-item:hover {
  background-color: var(--color-bg-secondary);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-title {
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: var(--space-1);
}

.search-result-category {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-1);
}

.search-result-content {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.search-no-results {
  padding: var(--space-4);
  text-align: center;
  color: var(--color-text-muted);
}

.search-result-item mark {
  background-color: var(--color-focus);
  color: white;
  padding: 0.1em 0.2em;
  border-radius: var(--radius-sm);
}

/* Table of Contents */
.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-item {
  margin-bottom: var(--space-2);
}

.toc-link {
  display: block;
  padding: var(--space-1) 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: var(--space-3);
  margin-left: -var(--space-3);
  transition: var(--transition);
  line-height: 1.4;
}

.toc-link:hover {
  color: var(--color-text);
}

.toc-link.active {
  color: var(--color-link);
  border-left-color: var(--color-link);
  font-weight: 500;
}

.toc-level-3 .toc-link {
  padding-left: var(--space-6);
}

.toc-level-4 .toc-link {
  padding-left: var(--space-8);
}

.toc-level-5 .toc-link,
.toc-level-6 .toc-link {
  padding-left: calc(var(--space-8) + var(--space-2));
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);