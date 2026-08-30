# Reklam filmi (Remotion)

Sosyal medya için 43,5 saniyelik tanıtım filmi — 4 kompozisyon: `Reklam-TR-9x16`,
`Reklam-EN-9x16` (Reels/TikTok/Shorts) ve `Reklam-TR-16x9`, `Reklam-EN-16x9` (X/LinkedIn/YouTube).

```bash
cd video && npm install
npm run studio        # canlı önizleme
npm run render        # out/reklam-tr-9x16.mp4
npm run render:en     # out/reklam-en-9x16.mp4
npm run render:wide   # out/reklam-tr-16x9.mp4
```

- Görseller: `public/og/*.jpg` (stil sayfalarının paylaşım kartları), `public/galeri-*.jpg`, `public/brand/logo.svg`.
- Ses efektleri `public/sfx/*.wav` sentezle üretilir (`npm run sfx`) — harici kaynak yok. **Müzik yok**; kurgu programında altına müzik eklenir.
- Sahneler `src/scenes.tsx`, zamanlama `src/theme.ts` (`SC`), metinler `src/strings.ts` (TR/EN).
