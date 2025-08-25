import fs from "node:fs";
import path from "node:path";

const WEB_DIR = process.env.WEB_DIR || ".";
const API_KEY = process.env.CRAI_API_KEY || process.env.OPENAI_API_KEY;
const API_BASE = process.env.CRAI_API_BASE || "https://api.openai.com/v1";
const MODEL = process.env.CRAI_MODEL || "gpt-4o-mini";

if (!API_KEY) { console.error("CRAI_API_KEY/OPENAI_API_KEY missing"); process.exit(1); }

const indexPath = path.join(WEB_DIR, "index.html");
const html = fs.readFileSync(indexPath, "utf8");

const prompt = `You are CRAI. Improve ONLY conversion, accessibility, metadata, and internal links.
- Keep layout/design untouched.
- Fix <title>, meta description, og: tags, aria-labels, alt text.
- Add Schema.org JSON-LD for Organization if missing.
Return FULL updated HTML.`;

const res = await fetch(`${API_BASE}/chat/completions`, {
  method: "POST",
  headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: MODEL,
    temperature: 0.2,
    messages: [
      { role: "system", content: "You produce production-ready HTML with minimal diffs." },
      { role: "user", content: prompt + "\n-----\n" + html + "\n-----" }
    ]
  })
});
if (!res.ok) { console.error(await res.text()); process.exit(1); }
const j = await res.json();
const out = j.choices?.[0]?.message?.content?.trim();
if (out && out !== html) {
  fs.writeFileSync(indexPath, out, "utf8");
  console.log("UPDATED", indexPath);
} else {
  console.log("No changes suggested");
}
