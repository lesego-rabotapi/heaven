# Launch checklist: Heaven Coffee site

The site is a pitch mockup until this list is done. One command tells you where it stands:

```bash
npm run check:launch
```

It exits 1 while anything below is unresolved and exits 0 only when the **code** side is ready. It
cannot know whether the client has agreed to anything, so the **client side** (section 2) is a human
gate too. Launch needs both.

## 1. Code side: what `check:launch` blocks on

| Blocker | Where | Done when |
|---|---|---|
| `<meta name="robots" content="noindex">` | `<head>` | Removed, on launch day, not before |
| Phone placeholders (`data-phone-placeholder`, four places) | both Visit cards, both footers | Each becomes `<a href="tel:+27…">` with the real number (steps are in the `TODO(content)` at the top of `HEAVEN_CONTENT`), or is removed |
| `TODO(content)`: phone number | `HEAVEN_CONTENT` comment | Resolved with the row above |
| `TODO(content)`: public-holiday hours | `HEAVEN_CONTENT` comment | Client answers Q2; hours text or the open-now chip changes if needed |
| `TODO(content)`: footer press column ("As seen on") | `HEAVEN_CONTENT` comment | Client confirms an outlet, or the comment is deleted if the column stays out |
| `TODO(content)`: share image URLs are relative | `<head>`, above the Open Graph tags | `og:image`, `twitter:image` and the JSON-LD `image` become absolute URLs on the real domain; add `og:url` and a `rel="canonical"` link |
| An unknown fact that still has a `data-fact` element, or a `data-fact` with no registry entry | `HEAVEN_CONTENT.facts` | Confirm the fact (change its status) or remove the element |
| An `<img>` without `alt` | anywhere in the markup | Add alt text (`alt=""` for purely decorative images) |

Also check by hand after the domain exists (nothing can check these before):

- Google Rich Results Test on the JSON-LD; Facebook Sharing Debugger / WhatsApp preview on the
  share image.
- A sitemap and `robots.txt` if the client wants one (none exists; there is nothing to index yet).
- Self-hosted fonts (plan item C2) if privacy-sensitive European visitors matter: the page loads
  four font families from Google today.

## 2. Client side: ask, in this order

Everything the site says today comes from the existing copy, the photos, or the user. Anything the
client has not confirmed is **hidden or generic**, not guessed. Answers change that:

| # | Ask | What it unlocks | Until answered, the site |
|---|---|---|---|
| 1 | Trading name and Instagram handle: Heaven Coffee / @heavencoffeect, or the menu's "Heaven Social Café"? | Whether anything is renamed; the share tags and JSON-LD | Uses **Heaven Coffee / @heavencoffeect** everywhere (all brand strings are in `HEAVEN_CONTENT.brand`); the menu's name and red palette are **not** adopted |
| 2 | Are 07:00 to 18:00 right every day? Public holidays? Sundays (church services)? | Open-now chip, hours text, JSON-LD | Shows 07:00 to 18:00 daily, no holiday text |
| 3 | A phone and/or WhatsApp number we may publish? | Call and WhatsApp buttons | Shows no number; Instagram only |
| 4 | May we use the door and Mondli-and-Coco photos? Who is the photographer (credit)? Is the dog's name Coco? | Hero, story, share image | Uses them as supplied (cleared by the site owner); no credit line |
| 5 | Where is the step-free entrance (a wheelchair sign is by the steps)? | A "step-free access" line | Says only that a flight of steps leads to the door |
| 6 | Card payments? Wi-Fi? | Two "Good to know" chips | Chips hidden (a Capitec sign is in a photo, which is not proof) |
| 7 | A drink the café is known for? | A "start here" pick on the menu | None |
| 8 | What bakes are on the counter, and their prices? | A real "From the counter" list | "Fresh bakes at the counter. Ask what's out today." |
| 9 | A Google Business Profile link? | An exact map pin | Directions use the address as a search |
| 10 | Real Instagram post links? | A true "From the feed" strip | The strip is titled "In pictures" and links to the profile |
| 11 | Is the church happy for its noticeboard and a memorial plaque (visible in the door photo) to appear? | Keeping the door photo as is | The photo is used as supplied |
| 12 | Is "born in love, by love, for love" the café's own line? | Keeping it in the footer | Used, because it is on their menu board and door glass |

Dogs: the "Dog friendly" seal and "dogs on leads" wording were removed on request; photos that
happen to show dogs (Coco, the "Open door" tile, two feed tiles) stay. There is no dog chip.

## 3. Photos and files

- `incoming/` holds the original, full-size photos (with EXIF and GPS). It is ignored by git and
  must **never** be committed. `node scripts/optimise-images.mjs` turns it into the web images
  (needs `sharp`, already a dev dependency) and strips all metadata.
- The menu board photo was used only to transcribe the menu. It is not published and not in the repo.
- The real phone number is still in **public git history** (earlier commits). Removing it means
  rewriting the history of a public repository, which needs an explicit decision. Until then, treat
  that number as already public.

## 4. Checks to run on every change

```bash
npm run check:css          # compiled Tailwind is up to date (exit 0)
npm run check:launch       # launch gate (exit 1 until launch)
npm test                   # all tests in tests/ (node --test)
```

A word in a script or comment can add an unused rule to `tailwind.css`; if `check:css` fails, run
`npm run build:css` and commit the result.

## 5. Real devices (the preview pane cannot do these)

- [ ] Tab through the whole page with a keyboard: the focus ring is visible everywhere, nothing is
      skipped, nothing traps.
- [ ] Windows High Contrast / forced colours: links and the hours pill are visible.
- [ ] A phone in sunlight: the "COFFEE" headline (about 2.4 to 2.9 : 1 on the sky) and small text.
- [ ] A mid-range Android on mobile data: the hero loads fast (aim LCP <= 2.5 s on 4G) and the
      page scrolls smoothly, and the photo feed drifts without stutter and stops under a finger.
- [ ] An iPad in both orientations (the 768 to 1023 px tablet layout).
- [ ] A screen reader (VoiceOver or NVDA) through the first screen, Find us and the menu.
- [ ] The Directions links on an iPhone (Apple Maps first) and on Android (Google Maps).
- [ ] The shared link in WhatsApp/iMessage shows the door image (needs the real domain first).
- [ ] The menu drawer: nothing hides the last footer link at 320, 390, 768.
- [ ] Lighthouse mobile before and after launch.

## 6. Known limits

- Hours are shown in South African time (UTC+2, no daylight saving) so a visitor abroad sees the
  right "open now" state; nothing handles public holidays until Q2 is answered.
- Without JavaScript the page still shows the menu, the hours as one line and the Find us section;
  the open-now chip, the marquee and the maps ordering need script.
- The COFFEE headline contrast is a design decision, not an oversight; see section 5.
