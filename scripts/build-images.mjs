// Converts the source photos (Heaven's own Instagram exports) into the
// web-ready set in public/images and records their dimensions.
//
//   node scripts/build-images.mjs <folder-with-originals> [more folders...]
//
// Originals are not kept in the repo. A source is matched by the id in its
// filename, so the downloader's "heavenig-...-<id> (1).jpg" names work as-is
// (some of those are WebP data behind a .jpg name; sharp reads either).
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// output name -> [id fragment found in the source filename, max width]
const MAP = {
  "mondli-coco-doorway": ["mondli_mahamba-DeHNHBQDIhy", 2000],
  "door-guest-smiling": ["DJlq23DKibq", 1600],
  "door-mondli-espresso": ["DO-mT2Sirdq", 1600],
  "facade-street": ["reel-DXHSDIgCiNh", 1080],
  "nave-four-friends": ["DEhrcKvsxGQ", 1600],
  "nave-backpackers": ["DGDM1PYqOXJ", 1600],
  "nave-round-table": ["DHX3VEWM27I", 1600],
  "doorway-sip": ["DB1Mj9OKSCv", 1600],
  "arch-three-friends": ["DJZoWGMKhSX", 1080],
  "foyer-two-friends": ["DITI--0qtq2", 1600],
  "pavement-reading": ["DI-0jozqbyV", 1600],
  "umbrella-espresso": ["DPtID5cCCai", 1600],
  "pavement-book": ["DA8AxxEK-po", 1600],
  "coco-puppy-door": ["DT4kbDbCpr9", 1600],
  "coco-pavement": ["DXwMstFDKfR", 1600],
  "counter-wall": ["DKcTtveq7tG", 1600],
  "counter-guests": ["DIbiSHsKflm", 1600],
  "latte-art": ["DEB-qVXK3yF", 1600],
  "sign-in-love": ["DIIzTMbMTio", 1600],
  "umbrella-two-friends": ["DEW_GJAK55D", 1600],
  "chalkboard-stairway": ["DB0ktLbKVX9", 1600],
  "mondli-cup-portrait": ["DBwH_Sdqjql", 1600],
  "mondli-laughing": ["DFUXw7QqCYs", 1600],
  "door-takeaway": ["DFpu2CMsjSn", 1600],
  "pastry-sun": ["DZcle74K06v", 1600],
  "foyer-stairs-mondli": ["reel-DK9cWJrKwGJ", 1080],
  "pavement-trio": ["reel-DKJ6eeuKanv", 1080],
  "nave-students": ["reel-DMfk4oSqAtb", 1080],
  courtyard: ["heavensocial_ct-reel-DagB437NCGI", 1080],
  "counter-busy": ["reel-DJmAHSDqO0j", 1080],
  bakes: ["reel-DAp9yfeqLOq", 1080],
  "umbrellas-row": ["reel-DCos-brKSbC", 1080],
  "door-couple": ["reel-DDgwCipKfUX", 1080],
  "steps-style": ["reel-DHESzijMN-v", 1080],
  "sanctuary-pews": ["reel-DK2CgBGKe5a", 1080],
  "barista-smile": ["reel-DKl-rUNKYE8", 1080],
  "nave-solo": ["reel-DPbJ6NiijdY", 1080],
  "nave-pomeranian": ["stone-arch-interior.jpg", 1080],
  "cup-handover": ["cup-handover.jpg", 1080],
};

const dirs = process.argv.slice(2);
if (!dirs.length) {
  console.error("Usage: node scripts/build-images.mjs <folder> [folder...]");
  process.exit(1);
}

const files = [];
for (const dir of dirs) {
  for (const f of await readdir(dir)) files.push(path.join(dir, f));
}
// The downloader also saved web pages under .jpg names: real images are small
// "(1)" copies or the old repo photos, so skip anything sharp cannot decode.
const outDir = path.resolve("public/images");
await mkdir(outDir, { recursive: true });

const dims = {};
for (const [name, [frag, maxW]] of Object.entries(MAP)) {
  const candidates = files.filter((f) => path.basename(f).includes(frag));
  let done = false;
  for (const src of candidates) {
    try {
      const img = sharp(src).rotate();
      const meta = await img.metadata();
      const width = Math.min(maxW, meta.width);
      const info = await img
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 84 })
        .toFile(path.join(outDir, `${name}.webp`));
      dims[name] = { w: info.width, h: info.height };
      done = true;
      break;
    } catch {
      /* not an image (saved HTML), try the next candidate */
    }
  }
  console.log(done ? `ok      ${name}` : `MISSING ${name} (${frag})`);
}

await writeFile(
  path.resolve("content/image-dims.json"),
  JSON.stringify(dims, null, 2) + "\n",
);
console.log(`\n${Object.keys(dims).length}/${Object.keys(MAP).length} images written`);
