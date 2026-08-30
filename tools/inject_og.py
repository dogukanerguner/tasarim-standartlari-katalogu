#!/usr/bin/env python3
"""Tüm .dc.html sayfalarının <head>'ine statik OG/Twitter meta etiketleri
ve <title> enjekte eder (crawler'lar JS çalıştırmaz, bu yüzden helmet değil
ham head gerekir). Görseller og/<slug>.jpg — tools/… ekran görüntüsü
akışıyla üretilir. Idempotent: işaretler arasını her seferinde yeniler.

Kullanım: python3 tools/inject_og.py
"""

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://design.asveas.com"
MARK_S, MARK_E = "<!-- og:start -->", "<!-- og:end -->"

def block(title: str, desc: str, url: str, image: str) -> str:
    t, d = html.escape(title, quote=True), html.escape(desc, quote=True)
    return f"""{MARK_S}
<title>{t}</title>
<meta name="description" content="{d}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Tasarım Standartları Kataloğu">
<meta property="og:title" content="{t}">
<meta property="og:description" content="{d}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{t}">
<meta name="twitter:description" content="{d}">
<meta name="twitter:image" content="{image}">
{MARK_E}"""

def inject(path: Path, b: str) -> None:
    src = path.read_text(encoding="utf-8")
    if MARK_S in src:
        src = re.sub(re.escape(MARK_S) + r".*?" + re.escape(MARK_E), b, src, flags=re.S)
    else:
        src = src.replace('<script src="./support.js"></script>',
                          b + '\n<script src="./support.js"></script>', 1)
    path.write_text(src, encoding="utf-8")

def main() -> None:
    cat = json.loads((ROOT / "ai" / "catalog.json").read_text(encoding="utf-8"))

    for s in cat["styles"]:
        title = f"{s['id']:02d} — {s['name']} · Tasarım Standartları Kataloğu"
        desc = s.get("description_en") or s["description"]
        inject(ROOT / s["file"],
               block(title, desc, f"{BASE}/{s['file']}", f"{BASE}/og/{s['slug']}.jpg"))

    n = len(cat["styles"])
    inject(ROOT / "Katalog.dc.html",
           block("Tasarım Standartları Kataloğu — Design Standards Catalog",
                 f"{n} design styles as live pages + copy-paste AI prompts. "
                 f"From Bauhaus to Bloomberg, from Monet to Material You — "
                 f"her stil canlı örnek + AI promptu.",
                 f"{BASE}/", f"{BASE}/og/katalog.jpg"))

    extras = {
        "Galeri.dc.html": (f"Aynı uygulama, {n} stil — One app, {n} styles",
                           "The exact same to-do screen redesigned in every style of the catalog.",
                           "og/katalog.jpg"),
        "Test.dc.html": ("Hangi tasarım stili sensin? — Which design style are you?",
                         f"Answer 6 questions and find your design style among {n}.",
                         "og/katalog.jpg"),
        "Mikser.dc.html": ("Stil Mikseri — Style Mixer",
                           f"Blend any two of {n} design styles into one AI-ready prompt.",
                           "og/katalog.jpg"),
    }
    for fname, (t, d, img) in extras.items():
        f = ROOT / fname
        if f.exists():
            inject(f, block(t, d, f"{BASE}/{fname}", f"{BASE}/{img}"))

    print(f"OG meta enjekte edildi: {n} stil + Katalog + {sum(1 for f in extras if (ROOT/f).exists())} ek sayfa")

if __name__ == "__main__":
    main()
