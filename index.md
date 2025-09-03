---
layout: home
title: "Welcome to Hidden Crucials"
---

# Hidden Crucials

A space for thoughts, insights, and discoveries that matter but might be overlooked.

This is a collection of writings, observations, and ideas that don't follow a specific order or sequence. Each piece stands on its own, ready to be discovered when you need it most.

## Recent Posts

<div class="posts">
  {% for post in site.posts limit:5 %}
    <article class="post">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
    </article>
  {% endfor %}
</div>

<a href="{{ '/posts/' | relative_url }}" class="button">View All Posts</a>