import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const distPath = resolve('dist');
const previewPath = resolve(distPath, 'index.html');
const source = await readFile(previewPath, 'utf8');

const scriptMatch = source.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
const stylesheetMatch = source.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/);

if (!scriptMatch || !stylesheetMatch) {
  throw new Error('Could not locate the production script and stylesheet.');
}

const resolveBuiltAsset = (assetUrl) => resolve(
  distPath,
  assetUrl.replace(/^\.?\//, ''),
);

const [rawScript, rawStylesheet] = await Promise.all([
  readFile(resolveBuiltAsset(scriptMatch[1]), 'utf8'),
  readFile(resolveBuiltAsset(stylesheetMatch[1]), 'utf8'),
]);

// Vite emits imported image URLs relative to the JavaScript chunk. Once the
// chunk is inlined, convert those expressions into paths relative to index.html.
const inlinedScript = rawScript
  .replace(
    /new URL\((['"`])([^'"`]+)\1,import\.meta\.url\)\.href/g,
    (_match, _quote, assetName) => JSON.stringify(`./assets/${assetName}`),
  )
  .replace(/<\/script/gi, '<\\/script');

// The stylesheet originally lives in dist/assets, so font URLs need the assets
// directory prefix after the CSS is moved inline into dist/index.html.
const inlinedStylesheet = rawStylesheet
  .replace(/url\(\.\//g, 'url(./assets/')
  .replace(/<\/style/gi, '<\\/style');

const directClickPreview = source
  .replace(scriptMatch[0], '')
  .replace(stylesheetMatch[0], () => `<style>${inlinedStylesheet}</style>`)
  .replace('</body>', () => `  <script>${inlinedScript}</script>\n  </body>`);

if (directClickPreview.includes('import.meta.url')) {
  throw new Error('The direct-click bundle still contains import.meta.url.');
}

await writeFile(previewPath, directClickPreview, 'utf8');
console.log('Self-contained direct-click preview updated: dist/index.html');
