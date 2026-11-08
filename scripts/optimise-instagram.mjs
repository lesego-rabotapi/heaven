// node scripts/optimise-instagram.mjs
//
// Turns photos that Heaven posted on its own Instagram (@heavencoffeect), saved to incoming/instagram/ (not
// committed), into the web images the page uses. Only Heaven's own posts are used, never collaborators'.
// The source files are named ig-NN-*.{jpg,webp}; NN is the photo's number on the contact sheet used to pick
// them. sharp writes no metadata, so nothing from the originals travels with the copies.
import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'incoming/instagram');
const source = (n) => {
  const f = readdirSync(dir).find((name) => name.startsWith(`ig-${String(n).padStart(2, '0')}-`));
  if (!f) throw new Error('missing incoming/instagram/ig-' + n);
  return join(dir, f);
};

const write = async (pipeline, name, q = 76) => {
  const base = join(root, 'images', name);
  await pipeline().webp({ quality: q, effort: 6, smartSubsample: true }).toFile(base + '.webp');
  await pipeline().jpeg({ quality: q + 2, progressive: true, mozjpeg: true }).toFile(base + '.jpg');
  const meta = await sharp(base + '.jpg').metadata();
  console.log(name, meta.width + 'x' + meta.height, 'webp ' + Math.round(statSync(base + '.webp').size / 1024) + ' KB');
};

// The feed: square tiles, cropped on what draws the eye.
const feed = { 35: 'latte', 7: 'church-front', 28: 'nave-table', 43: 'bakes', 22: 'doorway', 19: 'counter', 42: 'reading-outside', 33: 'nave-group', 24: 'pavement-tables', 12: 'outside-friends', 39: 'doorway-cup', 15: 'nave-standing' };
for (const [n, name] of Object.entries(feed)) {
  await write(() => sharp(source(n)).rotate().resize(800, 800, { fit: 'cover', position: sharp.strategy.attention }), 'ig-' + name);
}

// Mondli and Coco, much sharper than the earlier copy, for the story.
for (const width of [600, 1200]) {
  await write(() => sharp(source(1)).rotate().resize({ width, withoutEnlargement: true }), 'ig-mondli-coco-' + width, 74);
}

// The empty interior, red carpet and carved wood, behind the building's words.
await write(() => sharp(source(17)).rotate().resize({ width: 720, withoutEnlargement: true }), 'ig-sanctuary', 70);

// Latte art, in a circle beside the menu title.
await write(() => sharp(source(35)).rotate().resize(600, 600, { fit: 'cover', position: sharp.strategy.attention }), 'ig-latte-circle');
