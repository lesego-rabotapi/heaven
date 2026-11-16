// Converts Heaven's own Instagram exports into the web-ready set in
// public/images and records their dimensions in content/image-dims.json.
//   node scripts/build-images.mjs <folder-with-originals>
// Originals are not kept in the repo. The downloader saved each post twice:
// a web page under a .jpg name (skipped: sharp cannot decode it) and the real
// image as "... (1).jpg". Sources are matched by the post id in the filename.
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// output name -> [post id in the source filename, max width]
const MAP = {
  "pavement-reader": ["DA8AxxEK-po", 1440],
  chalkboard: ["DB0ktLbKVX9", 1440],
  "door-sip": ["DB1Mj9OKSCv", 1440],
  "mondli-portrait": ["DBwH_Sdqjql", 1440],
  latte: ["DEB-qVXK3yF", 1440],
  "umbrella-pair": ["DEW_GJAK55D", 1440],
  "nave-croissants": ["DEhrcKvsxGQ", 1440],
  "mondli-laugh": ["DFUXw7QqCYs", 1440],
  "glass-door": ["DFpu2CMsjSn", 1440],
  "nave-travellers": ["DGDM1PYqOXJ", 1440],
  "nave-table": ["DHX3VEWM27I", 1440],
  "pavement-row": ["DI-0jozqbyV", 1440],
  "railings-trio": ["DIIzTMbMTio", 1440],
  "foyer-pair": ["DITI--0qtq2", 1440],
  "counter-chat": ["DIbiSHsKflm", 1440],
  "arch-trio": ["DJZoWGMKhSX", 1080],
  "door-sign": ["DJlq23DKibq", 1440],
  "counter-wall": ["DKcTtveq7tG", 1440],
  "steps-espresso": ["DO-mT2Sirdq", 1440],
  "espresso-cheers": ["DPtID5cCCai", 1440],
  "collie-puppy": ["DT4kbDbCpr9", 1440],
  "collie-pavement": ["DXwMstFDKfR", 1440],
  "pastry-sun": ["DZcle74K06v", 1352],
  bakes: ["reel-DAp9yfeqLOq", 1080],
  "umbrellas-street": ["reel-DCos-brKSbC", 1080],
  "railing-aloe": ["reel-DDgwCipKfUX", 1080],
  "steps-style": ["reel-DHESzijMN-v", 1080],
  "counter-above": ["reel-DJmAHSDqO0j", 1080],
  sanctuary: ["reel-DK2CgBGKe5a", 1080],
  "foyer-stairs": ["reel-DK9cWJrKwGJ", 1206],
  "pavement-prints": ["reel-DKJ6eeuKanv", 1206],
  "market-smile": ["reel-DKl-rUNKYE8", 1080],
  "nave-aisle": ["reel-DMfk4oSqAtb", 1206],
  "nave-solo": ["reel-DPbJ6NiijdY", 1080],
  "doorway-cheer": ["reel-DQerNyrCqbZ", 1080],
  "facade-umbrella": ["reel-DTQSaZoit6i", 1080],
  "collie-carried": ["reel-DWyyW-_ipxg", 1080],
  facade: ["reel-DXHSDIgCiNh", 1080],
  "steps-crew": ["reel-DXW2713CkST", 1080],
  "collie-hug": ["reel-DY7CrjzqlMa", 1080],
  "mondli-collie": ["mondli_mahamba-DeHNHBQDIhy", 1800],
};

const dir = process.argv[2];
if (!dir) {
  console.error("Usage: node scripts/build-images.mjs <folder>");
  process.exit(1);
}
const files = (await readdir(dir)).map((f) => path.join(dir, f));
const outDir = path.resolve("public/images");
await mkdir(outDir, { recursive: true });

const dims = {};
for (const [name, [frag, maxW]] of Object.entries(MAP)) {
  let done = false;
  for (const src of files.filter((f) => path.basename(f).includes(frag))) {
    try {
      const info = await sharp(src)
        .rotate()
        .resize({ width: maxW, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(outDir, `${name}.webp`));
      dims[name] = { w: info.width, h: info.height };
      done = true;
      break;
    } catch {
      /* a saved web page, not an image: try the next candidate */
    }
  }
  if (!done) console.log(`MISSING ${name} (${frag})`);
}
await writeFile(path.resolve("content/image-dims.json"), JSON.stringify(dims, null, 1) + "\n");
console.log(`${Object.keys(dims).length}/${Object.keys(MAP).length} images written`);
