// Launch gate: node scripts/check-launch.mjs (npm run check:launch).
//
// The page is a pitch mockup until the client has confirmed its facts. This lists
// everything that must change before it goes public and exits 1 while any of it
// is left, so "ready to launch" is a command, not a feeling. It is not part of
// check:css or CI on purpose: the mockup is expected to fail it.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const problems = [];

// Comments describing a marker (like this file's own TODO text) must not trip it,
// so the markup checks run on the page with HTML comments, scripts and styles removed.
const markup = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '');

if (/<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(markup)) {
  problems.push('<meta name="robots" content="noindex"> is still in <head>: search engines are told to skip the site');
}

const placeholders = (markup.match(/data-phone-placeholder/g) || []).length;
if (placeholders) {
  problems.push(placeholders + ' phone placeholder element(s) (data-phone-placeholder): the number is not confirmed');
}

// TODO(content) lives in the script's // comments, so this one scans the raw file.
const todoLines = html.split('\n')
  .map((text, i) => ({ text, line: i + 1 }))
  .filter(({ text }) => /TODO\(content\)/.test(text));
todoLines.forEach(({ text, line }) => {
  problems.push('index.html:' + line + ' ' + text.trim().slice(0, 100));
});

// Facts registry: HEAVEN_CONTENT is a plain object literal, so evaluate just that
// statement in an empty context instead of parsing it.
const start = html.indexOf('var HEAVEN_CONTENT = ');
const end = html.indexOf('\n};', start);
if (start === -1 || end === -1) {
  problems.push('could not find the HEAVEN_CONTENT object in index.html');
} else {
  const sandbox = {};
  vm.runInNewContext(html.slice(start, end + 3), sandbox);
  const facts = (sandbox.HEAVEN_CONTENT && sandbox.HEAVEN_CONTENT.facts) || {};
  const statuses = ['confirmed', 'photo', 'unknown'];
  Object.keys(facts).forEach((key) => {
    if (statuses.indexOf(facts[key].status) === -1) {
      problems.push('fact "' + key + '" has status "' + facts[key].status + '" (use confirmed, photo or unknown)');
    }
    const used = new RegExp('data-fact=["\']' + key + '["\']').test(markup);
    if (facts[key].status === 'unknown' && used) {
      problems.push('fact "' + key + '" is unknown but index.html has a data-fact="' + key + '" element: confirm it or remove the element');
    }
  });
  const referenced = markup.match(/data-fact=["'][^"']+["']/g) || [];
  referenced.forEach((attr) => {
    const key = attr.slice(attr.indexOf('=') + 2, -1);
    if (!facts[key]) { problems.push('data-fact="' + key + '" has no entry in HEAVEN_CONTENT.facts'); }
  });
}

// Every <img> needs an alt attribute (alt="" is fine: it marks a decorative image).
(markup.match(/<img\b[^>]*>/gi) || []).forEach((tag) => {
  if (!/\balt\s*=/.test(tag)) { problems.push('image without alt: ' + tag.slice(0, 90)); }
});

if (problems.length) {
  console.error('Not ready to launch: ' + problems.length + ' item(s)\n');
  problems.forEach((p) => console.error(' - ' + p));
  process.exit(1);
}
console.log('check:launch: nothing left to resolve');
