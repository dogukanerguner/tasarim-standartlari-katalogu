---
id: 56
slug: "56-jest-fizik-paper"
title: "Jest & Fizik Arayüzü"
name: "Jest & Fizik Arayüzü"
section: "13 — Mobil uygulama standartları"
reference: "Mike Matas · Paper"
palette: ["#0a0a0c", "#ff6b35", "#7b2ff7", "#00d2ff", "#3a7bd5", "#ffffff"]
keywords: ["gesture-driven UI", "full-screen cards", "physics animation", "card deck", "chrome-free"]
source: "56-jest-fizik-paper.dc.html"
---

# 56 — Jest & Fizik Arayüzü

Buton değil fizik: tam ekran içerik kartları, yay animasyonu hissi ve keşfedilen jestler.

## Prompt (EN)

Design a gesture-driven, physics-based mobile UI in the spirit of Mike Matas's Paper. Dark stage (#0a0a0c), Inter at light weights. Phone one: a full-bleed content card with a vivid sunset gradient (#ff6b35 to #7b2ff7), a large light-weight headline and short subtitle, almost no chrome — only a clock and a tiny dot. At the bottom edge, a deck of four mini gradient cards peeks up with slight tilts, the middle one pulled higher, plus an "swipe up" hint arrow. Phone two: the same card mid-fold, its top half tilted with perspective rotateX to illustrate an origami transition. Second gradient #00d2ff to #3a7bd5. No buttons, no static grids, no hard-cut transitions — everything springs at 60fps.

## Brief (TR)

Kromsuz tam ekran degrade kartlar, çekilebilir kart destesi ve origami katlanma anıyla Paper'ın jest-fizik dilini gösteren koyu mobil sahne.

## Kurallar

- **Tipografi:** Inter 300/400; büyük başlıklar hafif ağırlıkta
- **Düzen:** Tam ekran kart + altta eğik mini kart destesi; krom yok
- **Hareket:** Yay fiziği, origami katlanma, jestle sürülen 60fps geçişler
- **Kaçınılacaklar:** Buton kalabalığı, statik grid, krom, sert kesme geçişler
