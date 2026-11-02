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
- Surfaces: cards, panels, stats and bands sit on `surface` in both themes and are drawn by their outline alone. Never give a large box a lighter grey fill on Night: grey on near-black with a faint edge reads as frosted glass. `surface-raised` is only for small lifts, like a hovered tab.
- Selected: the active tab and nav item take `selected` (a pale plume wash) with `on-selected` text: maroon on Day, yellow on Night. The current page in Pagination and a FilterChip that is on take it too. The `action` fill means "press this"; `selected` means "you are here". Never use one for the other. Checked rows in a table are a selection, not a place: they take `surface-sunk` with a 3px `action` bar at the leading edge, so soft yellow tags inside them stay visible.
- Elevation: no shadows on things that sit on the page. Things that float (menus, dialogs, sheets, toasts) sit on `surface` like everything else, with a 2px `line` border and `shadow-overlay`; that shadow is what lifts them, never a grey fill or a blur. Tooltips are the exception: small labels, so they are filled in `ink`. Buttons are flat: no ledges, no drop shadows.
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
- Below laptop, the app's side nav becomes a top bar whose menu button opens the same nav in a sheet; AppShell does this for you. Below tablet, bands and heroes switch to their phone layout.
- Inside a component, respond to the space it has (container queries), not the screen: a Stat in a narrow column shrinks its number on its own.
- Keep reading text under about 70 characters a line (680px at body size), even on wide screens.

### Density

One density for every product, merchant-facing or admin. There is no compact mode: data-heavy screens get room by showing less at once, not by shrinking controls.

| Size | Height | For |
| --- | --- | --- |
| `size-control` | 44px | Buttons, nav items, tabs: the default for anything you press |
| `size-control-sm` | 36px | Small buttons, with a pointer only. They grow to 44px on touch screens |
| `size-control-lg` | 56px | Large buttons in heroes and bands |
| `size-field` | 48px | Text fields and selects |

Table rows are at least 48px tall; list rows in nav and menus are 44px.

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
- Buttons, tabs and nav items change color, never shape or size. No bounce or overshoot, no parallax, no looping animation. The one exception is a Progress bar with no known value: its segment sweeps across at an even (linear) speed while work runs, and it stops under reduced motion. Skeletons stay still.
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
| Loading | Working on it | The label changes to the action in progress ("Syncing…") and the control stops taking presses (`aria-busy`). Longer work gets a Progress bar with words; content on its way gets still Skeleton blocks. No spinner on its own; say what's happening. |
| Error | Something needs fixing | A `danger` border on the field and the message under it, in `danger`, written as an instruction. Never color alone: the message and an icon carry it. |

## Data visualization

Charts use the plumage in a fixed order, tuned so every pair of series stays apart under protanopia, deuteranopia and tritanopia (CIEDE2000 13 or more between any two on Day, 11.9 or more on Night, with Machado 2009 simulation). The shades differ by theme; the order and hues don't, so a series keeps its color when the theme changes.

| Series | Token | Day | Night |
| --- | --- | --- | --- |
| 1 | `chart-1` | maroon #52050a | maroon-edge #b8434a |
| 2 | `chart-2` | green-deep #00733c | bright green #3ccf86 |
| 3 | `chart-3` | deep orange #d4741a | orange #e8862a |
| 4 | `chart-4` | yellow #fdc41e | yellow #fdc41e |
| Rest | `chart-other` | grey (`line-control`) | grey (`line-control`) |

- Assign series in order: a chart with two series uses `chart-1` and `chart-2`, never 1 and 4. Keep the same series on the same color across a screen.
- Four colors at most. Group everything past the fourth into "Other" in `chart-other`. To spotlight one series, draw it in `chart-1` and the rest in `chart-other`.
- Red is never a series color. It is kept for failures and errors, so a red bar always means something went wrong.
- Separate stacked segments and adjacent bars with a 2px gap in the surface color, so neighbors never rely on color alone to part.
- Every chart has a legend in series order, and its numbers are available as text: a total on each bar, a tooltip, or a table beside it. Yellow and orange sit below 3:1 on Day surfaces, which is acceptable only because of this.
- Gridlines are dashed `line`; axis labels are `caption` in `ink-soft` with tabular figures. No 3D, no gradients, no shadows, no pie charts past three slices.

