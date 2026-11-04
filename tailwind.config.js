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
        "title-sm": ["var(--font-body)"],
        "display": ["var(--font-display)"],
        "label-md": ["var(--font-brand)"],
        "title-lg": ["var(--font-body)"],
        "label-sm": ["var(--font-brand)"],
        "headline-sm": ["var(--font-display)"],
        "display-mobile": ["var(--font-display)"],
        "body-md": ["var(--font-body)"],
        "body-sm": ["var(--font-body)"],
        "title-md": ["var(--font-body)"],
        "body-lg": ["var(--font-body)"],
        "headline-lg-mobile": ["var(--font-display)"],
        "headline-md": ["var(--font-display)"],
        "label-lg": ["var(--font-brand)"],
        "headline-lg": ["var(--font-display)"],
        "quote": ["var(--font-quote)"],
      },
    },
  },
};
