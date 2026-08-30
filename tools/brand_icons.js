#!/usr/bin/env node
// logo.svg → PNG ikon seti. Kullanım: PW_PATH=... node tools/brand_icons.js  (sunucu :8123)
const path = require('path');
const { chromium } = require(process.env.PW_PATH || 'playwright-core');
(async () => {
  const root = path.join(__dirname, '..');
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
  await p.setContent('<html><body style="margin:0;background:transparent"><img id="i" src="http://localhost:8123/brand/logo.svg" style="width:512px;height:512px;display:block"></body></html>');
  await p.waitForTimeout(400);
  const out = { 'brand/icon-512.png': 512, 'brand/icon-192.png': 192, 'brand/apple-touch-icon.png': 180, 'brand/favicon-32.png': 32 };
  for (const [f, size] of Object.entries(out)) {
    await p.setViewportSize({ width: size, height: size });
    await p.evaluate(s => { const i = document.getElementById('i'); i.style.width = i.style.height = s + 'px'; }, size);
    await p.waitForTimeout(100);
    await p.screenshot({ path: path.join(root, f), omitBackground: true });
    console.log(f);
  }
  await b.close();
})();
