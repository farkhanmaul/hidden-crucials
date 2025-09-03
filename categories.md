---
layout: default
title: "Categories"
permalink: /categories/
---

# Categories

Browse posts by category to find related content.

{% assign categories = site.categories | sort %}
{% for category in categories %}
  {% assign posts = category[1] %}
  {% if posts.size > 0 %}
    <h2 id="{{ category[0] | slugify }}">{{ category[0] | capitalize }}</h2>
    <div class="posts">
      {% for post in posts %}
        <article class="post">
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
          <p>{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
        </article>
      {% endfor %}
    </div>
  {% endif %}
{% endfor %}

{% if site.categories.size == 0 %}
  <p>No categories yet. Posts will be organized here as they're added.</p>
{% endif %}