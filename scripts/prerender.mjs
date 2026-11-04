// Renders the React app to plain HTML at build time: dist/index.html is the page with its content in it.
// Run by `npm run build` after the client bundle (dist/app.html) and the server bundle (dist-server/).
import { readFileSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const template = readFileSync(resolve(root, 'dist/app.html'), 'utf8');
const { render } = await import(pathToFileURL(resolve(root, 'dist-server/entry-server.mjs')).href);
if (!template.includes('<!--app-html-->')) throw new Error('app.html lost its <!--app-html--> marker');
writeFileSync(resolve(root, 'dist/index.html'), template.replace('<!--app-html-->', render()));
rmSync(resolve(root, 'dist/app.html'));
rmSync(resolve(root, 'dist-server'), { recursive: true, force: true });
// The stylesheets (Tailwind and the night sky) are bundled by Vite; only the photos are copied as they are.
cpSync(resolve(root, 'images'), resolve(root, 'dist/images'), { recursive: true });
console.log('prerendered dist/index.html');
