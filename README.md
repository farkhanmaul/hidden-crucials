# Hidden Crucials

A Jekyll-powered website for thoughts, insights, and discoveries that don't follow a specific order or sequence.

## About

Hidden Crucials is a collection of writings designed to capture valuable insights and ideas that might otherwise be lost. Unlike traditional blogs or documentation, each post stands independently and can be discovered in any order.

## Features

- Clean, professional design with dark mode support
- Responsive layout optimized for reading
- Categories and tags for content organization
- SEO optimized with Jekyll SEO Tag
- Automatically deployed to GitHub Pages

## Local Development

1. Install Ruby and Jekyll
2. Clone this repository
3. Run `bundle install`
4. Run `bundle exec jekyll serve`
5. Visit `http://localhost:4000`

## Writing Posts

Create new posts in the `_posts` directory with the filename format: `YYYY-MM-DD-title.md`

Include this frontmatter:
```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +0700
categories: [category1, category2]
tags: [tag1, tag2, tag3]
---
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

## License

Content and code are available under the MIT License.