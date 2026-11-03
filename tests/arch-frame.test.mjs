// node --test
// The hero photo is framed as a pointed (lancet) arch that echoes the real door, clipped with an
// SVG clipPath in objectBoundingBox units and edged with an SVG stroke instead of a CSS border.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'), 'utf8');
const hero = (html.match(/<section id="hero"[\s\S]*?<\/section>/) || [''])[0];
const frames = [...hero.matchAll(/<div class="tile arch-frame arch-(m|d)"[^>]*>[\s\S]*?<\/svg>\s*<\/div>/g)];
const sizes = { m: [240, 340], d: [360, 380] };

test('both hero frames (phone and desktop) are arch frames at their old sizes', () => {
  assert.deepEqual(frames.map((f) => f[1]), ['m', 'd']);
  frames.forEach((f) => {
    const [w, h] = sizes[f[1]];
    assert.match(f[0], new RegExp('width:' + w + 'px; height:' + h + 'px'));
  });
});

test('the CSS border, radius and box-shadow that made the round arch are gone from the frames', () => {
  frames.forEach((f) => {
    const open = f[0].slice(0, f[0].indexOf('>') + 1);
    assert.doesNotMatch(open, /border|overflow:hidden|box-shadow/);
  });
});

test('each frame has a pointed clipPath in objectBoundingBox units: two arcs meeting at the apex', () => {
  ['m', 'd'].forEach((k) => {
    const clip = (html.match(new RegExp('<clipPath id="arch-clip-' + k + '"[^>]*>[\\s\\S]*?</clipPath>')) || [''])[0];
    assert.match(clip, /clipPathUnits="objectBoundingBox"/);
    const d = clip.match(/ d="([^"]+)"/)[1];
    const arcs = d.match(/A[^A-Z]+/g) || [];
    assert.equal(arcs.length, 2, 'two arcs');
    assert.match(arcs[0].trim(), /\.5 0$/, 'first arc ends at the apex (.5, 0)');
    const springing = Number(d.match(/L0 ([\d.]+) A/)[1]);
    assert.ok(springing > 0.4 && springing < 0.8, 'springing line ' + springing);
  });
});

test('the clip is applied to the pictures and the white edge is a decorative SVG above them', () => {
  assert.match(html, /\.arch-m > picture \{ clip-path: url\(#arch-clip-m\)/);
  assert.match(html, /\.arch-d > picture \{ clip-path: url\(#arch-clip-d\)/);
  frames.forEach((f) => {
    assert.match(f[0], /<svg class="arch-edge"[^>]*aria-hidden="true"/);
    assert.match(f[0], /<picture\b[^>]*>[\s\S]*?<\/picture>\s*<svg class="arch-edge"/, 'picture is the first child, so the portal still finds it');
  });
  assert.match(html, /\.arch-edge path \{[^}]*vector-effect: non-scaling-stroke/);
});
