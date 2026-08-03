#!/usr/bin/env python3
"""Stil sayfalarının prompt bloklarını makine tarafından okunabilir
katmana çıkarır: ai/catalog.json + ai/styles/NN-slug.md.

Kart üstverileri (isim, ekol, açıklama, anahtar kelimeler, bölüm)
`data/catalog-meta.json` dosyasından okunur — Katalog sayfası da aynı
katmandan (ai/catalog.json) beslendiği için tek doğruluk kaynağı budur.

Kullanım:  python3 tools/extract_prompts.py
Kaynak değiştiğinde yeniden çalıştırmak yeterli; çıktılar üzerine yazılır.

Yeni stil eklemek: NN-stil-adi.dc.html sayfasını (prompt bloğuyla) yaz,
data/catalog-meta.json'a kaydını ekle, bu script'i çalıştır.
"""

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "ai"
META = ROOT / "data" / "catalog-meta.json"

TAG_RE = re.compile(r"<[^>]+>")
HEX_RE = re.compile(r"#[0-9a-fA-F]{3,8}\b")


def strip_tags(s: str) -> str:
    return html.unescape(TAG_RE.sub("", s)).strip()


def section_value(block: str, label: str) -> str:
    """Prompt bloğunun sağ kolonundaki `label` başlığını izleyen değer div'i."""
    m = re.search(
        re.escape(label) + r"</div>\s*<div[^>]*>(.*?)</div>",
        block,
        re.S,
    )
    return strip_tags(m.group(1)) if m else ""


def parse_style_file(path: Path) -> dict:
    src = path.read_text(encoding="utf-8")
    i = src.find("data-prompt-block")
    if i < 0:
        raise SystemExit(f"{path.name}: data-prompt-block bulunamadı")
    block = src[i:]

    m = re.search(r"Tasarım promptu — (\d+) — ([^<]+)", block)
    num, title = int(m.group(1)), html.unescape(m.group(2)).strip()

    prompt_en = strip_tags(
        re.search(r'user-select:all">(.*?)</div>', block, re.S).group(1)
    )
    brief_tr = section_value(block, "Türkçe brief")

    palet_m = re.search(r"Palet</div>\s*<div[^>]*>(.*?)</div>\s*</div>", block, re.S)
    palette = list(dict.fromkeys(HEX_RE.findall(palet_m.group(1)))) if palet_m else []
    # renk çipi + etiket aynı hex'i iki kez içerir; dict.fromkeys sırayı koruyarak tekilleştirir

    return {
        "id": num,
        "slug": path.name.replace(".dc.html", ""),
        "file": path.name,
        "title": title,
        "prompt_en": prompt_en,
        "brief_tr": brief_tr,
        "palette": palette,
        "typography": section_value(block, "Tipografi"),
        "layout": section_value(block, "Düzen"),
        "motion": section_value(block, "Hareket"),
        "avoid": section_value(block, "Kaçınılacaklar"),
    }


def style_markdown(st: dict, sections_by_id: dict[int, dict]) -> str:
    sec = sections_by_id.get(st["section"], {})
    fm = {
        "id": st["id"],
        "slug": st["slug"],
        "title": st["title"],
        "name": st["name"],
        "section": f"{st['section']:02d} — {sec.get('title', '')}",
        "reference": st["reference"],
        "palette": st["palette"],
        "keywords": st["keywords"],
        "source": st["file"],
    }
    lines = ["---"]
    for k, v in fm.items():
        lines.append(f"{k}: {json.dumps(v, ensure_ascii=False)}")
    lines.append("---")
    lines += [
        "",
        f"# {st['id']:02d} — {st['title']}",
        "",
        st["description"],
        "",
        "## Prompt (EN)",
        "",
        st["prompt_en"],
        "",
        "## Brief (TR)",
        "",
        st["brief_tr"],
        "",
        "## Kurallar",
        "",
        f"- **Tipografi:** {st['typography']}",
        f"- **Düzen:** {st['layout']}",
        f"- **Hareket:** {st['motion']}",
        f"- **Kaçınılacaklar:** {st['avoid']}",
        "",
    ]
    return "\n".join(lines)


def main() -> None:
    meta = json.loads(META.read_text(encoding="utf-8"))
    sections = meta["sections"]
    cards = {int(k): v for k, v in meta["styles"].items()}
    sections_by_id = {s["id"]: s for s in sections}

    styles = []
    for path in sorted(ROOT.glob("[0-9][0-9]-*.dc.html")):
        st = parse_style_file(path)
        card = cards.get(st["id"])
        if card is None:
            raise SystemExit(
                f"data/catalog-meta.json içinde kayıt yok: {path.name}"
            )
        st.update(card)
        styles.append(st)

    missing_pages = set(cards) - {s["id"] for s in styles}
    if missing_pages:
        raise SystemExit(f"Meta'da var ama sayfası yok: {sorted(missing_pages)}")

    (OUT / "styles").mkdir(parents=True, exist_ok=True)

    catalog = {
        "name": "Tasarım Standartları Kataloğu",
        "description": (
            f"{len(styles)} tasarım yaklaşımının AI kod üretiminde "
            "kullanılabilir prompt, palet ve kural seti. Kaynak: *.dc.html "
            "sayfalarının prompt blokları + data/catalog-meta.json."
        ),
        "sections": sections,
        "styles": styles,
    }
    (OUT / "catalog.json").write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    for st in styles:
        (OUT / "styles" / f"{st['slug']}.md").write_text(
            style_markdown(st, sections_by_id), encoding="utf-8"
        )

    print(f"{len(styles)} stil, {len(sections)} bölüm → {OUT.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
