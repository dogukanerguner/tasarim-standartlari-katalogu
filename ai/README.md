# AI Katmanı — Tasarım Standartları Kataloğu

Bu dizin, `*.dc.html` sayfalarındaki prompt bloklarının makine tarafından
okunabilir hâlidir. **Elle düzenlemeyin** — kaynak HTML değiştiğinde
`python3 tools/extract_prompts.py` ile yeniden üretilir.

## İçerik

- `catalog.json` — 73 stilin ve 15 bölümün tamamı tek dosyada.
  Her stil kaydı: `id`, `slug`, `title`, `section`, `reference` (ekol/kaynak),
  `description`, `keywords`, `prompt_en`, `brief_tr`, `palette` (hex listesi),
  `typography`, `layout`, `motion`, `avoid`, `file` (kaynak sayfa).
- `styles/NN-slug.md` — her stil için YAML frontmatter'lı tek sayfalık
  markdown; bir LLM bağlamına tek stil yüklemek için ideal boyut.

## AI ile kullanım

1. **Stil seçimi:** `catalog.json` içindeki `title`, `description` ve
   `keywords` alanlarından uygun stili bulun (ya da kullanıcıya listeyi sunun).
2. **Uygulama:** Seçilen stilin `styles/NN-slug.md` dosyasını bağlama alın;
   `prompt_en` üretim promptunun çekirdeğidir, `palette` + `typography` +
   `layout` + `motion` somut değer kaynağıdır, `avoid` negatif kısıttır.
3. **Doğrulama:** Üretilen arayüzü `file` alanındaki canlı örnek sayfayla
   karşılaştırın.

Not: 34–45 arası sayfalar görsel stil değil, UX/davranış desenidir; bunları
bir görsel stille birleştirerek kullanın. 45 numaralı kayıt bir uyarı
sayfasıdır — `avoid` listesi orada özellikle bağlayıcıdır. 46–61 arası
sayfalar platform/ürün standartlarıdır (masaüstü, web app, mobil, panel);
hem görsel dil hem düzen şablonu olarak tek başına kullanılabilirler.
62–72 arası "Ressamlar arayüz tasarlasaydı" serisidir: bir ressamın görsel
dilini uygulamaya çeviren sanatsal stiller — cesur işlerde tek başına,
ticari işlerde bir platform standardıyla harmanlanarak kullanılır.
