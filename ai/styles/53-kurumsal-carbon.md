---
id: 53
slug: "53-kurumsal-carbon"
title: "Kurumsal Veri Sistemi"
name: "Kurumsal Veri Sistemi"
section: "12 — Web uygulama standartları"
reference: "IBM Carbon"
palette: ["#f4f4f4", "#ffffff", "#0f62fe", "#161616", "#24a148", "#da1e28"]
keywords: ["enterprise console", "zero radius", "data table", "IBM Plex", "status tags"]
source: "53-kurumsal-carbon.dc.html"
---

# 53 — Kurumsal Veri Sistemi

Paul Rand mirası: sıfır radius, 2x grid, IBM Plex ve ciddi veri tablosu düzeni.

## Prompt (EN)

Design an IBM Carbon-style cloud resource console. 48px black (#161616) header with white product name and square icon boxes; gray (#f4f4f4) page over white surfaces; a 256px white side nav with mono section labels and a blue-left-border selected item. Content: page title, a sharp-cornered blue (#0f62fe) primary button ("Create resource"), a blue left-border inline notification, then a large white data table with 48px rows, search + filter header, columns Name/Status/Region/Type/Date, status tags as 24px pills (green #defbe6/#0e6027 "Running", red "Error", gray "Stopped"), and pagination footer. Fonts: IBM Plex Sans + IBM Plex Mono. Everything at 0px radius except the pill tags. No shadows, gradients or emoji.

## Brief (TR)

Sıfır radius, 2x grid ve IBM Plex tipografisiyle keskin, ciddi bir bulut kaynak yönetim konsolu.

## Kurallar

- **Tipografi:** IBM Plex Sans (arayüz) + IBM Plex Mono (kaynak adları, etiketler)
- **Düzen:** 48px siyah header + 256px nav + 48px satırlı veri tablosu, 2x grid
- **Hareket:** Yalnızca satır hover'ı ve odak çerçevesi; süsleme animasyonu yok
- **Kaçınılacaklar:** Yuvarlak köşe, gölge, degrade, emoji, dekoratif renk