## Iconography

Cendra's icons are Lucide (lucide.dev, ISC license): 2px rounded strokes on a 24px grid, rounded caps and joins, no fills. They match the 2px line the rest of the system draws with. A custom set drawn from the plume curves can replace them later on the same grid, without changing a single name.

- Use the `Icon` component and Cendra's names (`orders`, `payments`, `sync`), not Lucide's. A name says what the icon means here, so the drawing behind it can change.
- Sizes: 16px inside small buttons and inline errors, 20px next to text (the default), 24px alone as an icon button, 136px as a watermark. Nothing in between.
- Color: `ink`, `ink-soft`, or the status color of what it sits next to. Never a plume color on its own small icon, except as a watermark.
- An icon never carries meaning alone. Next to text it is decorative; standing alone (an icon-only button) it gets a `title` or the button gets an `aria-label`.
- Need one that isn't in the set? Add the Lucide icon to `scripts/build-icons.mjs` under a Cendra name and run `npm run icons`. Don't draw your own, change the stroke width, or fill an outline.
- No emoji as icons.

## Imagery

Illustrations are flat and warm: faceless people with simple features, clothing in plume colors with soft gradients, and frosted glass panels. They sit on color tiles in cards or float on white. See the Illustrations assets. Product screenshots go on a plume-colored tile with `radius-md` corners. No stock photography.

## Logo

Use the files in the Logos group. Gradient (Main) on white is the default. On maroon use the White logo; on yellow, red or green use a flat single-ink version from the color flexibility page (green on yellow, yellow on red, white on green). Give the logo generous clear space; nothing touches it. Never stretch, recolor outside these pairs, add effects or place the gradient logo on a busy image.


## Accessibility

Every Cendra product meets WCAG 2.2 level AA. This is the floor, not the goal.

- **Contrast:** body text 4.5:1 or more against its background, large text and the boundaries of controls 3:1 or more. Every pairing in the color tables states its ratio; use the approved pairings and you are covered. Disabled controls are exempt, which is why `ink-disabled` must never carry anything a person needs to read.
- **Never color alone:** status pairs color with an icon and words, charts with a legend and numbers, errors with a message. A screen in greyscale must still make sense.
- **Targets:** anything clickable is at least 24px (`size-target`) with a pointer and 44px (`size-touch`) on touch screens. Components already meet this; custom controls must too.
- **Keyboard:** everything works without a mouse, in reading order. Focus is always visible (the `focus` ring) and never trapped, except inside an open dialog. Tabs move with arrow keys, Home and End.
- **Screen readers:** use real elements first (`button`, `a`, `nav`, `table`). Icons next to text are hidden; icon-only buttons are named. Live changes (a sync finishing, an error) are announced with a polite live region.
- **Motion:** respect `prefers-reduced-motion`; nothing essential is animated. **Zoom:** layouts work at 200% zoom and 320px width without sideways scrolling.
- **Check it:** run axe on every screen, tab through every flow once, and read new screens with VoiceOver or TalkBack before shipping.

## Language and locale

Indonesian first. Most Cendra customers work in Bahasa Indonesia, so every screen is designed in Indonesian and translated to English, not the other way round.

- **Numbers:** Indonesian contexts use a dot for thousands and a comma for decimals (`1.284`, `48,2`); English contexts use `1,284` and `48.2`. Format with `Intl.NumberFormat`, never by hand.
- **Money:** `Rp 1.250.000`, with a space after Rp and no decimals. Shorten large amounts only in tight spaces: `Rp 48,2 jt` (juta) and `Rp 1,2 M` (miliar). English contexts write `IDR` amounts the same way, or `$300` for dollars.
- **Dates and times:** `12 Nov 2026` and `09:42 WIB` (24-hour). Name the time zone (WIB, WITA, WIT) whenever times cross teams. Weeks start on Monday.
- **Length:** Indonesian runs about 20 to 30% longer than English. Buttons and tabs grow with their label, labels wrap instead of truncating, and nothing has a fixed width sized for English.
- **Terms:** keep product and platform names as their owners write them (Shopee, Tokopedia, Accurate, Xendit, WhatsApp). Use the Indonesian terms merchants use (*faktur*, *stok*, *pesanan*), not literal translations of English UI words.

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
| `surface-raised` | `white` | `#1c1c1c` | Small lifts: a hovered tab. Cards, panels and overlays stay on surface and are drawn by their outline, in both themes. |
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
| `chart-1` | `maroon` | `#b8434a` | First chart series, and the only color of a single-series chart. Maroon; lifts to maroon-edge on Night. |
| `chart-2` | `green-deep` | `#3ccf86` | Second series. Green, deepened on Day and brightened on Night so it never meets maroon under red-green color blindness. |
| `chart-3` | `#d4741a` | `orange` | Third series. Orange, deepened on Day to 3.3:1 on white. |
| `chart-4` | `yellow` | `yellow` | Fourth and last series. Yellow. Below 3:1 on Day surfaces, so never alone and always with its numbers in text. |
| `chart-other` | `line-control` | `line-control` | Every series past the fourth, grouped as Other, and the rest of the data when one series is highlighted. |
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

