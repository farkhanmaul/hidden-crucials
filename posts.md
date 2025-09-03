---
layout: default
title: "All Posts"
permalink: /posts/
---

# All Posts

A complete list of all thoughts, insights, and discoveries, sorted by most recent.

<div class="posts">
  {% for post in site.posts %}
    <article class="post">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="post-meta">
        {{ post.date | date: "%B %d, %Y" }}
        {% if post.categories.size > 0 %}
          • 
          {% for category in post.categories %}
            <span class="category">{{ category }}</span>{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        {% endif %}
      </p>
      <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
      {% if post.tags.size > 0 %}
        <div class="tags">
          {% for tag in post.tags %}
            <span class="tag">#{{ tag }}</span>{% unless forloop.last %} {% endunless %}
          {% endfor %}
        </div>
      {% endif %}
    </article>
  {% endfor %}
</div>

{% if site.posts.size == 0 %}
  <p>No posts yet. Check back soon!</p>
{% endif %}