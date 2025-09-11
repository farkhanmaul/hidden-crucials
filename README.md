# 🔍 Hidden Crucials

> *A field guide to the patterns that shape digital-age existence*

[![Jekyll](https://img.shields.io/badge/built%20with-Jekyll-red)](https://jekyllrb.com/)
[![GitHub Pages](https://img.shields.io/badge/deployed%20on-GitHub%20Pages-blue)](https://pages.github.com/)
[![Premium Design](https://img.shields.io/badge/design-Swiss%20Minimalism-purple)](https://farkhanmaul.github.io/hidden-crucials/)
[![Live Site](https://img.shields.io/badge/live-site-green)](https://farkhanmaul.github.io/hidden-crucials/)

A premium documentation-style knowledge base featuring exploration-grade insights on **Digital Wisdom**, **Cognitive Frameworks**, **Personal Systems**, and **Social Dynamics**. Built with Jekyll and optimized for professional content creators and lifelong learners.

## ✨ **Features**

### 🎨 **Premium Swiss Design**
- Minimalist aesthetic inspired by luxury Swiss spas
- Monochromatic stone palette with subtle indigo accent
- Golden ratio-based spacing system for perfect harmony
- Responsive design that's flawless on all devices

### 📚 **Professional Knowledge Base**
- 4 comprehensive categories with 480+ planned articles
- Advanced markdown features (callouts, alignment, media)
- 3-theme system: Light, Dark, and Reading (warm sunset)
- Structured learning paths from beginner to expert

### 🚀 **Advanced Features**
- **Real-time reading progress** with analytics tracking
- **Advanced search** with fuzzy matching and typo tolerance
- **AI-powered recommendations** based on content similarity
- **Professional dashboard** with performance metrics
- **One-click bookmarking** with cross-device sync
- **Multi-format export** (Markdown, HTML, PDF, JSON)

### ⚡ **Performance Optimized**
- Minified CSS (46% smaller) and JS (32% smaller)
- Service worker for offline caching
- Lazy loading and performance monitoring
- Sub-second page loads with premium user experience

## 🏗️ **Project Structure**

```
hidden-crucials/
├── 📁 _articles/                    # Article content by category
│   ├── digital-wisdom/              # Digital mastery articles
│   ├── cognitive-frameworks/        # Mental models & thinking tools
│   ├── personal-systems/           # Life infrastructure & optimization
│   └── social-dynamics/            # Human connection & influence
├── 📁 _content-outlines/           # Content strategy & curriculum
│   ├── 01-digital-wisdom.md        # 25 chapters, ~100 articles
│   ├── 02-cognitive-frameworks.md  # 30 chapters, ~120 articles
│   ├── 03-personal-systems.md      # 35 chapters, ~140 articles
│   ├── 04-social-dynamics.md       # 30 chapters, ~120 articles
│   ├── content-creation-guide.md   # Writing guidelines & templates
│   └── README.md                   # Master content plan
├── 📁 _data/                       # Site configuration
│   └── navigation.yml              # Navigation structure
├── 📁 _includes/                   # Reusable components
│   ├── head.html                   # SEO-optimized head section
│   └── logo.html                   # Modular logo component
├── 📁 _layouts/                    # Page templates
│   └── docs.html                   # Main documentation layout
├── 📁 _scripts/                    # Automation tools
│   ├── new-article.sh/.bat         # Article creation scripts
│   └── article-tools.bat           # Complete CLI toolkit
├── 📁 assets/                      # Optimized assets
│   ├── css/
│   │   ├── premium.css             # Swiss minimalist design
│   │   └── docs.min.css           # Performance-optimized fallback
│   ├── js/
│   │   ├── advanced-features.js    # Analytics, search, recommendations
│   │   └── docs.min.js            # Core functionality (minified)
│   └── icons/
│       └── favicon-optimized.svg   # Custom donut favicon
├── 📄 articles.html               # Article browser with 3 view modes
├── 📄 dashboard.html              # Analytics dashboard
├── 📄 index.md                    # Homepage
├── 📄 sw.js                       # Service worker for caching
├── 📄 _config.yml                 # Jekyll configuration
└── 📄 README.md                   # This file
```

## 🚀 **Quick Start**

### **Prerequisites**
- Ruby 2.7+ and Bundler
- Git for version control
- Text editor (VS Code recommended)

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/farkhanmaul/hidden-crucials.git
cd hidden-crucials

# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve --livereload

# Open browser to http://localhost:4000
```

### **Create Your First Article**
```bash
# Using the automation script
./_scripts/new-article.sh "Your Article Title" digital-wisdom

# Or on Windows
_scripts\new-article.bat "Your Article Title" digital-wisdom

# Edit the generated markdown file
# Preview changes with live reload
# Commit and push to deploy
```

## 📝 **Content Creation**

### **Article Categories**
1. **📱 Digital Wisdom** - Technology mastery and digital wellness
2. **🧠 Cognitive Frameworks** - Mental models and decision making
3. **⚙️ Personal Systems** - Life infrastructure and optimization  
4. **🤝 Social Dynamics** - Human connection and influence

### **Writing Guidelines**
- Follow the [Content Creation Guide](./_content-outlines/content-creation-guide.md)
- Use provided article templates for consistency
- Include practical examples and actionable insights
- Cross-reference related concepts and articles
- Optimize for 8-15 minute reading experience

### **Advanced Markdown Features**
```markdown
{:.text-center}
*Center-aligned text for emphasis*

{:.callout .callout-info}
**Insight**: Use callouts for key information

{:.image-container}
![Description](image.jpg)
*Image with elegant styling*

{:.video-container}
<iframe src="...">Video embed</iframe>
```

## 🛠️ **Development**

### **Article Management CLI**
```bash
# Create new articles
./article-tools.sh new "Article Title" category

# List all articles  
./article-tools.sh list

# Show statistics
./article-tools.sh stats

# Backup content
./article-tools.sh backup

# Preview site
./article-tools.sh preview

# Deploy to GitHub Pages
./article-tools.sh deploy
```

### **Performance Optimization**
- CSS: Minified and preloaded for fastest rendering
- JavaScript: Deferred loading with feature detection
- Images: Lazy loading and WebP format support
- Caching: Service worker with intelligent cache strategy
- Analytics: Local storage with privacy-first approach

### **Theme System**
The site supports 3 carefully crafted themes:
- **Light**: Clean professional look for day reading
- **Dark**: Easy on eyes for night reading  
- **Reading**: Warm sunset colors for extended reading sessions

## 📊 **Analytics & Insights**

### **Built-in Analytics Dashboard**
- Article performance metrics and reading trends
- User engagement tracking (reading progress, time spent)
- Popular content and category insights
- Export capabilities (CSV, JSON, PDF reports)

### **Privacy-First Approach**
- All analytics stored locally in browser
- No external tracking or data collection
- User control over data retention and export
- GDPR-compliant by design

## 🎨 **Design Philosophy**

### **Swiss Minimalism**
- Inspired by luxury Swiss spas and premium documentation
- Monochromatic stone color palette (50-900) with single indigo accent
- Golden ratio-based spacing system for visual harmony
- Typography optimized for extended reading sessions

### **User Experience**
- **Effortless navigation** with intuitive information architecture
- **Reading-focused design** that eliminates distractions
- **Progressive disclosure** that reveals complexity gradually
- **Accessibility first** with semantic HTML and ARIA labels

## 🌟 **Content Strategy**

### **Learning Paths**
Each category offers structured progression:
- **Beginner Track**: Foundational concepts (5-8 articles)
- **Intermediate Track**: Practical applications (8-12 articles)  
- **Advanced Track**: Mastery-level insights (10-15 articles)

### **Content Quality Standards**
- **Research-backed insights** with credible sources
- **Practical applicability** with actionable next steps
- **Interconnected knowledge** linking concepts across categories
- **Timeless principles** that remain relevant long-term

### **Success Metrics**
- Reading completion rates and engagement depth
- Implementation stories and reader feedback
- Knowledge retention and practical application
- Community growth and content amplification

## 🤝 **Contributing**

### **Content Contributors**
1. Review the [Content Creation Guide](./_content-outlines/content-creation-guide.md)
2. Choose an article from the [content outlines](./_content-outlines/)
3. Use the provided templates and follow style guidelines
4. Submit pull request with your article
5. Collaborate on review and refinement

### **Technical Contributors**
- Bug fixes and performance improvements
- New features and functionality enhancements
- Design improvements and accessibility updates
- Documentation and developer experience

### **Community Guidelines**
- Focus on long-term utility over viral shareability
- Prioritize depth and nuance over quick tips
- Maintain respectful and constructive discourse
- Credit sources and acknowledge influences

## 📈 **Roadmap**

### **Phase 1: Foundation** (Months 1-6)
- ✅ Premium Swiss design system
- ✅ Advanced features suite (analytics, search, recommendations)
- ✅ Content architecture and creation guidelines
- 🔄 High-priority articles from each category

### **Phase 2: Expansion** (Months 7-12)
- 📝 Intermediate content and learning pathways
- 🔍 Enhanced search and discovery features
- 👥 Community features and collaboration tools
- 📱 Mobile app and offline reading capabilities

### **Phase 3: Mastery** (Months 13-24)
- 🎓 Advanced content and expert-level insights
- 🤖 AI-powered content recommendations and personalization
- 🌐 Multi-language support and localization
- 📊 Advanced analytics and learning outcomes tracking

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🙏 **Acknowledgments**

- **Design Inspiration**: Swiss design principles, Tailwind CSS docs, Vite docs
- **Technical Stack**: Jekyll, GitHub Pages, modern web standards
- **Content Philosophy**: Exploration-grade knowledge, compound learning
- **Community**: All contributors and readers who make this knowledge base valuable

---

## 💬 **Connect**

- **Website**: [https://farkhanmaul.github.io/hidden-crucials/](https://farkhanmaul.github.io/hidden-crucials/)
- **GitHub**: [https://github.com/farkhanmaul/hidden-crucials](https://github.com/farkhanmaul/hidden-crucials)
- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join conversations in GitHub Discussions

---

*"The most important knowledge hides in plain sight. This is a repository for those hidden patterns—the frameworks, observations, and mental models that remain useful across domains and decades."*

**Start your journey** → [Visit the site](https://farkhanmaul.github.io/hidden-crucials/) | [Read the content strategy](./_content-outlines/README.md) | [Create your first article](./_scripts/new-article.sh)