### Spacing, layout, size, radius, shape, stroke, opacity, motion, elevation

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
| `size-control-sm` | 36px | Small buttons, with a pointer only. Grows to size-touch on touch screens. |
| `size-control` | 44px | Buttons, nav items and tabs: the default height of anything you press. |
| `size-control-lg` | 56px | Large buttons in heroes and bands. |
| `size-field` | 48px | Text fields and selects. |
| `size-target` | 24px | Smallest hit area of anything clickable with a pointer (WCAG 2.2 target size). |
| `size-touch` | 44px | Smallest hit area of anything tappable on a touch screen. |
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
| `shadow-overlay` | Day and Night pair | Things that float only: menus, dialogs, sheets and toasts. Cards on the page use borders, not shadows. |
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

- `label`. An `id` is generated if you don't pass one; the label, hint and error are wired to the control for screen readers either way.
- `hint`, `error` (a sentence saying how to fix it), `optional` (true, or your own word such as *Opsional*), `hideLabel` where the purpose is obvious without it.
- `multiline` for a textarea. Every other prop goes to the native input (`value`, `onChange`, `type`, `inputMode`, `autoComplete`).

#### Do and don't

- Do write errors as instructions: *Enter the full number, starting with 62 or 08.* Not *Invalid input*.
- Do use real placeholder examples from the customer's world (a PT name, a WhatsApp number), never the label repeated.
- Don't hide the label in the placeholder.
- Don't mark required fields with asterisks; mark the optional ones.

### Select

A native select dressed as a field: one choice from a list of seven or more, or from a list whose labels are long. Phones get the platform's own picker; keyboards get type-to-jump for free.

#### Anatomy

The same label, 48px control, hint and error as TextField, with a 20px `chevron-down` in `ink-soft` at the end. Disabled takes the sunk fill and `ink-disabled`, like every control.

#### You provide

- `label` and `options`: `[{ value, label, disabled? }]`.
- `placeholder` for a first, empty choice that names what to pick (*Choose a warehouse*). With `required`, it can't be picked back.
- `hint`, `error`, `optional`, `hideLabel`, and any native select prop (`value`, `onChange`, `name`, `required`).

#### Do and don't

- Do use RadioGroup instead when there are six options or fewer and they fit on screen: people can compare them without opening anything.
- Don't use Select for yes or no; that's a Checkbox or a Switch.
- Don't put actions in a select (*Delete…*). Options are values, never commands.

### SearchField

A text field for finding things on the current screen: a search icon at the start and a clear button once there is something to clear.

#### Anatomy

A 48px field with a 20px `search` icon in `ink-soft` and, when it has a value, a 32px round clear button (`close`) at the end. The button takes the neutral hover and pressed washes, and grows to 44px on touch screens.

#### You provide

- `label`, usually with `hideLabel`: the icon and placeholder make the purpose plain, but screen readers still need the name.
- `placeholder` saying what can be searched: *Search by order ID or buyer*.
- `value` and `onChange` to control it, or `defaultValue`; `onClear` when the clear button empties it; `clearLabel` to translate *Clear search*.

#### Do and don't

- Do filter as people type when results are local; search on Enter when it calls a server, and say so in the hint.
- Don't hide the field behind an icon button on desktop; show the field.

### Checkbox

A choice that is on or off and takes effect when the form is submitted. Group related checkboxes in a ChoiceGroup.

#### Anatomy

