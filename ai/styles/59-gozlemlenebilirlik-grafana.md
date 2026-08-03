---
id: 59
slug: "59-gozlemlenebilirlik-grafana"
title: "Gözlemlenebilirlik Paneli"
name: "Gözlemlenebilirlik Paneli"
section: "14 — Dashboard & yönetim panelleri"
reference: "Grafana ekolü"
palette: ["#111217", "#1b1d23", "#73bf69", "#f2cc0c", "#e02f44", "#5794f2"]
keywords: ["observability dashboard", "dark ops panels", "threshold colors", "time series", "log stream"]
source: "59-gozlemlenebilirlik-grafana.dc.html"
---

# 59 — Gözlemlenebilirlik Paneli

Gece vardiyası ekranı: koyu paneller, eşik renkleri (yeşil/sarı/kırmızı) ve log akışı.

## Prompt (EN)

Design a Grafana-style observability dashboard for night-shift ops. Dark #111217 canvas, panels #1b1d23 with 2px radius, 8px gaps, 11px titles in #8e8e93, text #d8d9da, Inter plus ui-monospace values. Toolbar: "prod-cluster / overview", a "Last 6 hours" picker, refresh and a pulsing live dot. In a 12-column grid: four stat panels with big mono numbers colored by threshold (green #73bf69 uptime, yellow #f2cc0c disk 78%, red #e02f44 errors/min, blue #5794f2 requests), a wide 3-series CPU line chart with 10% fills, a memory area chart with dashed red limit, a semicircular conic-gradient gauge at 62%, and a 6-row log panel with colored INFO/WARN/ERROR levels. Every value carries a unit.

## Brief (TR)

Koyu zeminde eşik renkleriyle konuşan, sıkı gridli ve log panelli Grafana usulü ops ekranı.

## Kurallar

- **Tipografi:** Inter arayüz + ui-monospace değerler ve loglar
- **Düzen:** Araç şeridi + 12 kolonlu panel grid'i, 8px boşluk, 2px köşe
- **Hareket:** Yalnızca canlı nokta nabzı; paneller sakin
- **Kaçınılacaklar:** Açık tema, dekorasyon, boşluk israfı, birimsiz değer
