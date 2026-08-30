# tasarim-katalogu-mcp

[design.asveas.com](https://design.asveas.com) kataloğundaki **73 tasarım stilini**
(canlı örnek + AI üretim promptu) MCP destekleyen araçlara bağlar.
Sıfır bağımlılık, Node ≥ 18.

## Araçlar

| Araç | Ne yapar |
|---|---|
| `stil_listele` | 73 stili listeler; `bolum` (1–15) ile filtrelenir |
| `stil_ara` | Türkçe karakter duyarsız arama — isim, ekol, anahtar kelime, `#hex` |
| `stil_getir` | Bir stilin tam kaydı: `prompt_en`, palet, tipografi, düzen, kaçınılacaklar, canlı örnek URL'si |

## Kurulum

**Claude Code:**

```bash
# depoyu klonladıysanız
claude mcp add tasarim-katalogu -- node /yol/tasarim-standartlari-katalogu/mcp/index.js

# npm'den (yayınlandıysa)
claude mcp add tasarim-katalogu -- npx -y tasarim-katalogu-mcp
```

**Cursor / diğer MCP istemcileri** (`mcp.json`):

```json
{
  "mcpServers": {
    "tasarim-katalogu": {
      "command": "npx",
      "args": ["-y", "tasarim-katalogu-mcp"]
    }
  }
}
```

## Örnek akış

> "Hokusai stilinde bir hava durumu sayfası yap"

1. Asistan `stil_ara("hokusai")` → id 67
2. `stil_getir(67)` → `prompt_en` + palet + kaçınılacaklar
3. Bu verilerle arayüzü üretir, `url` alanındaki canlı örnekle karşılaştırır.

Veri, depo içinden çalıştırılırsa yerel `ai/catalog.json`'dan, aksi hâlde
`design.asveas.com`'dan okunur.