A 20px box with `radius-quill` corners and a 2px `line-control` border, then the label in `body` and an optional hint in `ink-soft` below it. Checked fills the box with `action` and draws the check in `on-action`; indeterminate draws a bar. The whole row is the hit area: at least 24px tall with a pointer, 44px on touch screens.

#### You provide

- `label`, and optionally `hint`.
- `checked` and `onChange`, or `defaultChecked`; `indeterminate` when it stands for a set that is partly checked; any native input prop (`name`, `value`, `disabled`, `required`).

#### ChoiceGroup

Wraps related checkboxes (or switches) in a fieldset. Its `legend` asks the question (*Sync these to Accurate*); `hint` and `error` work like a field's. With `error`, unchecked boxes take a `danger` border. `inline` lays short options side by side.

#### Do and don't

- Do phrase labels positively: *Send a daily summary*, not *Don't send a daily summary*.
- Do use a single checkbox for consent and confirmations (*I can read and write payments on this account*).
- Don't use a checkbox for a setting that applies at once; that's a Switch.

### RadioGroup

One choice out of two to six, all visible at once. Arrow keys move between options and choose them.

#### Anatomy

A fieldset: the `legend` in the `label` style, an optional hint, then one row per option. Each radio is a 20px circle with a 2px `line-control` border; the chosen one draws its border and a 10px dot in `action`. Rows are spaced like checkboxes and share their hit area.

#### You provide

- `legend` and `options`: `[{ value, label, hint?, disabled? }]`.
- `value` and `onChange`, or `defaultValue`. A `name` is generated if you don't pass one.
- `hint`, `error`, `inline` for two or three short options side by side, `required`, `disabled`.

#### Do and don't

- Do choose a sensible default when one exists, and put it first.
- Do use Select instead past six options.
- Don't use two radios for on and off; that's a Checkbox or a Switch.

### Switch

A setting that takes effect the moment it flips: notifications, auto-sync, a feature on or off.

#### Anatomy

A 40 × 24px pill track with a 2px `line-control` border and a 14px knob. Off: `surface-sunk` track and an `ink-soft` knob on the left. On: the track fills with `action` and the knob slides right in `on-action`, over `duration-base`. The label sits to the right, with an optional hint.

#### You provide

- `label`, and optionally `hint`.
- `checked` and `onChange`, or `defaultChecked`; any native input prop. It is announced as a switch, not a checkbox.

#### Do and don't

- Do save the change at once and confirm it if it can fail: a toast or an inline message.
- Don't put a switch in a form with a submit button; use a Checkbox there.
- Don't label a switch with its state (*On*, *Enabled*). Name the setting; the switch shows the state.

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

### Dialog

A modal box in the middle of the screen, for a short task or a decision that has to be made before going on: rename something, confirm a disconnect. Built on the native `<dialog>`, so focus stays inside while it is open, Escape closes it, and focus goes back to the button that opened it.

#### Anatomy

`surface` with a 2px `line` border, `radius-lg` and `shadow-overlay`, on the `scrim`. A title in the title style with a round close button beside it, an optional description in `ink-soft`, the body, and the actions bottom right. It opens over `duration-slow`, rising 8px, and leaves over `duration-fast`. On phones the actions stretch to share the width.

#### You provide

- `open` and `onClose`. `onClose` runs on Escape, the close button and a click on the scrim.
- `title`: the question or the task, in a few words. `description`: one or two sentences, read out when it opens.
- `actions`: the buttons, with the main one last. `size`: `sm` (400px) for confirmations, `md` (560px, the default), `lg` (720px).
- `alert` for a confirmation that needs an answer. It becomes an `alertdialog`, and a click on the scrim no longer closes it.
- `data-autofocus` on the control that should take focus first. On a destructive confirmation, that is the safe choice.
- `closeLabel` to translate "Close".

#### Do and don't

- Do name the action on the button: *Disconnect*, not *OK*. The safe choice says what it keeps: *Keep connected*.
- Do keep it to one task. If it needs scrolling or more than a few fields, use a Sheet or a page.
- Don't open a dialog from a dialog.
- Don't use a dialog to report that something worked; use a Toast.

### Sheet

A modal panel from the edge of the screen, for work that needs more room than a dialog but keeps the page in view behind it: filters, a record's details, a mapping's settings.

#### Anatomy

