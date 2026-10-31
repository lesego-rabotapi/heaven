const path = require('path');

/**
 * Tailwind build config (npm run build:css -> tailwind.css).
 *
 * Only index.html is scanned. If the page's script moves to its own file, or a
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
    files: [path.join(__dirname, 'index.html')],
    transform: {
      html: (source) => source.replace(/<!--[\s\S]*?-->/g, '').replace(/<style[\s\S]*?<\/style>/g, ''),
    },
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "title-sm": ["Bricolage Grotesque","Segoe UI","sans-serif"],
        "display": ["Archivo","sans-serif"],
        "label-md": ["Bricolage Grotesque","Segoe UI","sans-serif"],
        "title-lg": ["Bricolage Grotesque","Segoe UI","sans-serif"],
        "label-sm": ["Bricolage Grotesque","Segoe UI","sans-serif"],
        "headline-sm": ["Archivo","sans-serif"],
        "display-mobile": ["Archivo","sans-serif"],
        "body-md": ["Bricolage Grotesque","Segoe UI","sans-serif"],
        "body-sm": ["Bricolage Grotesque","Segoe UI","sans-serif"],
        "title-md": ["Bricolage Grotesque","Segoe UI","sans-serif"],
        "body-lg": ["Bricolage Grotesque","Segoe UI","sans-serif"],
        "headline-lg-mobile": ["Archivo","sans-serif"],
        "headline-md": ["Archivo","sans-serif"],
        "label-lg": ["Bricolage Grotesque","Segoe UI","sans-serif"],
        "headline-lg": ["Archivo","sans-serif"],
        "quote": ["Instrument Serif"],
      },
    },
  },
};
