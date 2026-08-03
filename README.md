# Tasarım Standartları Kataloğu

**45 tasarım yaklaşımı — her biri hem çalışan canlı örnek, hem de AI kod üretiminde doğrudan kullanılabilir prompt ve kural seti.**

🔗 **Canlı demo:** [design.asveas.com](https://design.asveas.com)

![Önizleme](docs/preview.webp)

## Bu proje ne?

Klasik stil rehberleri insanlara anlatır; bu katalog aynı anda **makinelere de** anlatır. Her sayfa üç şeyi birden yapar:

1. **Canlı örnek** — stil, o stilin kendi diliyle kurulmuş gerçek bir sayfa olarak çalışır (statik görsel değil).
2. **Prompt kaynağı** — sayfanın altındaki blokta o stilin detaylı İngilizce üretim promptu, Türkçe brief'i, renk paleti, tipografisi, düzen/hareket kuralları ve **kaçınılacaklar** listesi bulunur; tek tıkla seçilip kopyalanır.
3. **Makine katmanı** — aynı bilgi [`ai/catalog.json`](ai/catalog.json) ve stil başına [`ai/styles/*.md`](ai/styles) dosyalarında yapısal olarak da mevcuttur. Bir LLM'e ya da kod asistanına "07 numaralı stilde bir landing page yap" diyebilmeniz için.

## İçerik — 10 bölüm, 45 sayfa

| Bölüm | Sayfalar | Kapsam |
|---|---|---|
| 01 · Küratörsel ekoller | 01–06 | Editoryal minimalizm, akışkan ajans, cyber-WebGL, anti-design, endüstriyel, grunge |
| 02 · SaaS akımları | 07–10 | Karanlık SaaS (Linear/Vercel), Bento grid, neo-brütalizm, B2B iskeletizm (Stripe) |
| 03 · Tarihsel akımlar | 11–14 | Bauhaus, İsviçre ızgarası, Y2K, retro terminal |
| 04 · Dokusal trendler | 15–17 | Glassmorphism, neomorphism, claymorphism |
| 05 · Sanat akımları | 18–23 | Art Nouveau, Art Deco, De Stijl, konstruktivizm, Memphis, mid-century |
| 06 · Kültürel diller | 24–27 | Vaporwave, Japon Ma / wabi-sabi, çini geometrik motif, solarpunk |
| 07 · Arayüz dönemleri | 28–30 | Skeuomorfizm, flat design, maksimalizm |
| 08 · İlke temelli | 31–33 | Erişilebilirlik öncelikli, kamu hizmeti sade dili, ham HTML brütalizmi |
| 09 · Mobil yapılar | 34–39 | Başparmak bölgesi, swipe destesi, aşamalı açığa çıkarma, boş durumlar, alt sayfalar, sonsuz akış |
| 10 · Davranış & psikoloji | 40–45 | Alışkanlık döngüsü, oyunlaştırma, sosyal kanıt, çapa fiyatlama, zirve–son kuralı, **karanlık desenler (etik uyarı)** |

> **Not:** 34–45 arası sayfalar görsel stil değil, **UX / davranış desenidir** — 01–33 arası bir görsel stille birleştirilerek kullanılır. 45 numaralı sayfa bir örnek değil, uyarıdır: karanlık desenleri tanımayı ve dürüst karşılıklarını öğretir.

## AI ile kullanım

```
ai/
├── catalog.json     # 45 stilin tamamı: prompt_en, brief_tr, palette,
│                    # typography, layout, motion, avoid, keywords, section
└── styles/          # stil başına frontmatter'lı markdown (tek stil = tek bağlam)
    ├── 01-editorial-minimalizm.md
    └── …
```

Örnek akış (Claude Code, Cursor vb.):

1. `catalog.json` içinden `title` / `keywords` alanlarıyla stil seçin.
2. İlgili `ai/styles/NN-slug.md` dosyasını bağlama verin — `prompt_en` üretim promptunun çekirdeğidir, `palette`/`typography`/`layout` somut değer kaynağıdır, `avoid` negatif kısıttır.
3. Sonucu `NN-….dc.html` canlı örneğiyle karşılaştırın.

Bu depo kök dizininde bir [`CLAUDE.md`](CLAUDE.md) de içerir; Claude Code bu klasörde açıldığında katalog kurallarını otomatik yükler.

## Nasıl çalışıyor?

Sayfalar `*.dc.html` formatındadır: `<x-dc>` içindeki şablonu [`support.js`](support.js) (dc-runtime) React ile render eder. Şablon dili `{{ prop }}` interpolasyonu, `sc-if`/`sc-for`, `<helmet>` ve `style-hover="…"` gibi pseudo-class öznitelikleri destekler. Katalog sayfası, örnekleri `iframe + scale(.25)` ile canlı küçük önizleme olarak gösterir.

Yerelde çalıştırmak için herhangi bir statik sunucu yeter:

```bash
python3 -m http.server 8000
# → http://localhost:8000/Katalog.dc.html
```

`ai/` katmanını kaynaktan yeniden üretmek için:

```bash
python3 tools/extract_prompts.py
```

## Katkı

Yeni bir stil eklemek = tek bir `NN-stil-adi.dc.html` dosyası + Katalog'a kart eklemek + `tools/extract_prompts.py` çalıştırmak. Kurallar: sayfa dili Türkçe, tüm stiller inline, görseller yer tutucu (telifli materyal yok), her sayfada prompt bloğu zorunlu.

## Lisans

[MIT](LICENSE) — prompt'lar, sayfalar ve araçlar dahil. Dilediğiniz projede kullanın; atıf sevindirir, şart değildir.
