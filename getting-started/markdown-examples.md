---
layout: docs
title: "Markdown Examples"
description: "Showcase of advanced markdown features with Indonesian content"
category: "Getting Started"
---

# Contoh Fitur Markdown Lanjutan

Halaman ini mendemonstrasikan berbagai fitur markdown yang tersedia dalam dokumentasi Hidden Crucials.

## Text Formatting Dasar

**Teks tebal** dan *teks miring* serta ***tebal dan miring***

~~Teks yang dicoret~~ dan `kode inline`

## Text Alignment

{:.text-left}
Paragraf ini rata kiri (default). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{:.text-center}
Paragraf ini rata tengah. Berguna untuk quote atau emphasis khusus. Ut enim ad minim veniam, quis nostrud exercitation ullamco.

{:.text-right}  
Paragraf ini rata kanan. Cocok untuk signature atau penutup. Duis aute irure dolor in reprehenderit in voluptate.

## Callout Boxes

{:.callout .callout-info}
**Info**: Ini adalah callout info untuk memberikan informasi tambahan yang berguna bagi pembaca.

{:.callout .callout-warning}
**Peringatan**: Hati-hati dengan implementasi ini karena dapat mempengaruhi performa sistem.

{:.callout .callout-success}
**Berhasil**: Konfigurasi telah selesai dan sistem berjalan dengan baik!

{:.callout .callout-error}
**Error**: Terjadi kesalahan dalam proses. Silakan periksa log untuk detail lebih lanjut.

## Code Blocks

```javascript
// Contoh implementasi theme toggle
class ThemeManager {
  constructor() {
    this.themes = ['light', 'dark', 'reading'];
    this.currentTheme = localStorage.getItem('theme') || 'light';
  }
  
  cycleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.setTheme(this.themes[nextIndex]);
  }
}
```

## Tables

| Fitur | Light Mode | Dark Mode | Reading Mode |
|-------|------------|-----------|--------------|
| Background | `#ffffff` | `#1a1a1a` | `#fef9f3` |
| Text | `#1a1a1a` | `#e5e5e5` | `#4a2c20` |
| Accent | `#dc2626` | `#ef4444` | `#c2410c` |

## Lists

### Daftar Berurut
1. Pahami masalah dengan mendalam
2. Identifikasi pola yang tersembunyi
3. Aplikasikan framework yang tepat
4. Evaluasi dan iterasi solusi

### Daftar Tidak Berurut
- **Cognitive Bias**: Memahami distorsi dalam pengambilan keputusan
- **Mental Models**: Kerangka berpikir untuk masalah kompleks
- **System Thinking**: Melihat hubungan antar komponen
- **First Principles**: Memecah masalah ke elemen fundamental

## Images

{:.image-container}
![Contoh Diagram](https://via.placeholder.com/600x300/dc2626/ffffff?text=Diagram+Contoh)
*Contoh diagram yang menjelaskan konsep utama*

{:.image-center}
![Logo](https://via.placeholder.com/200x200/ef4444/ffffff?text=Logo)

## Video Preview

{:.video-container}
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
*Video penjelasan konsep dalam praktek*

## Quotes

> Pengetahuan yang paling berharga adalah yang tersembunyi di depan mata. 
> Yang tampak jelas justru sering diabaikan karena kesederhanaannya.
> 
> — Hidden Crucials Philosophy

{:.quote-highlight}
> "The best way to understand a system is to try to change it."
> — Kurt Lewin

## Mathematical Notation

Untuk inline math: `E = mc²`

Untuk block math:
```
f(x) = ∫ x dx = x²/2 + C
```

## Links dan References

Ini adalah contoh [link internal](/getting-started/) dan [link eksternal](https://example.com).

Referensi dengan footnote[^1] juga didukung.

[^1]: Ini adalah footnote yang menjelaskan detail tambahan.

## Progressive Disclosure

<details>
<summary>Klik untuk melihat detail teknis</summary>

Implementasi fitur markdown ini menggunakan kombinasi:

- CSS custom classes untuk styling
- JavaScript untuk interaktivity
- Jekyll liquid tags untuk processing
- Custom CSS properties untuk theming

```css
.callout {
  padding: var(--space-4);
  border-left: 4px solid var(--color-border);
  border-radius: var(--radius-md);
  margin: var(--space-6) 0;
}

.callout-info {
  background-color: var(--color-info-bg);
  border-color: var(--color-info);
}
```

</details>

---

{:.text-center}
*Semua fitur di atas dapat digunakan dalam artikel dokumentasi untuk menciptakan konten yang lebih menarik dan informatif.*