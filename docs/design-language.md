# Cendrawasih UI

The design language for every Cendra product. Built from the CENDRA Brand Design Guidelines and cendra.co. The code lives in this repo (`src/`, `tokens/`); the component previews are also in the design system at https://claude.ai/artifact/66dF6jzFZibk3Gt7MjFUbg. Type styles are CSS classes with a `cx-` prefix: the `headline` style is `.cx-headline`.

Cendrawasih UI is how every Cendra product looks and talks: cendra.co, AppGrout, Morro, Lyvia AI, Sloppeh, TractionCue, and the client apps we build. It is named after the bird in our logo. The cendrawasih wears its colors at full strength against a dark body; so do we. Color comes in confident strokes: small things filled with it, large boxes drawn with it, and oversized icons washed in a second plume color. Type is bold and plain, and every surface is clean enough that the color reads as a decision.

## Principles

1. **Fill small, outline large.** Brand colors fill small things at full value: tags, badges, buttons, icon tiles, the plume bar. Large boxes (stat tiles, toned cards, bands, panels) stay on the surface, take the color as a 3px outline (`stroke-accent`), and carry one oversized icon or the logogram in the paired plume color at 30% (`opacity-watermark`). The full-color field is kept for full-bleed marketing sections (`Band filled`).
2. **Black type, plume accents.** Text and icons are `ink`, a neutral near-black. Brand colors mark things: a label, an outline, a button, a watermark. Black reads; the plumage brands.
3. **One plume per view.** Yellow is the spotlight. Each screen gets at most one yellow action (`Button variant="plume"`) and at most one highlighted word in a headline (`cx-highlight`).
4. **Contrast before decoration.** Every text pair in this system is checked (see Color). When a brand color fails as text, use its `-deep` partner; never lighten the brand to make it work.
5. **Shape says what it does.** Pills (`radius-pill`) are things you press: buttons, tabs, nav items. The feather tip (`radius-feather`: three round corners and one sharp one) is things that only label or report: tags, badges and counts, never clickable. Inputs are softly rounded (`radius-sm`). Rounded rectangles (`radius-lg`) hold content. The large plume (`radius-plume` + `radius-quill`) marks the one featured box.
6. **Two languages, one layout.** Every product ships in English and Bahasa Indonesia. Leave about 30% slack in every label and button.

## Content fundamentals

- **Voice:** direct, senior and warm. We talk like an engineer who has done this before, explaining it to a business owner. Short sentences, concrete nouns, no hype.
- **Person:** *we* for Cendra, *you* for the customer. Never *the user*.
- **Casing:** sentence case everywhere: headings, buttons, tabs, labels. Product names keep their own casing (AppGrout, TractionCue, Lyvia AI). The `eyebrow` style sets its own caps; write it in sentence case.
- **Name real things.** Say *ERP, CRM, payments, WhatsApp, Xendit, Accurate, Shopee*, not *platforms* or *solutions*. Say *12 orders failed to sync*, not *An error occurred*.
- **Buttons are verbs:** *Book a call*, *Discuss an integration*, *Retry sync*, *Disconnect Xendit*.
- **Numbers and money:** Indonesian contexts use `Rp 1.250.000` and `12 Nov 2026`, times in WIB; English contexts use `$300` and `Nov 12, 2026`. Set columns of figures with `font-variant-numeric: tabular-nums`.
- **No emoji** in product UI or marketing headlines. Exclamation marks: none.

Examples from cendra.co:

> Your systems, finally **talking** to each other.

> We connect your ERP, CRM, payments and internal tools so data flows without manual work.

> Built with Lovable, Bolt, Cursor or Replit? Our audit service, AppGrout, reviews the code and tells you exactly what to fix before launch.

## Color

The palette is the brand guide's five colors plus `orange` from the logo gradient. Brand tokens (`maroon`, `red`, `green`, `yellow`, `orange`, and the `-deep` partners) are the same in both themes. Semantic tokens (`surface`, `ink`, `action`, `line`…) change between **Day** (light) and **Night** (dark).

### Approved pairings

| Text or mark | Ground | Contrast | Use |
| --- | --- | --- | --- |
| `ink` | `surface` (white) | 18.9:1 | All text on Day |
| `maroon` | `surface` (white) | 15.2:1 | Brand words, logo wordmark, big numbers that carry the brand |
| `white` | `maroon` | 15.2:1 | Heroes, Night band, primary buttons |
| `yellow` | `maroon` | 9.5:1 | Highlighted headline word, logo, plume button on maroon |
| `maroon` | `yellow` | 9.5:1 | Plume button label, yellow tags |
| `maroon` | `orange` | 5.7:1 | Orange tags and tiles |
| `white` | `red-deep` | 6.2:1 | Danger buttons, red tags |
| `white` | `green-deep` | 6.0:1 | Green tags |
| `white` | `red` | 4.4:1 | **Display text only** (24px+, or bold 19px+) |
| `white` | `green` | 4.0:1 | **Display text only** |
| `green` | `yellow` | 2.5:1 | **Logo only** (from the brand guide), never text |
| `yellow` | `red` | 2.8:1 | **Logo and supergraphic only**, never text |

