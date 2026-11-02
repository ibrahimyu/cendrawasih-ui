# Cendrawasih UI

The Cendra design language as code: design tokens, CSS and React components for every Cendra product. Colorful plumage, strong contrast, clean surfaces.

The rules (principles, color pairings, type, voice) are in [docs/design-language.md](docs/design-language.md). The short version: **fill small, outline large**. Brand colors fill tags, badges and buttons. Large boxes get a 3px colored outline and an oversized watermark icon in a second plume color at 30%.

## What's in here

| Path | What it is |
| --- | --- |
| `tokens/*.tokens.json` | The source of truth, in the W3C Design Tokens format (DTCG 2025.10). `brand` holds the plumage, spacing, radii and type; `day` and `night` hold the theme colors under the same keys. |
| `src/styles/` | `tokens.css` and `tailwind.css` are generated from the tokens. `components.css` styles the components. `index.css` brings them together. |
| `src/components/` | React 19 components: Button, Tag, PlumeBar, Card, Band, TextField, Select, SearchField, Checkbox, RadioGroup, Switch, Notice, Tabs, Table, Pagination, FilterChip, FilterBar, AppShell, SideNav, TopBar, Breadcrumb, Progress, Skeleton, EmptyState, Banner, Avatar, Accordion, Dialog, Sheet, Menu, Tooltip, Toast, Stat, Icon, Logogram. |
| `src/fonts/` | Google Sans (variable, 400 to 700) and Karla, self-hosted as woff2. |
| `assets/` | Logos (SVG) and illustrations (PNG). |
| `playground/` | A sync dashboard mockup and a component gallery, run with `npm run dev`. |

## Develop

Needs Node 22 or later.

```bash
npm install
```

```bash
npm run dev
```

The playground opens at http://localhost:5173. Switch between the dashboard and the components gallery, and between System, Day and Night, from the bar at the bottom right. Add `?theme=dark` to the URL to open in Night.

- `npm run tokens` rebuilds `src/styles/tokens.css` and `src/styles/tailwind.css` after you edit `tokens/`. Don't edit the generated files.
- `npm run build` builds the package into `dist/`.
- `npm run typecheck` checks the components and the playground.

## Use it in an app

The package is private for now. Install it from this repo, or link it with `npm link`.

### React

```tsx
import '@cendra/ui/styles.css';
import { Band, Button, Stat } from '@cendra/ui';

<Stat tone="green" icon="payments" label="Payments matched" value="Rp 48,2 jt" />
```

Components that hold state or use the browser (the form controls, Tabs, the data components, AppShell and the overlays) are marked `'use client'`, so they work in React Server Component apps. The others render on the server.

For toasts, put `<ToastProvider>` around the app once and call `useToast()` where you need one.

### Any stack (Vue, Nuxt, plain HTML)

Import `@cendra/ui/styles.css` and use the classes: `cx-btn cx-btn--primary`, `cx-tag cx-tag--green`, `cx-headline`, `cx-highlight`. The React components show the markup each class expects.

### Tailwind 4

```css
@layer theme, base, cendra, components, utilities;
@import "tailwindcss";
@import "@cendra/ui/tailwind.css";
```

This gives you the brand and theme colors as utilities (`bg-maroon`, `text-ink`, `border-maroon-edge`, `bg-tint-green`), the type scale (`text-headline`, `text-body-sm`), the radii (`rounded-plume`, `rounded-pill`), `font-display` and `font-text`, a 4px spacing step, and a `dark:` variant that follows the theme. The `@layer` line puts Tailwind's preflight below the components and its utilities above them.

## Theming

Day and Night are one set of variables. Each theme color is a `light-dark()` pair, so a page follows the OS setting by default. Set `data-theme="light"` or `data-theme="dark"` on `<html>`, or on any element, to fix the theme for that subtree.

## Cascade layers

Everything ships inside the `cendra` cascade layer, so your own unlayered CSS always wins over it. That includes element selectors: a global `a { color: … }` will also recolor a linked Card. Put element-level base styles in a layer declared before `cendra`, as the playground does:

```html
<style>@layer app-base, cendra;</style>
```

## Browser support

The styles rely on `light-dark()`, cascade layers and container query units, and Menu and Tooltip on the popover API. All are Baseline: Chrome 123, Safari 17.5 and Firefox 125 or later. Dialogs, menus and tooltips animate out only where the browser can animate the top layer (Chrome); elsewhere they close at once.