The same parts as Dialog. `side="end"` is a full-height panel up to 480px wide, coming in from the right with its two inner corners rounded; `side="start"` is the same from the left, for navigation. `side="bottom"` rises from the bottom edge, up to 90% of the screen height. On phones every sheet is a bottom sheet. The body scrolls; the actions stay pinned under a 2px `line`.

#### You provide

- `open`, `onClose`, `title`, `children`, `actions` and `closeLabel`, as for Dialog.
- `side`: `end` (the default), `start` or `bottom`.

#### Do and don't

- Do put the action that applies the sheet last and say what it does: *Show 128 orders*.
- Don't use a sheet for navigation, except the app's own nav below laptop width, which AppShell puts in a `start` sheet.
- Don't stack a sheet on a sheet.

### Menu

A list of actions that opens from a button: export options, the actions on a row behind a *more* button. Built on the native popover, so it sits above everything and closes on Escape or a click outside.

#### Anatomy

`surface` with a 2px `line` border, `radius-md` and `shadow-overlay`, 200 to 320px wide, 6px under its button. It flips above when there is no room below. Rows are 44px pills with an optional 20px icon. They take the `fill-hover` wash on hover and keyboard focus, and the focus ring inside the pill. Destructive rows are in `danger`, after a 2px `line` separator. Disabled rows are in `ink-disabled` and stay in the list.

#### You provide

- `trigger`: a function that gets the props the button needs and returns it, usually a Button: `trigger={(p) => <Button {...p}>Export</Button>}`.
- `items`: `[{ id, label, icon?, danger?, disabled?, onSelect }]`, with `{ separator: true }` between groups.
- `aria-label` naming the menu. `align="end"` lines the menu up with the button's right edge, for buttons on the right of a row.

Enter, Space, Arrow Down or Arrow Up opens it. Arrow keys, Home and End move between rows. Escape and Tab close it, and focus goes back to the button.

#### Do and don't

- Do start each label with a verb: *Download CSV*, *Duplicate*, *Delete mapping*.
- Do give an icon-only trigger an `aria-label` and a Tooltip.
- Don't put more than about eight rows in a menu, or nest menus.
- Don't use a Menu to pick a value in a form; that is a Select.

### Tooltip

A short label that appears on hover and keyboard focus. Mostly it names an icon-only button. It is a label, not a button, so it is filled (`ink` with `surface` text, which flips on Night) and takes the feather tip. The tip is the corner that points at the trigger.

#### Anatomy

13px label style, padding 6 × 12px, up to 240px wide. It sits 6px above the trigger, starting at its middle, and flips below or to the other side when there is no room. The sharp corner always faces the trigger. It appears after 400ms on hover and at once on keyboard focus, fading in over `duration-fast`. Escape hides it without moving focus, and the pointer can move onto it without it going away.

#### You provide

- `content`: plain text, a few words.
- `children`: a function that gets the props the trigger needs: `{(p) => <Button {...p}>…</Button>}`.
- `kind="label"` when the tooltip is the trigger's name (icon-only buttons); the default `description` adds detail to a trigger that already has a name.

#### Do and don't

- Do put a tooltip on every icon-only button.
- Don't put anything a person needs only in a tooltip. Touch screens never show them.
- Don't put links or buttons in a tooltip, or put a tooltip on something that can't take focus, like a tag or plain text.

### Toast

A short message about something that just happened in the background, or an action that can be undone: *1.284 orders synced*, *Mapping archived · Undo*. It is a floating Notice that goes away by itself.

#### Anatomy

`surface` with a 2px `line` border, `radius-md` and `shadow-overlay`, up to 400px wide. Toasts stack bottom right on laptops (32px in) and bottom center on phones, three at most, newest at the bottom. The icon takes the status color, as in Notice, and the text stays `ink`. There is an optional `sm` secondary action and a round close button. Toasts rise 8px as they come in. The region is a polite live region, so toasts are read out; danger toasts are announced at once.

#### You provide

- A `ToastProvider` around the app. `useToast()` returns the function that shows one.
- `toast({ tone, title, body?, action?, duration? })`. `tone` is `info`, `success`, `warning` or `danger`. `action` is `{ label, onClick }`.
- Timing: six seconds by default, ten with an action. Danger toasts stay until closed. The countdown pauses while the pointer or focus is on the toasts.
- `label` and `closeLabel` on the provider to translate "Notifications" and "Dismiss".

