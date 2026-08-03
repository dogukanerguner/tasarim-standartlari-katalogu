# Tasarım Standartları Kataloğu

72 tasarım yaklaşımını hem canlı örnek sayfa hem de AI kod üretiminde
kullanılabilir prompt/kural seti olarak sunan katalog.

## Yapı

- `NN-stil-adi.dc.html` — 72 stil sayfası. Her biri stilin çalışan örneği +
  sayfa sonunda `data-prompt-block="1"` içinde detaylı İngilizce prompt,
  Türkçe brief, palet, tipografi, düzen, hareket ve kaçınılacaklar.
- `Katalog.dc.html` — aramalı, canlı iframe önizlemeli index. Veri odaklıdır:
  kartları `ai/catalog.json`'dan çeker, HTML'inde kart listesi yoktur.
- `support.js` — dc-runtime (React tabanlı `<x-dc>` şablon motoru).
  `dc-runtime/src/*.ts`'den derlenmiştir, **elle düzenlenmez**.
- `data/catalog-meta.json` — kart üstverilerinin (isim, ekol, açıklama,
  anahtar kelimeler, bölüm) tek doğruluk kaynağı; elle düzenlenir.
- `ai/` — üretilmiş katman (`catalog.json` + `styles/*.md`): stil sayfalarının
  prompt blokları + `data/catalog-meta.json` birleşimi. Elle düzenlenmez.
- `tools/extract_prompts.py` — `ai/` katmanını yeniden üretir.

## Kurallar

- Bir tasarım stili uygulanacaksa önce `ai/catalog.json`'dan stili bul,
  ilgili `ai/styles/NN-slug.md` dosyasını oku ve oradaki `prompt_en`,
  `palette` ve `avoid` alanlarına sadık kal.
- Stil sayfası prompt bloğu ya da `data/catalog-meta.json` değişirse
  `python3 tools/extract_prompts.py` çalıştırılıp `ai/` güncellenmeli
  (Katalog sayfası da bu katmandan beslendiği için başka adım gerekmez).
- Yeni stil = sayfa + `data/catalog-meta.json` kaydı + extractor çalıştırma.
- Sayfa dili Türkçe; tüm stiller inline `style=""` ile yazılır, görseller
  yer tutucudur (gerçek görsel/telifli materyal eklenmez).
- 34–45 arası sayfalar UX/davranış desenidir, görsel stil değildir;
  01–33 arası bir görsel stille birleştirilerek kullanılır.
