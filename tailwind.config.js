/** Source of truth for the Tailwind build (npm run build:css).
 *  Was the inline #tailwind-config script in index.html. */
module.exports = Object.assign({ content: ['./index.html'] }, {
  "darkMode": "class",
  "theme": {
    "extend": {
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "gutter": "1.5rem",
        "space-xl": "2.5rem",
        "gutter-lg": "2.5rem",
        "margin-sm": "1.25rem",
        "space-md": "1rem",
        "space-sm": "0.5rem",
        "space-lg": "1.5rem",
        "space-xs": "0.25rem",
        "margin-lg": "3.5rem",
        "space-2xl": "4rem",
        "margin": "1.5rem",
        "gutter-sm": "1rem"
      },
      "fontFamily": {
        "title-sm": [
          "Bricolage Grotesque",
          "Segoe UI",
          "sans-serif"
        ],
        "display": [
          "Archivo",
          "sans-serif"
        ],
        "label-md": [
          "Bricolage Grotesque",
          "Segoe UI",
          "sans-serif"
        ],
        "title-lg": [
          "Bricolage Grotesque",
          "Segoe UI",
          "sans-serif"
        ],
        "label-sm": [
          "Bricolage Grotesque",
          "Segoe UI",
          "sans-serif"
        ],
        "headline-sm": [
          "Archivo",
          "sans-serif"
        ],
        "display-mobile": [
          "Archivo",
          "sans-serif"
        ],
        "body-md": [
          "Bricolage Grotesque",
          "Segoe UI",
          "sans-serif"
        ],
        "body-sm": [
          "Bricolage Grotesque",
          "Segoe UI",
          "sans-serif"
        ],
        "title-md": [
          "Bricolage Grotesque",
          "Segoe UI",
          "sans-serif"
        ],
        "body-lg": [
          "Bricolage Grotesque",
          "Segoe UI",
          "sans-serif"
        ],
        "headline-lg-mobile": [
          "Archivo",
          "sans-serif"
        ],
        "headline-md": [
          "Archivo",
          "sans-serif"
        ],
        "label-lg": [
          "Bricolage Grotesque",
          "Segoe UI",
          "sans-serif"
        ],
        "headline-lg": [
          "Archivo",
          "sans-serif"
        ],
        "quote": [
          "Instrument Serif"
        ]
      },
      "fontSize": {
        "title-sm": [
          "15px",
          {
            "lineHeight": "22px",
            "fontWeight": "600"
          }
        ],
        "display": [
          "68px",
          {
            "lineHeight": "0.95",
            "letterSpacing": "-0.02em",
            "fontWeight": "800"
          }
        ],
        "label-md": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.04em",
            "fontWeight": "600"
          }
        ],
        "title-lg": [
          "20px",
          {
            "lineHeight": "28px",
            "fontWeight": "600"
          }
        ],
        "label-sm": [
          "11px",
          {
            "lineHeight": "14px",
            "letterSpacing": "0.08em",
            "fontWeight": "700"
          }
        ],
        "headline-sm": [
          "22px",
          {
            "lineHeight": "28px",
            "fontWeight": "800"
          }
        ],
        "display-mobile": [
          "40px",
          {
            "lineHeight": "1.02",
            "letterSpacing": "-0.01em",
            "fontWeight": "800"
          }
        ],
        "body-md": [
          "15px",
          {
            "lineHeight": "24px",
            "fontWeight": "400"
          }
        ],
        "body-sm": [
          "13px",
          {
            "lineHeight": "18px",
            "fontWeight": "400"
          }
        ],
        "title-md": [
          "17px",
          {
            "lineHeight": "24px",
            "fontWeight": "600"
          }
        ],
        "body-lg": [
          "17px",
          {
            "lineHeight": "26px",
            "fontWeight": "400"
          }
        ],
        "headline-lg-mobile": [
          "32px",
          {
            "lineHeight": "1.05",
            "letterSpacing": "-0.01em",
            "fontWeight": "800"
          }
        ],
        "headline-md": [
          "26px",
          {
            "lineHeight": "32px",
            "fontWeight": "800"
          }
        ],
        "label-lg": [
          "14px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0.02em",
            "fontWeight": "600"
          }
        ],
        "headline-lg": [
          "44px",
          {
            "lineHeight": "0.98",
            "letterSpacing": "-0.015em",
            "fontWeight": "800"
          }
        ]
      }
    }
  }
});