#### Do and don't

- Do lead with the thing and the number, as in Notice.
- Do offer Undo instead of asking for confirmation, when the action can be undone.
- Don't make the toast's action the only way to do something; it disappears.
- Don't toast errors that block work on the current screen; put a Notice or a field error where the problem is.
- Don't show a toast while a dialog is open. Close the dialog first; the toast confirms what it did.

### Table

Rows of records: orders, sync runs, failed items. A real `<table>` on hairlines inside an outlined box, with sortable headers and optional checkboxes.

#### Anatomy

A 2px `line` box with `radius-lg`. Header cells are in the label style, `ink-soft`, over a 2px `line`; body rows are 48px, `body-sm`, split by 1px `line` hairlines. Numbers and amounts align right in tabular figures. A sortable header is a pill button with a sort mark: two chevrons in `ink-soft` until it is sorted, then an arrow in `ink`, with `aria-sort` on the header. Rows take the `fill-hover` wash on hover. Checked rows take `surface-sunk` and a 3px `action` bar at their leading edge. Cells stay on one line, so a table wider than its column scrolls sideways inside its box and takes keyboard focus while it does.

#### You provide

- `caption`, always: it names the table for screen readers. `hideCaption` when a heading above already says it.
- `columns`: `[{ key, header, cell?, numeric?, sort?, width?, wrap? }]`. `cell` renders the content (default `row[key]`); `sort: true` compares `row[key]`, or pass a compare function; `wrap` lets long text break onto more lines.
- `rows` and `rowKey`. The first column is the row's header: put the record's name or ID there.
- Sorting: `defaultSort`, or `sort` with `onSortChange`. Pass `manualSort` when the rows arrive already sorted, as they do from a server.
- Selection: `selectable`, with `selected` and `onSelectionChange` or `defaultSelected`, and `selectLabel` to name each row's checkbox (*Select INV-2026-01282*). The header checkbox selects the rows shown.
- `empty`: what to say when there are no rows, ideally what to do about it.

#### Do and don't

- Do put status in a soft Tag, never in color alone.
- Do format amounts and dates for the locale: `Rp 1.318.000`, `09:41 WIB`.
- Do sort, filter and page the whole list on the server, then pass the page with `manualSort`.
- Don't put more than one or two actions in a row; use a row Menu behind a *more* button.
- Don't zebra-stripe. The hairlines separate rows.

### Pagination

Which rows are showing and buttons to move between pages, under a Table.

#### Anatomy

The range on the left in `body-sm` `ink-soft`, like *151–175 of 1.284*, read out when it changes. On the right, 36px pill buttons: previous, the first and last pages, the current page with a neighbor each side, and an ellipsis for the gaps. The current page takes the plume wash (`selected`, `on-selected`) with `aria-current="page"`. Previous and next are disabled at the ends. On phones only the range and the arrows show; on touch screens the buttons grow to 44px. With nothing to page, it renders nothing.

#### You provide

- `page` (from 1), `pageSize`, `total` and `onPageChange`.
- `locale` for the numbers (default `id-ID`), `rangeText` to translate the range, and `label`, `previousLabel`, `nextLabel` and `pageLabel` for the buttons.

#### Do and don't

- Do keep the page size the same across a product: 25 rows is the default.
- Do move focus or scroll back to the top of the table when the page changes.
- Don't use pagination for fewer than two pages of rows, or for a feed that grows; load more instead.

### FilterChip

A filter you turn on and off: a status, a channel. It is a pill, because you press it.

#### Anatomy

36px, a 2px `line-control` border and label text. On, it takes the plume wash with an `on-selected` border and a check before the label. An optional count sits in a feather badge. It is a toggle button (`aria-pressed`). It grows to 44px on touch screens.

#### You provide

- `pressed` and `onPressedChange`, `children` (one or two words) and optionally `count`.

#### Do and don't

- Do use chips for a handful of values people switch often; put the rest in a Select or a filter Sheet.
- Don't use a chip as a tag: tags are labels and have the feather tip. Chips are buttons.

### FilterBar

The row of filters above a Table: search, chips, a select or a button that opens a filter Sheet. It also shows what they match, and a way to clear them.

#### Anatomy

