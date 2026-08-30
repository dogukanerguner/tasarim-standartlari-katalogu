#!/usr/bin/env python3
"""SEO + GEO çıktıları üretir: sitemap.xml, robots.txt, llms.txt, llms-full.txt.
Kaynak: ai/catalog.json + ai/styles/*.md. Kullanım: python3 tools/build_seo.py
"""
import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://design.asveas.com"
cat = json.loads((ROOT / "ai" / "catalog.json").read_text(encoding="utf-8"))
today = date.today().isoformat()

# --- sitemap.xml -------------------------------------------------------------
urls = [("/", "1.0"), ("/Galeri.dc.html", "0.9"), ("/Test.dc.html", "0.8"), ("/Mikser.dc.html", "0.8")]
urls += [(f"/{s['file']}", "0.7") for s in cat["styles"]]
x = ['<?xml version="1.0" encoding="UTF-8"?>',
     '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
for u, pr in urls:
    sep = "&amp;" if "?" in u else "?"
    x.append(f"  <url><loc>{BASE}{u}</loc><lastmod>{today}</lastmod><priority>{pr}</priority>"
             f'<xhtml:link rel="alternate" hreflang="tr" href="{BASE}{u}"/>'
             f'<xhtml:link rel="alternate" hreflang="en" href="{BASE}{u}{sep}lang=en"/></url>')
x.append("</urlset>")
(ROOT / "sitemap.xml").write_text("\n".join(x) + "\n", encoding="utf-8")

# --- robots.txt --------------------------------------------------------------
(ROOT / "robots.txt").write_text(
    "User-agent: *\nAllow: /\n\n"
    f"Sitemap: {BASE}/sitemap.xml\n"
    f"# LLM-friendly summaries: {BASE}/llms.txt and {BASE}/llms-full.txt\n", encoding="utf-8")

# --- llms.txt (GEO) -----------------------------------------------------------
n = len(cat["styles"])
secs = {s["id"]: s for s in cat["sections"]}
lines = [f"# Tasarım Standartları Kataloğu — Design Standards Catalog",
         "",
         f"> {n} design languages, each as a live HTML page plus a copy-paste AI generation prompt "
         "(English), palette, typography, layout, motion and an explicit avoid-list. "
         "Turkish/English UI. MIT licensed. Machine-readable data: "
         f"{BASE}/ai/catalog.json — one Markdown file per style under {BASE}/ai/styles/.",
         "",
         "How to use with an AI coding tool: pick a style, read its `prompt_en` as the core prompt, "
         "use `palette`/`typography`/`layout` as concrete values and `avoid` as negative constraints, "
         "then compare the result with the live page. MCP server available in the repo (`mcp/`).",
         "",
         "## Tools",
         f"- [Gallery — one to-do app in {n} styles]({BASE}/Galeri.dc.html)",
         f"- [Quiz — which design style are you?]({BASE}/Test.dc.html)",
         f"- [Mixer — blend two styles into one prompt]({BASE}/Mikser.dc.html)",
         f"- [Catalog JSON]({BASE}/ai/catalog.json)",
         ""]
cur = None
for s in cat["styles"]:
    if s["section"] != cur:
        cur = s["section"]; sec = secs[cur]
        lines += [f"## {sec.get('title_en', sec['title'])} ({sec['title']})", ""]
    lines.append(f"- [{s['id']:02d} — {s.get('name_en', s['name'])} / {s['name']}]({BASE}/{s['file']}): "
                 f"{s.get('description_en', s['description'])} "
                 f"[md]({BASE}/ai/styles/{s['slug']}.md)")
    if s["id"] == max(x["id"] for x in cat["styles"] if x["section"] == cur): lines.append("")
(ROOT / "llms.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")

# --- llms-full.txt ------------------------------------------------------------
full = [lines[0], "", lines[2], ""]
for s in cat["styles"]:
    md = (ROOT / "ai" / "styles" / f"{s['slug']}.md").read_text(encoding="utf-8")
    full += [f"<!-- {BASE}/{s['file']} -->", md, ""]
(ROOT / "llms-full.txt").write_text("\n".join(full), encoding="utf-8")

print(f"sitemap ({len(urls)} url), robots, llms.txt ({len(lines)} satır), llms-full.txt yazıldı")
