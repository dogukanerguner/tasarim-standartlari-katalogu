---
id: 49
slug: "49-komut-paleti-raycast"
title: "Komut Paleti"
name: "Komut Paleti"
section: "11 — Masaüstü uygulama dilleri"
reference: "Raycast ekolü"
palette: ["#1a1b23", "#12131a", "#1e1f26", "#ff6363", "#f2f2f5"]
keywords: ["command palette", "launcher app", "keyboard-first", "floating panel", "shortcut badges"]
source: "49-komut-paleti-raycast.dc.html"
---

# 49 — Komut Paleti

Klavye-öncelikli launcher: tek yüzen panel, bölümlü sonuçlar, mono kısayol rozetleri.

## Prompt (EN)

Design a Raycast-style keyboard-first launcher. Dark desktop with a soft gradient (#1a1b23 to #12131a); centered 640px floating panel (#1e1f26, 12px radius, 1px rgba(255,255,255,.12) border, one wide soft shadow). Top: a large 18px search row with placeholder text and a blinking #ff6363 caret block. Below: a sectioned result list ("Commands", "Apps", "Files") where each row has a 30px rounded icon square, a name, and a right-aligned monospace shortcut badge like ⌘K in a bordered keycap chip; the selected row gets rgba(255,255,255,.08) fill plus a 3px left accent bar. Bottom action bar: "Open ↵ · Actions ⌘K". Inter for UI, ui-monospace for shortcuts, text #f2f2f5, secondary at 55% opacity. No window chrome, no multiple panes, no mouse-first menus.

## Brief (TR)

Koyu zemin ortasında tek floating panel: büyük arama satırı, bölümlü sonuç listesi, kısayol rozetleri ve alt eylem çubuğuyla klavye-öncelikli launcher.

## Kurallar

- **Tipografi:** Inter (UI) + ui-monospace kısayol rozetleri; 18px arama, 13.5px satırlar
- **Düzen:** Ortalanmış 640px tek panel: arama + bölümlü liste + action bar
- **Hareket:** Yanıp sönen imleç; sonuçlar tuş vuruşunda anında süzülür
- **Kaçınılacaklar:** Pencere kromu, çoklu panel, renk kalabalığı, fare-öncelikli menüler
