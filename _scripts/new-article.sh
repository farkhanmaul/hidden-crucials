#!/bin/bash

# Script to create new article with template
# Usage: ./new-article.sh "Article Title" [category]

if [ -z "$1" ]; then
    echo "Usage: ./new-article.sh \"Article Title\" [category]"
    echo "Categories: digital-wisdom, cognitive-frameworks, personal-systems, social-dynamics"
    exit 1
fi

title="$1"
category="${2:-digital-wisdom}"

# Convert title to filename (kebab-case)
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')

# Get current date
current_date=$(date +%Y-%m-%d)

# Create article file
article_path="_articles/${category}/${filename}.md"

echo "Creating article: $article_path"

# Map category to display name
case $category in
    "digital-wisdom") category_display="Digital Wisdom" ;;
    "cognitive-frameworks") category_display="Cognitive Frameworks" ;;
    "personal-systems") category_display="Personal Systems" ;;
    "social-dynamics") category_display="Social Dynamics" ;;
    *) category_display="$category" ;;
esac

cat > "$article_path" << EOF
---
layout: docs
title: "$title"
description: "Brief description of the article (max 160 characters)"
category: "$category_display"
date: $current_date
tags: [tag1, tag2, tag3]
author: "Hidden Crucials"
reading_time: 5
featured: false
---

# $title

*Brief subtitle or introduction*

Your article content starts here...

## Section Heading

Content for this section.

### Subsection

More detailed content.

{:.callout .callout-info}
**Tip**: Use callouts to highlight important information.

## Practical Implementation

Actionable steps or examples.

{:.text-center}
*"Quote or key insight that deserves emphasis"*

---

**Next Steps**: What should the reader do after reading this article?
EOF

echo "Article created successfully: $article_path"
echo
echo "Next steps:"
echo "1. Edit the article content in your favorite editor"
echo "2. Update the description, tags, and reading_time"
echo "3. Preview with: bundle exec jekyll serve"
echo "4. Publish with: git add . && git commit -m \"Add: $title\" && git push"