# 📝 Articles Directory

## Cara Menambahkan Artikel Baru

### 1. Pilih Folder Kategori
```
_articles/
├── digital-wisdom/      # Kebijaksanaan Digital
├── cognitive-frameworks/ # Kerangka Kognitif  
├── personal-systems/    # Sistem Personal
└── social-dynamics/     # Dinamika Sosial
```

### 2. Buat File Artikel
Nama file: `judul-artikel.md` (gunakan kebab-case)

### 3. Template Artikel
```yaml
---
layout: docs
title: "Judul Artikel Anda"
description: "Deskripsi singkat artikel (maks 160 karakter)"
category: "Digital Wisdom"
date: 2024-01-01
tags: [tag1, tag2, tag3]
author: "Nama Penulis"
reading_time: 5
featured: false
---

# Judul Artikel

Konten artikel Anda di sini...
```

## Fitur Otomatis

### ✅ Auto-Generated
- Reading time estimation
- Table of contents
- Breadcrumb navigation
- Related articles
- SEO meta tags

### ✅ Advanced Markdown
- Text alignment: `{:.text-center}`
- Callouts: `{:.callout .callout-info}`
- Images: `{:.image-container}`
- Videos: `{:.video-container}`

## Management Commands

```bash
# Generate new article template
./_scripts/new-article.sh "Article Title" digital-wisdom

# Build and preview
bundle exec jekyll serve

# Deploy
git add . && git commit -m "Add: Article title" && git push
```

## Scaling for Hundreds of Articles

### Archive Pages
- `/articles/` - All articles with pagination
- `/articles/2024/` - Year-based archives
- `/category/digital-wisdom/` - Category archives
- `/tags/productivity/` - Tag archives

### Search & Filter
- Full-text search
- Filter by category, tags, date
- Sort by date, popularity, reading time

### Performance
- Lazy loading for images
- Pagination (20 articles per page)
- Compressed HTML/CSS/JS
- Service worker caching