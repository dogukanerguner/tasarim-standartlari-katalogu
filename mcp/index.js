#!/usr/bin/env node
/**
 * Tasarım Standartları Kataloğu — MCP sunucusu (stdio, sıfır bağımlılık).
 * 85 tasarım stilini (canlı örnek + AI promptu) Claude Code, Cursor gibi
 * MCP destekleyen araçlara üç araçla açar: stil_listele, stil_ara, stil_getir.
 *
 * Veri kaynağı: https://design.asveas.com/ai/catalog.json
 * (depo içinden çalıştırılırsa ../ai/catalog.json yerelden okunur)
 */
"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const CATALOG_URL = "https://design.asveas.com/ai/catalog.json";
const SITE = "https://design.asveas.com";

let catalogPromise = null;
function getCatalog() {
  if (catalogPromise) return catalogPromise;
  catalogPromise = (async () => {
    const local = path.join(__dirname, "..", "ai", "catalog.json");
    if (fs.existsSync(local)) {
      return JSON.parse(fs.readFileSync(local, "utf8"));
    }
    const res = await fetch(CATALOG_URL);
    if (!res.ok) throw new Error("catalog.json indirilemedi: HTTP " + res.status);
    return res.json();
  })();
  return catalogPromise;
}

const TR = { ı: "i", ğ: "g", ü: "u", ş: "s", ö: "o", ç: "c", â: "a", î: "i", û: "u" };
const fold = (s) =>
  String(s).toLocaleLowerCase("tr").replace(/[ığüşöçâîû]/g, (c) => TR[c] || c);

function ozet(s) {
  return {
    id: s.id,
    name: s.name,
    reference: s.reference,
    section: s.section,
    description_en: s.description_en,
    url: `${SITE}/${s.file}`,
  };
}

function tam(s, sections) {
  const sec = sections.find((x) => x.id === s.section);
  return {
    ...s,
    section_title: sec ? sec.title : "",
    url: `${SITE}/${s.file}`,
    og_image: `${SITE}/og/${s.slug}.jpg`,
  };
}

const TOOLS = [
  {
    name: "stil_listele",
    description:
      "Katalogdaki 85 tasarım stilini listeler (id, isim, ekol, bölüm, kısa açıklama). " +
      "İsteğe bağlı `bolum` (1-15) ile filtrelenir. Bölümler: 1-10 görsel/UX stilleri, " +
      "11 masaüstü, 12 web app, 13 mobil, 14 dashboard, 15 ressamlar.",
    inputSchema: {
      type: "object",
      properties: { bolum: { type: "number", description: "Bölüm no (1-15), boşsa hepsi" } },
    },
  },
  {
    name: "stil_ara",
    description:
      "Stil arar (Türkçe karakter duyarsız): isim, ekol, açıklama, anahtar kelime ve palet hex'lerinde. " +
      "Örnek: 'glass', 'kaplumbağa', 'terminal', '#1b4470'.",
    inputSchema: {
      type: "object",
      properties: { sorgu: { type: "string", description: "Arama metni" } },
      required: ["sorgu"],
    },
  },
  {
    name: "stil_getir",
    description:
      "Bir stilin tam kaydını döner: AI üretim promptu (prompt_en), palet, tipografi, düzen, " +
      "hareket, kaçınılacaklar ve canlı örnek URL'si. UI üretirken prompt_en'i çekirdek prompt, " +
      "avoid'u negatif kısıt olarak kullan.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "number", description: "Stil no (1-85)" } },
      required: ["id"],
    },
  },
];

async function callTool(name, args) {
  const cat = await getCatalog();
  if (name === "stil_listele") {
    const bolum = args && args.bolum;
    const list = cat.styles.filter((s) => !bolum || s.section === bolum).map(ozet);
    return { sections: cat.sections.map(({ id, title }) => ({ id, title })), styles: list };
  }
  if (name === "stil_ara") {
    const q = fold((args && args.sorgu) || "");
    if (!q) throw new Error("sorgu boş olamaz");
    const toks = q.split(/\s+/).filter(Boolean);
    const hits = cat.styles.filter((s) => {
      const hay = fold(
        [s.id, s.name, s.reference, s.description, s.description_en,
         (s.keywords || []).join(" "), s.brief_tr, (s.palette || []).join(" ")].join(" ")
      );
      return toks.every((t) => hay.includes(t));
    });
    return { count: hits.length, styles: hits.map(ozet) };
  }
  if (name === "stil_getir") {
    const s = cat.styles.find((x) => x.id === (args && args.id));
    if (!s) throw new Error("Stil bulunamadı: " + (args && args.id) + " (geçerli aralık 1-" + cat.styles.length + ")");
    return tam(s, cat.sections);
  }
  throw new Error("Bilinmeyen araç: " + name);
}

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on("line", async (line) => {
  line = line.trim();
  if (!line) return;
  let req;
  try { req = JSON.parse(line); } catch { return; }
  const { id, method, params } = req;
  const reply = (result) => id !== undefined && send({ jsonrpc: "2.0", id, result });
  const fail = (code, message) => id !== undefined && send({ jsonrpc: "2.0", id, error: { code, message } });

  try {
    if (method === "initialize") {
      reply({
        protocolVersion: (params && params.protocolVersion) || "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "tasarim-katalogu", version: "1.0.0" },
      });
    } else if (method === "notifications/initialized" || (method || "").startsWith("notifications/")) {
      // bildirim — yanıt yok
    } else if (method === "ping") {
      reply({});
    } else if (method === "tools/list") {
      reply({ tools: TOOLS });
    } else if (method === "tools/call") {
      const result = await callTool(params.name, params.arguments || {});
      reply({ content: [{ type: "text", text: JSON.stringify(result, null, 2) }] });
    } else {
      fail(-32601, "Yöntem bulunamadı: " + method);
    }
  } catch (e) {
    if (method === "tools/call") {
      reply({ content: [{ type: "text", text: "Hata: " + (e && e.message ? e.message : String(e)) }], isError: true });
    } else {
      fail(-32603, e && e.message ? e.message : String(e));
    }
  }
});
