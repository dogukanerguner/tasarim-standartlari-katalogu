---
id: 50
slug: "50-blok-editor-notion"
title: "Blok Editör Çalışma Alanı"
name: "Blok Editör Çalışma Alanı"
section: "12 — Web uygulama standartları"
reference: "Ivan Zhao · Notion"
palette: ["#ffffff", "#f7f6f3", "#37352f", "#787774", "#fbf3db"]
keywords: ["block editor", "quiet workspace", "emoji icons", "slash command", "toggle blocks"]
source: "50-blok-editor-notion.dc.html"
---

# 50 — Blok Editör Çalışma Alanı

Her şey blok: kaybolan araç kromu, emoji ikonografi, sessiz gri kenar ve beyaz doküman.

## Prompt (EN)

Design a Notion-style block editor workspace for a fictional knowledge base. Left: a 260px quiet gray sidebar (#f7f6f3) with workspace name, a search row and an emoji-icon page tree with indentation. Right: a white document (#ffffff, text #37352f, secondary #787774) with page emoji, large bold title, breadcrumb, then blocks: paragraph, a to-do list (two checked, two empty), a toggle block, a light-yellow callout (#fbf3db) with 💡, a small three-column table, and a faint "Type / for commands" hint. Show a ⋮⋮ drag handle on one block. Font: ui-sans-serif/system-ui only. Chrome disappears; no toolbars, no shadows beyond a hairline, radius 4-6px.

## Brief (TR)

Kenar çubuğu sessiz gri, doküman bembeyaz; her içerik parçasının taşınabilir bir blok olduğu, kromun kaybolduğu bilgi tabanı arayüzü.

## Kurallar

- **Tipografi:** ui-sans-serif / system-ui; 38px kalın sayfa başlığı, 15–16px gövde
- **Düzen:** 260px gri kenar çubuğu + beyaz doküman kolonu, bloklar dikey akışta
- **Hareket:** Hover'da tutamaç ve kontroller belirir; başka animasyon yok
- **Kaçınılacaklar:** Renk cümbüşü, kalın sınırlar, gölge, yoğun toolbar
