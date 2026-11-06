const path = require('path');

/**
 * Tailwind build config (npm run build:css -> tailwind.css).
 *
 * index.html (legacy page), app.html and the .tsx files under src (the React rebuild) are scanned. If the page's script moves to its own file, or a
 * second page appears, add it to `content`: classes that live only in an
 * unscanned file get no CSS and fail silently.
 *
 * Was the inline #tailwind-config script. The spacing, fontSize and borderRadius
 * extensions it carried were dropped: no class in the page used them, and the
 * compiled stylesheet is byte-identical without them.
 *
 * Tailwind treats every word in a scanned file as a possible class, so a comment
 * that says "ring" or "outline" used to add `.ring` / `.outline` rules to the
 * stylesheet and make `npm run check:css` fail for prose. HTML comments and the
 * inline <style> block (our own CSS, which is not Tailwind markup) are stripped
 * before scanning. Words in the inline script or visible text are still scanned.
 */
module.exports = {
  content: {
    files: [path.join(__dirname, 'index.html'), path.join(__dirname, 'app.html'), path.join(__dirname, 'src/**/*.tsx')],
    transform: {
      html: (source) => source.replace(/<!--[\s\S]*?-->/g, '').replace(/<style[\s\S]*?<\/style>/g, ''),
    },
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "title-sm": ["var(--font-brand)"],
        "display": ["var(--font-brand)"],
        "label-md": ["var(--font-brand)"],
        "title-lg": ["var(--font-brand)"],
        "label-sm": ["var(--font-brand)"],
        "headline-sm": ["var(--font-brand)"],
        "display-mobile": ["var(--font-brand)"],
        "body-md": ["var(--font-brand)"],
        "body-sm": ["var(--font-brand)"],
        "title-md": ["var(--font-brand)"],
        "body-lg": ["var(--font-brand)"],
        "headline-lg-mobile": ["var(--font-brand)"],
        "headline-md": ["var(--font-brand)"],
        "label-lg": ["var(--font-brand)"],
        "headline-lg": ["var(--font-brand)"],
        "quote": ["var(--font-quote)"],
      },
    },
  },
};
