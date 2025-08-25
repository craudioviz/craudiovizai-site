import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { execSync } from "node:child_process";

const cfg = yaml.load(fs.readFileSync("data/competitors.yaml","utf8"));
const bases = [cfg.site_url, ...(cfg.competitors||[])];
const pages = cfg.pages || ["/"];

const outDir = ".reports"; fs.mkdirSync(outDir,{recursive:true});
const rows = [];

for (const base of bases) {
  for (const p of pages) {
    const url = new URL(p, base).href;
    const safe = url.replace(/[^a-z0-9]+/gi,"_");
    const dir = path.join(outDir, safe); fs.mkdirSync(dir,{recursive:true});
    console.log("Audit:", url);
    execSync(`npx --yes @lhci/cli@0.13.1 collect --url="${url}" --numberOfRuns=1 --outputPath="${dir}"`, {stdio:"inherit"});
    const lhr = JSON.parse(fs.readFileSync(path.join(dir,"lhr-0.json"),"utf8"));
    rows.push({
      site: base, path: p,
      perf: lhr.categories.performance.score,
      seo:  lhr.categories.seo.score,
      a11y: lhr.categories.accessibility.score,
      best: lhr.categories["best-practices"].score
    });
  }
}

const md = [
  "# CRAI Daily Audit",
  "",
  "| Site | Path | Performance | SEO | A11y | Best |",
  "|---|---:|---:|---:|---:|---:|",
  ...rows.map(r => `| ${r.site} | ${r.path} | ${(r.perf*100).toFixed(0)} | ${(r.seo*100).toFixed(0)} | ${(r.a11y*100).toFixed(0)} | ${(r.best*100).toFixed(0)} |`)
].join("\n");
fs.writeFileSync(path.join(outDir,"summary.md"), md);
console.log("WROTE", path.join(outDir,"summary.md"));