The controls on the left, wrapping when there is no room. On the right, the result in `body-sm` `ink-soft` (*6 orders · 2 selected*), announced politely when it changes, and a ghost *Clear filters* button while any filter is on.

#### You provide

- `children`: the controls. A SearchField in the bar can hide its label.
- `result`, `active` and `onClear`, and `label` (default "Filters") and `clearLabel` to translate.

#### Do and don't

- Do go back to page 1 when a filter changes.
- Do say the count with the noun: *6 orders*, not *6 results*.
- Don't hide the bar when nothing matches; the Table's empty message and Clear filters get people back.

### AppShell

The frame of a Cendra app: the plume bar, the navigation and the page. From laptop width (1024px), a 264px side column holds the logo, what you put above the nav (usually the workspace), the SideNav, and what you put at its foot (help, the account). Below laptop, a TopBar takes its place, and its menu button opens the same column in a sheet: from the left on tablets, from the bottom on phones.

#### Anatomy

The plume bar stays at the top as the page scrolls. The side column sits under it, the full height of the screen, scrolling on its own when its content is taller, and drawn by a 2px `line` on its right. A *Skip to content* link appears on the first Tab and jumps to the page. Choosing a page in the menu sheet closes it.

#### You provide

- `logo`: the logo, as a link home. It shows in the column and in the top bar.
- `nav`: the SideNav items, flat or in sections. `linkAs` for your router's link component.
- `sideTop` and `sideBottom`: what goes above the nav and at the foot of the column.
- `actions`: one or two icon buttons at the end of the top bar below laptop width.
- `children`: the page. Its padding and width are yours: use `cx-container` and the grid.
- `plumeBar={false}` to leave out the plume bar; `menuLabel` and `skipLabel` to translate.

#### Do and don't

- Do keep the column for navigation and where you are; actions belong on the page.
- Don't put the page's main action in the top bar; it stays on the page, where it shows at every width.

### SideNav

The app's main navigation: a list of pages, each a 44px pill row with an icon. The current page takes the plume wash (`selected`, `on-selected`) and `aria-current="page"`, never the `action` fill. AppShell renders it; use it alone for a settings page with its own sections.

#### Anatomy

Rows are `ink-soft` in the button type at rest, take `fill-hover` on hover and `fill-pressed` while pressed, and draw the focus ring around the pill. A count sits at the end in a feather badge: neutral (`surface-sunk`) for things to look at, red (`red-deep`) with `alert` for failures. Sections can have an eyebrow heading.

#### You provide

- `items`: `[{ label, href, icon?, current?, badge?, alert? }]`, or sections `[{ heading?, items }]`.
- `aria-label` (default "Main") and `linkAs` for your router's link component.

#### Do and don't

- Do keep it to about seven pages; group the rest under a heading or move them into Settings.
- Do give every row an icon, or none of them.
- Don't use a badge for anything that isn't a count to act on.

### TopBar

The bar across the top of the app below laptop width: a menu button, the logo, and one or two actions. Sticky, on `surface`, drawn by a 2px `line` underneath, 64px tall. AppShell renders it.

#### You provide

- `logo`, and `onMenu` with `menuOpen` for the menu button (`menuLabel` to translate "Menu").
- `actions`: icon buttons, each with an `aria-label`.

#### Don't

- Don't put more than two actions in it. On a phone the logo needs the room.

### Breadcrumb

Where this page sits, as a trail of quiet links above its title: *Integrations › Tokopedia → Accurate › Field mapping*. The current page ends the trail as plain text with `aria-current="page"`.

#### Anatomy

`body-sm` links in `ink-soft`, underlined and in `ink` on hover, separated by a 16px chevron. On phones only the parent shows, as a back link with a left chevron, and grows to 44px on touch screens.

#### You provide

- `items`: `[{ label, href }]` from the top level down, ending with the current page (no `href`).
- `aria-label` (default "Breadcrumb") and `linkAs` for your router's link component.

#### Do and don't

- Do use it on pages two or more levels below the nav: a record, a mapping, a run.
- Don't use it on top-level pages; the SideNav already says where you are.
- Don't repeat the page title as a link; it ends the trail as text.

### Progress

How far along a sync, an import or an upload is: a label, the amount, and an 8px pill bar.

#### Anatomy

