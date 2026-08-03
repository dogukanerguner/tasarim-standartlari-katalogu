# Tasarım Standartları Kataloğu

45 tasarım yaklaşımını hem canlı örnek sayfa hem de AI kod üretiminde
kullanılabilir prompt/kural seti olarak sunan katalog.

## Yapı

- `NN-stil-adi.dc.html` — 45 stil sayfası. Her biri stilin çalışan örneği +
  sayfa sonunda `data-prompt-block="1"` içinde detaylı İngilizce prompt,
  Türkçe brief, palet, tipografi, düzen, hareket ve kaçınılacaklar.
- `Katalog.dc.html` — canlı iframe önizlemeli index; 10 bölüm.
- `support.js` — dc-runtime (React tabanlı `<x-dc>` şablon motoru).
  `dc-runtime/src/*.ts`'den derlenmiştir, **elle düzenlenmez**.
- `ai/` — prompt bloklarının makine tarafından okunabilir katmanı
  (`catalog.json` + `styles/*.md`). Kullanımı için `ai/README.md`'ye bakın.
- `tools/extract_prompts.py` — `ai/` katmanını HTML kaynağından yeniden üretir.

## Kurallar

- Bir tasarım stili uygulanacaksa önce `ai/catalog.json`'dan stili bul,
  ilgili `ai/styles/NN-slug.md` dosyasını oku ve oradaki `prompt_en`,
  `palette` ve `avoid` alanlarına sadık kal.
- Stil sayfalarında (`*.dc.html`) prompt bloğu içeriği değiştirilirse
  `python3 tools/extract_prompts.py` çalıştırılıp `ai/` güncellenmeli.
- Sayfa dili Türkçe; tüm stiller inline `style=""` ile yazılır, görseller
  yer tutucudur (gerçek görsel/telifli materyal eklenmez).
- 34–45 arası sayfalar UX/davranış desenidir, görsel stil değildir;
  01–33 arası bir görsel stille birleştirilerek kullanılır.
