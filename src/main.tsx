import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/tokens.css';
import './styles/legacy.css';
import '../tailwind.css';
import '../assets/sky.css';
import './styles/reveal.css';

const root = document.getElementById('root')!;
const tree = <StrictMode><App /></StrictMode>;
// Prerendered HTML is hydrated; during `vite dev` the root is empty and the app is rendered instead.
if (root.hasChildNodes()) { hydrateRoot(root, tree); } else { createRoot(root).render(tree); }