Never put text in `yellow` on white (1.6:1) or `red` at body size on white (4.4:1): use `link` / `red-deep`.

### Theme rules

- Primary actions use `action` / `on-action`: maroon with white on Day, yellow with maroon on Night. Text on yellow is maroon (`on-yellow`), as in the brand guide.
- Neutrals are true black and grey in both themes: `ink`, `ink-soft`, `line` and the surfaces carry no maroon tint. Maroon is an accent, never the room; a whole screen washed in it tires the eye. On Night, `surface` is a neutral near-black (#111111). Maroon outlines use `maroon-edge`, which lifts to a lighter maroon so it still shows.

### Tone pairs

Every large outlined box pairs its outline color with a second plume color for its watermark:

| tone | outline | watermark at 30% |
| --- | --- | --- |
| maroon | `maroon-edge` | `red` |
| red | `red` | `orange` |
| orange | `orange` | `maroon-edge` |
| yellow | `yellow` | `green` |
| green | `green` | `yellow` |

A yellow outline is decorative (1.6:1 on white); the box's filled label carries the meaning.
- Status: `success`, `warning`, `danger` for text and icons; `tint-green`, `tint-yellow`, `tint-red` behind them. Status always carries a word and an icon; red and green are never the only signal.

## Typography

**Google Sans** (display, variable 400 to 700) for headings, buttons, labels, tags and numbers. **Karla** (text, 400 to 700) for everything you read in sentences. Google Sans replaces the brand guide's Poppins: it keeps the round geometry with friendlier, more open letterforms at UI sizes. Both ship as files in `fonts/`.

- Headlines: Google Sans 600 with tight tracking (`display-xl`, `display`, `headline`, `title`, `subtitle`). One `display-xl` per page.
- Running text: Karla Medium 500 (`body-lg`, `body`, `body-sm`, `caption`), line-height 1.5 to 1.6, max 65 characters per line.
- Interface: `button`, `label`, `eyebrow` in Google Sans 600.
- On phones, step each display style down one level (`display-xl` → `display`).
- Highlight a word, not a phrase: a small yellow fill behind it (`cx-highlight`, maroon text). On a filled Night band, color the word `yellow` instead.

## Shape and spacing

- Radii: `radius-pill` for buttons, tabs and nav items; `radius-feather` (three 10px corners and a 2px tip) for tags, badges and counts; `radius-sm` for inputs; `radius-md` for tiles and notices; `radius-lg` for cards and dialogs; `radius-plume` with `radius-quill` for the featured box.
- Lines: Cendra draws with a 2px line (`stroke-bold`). Neutral card borders use `line` at rest and `line-strong` on hover. Colored outlines on large boxes use `stroke-accent` (3px). Hairlines (`stroke-hair`) are for tables only.
- Surfaces: cards, panels, stats and bands sit on `surface` in both themes and are drawn by their outline alone. Never give a large box a lighter grey fill on Night: grey on near-black with a faint edge reads as frosted glass. `surface-raised` is only for small lifts (a hovered tab) and for menus and dialogs.
- Selected: the active tab and nav item take `selected` (a pale plume wash) with `on-selected` text: maroon on Day, yellow on Night. The `action` fill means "press this"; `selected` means "you are here". Never use one for the other.
- Elevation: no shadows on things that sit on the page. `shadow-overlay` is for menus and dialogs. Buttons are flat: no ledges, no drop shadows.
- Spacing: a 4px base (`space-1` to `space-10`). The rhythm is generous: sections are `space-10` (112px) apart on desktop and `space-9` (72px) on phones. Page structure follows the grid under Layout.

## Layout

A 12-column fluid grid at every size, mobile first, with four breakpoints. Content stops at 1200px (`layout-max`) and centers; the margins take the rest.

| Breakpoint | From | Gutter | Margin | Typical spans |
| --- | --- | --- | --- | --- |
| Phone | 0 | 16px | 16px | 12, sometimes 6 |
| Tablet | 600px (`breakpoint-tablet`) | 20px | 24px | 6 |
| Laptop | 1024px (`breakpoint-laptop`) | 24px | 32px | 8 + 4, 4, 3 |
| Wide | 1440px (`breakpoint-wide`) | 24px | 32px | 3, or 8 + 4 |

- Use `cx-container` for the page width and `cx-grid` for the columns. Children span all 12 until told otherwise: `cx-span-6` everywhere, `cx-span-tablet-6`, `cx-span-laptop-4`, `cx-span-wide-3` from that breakpoint up. With Tailwind, the same breakpoints are the `tablet:`, `laptop:` and `wide:` variants.
- Below laptop, the app's side nav becomes a top bar. Below tablet, bands and heroes switch to their phone layout.
- Inside a component, respond to the space it has (container queries), not the screen: a Stat in a narrow column shrinks its number on its own.
- Keep reading text under about 70 characters a line (680px at body size), even on wide screens.

## Signature elements

- **Band:** a wide outlined box with the logogram bleeding off its edge as a watermark. The hero of a dashboard or an empty state; filled, the hero of a marketing page. See the Band component.
- **Watermark icon:** an oversized stroke icon cropped off the corner of a large box, in the paired plume color at 30%. See Stat and Card.
- **Plume bar:** the five-color stripe in logo order. Once per screen, at the top of the shell or at a seam.
- **Plume shape:** two rounded corners and two sharp ones, like a feather. One featured card or media frame per group.
- **Feather tip:** tags, badges and counts have three round corners and one sharp tip. The tip says *this is a label, not a button*; anything you can press is a pill.
- **Highlighted word:** one word in a headline on a small yellow fill.

## Motion

Crisp: quick, physical and never decorative. Three durations and two easings cover everything; there is no other timing.

- `duration-base` (160ms) with `ease-out` for color and border changes: hover, selected, a field taking focus.
- `duration-fast` (120ms) for press feedback, so a press always feels immediate, and for anything leaving the screen (with `ease-in`).
- `duration-slow` (240ms) with `ease-out` for things that move or appear: a linked card lifting 4px, a menu or dialog opening. Nothing takes longer.
- Buttons, tabs and nav items change color, never shape or size. No bounce or overshoot, no parallax, no looping animation.
- Under `prefers-reduced-motion`, nothing moves: transitions are off and cards don't lift. Color changes still happen, instantly.
- Motion never carries meaning on its own. If something changed, the screen says so in words.

## States

Every state is its own color step, named as a token. Nothing is faded with opacity: opacity is for watermarks only. A control shows one state at a time, in this order of precedence: disabled, pressed, selected, hover, rest. Focus is drawn on top of any of them.

| State | What it means | How it looks |
| --- | --- | --- |
| Rest | Can be used | The variant's own fill or outline. |
| Hover | The pointer is on it | One step: `action-hover`, `yellow-light`, or the `fill-hover` wash behind neutral controls. Secondary buttons also draw their border in `line-strong`. Color only, never shape. |
| Pressed | It is being pressed | One step past hover: `action-pressed`, `yellow-deep`, `fill-pressed`, `maroon-deep` for danger. Lasts as long as the press. |
| Selected | You are here | `selected` with `on-selected` text, for the active tab and nav item. Never the `action` fill: that means "press this". |
| Focus | The keyboard is on it | A 3px solid ring in `focus` with a 2px gap: green-deep on Day, yellow on Night, yellow on the Night band and white on Sunrise and Forest bands. Only on `:focus-visible`. |
| Disabled | Can't be used right now | The same for every variant: `surface-sunk` fill, `line` border, `ink-disabled` text, no pointer. Prefer leaving a control enabled and explaining what's missing when it's used. |
| Loading | Working on it | The label changes to the action in progress ("Syncing…") and the control stops taking presses (`aria-busy`). No spinner on its own; say what's happening. |
| Error | Something needs fixing | A `danger` border on the field and the message under it, in `danger`, written as an instruction. Never color alone: the message and an icon carry it. |

## Iconography

The brand has no icon set of its own yet. Until one is drawn, use 2px rounded-stroke outline icons on a 24px grid (Lucide matches: rounded caps and joins, no fills), shown at 20px in `ink` or the status color, and at 136px as a watermark. The `Icon` component carries the set used so far. This is a stand-in, not part of the brand. No emoji as icons.

## Imagery

Illustrations are flat and warm: faceless people with simple features, clothing in plume colors with soft gradients, and frosted glass panels. They sit on color tiles in cards or float on white. See the Illustrations assets. Product screenshots go on a plume-colored tile with `radius-md` corners. No stock photography.

## Logo

Use the files in the Logos group. Gradient (Main) on white is the default. On maroon use the White logo; on yellow, red or green use a flat single-ink version from the color flexibility page (green on yellow, yellow on red, white on green). Give the logo generous clear space; nothing touches it. Never stretch, recolor outside these pairs, add effects or place the gradient logo on a busy image.


<!-- tokens:start (generated by scripts/build-tokens.mjs; edit tokens/ instead) -->
## Tokens

The source of truth is `tokens/` (W3C design token format). `npm run tokens` compiles it to `src/styles/tokens.css`, which every product imports, and rewrites this section.

### What each color is for

| Token | Day | Night | Use |
| --- | --- | --- | --- |
| `maroon` | `#52050a` | `#52050a` | The brand's dark field: heroes, the Night band, primary buttons on Day. Carries white or yellow text (`on-maroon`, `yellow`). As text on white, 15.2:1, for brand moments only; running text is `ink`. |
| `maroon-deep` | `#3a0307` | `#3a0307` | Pressed state of maroon fills; the footer band. |
| `red` | `#db3d3d` | `#db3d3d` | The Sunrise field and big red shapes. Not a text color: 4.4:1 on white, so white text on red must be 24px+ or bold 19px+. |
| `red-deep` | `#b82a2a` | `#b82a2a` | Red that carries text or small marks: links, danger buttons, error text. 6.2:1 on white. |
| `green` | `#00924c` | `#00924c` | The Forest field and the crest in illustrations. White text on green must be 24px+ or bold 19px+ (4.0:1). |
| `green-deep` | `#00733c` | `#00733c` | Green that carries text or small marks: success text, focus ring in the Day theme. 6.0:1 on white. |
| `yellow` | `#fdc41e` | `#fdc41e` | The plume: one spotlight action per view, highlighted words in headlines on maroon, plumes in the Sunrise and Forest fields. Never text on light surfaces (1.6:1). |
| `yellow-light` | `#ffd34d` | `#ffd34d` | Hover fill of yellow buttons; the primary hover on Night. |
| `yellow-deep` | `#e8b010` | `#e8b010` | Pressed fill of yellow buttons; the primary pressed state on Night (7.7:1 with maroon text). |
| `orange` | `#e8862a` | `#e8862a` | From the logo gradient. Fourth stripe of the plume bar and illustration accents; maroon text on it (5.7:1). Never white text. |
| `white` | `#ffffff` | `#ffffff` | Paper. Logo knock-outs and text on maroon, red-deep and green-deep fills. |
| `on-maroon` | `white` | `white` | Text on maroon and maroon-deep fills (15:1+). |
| `on-yellow` | `maroon` | `maroon` | Text on yellow fills: the plume button, yellow tags (9.5:1). |
| `on-red` | `white` | `white` | Text on red-deep (6.2:1). On plain red, display sizes only. |
| `on-green` | `white` | `white` | Text on green-deep (6.0:1). On plain green, display sizes only. |
| `maroon-edge` | `maroon` | `#b8434a` | Maroon as an outline: the border of maroon-toned cards, stats and bands. Lifts to a lighter maroon on Night so it still shows (3.5:1 on surface). |
| `surface` | `white` | `#111111` | Page background. |
| `surface-sunk` | `#f5f5f5` | `#0a0a0a` | Wells, table stripes and quiet section backgrounds. A true grey, never tinted. |
| `surface-raised` | `white` | `#1c1c1c` | Small lifts: a hovered tab, menus and dialogs. Cards and panels stay on surface and are drawn by their outline, in both themes. |
| `fill-hover` | `surface-sunk` | `surface-raised` | Hover wash behind neutral controls: secondary and ghost buttons, nav items, menu rows. |
| `fill-pressed` | `#e6e6e6` | `#2b2b2b` | Pressed wash behind neutral controls, one step past fill-hover. |
| `ink` | `#121212` | `#f5f5f5` | Primary text and icons on every surface and tint. A neutral near-black (17:1+ on Day surfaces). |
| `ink-soft` | `#5c5c5c` | `#b0b0b0` | Secondary text: intros, hints, metadata. Neutral grey, 6.1:1+ on Day surfaces. |
| `ink-disabled` | `#9e9e9e` | `#5c5c5c` | Text and icons of disabled controls. Deliberately below 4.5:1; never use it for anything a person must read. |
| `line` | `#e6e6e6` | `#3a3a3a` | Decorative hairlines and the 2px outline of neutral cards and panels. Neutral grey. Never the only boundary of a control. |
| `line-control` | `#8a8a8a` | `#707070` | Input and checkbox borders at rest. 3.1:1+ on Day surfaces. |
| `line-strong` | `#121212` | `#f5f5f5` | Hover border on cards, secondary button border, the selected tab rule. |
| `action` | `maroon` | `yellow` | Primary button fill. Maroon on Day, yellow on Night. |
| `action-hover` | `maroon-deep` | `yellow-light` | Primary button fill on hover and press. |
| `action-pressed` | `#2a0205` | `yellow-deep` | Primary button while pressed: one step past hover. |
| `on-action` | `white` | `maroon` | Text and icons on `action` (15.2:1 Day, 9.5:1 Night). |
| `selected` | `tint-yellow` | `tint-yellow` | Where you are: the active tab and nav item. A plume wash, never the action fill, so a selected item never reads as a button. |
| `on-selected` | `maroon` | `yellow` | Text and icons on selected (14:1 Day, 8.7:1 Night). |
| `link` | `red-deep` | `#ff8a7e` | Inline links on any surface (6.2:1 Day, 7:1+ Night). Underlined, always. |
| `focus` | `green-deep` | `yellow` | Keyboard focus ring: 3px solid, 2px gap in the surface color. 6:1 on Day surfaces, 11:1+ on Night. |
| `success` | `green-deep` | `#3ccf86` | Success text and icons on surfaces and on tint-green. |
| `danger` | `red-deep` | `#ff8a7e` | Error text, icons and destructive actions on surfaces and on tint-red. |
| `warning` | `#a8520c` | `#f5a54a` | Warning text and icons on surfaces and on tint-yellow (5:1+). |
| `tint-yellow` | `#fff6d6` | `#3a2a04` | Highlight wash: warning notices, selected rows, the new-item tag. |
| `tint-red` | `#fde8e6` | `#40100f` | Wash behind error notices and soft red tags. Ink on it 15:1+. |
| `tint-green` | `#e2f3ea` | `#0b3220` | Wash behind success notices and soft green tags. |
| `tint-orange` | `#fdebd6` | `#3d2108` | Wash behind soft orange tags. |
| `scrim` | `rgb(0 0 0 / 0.5)` | `rgb(0 0 0 / 0.64)` | Backdrop behind dialogs and sheets. |

### Type scale

Fonts are self-hosted in `src/fonts/`: Google Sans (variable, 400 to 700) and Karla (400, 500, 700).

| Class | Family | Size / line height | Weight | Tracking | Use |
| --- | --- | --- | --- | --- | --- |
| `cx-display-xl` | Google Sans | 64px / 1.04 | 600 | -0.02em | Hero headline, one per page. Steps down to `display` below tablet (600px). |
| `cx-display` | Google Sans | 48px / 1.08 | 600 | -0.02em | Section titles on marketing pages; hero on mobile. |
| `cx-headline` | Google Sans | 34px / 1.15 | 600 | -0.015em | Page titles inside products; section titles on mobile. |
| `cx-title` | Google Sans | 24px / 1.25 | 600 | -0.01em | Card titles, dialog titles, settings groups. |
| `cx-subtitle` | Google Sans | 18px / 1.35 | 600 | 0 | List item titles, table group headers, form section headings. |
| `cx-body-lg` | Karla | 19px / 1.6 | 500 | 0 | Intros under a headline; marketing body copy. |
| `cx-body` | Karla | 16px / 1.6 | 500 | 0 | Default running text in products. |
| `cx-body-sm` | Karla | 14px / 1.5 | 500 | 0 | Hints, table cells, metadata. |
| `cx-caption` | Karla | 12px / 1.4 | 500 | 0.01em | Timestamps, captions, footnotes. Never for instructions. |
| `cx-button` | Google Sans | 15px / 1.2 | 600 | 0.005em | Buttons and tabs. Sentence case. |
| `cx-label` | Google Sans | 14px / 1.3 | 600 | 0 | Form labels and table headers. |
| `cx-eyebrow` | Google Sans | 12px / 1.3 | 600 | 0.1em | Uppercase kicker above a section title. Write it in sentence case; the style sets the caps. |

### Spacing, layout, radius, shape, stroke, opacity, motion, elevation

| Token | Value | Use |
| --- | --- | --- |
| `space-1` | 4px | Icon-to-label gap inside tags. |
| `space-2` | 8px | Gap between a label and its input; icon to text in buttons. |
| `space-3` | 12px | Gap between stacked buttons and between tags. |
| `space-4` | 16px | Inner padding of compact cards and inputs; mobile side gutter minimum. |
| `space-5` | 20px | Gap between cards in a grid. |
| `space-6` | 24px | Card padding; the page gutter on desktop. |
| `space-7` | 32px | Space between a section title and its content. |
| `space-8` | 48px | Space between groups inside a section. |
| `space-9` | 72px | Section padding on mobile. |
| `space-10` | 112px | Section padding on desktop: the Cendra rhythm is generous. |
| `breakpoint-tablet` | 600px | Tablets and small laptop windows. Two-up grids start here. |
| `breakpoint-laptop` | 1024px | Laptops. The app side nav appears; below this it is a top bar. |
| `breakpoint-wide` | 1440px | Large screens. Content stops growing at layout-max and centers. |
| `layout-columns` | 12 | Columns at every breakpoint. Phones span 12 or 6; wider screens use 6, 4 or 3. |
| `layout-max` | 1200px | Widest the content gets. Margins grow beyond it. |
| `layout-gutter-phone` | 16px | Space between columns on phones. |
| `layout-gutter-tablet` | 20px | Space between columns from tablet. |
| `layout-gutter-laptop` | 24px | Space between columns from laptop and wide. |
| `layout-margin-phone` | 16px | Space between content and the screen edge on phones. |
| `layout-margin-tablet` | 24px | Edge margin from tablet. |
| `layout-margin-laptop` | 32px | Edge margin from laptop and wide. |
| `radius-nib` | 2px | The sharp tip of the feather on tags, badges and counts. |
| `radius-quill` | 4px | The sharp pair of corners in the large plume shape; table cells and code. |
| `radius-sm` | 10px | Inputs and menu items; the round corners of the feather. |
| `radius-md` | 16px | Image tiles inside cards, notices, menus. |
| `radius-lg` | 24px | Cards and dialogs. |
| `radius-plume` | 40px | The rounded pair of corners in the plume shape: `border-radius: var(--radius-plume) var(--radius-quill)`. Featured cards, hero media, the Band's inner panel. |
| `radius-pill` | 999px | Buttons, tabs, nav items and avatars: everything you press. |
| `stroke-hair` | 1px | Table rules and dividers. |
| `stroke-accent` | 3px | Colored outlines on large boxes: stat tiles, toned cards, the outlined Band. Thicker than `stroke-bold` so the color reads. |
| `stroke-bold` | 2px | Card, input and secondary button borders: Cendra draws with a 2px line. |
| `stroke-focus` | 3px | Focus ring width. |
| `opacity-watermark` | 0.3 | The oversized icon or logogram behind a large outlined box, drawn in a second plume color. |
| `duration-fast` | 120ms | Press feedback: the pressed step of buttons, tabs and nav items. Also things leaving the screen. |
| `duration-base` | 160ms | Color and border changes: hover, selected, focus on fields. |
| `duration-slow` | 240ms | Things that move or appear: a linked card lifting, a menu or dialog opening. The longest anything takes. |
| `ease-out` | cubic-bezier(0.2, 0, 0, 1) | Quick start, soft landing. For everything that changes, moves or appears. |
| `ease-in` | cubic-bezier(0.4, 0, 1, 1) | Slow start, quick exit. Only for things leaving the screen, with duration-fast. |
| `radius-feather` | `radius-sm radius-sm radius-sm radius-nib` | Tags, badges and counts: three round corners and one sharp tip. Never on anything clickable. |
| `shadow-overlay` | Day and Night pair | Menus, popovers and dialogs only. Cards on the page use borders, not shadows. |
<!-- tokens:end -->

## Components

Reference implementations are the React components in `src/components/`. Each component below lists its anatomy and rules so it can be rebuilt in Vue or any other stack.

### Button

A flat pill you press; five variants that rank actions by how loudly they ask. Hover changes the fill, never the shape.

#### Variants

- `plume`: flat yellow, `yellow-light` on hover. The one action the screen exists for: *Book a call*, *Start pilot*, *Publish*. **One per view**, and only where the yellow has room to glow.
- `primary` (default): `action` fill. Maroon on Day, yellow on Night. The main action in product screens and forms.
- `secondary`: a 2px grey `line-control` outline that turns `line-strong` over a `surface-sunk` wash on hover. The alternative path next to a primary.
- `ghost`: text only. Cancel, Back, low-stakes toggles in toolbars.
- `danger`: `red-deep` fill. Destructive actions, always worded as the thing that happens (*Delete integration*, not *OK*).

Sizes: `sm` 36px (tables, toolbars), `md` 44px (default; the minimum touch target), `lg` 56px (hero and Band CTAs).

#### You provide

- `children`: the label, in sentence case, a verb first. Leave about 30% slack for Bahasa Indonesia (*Book a call* becomes *Jadwalkan panggilan*).
- `href` to render a link that looks like a button, otherwise it is a `<button type="button">`.
- `iconStart` / `iconEnd`: an optional 20px icon node.
- Any native button or anchor attribute (`onClick`, `disabled`, `type="submit"`, `target`).

#### Do and don't

- Do pair one primary with one secondary. Order: primary first (left), then secondary.
- Do put a plume button on maroon, white or the Night surface.
- Don't give a button any shape but the pill: a sharp corner marks a label, not an action.
- Don't place two plume buttons on one screen, or a plume next to a primary: the yellow already is the primary.
- Don't use the yellow plume on a yellow or orange ground.
- Inside a `Band`, `primary` turns white and `secondary` draws in white automatically.

### Tag

A short label with the feather tip (`radius-feather`: three round corners, one sharp) for a category or a state; one or two words, never clickable. The sharp tip is what tells it apart from a button.

#### Tones

Solid tags are the plumage: use them for **categories** (service lines, product names, the hero tag row). Soft tags sit on a tint: use them for **states** in product UI.

| tone | solid | soft |
| --- | --- | --- |
| `yellow` | yellow, maroon text | tint-yellow, ink. *New*, highlights |
| `green` | green-deep, white | tint-green, success. *Connected*, *Paid* |
| `red` | red-deep, white | tint-red, danger. *Failed*, *Overdue* |
| `orange` | orange, maroon text | tint-orange, ink. *Beta*, *Pending* |
| `maroon` | maroon, white | surface-sunk, ink. *Archived* |
| `neutral` (default) | surface-sunk with a 2px line | — |

#### You provide

`children` (the words), `tone`, and `soft` for state tags.

#### Do and don't

- Do let a row of solid tags use different tones, in plume-bar order (maroon, red, orange, yellow, green), as the site hero does.
- Do write the state as a word. Color confirms it; it never carries it alone.
- Don't make a tag a button. Use a `ghost` Button at `sm` for filters.
- Don't put a solid yellow tag on a yellow Band, or a maroon tag on the Night band.

### PlumeBar

The five feathers in a row: maroon, red, orange, yellow, green, in the order they appear in the logogram. The signature divider of every Cendra product.

#### Where it goes

- Across the very top of the app shell or site header (8px), or at the seam between a Band and the page (8px).
- Along the top edge of a dialog, an email, a printed invoice or an OG image (6px, `thin`).
- At most **once per screen**. A second bar is decoration; the first one is a signature.

#### You provide

Nothing but a full-width container. `thin` sets 6px instead of 8px.

#### Don't

- Don't reorder, recolor, round or animate the stripes.
- Don't use it as a progress bar or a chart legend; the colors here do not mean status.

### Card

A bordered container for one thing you can open or act on: a product, a service, an integration, a record.

#### Shapes

- `rounded` (default): `radius-lg` on all four corners. Every card in a grid.
- `plume`: two rounded corners (`radius-plume`) and two sharp ones (`radius-quill`), like a feather. Use it for **the one featured card** in a group, a hero media frame, or an empty state. Never for a whole grid.

#### Tone

`tone` (maroon, red, orange, yellow, green) gives a card a 3px outline in that plume color, and `icon` adds an oversized watermark icon in the paired color at 30%, cropped off the bottom-right corner. Use a toned card when the card stands for one thing with an identity (a service line, an integration, a product). Leave the rest on the neutral `line` border.

#### Anatomy

An optional color tile (`media` + `mediaTone`: maroon, red, green, yellow, orange) holding an illustration or the logogram, then `eyebrow`, `title`, body (`children`) and an optional `footer` of buttons. The tile takes the product's own plume color, as on cendra.co: AppGrout maroon, Morro orange, Lyvia red, Sloppeh yellow, TractionCue green.

#### You provide

- `title`, `children` (one or two sentences), and optionally `eyebrow`, `media`, `mediaTone`, `footer`, `tone`, `icon`.
- `href` makes the whole card a link that lifts 4px and draws its border in `line-strong` on hover. Then put no other links or buttons inside.
- The grid: cards don't set their own width. Use `space-5` gaps.

#### Don't

- Don't add shadows to cards on the page. Separation is the 2px `line` border; `shadow-overlay` is for things that float.
- Don't use colored left borders or accent rails. A toned card is outlined on all four sides.
- Don't fill a card with a plume color. The media tile is the one exception: it frames an illustration, as the product tiles on cendra.co do.
- Don't nest cards.

### Stat

A key number in a large outlined box: the plume color is the outline and the small filled label, and an oversized icon in the paired color sits behind it as a watermark.

#### Anatomy

- Outline: `stroke-accent` (3px) in the tone's edge color. Background stays `surface`.
- Label: a filled `Tag` in the tone. The only filled color in the box.
- Value: Google Sans 44px, `ink`, tabular figures. With `alert`, `danger`.
- Meta: one line of context in `ink-soft`: the comparison, the target or the source.
- Watermark: a 136px icon cropped off the bottom-right corner, in the paired plume color at `opacity-watermark` (30%).

#### Tone pairs

| tone | outline | watermark |
| --- | --- | --- |
| `maroon` | maroon-edge | red |
| `red` | red | orange |
| `orange` | orange | maroon-edge |
| `yellow` | yellow | green |
| `green` | green | yellow |

#### You provide

`tone`, `label`, `value` (formatted: `1.284`, `Rp 48,2 jt`, `2m 40s`), optional `meta`, `icon` (a name from `Icon`), `alert` for a number that needs action, and `shape="plume"` for the one featured stat in a row.

#### Do and don't

- Do give each stat in a row its own tone, in plume-bar order where you can.
- Do use `alert` with the red tone for counts of failures; the word in the label carries the meaning too.
- Don't fill the box with color. Large boxes are outlined; fills are for small things.
- Don't put more than one sentence in `meta`.

### Band

A wide hero box with the logogram supergraphic bleeding off its right edge. Outlined by default: a 3px plume-colored border on the surface, with the bird as a 30% watermark in the paired color. `filled` turns it into the brand guide's full-color field for marketing moments.

#### Tones

The three pairings from the brand guide:

| tone | outlined (default) | filled |
| --- | --- | --- |
| `night` | maroon-edge outline, red watermark | maroon ground, red supergraphic, white text |
| `sunrise` | red outline, orange watermark | red ground, yellow supergraphic, white **display text only** |
| `forest` | green outline, yellow watermark | green ground, yellow supergraphic, white **display text only** |

Use the outlined Band inside products and page layouts: dashboard heroes, empty states, onboarding. Use `filled` only for full-bleed marketing sections (a campaign header, a closing CTA on cendra.co) where the band runs edge to edge.

#### Inside a band

- Headline in `display-xl`, `display` or `headline`. Highlight one word with `<span class="cx-highlight">`: a small yellow fill behind the word. On a filled Night band, color the word `yellow` instead.
- Text is `ink` on outlined bands; ink stays readable over the 30% watermark.
- Buttons work as on any surface. On a filled band they recolor themselves: `primary` turns white, `secondary` draws in white, `plume` keeps its yellow.

#### You provide

`tone`, `filled` (optional), `children` (stacked with `space-5` gaps, left-aligned, max 600px wide), and optional `as` (defaults to `section`). Give the band an accessible heading inside.

#### Don't

- Don't fill a band that sits inside a layout with other boxes; that is the outlined band's job.
- Don't stack two bands of the same tone.
- Don't recolor the supergraphic outside these pairings.

### TextField

A labeled text input or textarea with an optional hint and an inline error.

#### Anatomy

Label (`label` style, ink) above a 48px control with a 2px `line-control` border and `radius-sm` corners. Hint below in `ink-soft`. On error the border turns `danger` and a bold message with an icon appears above the hint.

#### You provide

- `id` (required: it wires the label, hint and error for screen readers) and `label`.
- `hint`, `error` (a sentence saying how to fix it), `optional` (true, or your own word such as *Opsional*).
- `multiline` for a textarea. Every other prop goes to the native input (`value`, `onChange`, `type`, `inputMode`, `autoComplete`).

#### Do and don't

- Do write errors as instructions: *Enter the full number, starting with 62 or 08.* Not *Invalid input*.
- Do use real placeholder examples from the customer's world (a PT name, a WhatsApp number), never the label repeated.
- Don't hide the label in the placeholder.
- Don't mark required fields with asterisks; mark the optional ones.

### Notice

An inline message about the state of something: a sync, a payment, a form. Icon and title carry the meaning; the tint only confirms it.

#### Tones

`success` (tint-green), `warning` (tint-yellow), `danger` (tint-red), `info` (surface-sunk with a line border). Text is always `ink`; only the icon takes the status color.

#### You provide

- `tone`, `title` (what happened, in a few words), `children` (what it means or what to do next).
- `action`: an optional `sm` Button, usually `secondary`.
- Placement: at the top of the region it is about, full width of that region.

#### Do and don't

- Do name the thing and the number: *12 orders failed to sync*, not *Something went wrong*.
- Do say how to fix it in the body.
- Don't use a Notice for confirmation of an action the person just took when nothing else changed on screen; update the screen instead.
- Don't stack more than two Notices; summarize.

### Tabs

A pill track that switches between views of the same thing; the selected tab takes the plume wash (`selected` with `on-selected` text), never the `action` fill, so it reads as "you are here" rather than as a button. Counts inside a tab are feather badges.

#### You provide

- `items`: `[{ id, label, count? }]`. Two to five items, labels of one or two words.
- `value` + `onChange` to control it, or `defaultValue` to let it manage itself.
- `aria-label` naming what the tabs switch, and `panelIds` (`{ [id]: panelElementId }`) if you render `role="tabpanel"` regions.

Arrow keys, Home and End move between tabs.

#### Do and don't

- Do use `count` for things a person should act on (errors, unread), in tabular figures.
- Don't use Tabs for navigation between unrelated pages; that is the app's nav.
- Don't put more than five items in the track; on phones it scrolls sideways inside itself.

### Icon

The stand-in icon set: 2px rounded strokes on a 24px grid, drawn in `currentColor`.

Names: `orders`, `payments`, `clock`, `sync`, `chat`, `plug`, `package`, `chart`, `info`, `success`, `warning`, `danger`.

#### You provide

`name`, `size` in px (default 20), `title` when the icon stands alone and carries meaning (otherwise it is hidden from screen readers), and a color through CSS `color`.

#### Where it goes

- 20px next to text in `ink` or a status color.
- 136px as the watermark of a large outlined box (`Stat`, `Card` with `icon`), in the tone's paired color at `opacity-watermark`. The component places it; you only name it.

#### Don't

- Don't fill icons or change their stroke width.
- Don't use emoji in their place.

### Logogram

The Cendra bird as a single-ink inline SVG that takes its color from CSS `color`. For the full-color gradient logo and the wordmark, use the files in the Logos asset group.

#### Approved ink and ground pairs

From the brand guide's color flexibility page: white on maroon, maroon on white, green on yellow, red on white, yellow on red. Yellow on maroon appears in the supergraphic examples.

#### You provide

`size` in px (default 32), `title` when it stands alone as the logo (otherwise it is hidden from screen readers), and a `color` from the tokens.

#### Don't

- Don't redraw, rotate, outline or add effects to the mark.
- Don't set it below 16px; use the favicon files instead.
- Don't use colors outside the palette or pairs that are not listed above.
