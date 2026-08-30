#!/usr/bin/env node
// OG paylaşım kartı üretici: 1200×630 JPEG → og/<slug>.jpg
// Kullanım: node tools/og_shots.js [slug ...]   (argümansız: tüm stiller + katalog)
// Gerektirir: yerel sunucu http://localhost:8123 ve playwright-core (npx -y playwright-core ile de çalışır)
const path = require('path'), fs = require('fs');
const { chromium } = require(process.env.PW_PATH || 'playwright-core');
(async () => {
  const root = path.join(__dirname, '..');
  const cat = JSON.parse(fs.readFileSync(path.join(root, 'ai/catalog.json'), 'utf8'));
  const only = process.argv.slice(2);
  let targets = cat.styles.map(s => ({ file: s.file, out: s.slug + '.jpg' }));
  targets.push({ file: 'Katalog.dc.html', out: 'katalog.jpg' });
  if (only.length) targets = targets.filter(t => only.includes(t.out.replace('.jpg', '')));
  fs.mkdirSync(path.join(root, 'og'), { recursive: true });
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  for (const t of targets) {
    await p.goto('http://localhost:8123/' + t.file, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
    await p.waitForTimeout(t.file === 'Katalog.dc.html' ? 5000 : 1700);
    await p.screenshot({ path: path.join(root, 'og', t.out), type: 'jpeg', quality: 72 });
    console.log('og/' + t.out);
  }
  await b.close();
})();
