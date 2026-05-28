import { launch } from 'puppeteer';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const routes = ['/', '/elements', '/courses'];

async function prerender() {
  const app = express();
  app.use(express.static(distDir));
  app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));

  const server = app.listen(4174);
  const browser = await launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  for (const route of routes) {
    const url = `http://localhost:4174${route}`;
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for main content to appear
    await page.waitForSelector('#root', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));

    const html = await page.content();
    const filename = route === '/' ? 'index.html' : `${route.replace(/^\//, '').replace(/\//g, '-')}.html`;
    const filePath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html');

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(filePath, html);
    console.log(`  prerendered: ${url} -> ${filePath}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log('prerendering complete');
}

prerender().catch(err => { console.error(err); process.exit(1); });
