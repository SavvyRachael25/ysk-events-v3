import puppeteer from "puppeteer-core";
const S = process.argv[2];
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new" });
for (const v of ["v1", "v2", "v3"]) {
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await p.goto(`http://localhost:3077/mock/${v}`, { waitUntil: "networkidle0" });
  await p.evaluate(() => document.querySelectorAll("[class*='animate-']").forEach(e => { e.style.animation = "none"; e.style.opacity = "1"; e.style.transform = "none"; }));
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 200)); } window.scrollTo(0, 0); });
  await new Promise(r => setTimeout(r, 1500));
  await p.screenshot({ path: `${S}/mock-${v}.png`, fullPage: true });
  await p.screenshot({ path: `${S}/mock-${v}-top.png` });
  await p.close();
}
await b.close();
