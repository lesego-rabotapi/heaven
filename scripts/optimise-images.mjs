// node scripts/optimise-images.mjs
//
// Turns the originals in incoming/ (not committed: full size, with EXIF/GPS) into
// the web images the page uses. sharp drops all metadata unless asked to keep it,
// and .rotate() first bakes the camera's orientation into the pixels.
// Each image is written as WebP and progressive JPG at two widths. The door's stonework
// is high-frequency detail, so it gets lower quality to keep the phone-size file small.
import sharp from 'sharp';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jobs = [
  { from: 'incoming/door-and-steps.jpg', name: 'door-arch', widths: [480, 800], webp: 66, jpg: 70 },
  { from: 'incoming/mondli-and-coco.jpg', name: 'mondli-coco', widths: [480, 800], webp: 78, jpg: 80 },
];

for (const job of jobs) {
  for (const width of job.widths) {
    const base = join(root, 'images', job.name + '-' + width);
    const pipeline = () => sharp(join(root, job.from)).rotate().resize({ width, withoutEnlargement: true });
    await pipeline().webp({ quality: job.webp, effort: 6, smartSubsample: true }).toFile(base + '.webp');
    await pipeline().jpeg({ quality: job.jpg, progressive: true, mozjpeg: true }).toFile(base + '.jpg');
    const meta = await sharp(base + '.jpg').metadata();
    console.log(job.name + '-' + width, meta.width + 'x' + meta.height,
      'webp ' + Math.round(statSync(base + '.webp').size / 1024) + ' KB,',
      'jpg ' + Math.round(statSync(base + '.jpg').size / 1024) + ' KB');
  }
}

// Share image for search and social previews (og:image): a text-free 1.91:1 crop of the door
// photo, the pointed arch and the door, 1200x630. Cropped from the original first so the
// pixels are not resized twice; sharp writes no metadata, so no EXIF/GPS.
const doorSource = join(root, 'incoming/door-and-steps.jpg');
const doorMeta = await sharp(doorSource).rotate().metadata();
const cropHeight = Math.round(doorMeta.width * 630 / 1200);
const ogPath = join(root, 'images/og-1200x630.jpg');
await sharp(doorSource).rotate()
  .extract({ left: 0, top: 40, width: doorMeta.width, height: cropHeight })
  .resize(1200, 630)
  .jpeg({ quality: 72, progressive: true, mozjpeg: true })
  .toFile(ogPath);
console.log('og-1200x630 1200x630 jpg ' + Math.round(statSync(ogPath).size / 1024) + ' KB');
