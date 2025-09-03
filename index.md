---
layout: home
title: "Hidden Crucials"
---

# Hidden Crucials

Repository konsep dan insight yang sering terabaikan namun fundamental dalam navigasi kehidupan digital dan personal growth.

Dokumentasi ini berisi fragmen pemikiran, observasi, dan framework yang dapat digunakan sebagai referensi untuk pengembangan diri dan optimasi interaksi digital.

## Recent Insights

<div class="posts">
  {% for post in site.posts limit:5 %}
    <article class="post">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
    </article>
  {% endfor %}
</div>

<a href="{{ '/posts/' | relative_url }}" class="button">Browse All Content</a>