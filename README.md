# Cendrawasih UI

A design language as code: design tokens, CSS and React components. Colorful plumage, strong contrast, clean surfaces. It started as Cendra's and is used by every Cendra product, but the system is brand-neutral: a brand plugs in its own palette, faces and mark, and every component follows.

The rules (principles, roles, type, components) are in [docs/design-language.md](docs/design-language.md). The short version: **fill small, outline large**. Brand colors fill tags, badges and buttons. Large boxes get a 3px colored outline and an oversized watermark icon in a second brand color at 30%.

Brands are in [docs/brands/](docs/brands/): [Cendra](docs/brands/cendra.md), and [Example](docs/brands/example.md) to copy. To add one, see [Adding a brand](docs/adding-a-brand.md). What changed between versions, and how to migrate, is in [CHANGELOG.md](CHANGELOG.md).

## What's in here

| Path | What it is |
| --- | --- |
| `tokens/system/` | The system's source of truth, in the W3C Design Tokens format (DTCG 2025.10). `base` holds the role defaults, spacing, radii and type, and lists the roles a brand must fill; `day` and `night` hold the theme colors under the same keys. |
| `tokens/brands/<id>/` | One brand: its private palette mapped onto the roles, its faces and its mark, with optional Day and Night overrides. |
| `src/styles/` | `tokens.css`, `tailwind.css` and `brands/<id>.css` are generated from the tokens. `components.css` styles the components. `index.css` brings the system together. |
| `src/components/` | React 19 components: Button, Tag, PlumeBar, Card, Band, TextField, Select, SearchField, Checkbox, RadioGroup, Switch, Notice, Tabs, Table, Pagination, FilterChip, FilterBar, AppShell, SideNav, TopBar, Breadcrumb, PageHeader, Progress, Skeleton, EmptyState, Banner, Avatar, Accordion, Dialog, Sheet, Menu, Tooltip, Toast, Stat, Icon, BrandMark, and Cendra's Logogram. |
| `src/fonts/` | Brand faces, self-hosted as woff2: Google Sans (variable, 400 to 700) and Karla, for Cendra. |
| `assets/` | Cendra's logos (SVG) and illustrations (PNG). |
| `docs/` | The design language, one page per brand, and how to add a brand. |
| `playground/` | The sync dashboard, the pattern screens (list, detail, settings, first run) and the component gallery, run with `npm run dev`. |

## Develop

Needs Node 22 or later.

```bash
npm install
```

```bash
npm run dev
```

The playground opens at http://localhost:5173. Pick a screen (the dashboard, the four patterns or the components gallery) the brand, and System, Day or Night from the bar at the bottom left. Add `?theme=dark` or `?brand=example` to the URL to open that way.

- `npm run tokens` rebuilds the generated CSS and the token tables in `docs/` after you edit `tokens/`. It checks every brand's roles and contrast and stops with a list if anything misses. Don't edit the generated files.
- `npm run build` builds the package into `dist/`.
- `npm run typecheck` checks the components and the playground.

## Use it in an app

The package is private for now. Install it from this repo, or link it with `npm link`.

### React

```tsx
import '@cendra/ui/styles.css';
import '@cendra/ui/brands/cendra.css';
import { Band, Button, Stat } from '@cendra/ui';

<Stat tone="accent" icon="payments" label="Payments matched" value="Rp 48,2 jt" />
```

Tones are brand roles (`primary`, `secondary`, `tertiary`, `spotlight`, `accent`), so the same code takes on whichever brand is loaded. States use status tones: `<Tag tone="danger">Failed</Tag>`.

Components that hold state or use the browser (the form controls, Tabs, the data components, AppShell and the overlays) are marked `'use client'`, so they work in React Server Component apps. The others render on the server.

For toasts, put `<ToastProvider>` around the app once and call `useToast()` where you need one.

### Any stack (Vue, Nuxt, plain HTML)

Import `@cendra/ui/styles.css` and your brand's stylesheet, and use the classes: `cx-btn cx-btn--primary`, `cx-tag cx-tag--accent`, `cx-headline`, `cx-highlight`. The React components show the markup each class expects.

### Tailwind 4

```css
@layer theme, base, cendra, components, utilities;
@import "tailwindcss";
@import "@cendra/ui/tailwind.css";
@import "@cendra/ui/brands/cendra.css";
```

This gives you the role and theme colors as utilities (`bg-primary`, `text-ink`, `border-primary-edge`, `bg-success-tint`), the type scale (`text-headline`, `text-body-sm`), the radii (`rounded-plume`, `rounded-pill`), `font-display` and `font-text`, a 4px spacing step, and a `dark:` variant that follows the theme. The `@layer` line puts Tailwind's preflight below the components and its utilities above them.

## Brands

A product loads one brand stylesheet after the system's, and that is all. The brand sets the roles; everything else follows. To show more than one brand on a page, load each and set `data-brand="<id>"` on `<html>` or on the element that should take that brand, as the playground does.

When you upgrade the package, apply the Migration steps in `CHANGELOG.md` for each version in between. They are written so an AI working in your product can apply them; point it at `node_modules/@cendra/ui/CHANGELOG.md`.

## Theming

Day and Night are one set of variables. Each theme color is a `light-dark()` pair, so a page follows the OS setting by default. Set `data-theme="light"` or `data-theme="dark"` on `<html>`, or on any element, to fix the theme for that subtree.

## Cascade layers

Everything ships inside the `cendra` cascade layer, so your own unlayered CSS always wins over it. That includes element selectors: a global `a { color: … }` will also recolor a linked Card. Put element-level base styles in a layer declared before `cendra`, as the playground does:

```html
<style>@layer app-base, cendra;</style>
```

## Browser support

The styles rely on `light-dark()`, cascade layers and container query units, and Menu and Tooltip on the popover API. All are Baseline: Chrome 123, Safari 17.5 and Firefox 125 or later. Dialogs, menus and tooltips animate out only where the browser can animate the top layer (Chrome); elsewhere they close at once.