The label in the label style on the left, the amount in `body-sm` `ink-soft` on the right, and the bar under them: a `fill-pressed` track with the fill in `action` while working, `success` when done, `danger` when it stopped. The fill grows over `duration-slow`. With no value, a 40% segment sweeps across at an even speed, the one loop in Cendra. Under reduced motion it stands still, full width and hatched. It is a `progressbar` named by its label, with the amount as its value text.

#### You provide

- `label`: what is happening, in words. `hideLabel` only when the words are beside it anyway.
- `value` and `max` (default 100), or neither when nobody knows. `valueText` replaces the percentage: *214 of 1.120 orders*.
- `tone`: `action` (default), `success` or `danger`. `locale` for the percentage.

#### Do and don't

- Do count the real thing: *214 of 1.120 orders* says more than *19%*.
- Do say what happened when it stops, in the `valueText` and nearby: *Stopped at 41 of 120*.
- Don't show a bar for anything that takes under a second; change the button label instead.

### Skeleton

The shape of content on its way: lines of text, a chart, an avatar. Still blocks of `fill-pressed`, no shimmer.

#### Anatomy

`text` is 12px lines 10px apart, with a shorter last line; `block` is a `radius-md` box, 120px tall by default; `circle` is 40px. Every skeleton is hidden from screen readers.

#### You provide

- `shape`, `lines` for text, and `width` and `height` in any CSS length.
- On the region that is loading: `aria-busy="true"` and a visually hidden line that says what is loading.

#### Do and don't

- Do match the layout that is coming, so nothing jumps when it arrives.
- Do switch to a Progress bar or a message if loading takes more than a few seconds.
- Don't skeleton a whole page; skeleton the parts that are waiting.

### EmptyState

What a list, a table or a page shows when there is nothing in it yet, and how to fill it.

#### Anatomy

Plain, inside a panel or a Table: centered, with the icon in a 56px `fill-hover` circle, a title in the subtitle style, a sentence in `ink-soft` and up to two buttons. Toned, for an empty page: a large box, so outlined (3px in its plume color) with its icon as a watermark in the paired color at 30% (120px, or 200px once the box is 560px wide inside), left-aligned, the title in the title style.

#### You provide

- `title`: what is empty or what happened: *No failed records*, *Connect your first store*.
- `children`: why, and what to do next. `actions`: one or two buttons, the main one first.
- `icon`, `tone` (any plume) for the page version, and `as` for the heading level (default `h2`).

#### Do and don't

- Do turn an empty first run into the first step: *Connect a store*.
- Do say good news plainly: *No failed records* is a result, not an absence.
- Don't blame or joke. Say what to do.

### Banner

A message about the whole app or account, across the top of the page: planned maintenance, an expiring plan, a connection down everywhere. For a message about one region of the page, use Notice.

#### Anatomy

A full-width strip with square edges in the Notice tints (`info` on `surface-sunk` with a 2px `line` underneath). The icon takes the status color, and the text stays `ink`. A bold title runs into one sentence, then an optional action and a close button. On phones the action drops under the text. A danger banner is announced at once; the others politely.

#### You provide

- `tone`, `title` and `children` (one sentence: what, when, what it means).
- `action`: a link or a `sm` secondary button. `onDismiss` to show the close button, and `dismissLabel` to translate it.
- Placement: at the very top of the page content, above the page header. One at a time.

#### Do and don't

- Do give times with their zone: *22:00–23:00 WIB*.
- Do let people dismiss anything that isn't still true right now, and remember that they did.
- Don't use a banner for marketing.

### Icon

The Cendra icon set, drawn from Lucide: 2px rounded strokes on a 24px grid, in `currentColor`.

Names:
- Status: `info`, `success`, `warning`, `danger`.
- Commerce and sync: `orders`, `payments`, `receipt`, `package`, `truck`, `store`, `building`, `sync`, `plug`, `mapping`, `chart`, `clock`, `chat`.
- App: `overview`, `alerts`, `settings`, `user`, `mail`, `calendar`, `link`, `help`, `menu`, `logout`.
- Actions: `search`, `add`, `close`, `check`, `edit`, `copy`, `delete`, `download`, `upload`, `filter`, `external`, `show`, `hide`.
- Direction: `arrow-right`, `chevron-down`, `chevron-right`.

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
