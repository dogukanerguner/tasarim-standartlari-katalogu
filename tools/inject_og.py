#!/usr/bin/env python3
"""Tüm .dc.html sayfalarının <head>'ine statik SEO/OG katmanı enjekte eder:
<html lang>, iki dilli <title> + description, canonical + hreflang (tr/en),
Open Graph / Twitter kartı, JSON-LD yapısal veri (WebPage/CreativeWork; Katalog
için WebSite + ItemList). Crawler'lar JS çalıştırmadığı için ham head gerekir.
Idempotent: işaretler arasını her seferinde yeniler.

Kullanım: python3 tools/inject_og.py   (öncesinde extract_prompts.py)
"""
import html, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://design.asveas.com"
SITE_TR, SITE_EN = "Tasarım Standartları Kataloğu", "Design Standards Catalog"
MARK_S, MARK_E = "<!-- og:start -->", "<!-- og:end -->"

def alt(url: str) -> str:
    return url + ("&" if "?" in url else "?") + "lang=en"

def block(title, desc, url, image, jsonld, extra="") -> str:
    t, d = html.escape(title, quote=True), html.escape(desc, quote=True)
    ld = json.dumps(jsonld, ensure_ascii=False).replace("</", "<\\/")
    return f"""{MARK_S}
<title>{t}</title>
<meta name="description" content="{d}">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="tr" href="{url}">
<link rel="alternate" hreflang="en" href="{alt(url)}">
<link rel="alternate" hreflang="x-default" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{SITE_TR} · {SITE_EN}">
<meta property="og:locale" content="tr_TR">
<meta property="og:locale:alternate" content="en_US">
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
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/brand/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#14120e">{extra}
<script type="application/ld+json">{ld}</script>
{MARK_E}"""

def inject(path: Path, b: str) -> None:
    src = path.read_text(encoding="utf-8")
    src = re.sub(r"<html(?:\s+lang=\"[^\"]*\")?>", '<html lang="tr">', src, count=1)
    if MARK_S in src:
        src = re.sub(re.escape(MARK_S) + r".*?" + re.escape(MARK_E), lambda _: b, src, flags=re.S)
    else:
        src = src.replace('<script src="./support.js"></script>', b + '\n<script src="./support.js"></script>', 1)
    path.write_text(src, encoding="utf-8")

def main() -> None:
    cat = json.loads((ROOT / "ai" / "catalog.json").read_text(encoding="utf-8"))
    site = {"@type": "WebSite", "name": SITE_TR, "alternateName": SITE_EN, "url": BASE + "/", "inLanguage": ["tr", "en"]}
    secs = {s["id"]: s for s in cat["sections"]}

    for s in cat["styles"]:
        name_en = s.get("name_en", s["name"]); desc_en = s.get("description_en", s["description"])
        url, img = f"{BASE}/{s['file']}", f"{BASE}/og/{s['slug']}.jpg"
        title = f"{s['id']:02d} — {s['name']} / {name_en} · {SITE_TR}"
        desc = f"{desc_en} — {s['description']}"
        ld = {"@context": "https://schema.org", "@type": "WebPage", "name": f"{s['name']} / {name_en}",
              "url": url, "inLanguage": ["tr", "en"], "description": desc_en, "image": img,
              "isPartOf": site,
              "about": {"@type": "CreativeWork", "name": name_en, "alternateName": s["name"],
                        "genre": "user interface design style", "creator": {"@type": "Thing", "name": s["reference"]},
                        "keywords": ", ".join(s.get("keywords", [])),
                        "isPartOf": {"@type": "Collection", "name": secs[s["section"]].get("title_en", ""),
                                     "alternateName": secs[s["section"]]["title"]}}}
        inject(ROOT / s["file"], block(title, desc, url, img, ld))

    n = len(cat["styles"])
    items = [{"@type": "ListItem", "position": i + 1, "url": f"{BASE}/{s['file']}",
              "name": f"{s['name']} / {s.get('name_en', s['name'])}"} for i, s in enumerate(cat["styles"])]
    ld_k = {"@context": "https://schema.org", "@graph": [
        {**site, "@id": BASE + "/#website",
         "description": f"{n} design languages as live pages + copy-paste AI prompts. {n} tasarım dili: canlı örnek + AI promptu."},
        {"@type": "ItemList", "name": f"{n} design styles", "numberOfItems": n, "itemListElement": items}]}
    extra_k = f'\n<link rel="alternate" type="application/json" href="{BASE}/ai/catalog.json" title="Catalog data (JSON)">' \
              f'\n<link rel="alternate" type="text/plain" href="{BASE}/llms.txt" title="LLM summary">'
    inject(ROOT / "Katalog.dc.html",
           block(f"{SITE_TR} — {SITE_EN}",
                 f"{n} design styles as live pages + copy-paste AI prompts, from Bauhaus to Bloomberg, from Monet to Material You. "
                 f"{n} tasarım stili: her biri canlı örnek sayfa + AI üretim promptu.",
                 f"{BASE}/", f"{BASE}/og/katalog.jpg", ld_k, extra_k))

    extras = {
        "Galeri.dc.html": (f"Aynı uygulama, {n} stil — One app, {n} styles",
                           f"The exact same to-do screen redesigned in all {n} styles. Aynı yapılacaklar listesi, {n} tasarım dilinde."),
        "Test.dc.html": ("Hangi tasarım stili sensin? — Which design style are you?",
                         f"Answer 6 questions and find your design style among {n}. 6 soru, {n} stilden biri sensin."),
        "Mikser.dc.html": ("Stil Mikseri — Style Mixer",
                           f"Blend any two of {n} design styles into one AI-ready prompt. İki stili tek prompt'ta harmanla."),
    }
    for fname, (t, d) in extras.items():
        f = ROOT / fname
        if f.exists():
            url = f"{BASE}/{fname}"
            ld = {"@context": "https://schema.org", "@type": "WebApplication", "name": t, "url": url,
                  "applicationCategory": "DesignApplication", "inLanguage": ["tr", "en"], "description": d, "isPartOf": site}
            inject(f, block(t, d, url, f"{BASE}/og/katalog.jpg", ld))
    print(f"SEO/OG enjekte edildi: {n} stil + Katalog + {len(extras)} uygulama sayfası")

if __name__ == "__main__":
    main()
