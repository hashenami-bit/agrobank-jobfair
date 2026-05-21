# Agrobank Careers — Phase A Visual Reskin

You are working in `jobfair/` (Vite + React + Tailwind). Goal: reskin the site to match the visual style of **agrobank.uz** (light theme, single Agrobank green, conservative bank look). **Do not** add features, change copy, change routes, or touch the backend. Visual layer only.

## Design tokens — use these everywhere

```css
--brand-green: #00973A;        /* primary — Agrobank green */
--brand-green-dark: #007A2F;   /* hover / pressed */
--brand-leaf: #8DC63F;         /* secondary highlight */
--bg: #FFFFFF;                 /* page background */
--bg-soft: #F6F8F4;            /* alt section background */
--text: #0E1A12;               /* near-black, slight green undertone */
--text-muted: #5B6B5F;         /* secondary text */
--border: #E6EAE3;             /* hairlines, dividers */
--card-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
```

Font: swap `Space Mono` → `Inter` (or `Manrope`). Drop the Google Fonts mono import.

## Tasks — do in this order, commit after each

### 1. Kill the WebGL background
- `src/components/Layout.jsx:13` → remove `<NexusEngine />` and its import on line 4.
- Delete `src/components/NexusEngine.jsx`.

### 2. Light theme base
- `src/index.css:7-15` → change `body { background-color: #030303; color: #fff; }` to use `--bg` and `--text`. Add the token block above under `@layer base { :root { ... } }`.
- `src/index.css:1` → replace the Space Mono import with: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');` and update the body `font-family` to start with `'Inter'`.
- Find every `bg-[#030303]`, `bg-black`, `text-white`, `text-white/XX`, `border-white/[0.0X]` across `src/` and convert to light-theme equivalents (`bg-white`, `text-[var(--text)]`, `text-[var(--text-muted)]`, `border-[var(--border)]`). Watch these files especially:
  - `src/components/Navbar.jsx`
  - `src/components/Footer.jsx`
  - `src/components/Layout.jsx`
  - `src/pages/Home/Hero.jsx`
  - `src/pages/Home/Projects.jsx`
  - `src/pages/Home/Vacancies.jsx`
  - `src/pages/Home/Offerings.jsx`
  - `src/components/FAQ.jsx`
  - `src/components/RecruiterModal.jsx`

### 3. Single brand color (kill the rotating accent system)
- `src/contexts/SlideContext.jsx:7-11` → set every slide's `accent` to `#00973A`. Keep the slide structure; only the color changes.
- Any place that uses `--accent` (Hero, Projects, Vacancies, Offerings, FAQ, Navbar) will inherit the green automatically — verify visually, don't refactor away the variable.

### 4. Hero cleanup
- `src/pages/Home/Hero.jsx:42-76` → remove the rotating SVG "AGROBANK" textPath ring and the concentric metallic rings.
- Keep: the slide image, slide number badge, heading typewriter, prev/next arrows, Batafsil button.
- Replace the dark glow effects (`accentGlow`, `accentSoft` shadows) with a subtle soft shadow using `--card-shadow`.
- Hero background: `bg-[var(--bg-soft)]`.

### 5. Cards: kill skeuomorphic glass + 3D holodex
- `src/index.css:28-43` (`.skeuo-card`, `.skeuo-card-active`) → replace with flat white card:
  ```css
  .skeuo-card {
    background: #fff;
    border: 1px solid var(--border);
    box-shadow: var(--card-shadow);
  }
  .skeuo-card-active {
    background: #fff;
    border: 1px solid var(--brand-green);
    box-shadow: 0 4px 16px rgba(0, 151, 58, 0.12);
  }
  ```
- `src/index.css:98-143` (`.holodex-*` 3D rotate/translateZ rules) → replace with a simple hover lift:
  ```css
  .holodex-item { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .holodex-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    border-color: var(--brand-green);
  }
  ```
  Delete the `perspective`, `transform-style`, `rotateY`, `translateZ` rules.

### 6. Buttons
- `.btn-pill-filled` (`src/index.css:163-178`) → keep the structure but the glow should be subtle: `box-shadow: 0 2px 6px rgba(0, 151, 58, 0.25)`. Hover lift `translateY(-1px)`, no oversized accent halo.
- `.btn-pill` outline button → border `var(--brand-green)`, text `var(--brand-green)`, hover fills with `--brand-green-dark`.

### 7. Navbar
- `src/components/Navbar.jsx:28-33` → scrolled state: `bg-white/90 backdrop-blur border-b border-[var(--border)]`. Unscrolled: `bg-transparent`.
- Slide tab active color: `var(--brand-green)`. Inactive: `var(--text-muted)`.

### 8. Footer
- `src/components/Footer.jsx` → light bg, `text-[var(--text-muted)]`, top border `var(--border)`.

### 9. Typography pass
- Any `font-light` on body text → `font-normal` (light weights look weak on white).
- Remove any `tracking-widest uppercase` from large headings — keep it only on small kicker labels.

### 10. Contrast & polish
- Run a manual WCAG AA check: every text class needs ≥ 4.5:1 against its background. Common offenders after the flip: anything `text-white/55`, `text-white/65`, `text-white/70` → become `text-[var(--text-muted)]`.
- Test at 375px (mobile) and 1440px (desktop).
- Check Chrome, Firefox, Safari (or WebKit equivalent).

## Acceptance criteria

- [ ] No dark backgrounds anywhere. No WebGL canvas in the DOM.
- [ ] One brand color (Agrobank green) used consistently. No red, no blue.
- [ ] No `Space Mono` references. No spinning rings. No 3D card tilts.
- [ ] All three slides (Projects / Vacancies / Offerings) and the recruiter modal pass a quick visual sanity check.
- [ ] Lighthouse Performance score on mobile ≥ 85 (was likely 50–60 with the WebGL).
- [ ] `npm run build` succeeds with no warnings I introduced.
- [ ] `npm run lint` passes.

## Out of scope (do NOT touch this session)

- Translations / copy
- Routing or the placeholder routes
- Vacancy data (leave hard-coded)
- Apply form (none yet, don't add one)
- Footer content (only restyle, don't add address/license)
- HH.uz API integration
- Adding English translations

## Suggested workflow

1. `git checkout -b reskin/phase-a`
2. Work through tasks 1 → 10 in order, committing after each numbered task.
3. `npm run dev` and eyeball each slide after every commit.
4. When done: `npm run build && npm run lint`, then open a PR titled `Phase A — Agrobank visual reskin`.

## If you get stuck

- Don't invent a green hex — use `#00973A` exactly.
- Don't add new dependencies. Tailwind + the existing libs are enough.
- If a hero photo is missing, leave the slide images as-is (`globe.webp`, `staircases.webp`, `cityscape.webp`) — replacing them is a separate task.
- If a class flip breaks layout (e.g. a card collapses), prefer minimal fixes; don't restructure components.
