# Cendra

Cendra's brand on Cendrawasih UI: cendra.co, AppGrout, Morro, Lyvia AI, Sloppeh, TractionCue, and the client apps we build under our own name. Built from the CENDRA Brand Design Guidelines and cendra.co. The cendrawasih wears its colors at full strength against a dark body; so do we.

The tokens are in `tokens/brands/cendra/`; products load them with `@cendra/ui/brands/cendra.css`. Everything not on this page is the system's: see [the design language](../design-language.md).

## Palette

The brand guide's five colors plus `orange` from the logo gradient. These names are private to the brand file: components and product code use the roles.

| Palette | Hex | Role |
| --- | --- | --- |
| maroon | #52050a | `primary`, `on-tertiary`, `on-spotlight` |
| maroon-deep | #3a0307 | `primary-hover`, `danger-fill-pressed` |
| maroon-pressed | #2a0205 | `primary-pressed` |
| red | #db3d3d | `secondary` |
| red-deep | #b82a2a | `secondary-strong`, Day `link` |
| orange | #e8862a | `tertiary` |
| yellow | #fdc41e | `spotlight` |
| yellow-light | #ffd34d | `spotlight-hover` |
| yellow-deep | #e8b010 | `spotlight-pressed` |
| green | #00924c | `accent` |
| green-deep | #00733c | `accent-strong`, Day `focus` |
| white | #ffffff | `on-primary`, `on-secondary`, `on-accent` |

What Cendra changes from the system defaults:

- `primary-edge` lifts to #b8434a on Night, so maroon outlines still show on near-black (3.5:1).
- Tints: secondary, spotlight and accent share the status tints (red, yellow, green washes); tertiary has its own orange wash. Primary keeps the grey default: maroon is an accent, never the room.
- Links are red-deep on Day and a light red (#ff8a7e) on Night.
- Destructive buttons darken into maroon on hover.
- `chart-3` deepens orange to #d4741a on Day (3.3:1 on white). The four chart colors are checked to CIEDE2000 13 or more apart on Day and 11.9 or more on Night under protanopia, deuteranopia and tritanopia (Machado 2009). Keep them that way if you touch them.

### Approved pairings

| Text or mark | Ground | Contrast | Use |
| --- | --- | --- | --- |
| ink | white surface | 18.9:1 | All text on Day |
| maroon | white | 15.2:1 | Brand words, the wordmark, big numbers that carry the brand |
| white | maroon | 15.2:1 | Heroes, the filled primary band, primary buttons |
| yellow | maroon | 9.5:1 | Highlighted headline word, logo, spotlight button on maroon |
| maroon | yellow | 9.5:1 | Spotlight button label, yellow tags |
| maroon | orange | 5.7:1 | Orange tags and tiles |
| white | red-deep | 6.2:1 | Danger buttons, red tags |
| white | green-deep | 6.0:1 | Green tags |
| white | red | 4.4:1 | **Display text only** (24px+, or bold 19px+) |
| white | green | 4.0:1 | **Display text only** |
| green | yellow | 2.5:1 | **Logo only** (from the brand guide), never text |
| yellow | red | 2.8:1 | **Logo and supergraphic only**, never text |

Never put text in yellow on white (1.6:1) or red at body size on white (4.4:1).

### Bands

The brand guide's three supergraphic pairings are filled Bands:

| Brand guide | Band | Filled |
| --- | --- | --- |
| Night | `tone="primary"` | maroon ground, red bird, white text |
| Sunrise | `tone="secondary"` | red ground, yellow bird, white **display text only** |
| Forest | `tone="accent"` | green ground, yellow bird, white **display text only** |

## Typography

**Google Sans** (display, variable 400 to 700) and **Karla** (text, 400 to 700), self-hosted in `src/fonts/`. Google Sans replaces the brand guide's Poppins: it keeps the round geometry with friendlier, more open letterforms at UI sizes.

## Voice

Direct, senior and warm. We talk like an engineer who has done this before, explaining it to a business owner. Short sentences, concrete nouns, no hype. *We* is Cendra. Name the tools our customers use: *Xendit, Accurate, Shopee, WhatsApp*. Product names keep their own casing: AppGrout, TractionCue, Lyvia AI.

Examples from cendra.co:

> Your systems, finally **talking** to each other.

> We connect your ERP, CRM, payments and internal tools so data flows without manual work.

> Built with Lovable, Bolt, Cursor or Replit? Our audit service, AppGrout, reviews the code and tells you exactly what to fix before launch.

## Products

Each Cendra product has a tile tone for its Card media and avatar: AppGrout `primary`, Morro `tertiary`, Lyvia `secondary`, Sloppeh `spotlight`, TractionCue `accent`.

## Imagery

Illustrations are flat and warm: faceless people with simple features, clothing in the palette's colors with soft gradients, and frosted glass panels. They sit on color tiles in cards or float on white. See `assets/illustrations/`. Product screenshots go on a brand-colored tile with `radius-md` corners. No stock photography.

## Logo

Use the files in `assets/logos/`. Gradient (Main) on white is the default. On maroon use the White logo; on yellow, red or green use a flat single-ink version from the color flexibility page (green on yellow, yellow on red, white on green). Give the logo generous clear space; nothing touches it. Never stretch, recolor outside these pairs, add effects or place the gradient logo on a busy image.

The bird alone is the brand mark (`--brand-mark`, from `cendra-black-logogram.svg`), which the Band and `BrandMark` draw. The `Logogram` component draws the same bird as inline SVG, for Cendra-only code. Approved ink and ground pairs, from the brand guide's color flexibility page: white on maroon, maroon on white, green on yellow, red on white, yellow on red. Yellow on maroon appears in the supergraphic examples. Don't redraw, rotate, outline or add effects to the mark, or set it below 16px.

<!-- brand:start (generated by scripts/build-tokens.mjs from tokens/brands/cendra/; edit those instead) -->
## Resolved colors

| Token | Day | Night |
| --- | --- | --- |
| `primary` | #52050a | #52050a |
| `primary-hover` | #3a0307 | #3a0307 |
| `primary-pressed` | #2a0205 | #2a0205 |
| `on-primary` | #ffffff | #ffffff |
| `secondary` | #db3d3d | #db3d3d |
| `on-secondary` | #ffffff | #ffffff |
| `tertiary` | #e8862a | #e8862a |
| `on-tertiary` | #52050a | #52050a |
| `spotlight` | #fdc41e | #fdc41e |
| `spotlight-hover` | #ffd34d | #ffd34d |
| `spotlight-pressed` | #e8b010 | #e8b010 |
| `on-spotlight` | #52050a | #52050a |
| `accent` | #00924c | #00924c |
| `on-accent` | #ffffff | #ffffff |
| `primary-strong` | #52050a | #52050a |
| `secondary-strong` | #b82a2a | #b82a2a |
| `tertiary-strong` | #e8862a | #e8862a |
| `spotlight-strong` | #fdc41e | #fdc41e |
| `accent-strong` | #00733c | #00733c |
| `danger-fill` | #b82a2a | #b82a2a |
| `danger-fill-hover` | #52050a | #52050a |
| `danger-fill-pressed` | #3a0307 | #3a0307 |
| `on-danger` | #ffffff | #ffffff |
| `surface` | #ffffff | #111111 |
| `surface-sunk` | #f5f5f5 | #0a0a0a |
| `surface-raised` | #ffffff | #1c1c1c |
| `fill-hover` | #f5f5f5 | #1c1c1c |
| `fill-pressed` | #e6e6e6 | #2b2b2b |
| `ink` | #121212 | #f5f5f5 |
| `ink-soft` | #5c5c5c | #b0b0b0 |
| `ink-disabled` | #9e9e9e | #5c5c5c |
| `line` | #e6e6e6 | #3a3a3a |
| `line-control` | #8a8a8a | #707070 |
| `line-strong` | #121212 | #f5f5f5 |
| `primary-edge` | #52050a | #b8434a |
| `secondary-edge` | #db3d3d | #db3d3d |
| `tertiary-edge` | #e8862a | #e8862a |
| `spotlight-edge` | #fdc41e | #fdc41e |
| `accent-edge` | #00924c | #00924c |
| `primary-mark` | #db3d3d | #db3d3d |
| `secondary-mark` | #e8862a | #e8862a |
| `tertiary-mark` | #52050a | #b8434a |
| `spotlight-mark` | #00924c | #00924c |
| `accent-mark` | #fdc41e | #fdc41e |
| `primary-tint` | #f5f5f5 | #0a0a0a |
| `secondary-tint` | #fde8e6 | #40100f |
| `tertiary-tint` | #fdebd6 | #3d2108 |
| `spotlight-tint` | #fff6d6 | #3a2a04 |
| `accent-tint` | #e2f3ea | #0b3220 |
| `action` | #52050a | #fdc41e |
| `action-hover` | #3a0307 | #ffd34d |
| `action-pressed` | #2a0205 | #e8b010 |
| `on-action` | #ffffff | #52050a |
| `selected` | #fff6d6 | #3a2a04 |
| `on-selected` | #52050a | #fdc41e |
| `link` | #b82a2a | #ff8a7e |
| `focus` | #00733c | #fdc41e |
| `success` | #00733c | #3ccf86 |
| `warning` | #a8520c | #f5a54a |
| `danger` | #b82a2a | #ff8a7e |
| `success-tint` | #e2f3ea | #0b3220 |
| `warning-tint` | #fff6d6 | #3a2a04 |
| `danger-tint` | #fde8e6 | #40100f |
| `chart-1` | #52050a | #b8434a |
| `chart-2` | #00733c | #3ccf86 |
| `chart-3` | #d4741a | #e8862a |
| `chart-4` | #fdc41e | #fdc41e |
| `chart-other` | #8a8a8a | #707070 |
| `scrim` | #000000 | #000000 |

## Contrast checks

The build fails if any pair drops below its minimum.

| Text or mark | Ground | Day | Night | Minimum | Where |
| --- | --- | --- | --- | --- | --- |
| `ink` | `surface` | 18.7:1 | 17.3:1 | 4.5:1 | All text |
| `ink-soft` | `surface` | 6.7:1 | 8.7:1 | 4.5:1 | Secondary text |
| `ink` | `surface-sunk` | 17.2:1 | 18.2:1 | 4.5:1 | Text in wells and info notices |
| `line-control` | `surface` | 3.5:1 | 3.8:1 | 3:1 | Input borders |
| `on-action` | `action` | 15.2:1 | 9.5:1 | 4.5:1 | Primary button |
| `on-action` | `action-hover` | 17.6:1 | 10.6:1 | 4.5:1 | Primary button, hover |
| `on-action` | `action-pressed` | 18.9:1 | 7.7:1 | 4.5:1 | Primary button, pressed |
| `on-spotlight` | `spotlight` | 9.5:1 | 9.5:1 | 4.5:1 | Spotlight button, highlighted word |
| `on-spotlight` | `spotlight-hover` | 10.6:1 | 10.6:1 | 4.5:1 | Spotlight button, hover |
| `on-spotlight` | `spotlight-pressed` | 7.7:1 | 7.7:1 | 4.5:1 | Spotlight button, pressed |
| `on-selected` | `selected` | 14.0:1 | 8.7:1 | 4.5:1 | Selected tab, nav item, page |
| `on-danger` | `danger-fill` | 6.2:1 | 6.2:1 | 4.5:1 | Danger button, alert badge |
| `on-danger` | `danger-fill-hover` | 15.2:1 | 15.2:1 | 4.5:1 | Danger button, hover |
| `on-danger` | `danger-fill-pressed` | 17.6:1 | 17.6:1 | 4.5:1 | Danger button, pressed |
| `link` | `surface` | 6.2:1 | 8.3:1 | 4.5:1 | Links |
| `focus` | `surface` | 6.0:1 | 11.8:1 | 3:1 | Focus ring |
| `primary-edge` | `surface` | 15.2:1 | 3.5:1 | 3:1 | Primary outline |
| `on-primary` | `primary` | 15.2:1 | 15.2:1 | 4.5:1 | Text on a filled primary band |
| `on-primary` | `primary-strong` | 15.2:1 | 15.2:1 | 4.5:1 | primary tag and avatar |
| `ink` | `primary-tint` | 17.2:1 | 18.2:1 | 4.5:1 | Soft primary tag |
| `on-secondary` | `secondary-strong` | 6.2:1 | 6.2:1 | 4.5:1 | secondary tag and avatar |
| `on-secondary` | `secondary` | 4.4:1 | 4.4:1 | 3:1 | Display text on a filled secondary band |
| `ink` | `secondary-tint` | 15.9:1 | 14.8:1 | 4.5:1 | Soft secondary tag |
| `on-tertiary` | `tertiary-strong` | 5.7:1 | 5.7:1 | 4.5:1 | tertiary tag and avatar |
| `on-tertiary` | `tertiary` | 5.7:1 | 5.7:1 | 3:1 | Display text on a filled tertiary band |
| `ink` | `tertiary-tint` | 16.1:1 | 13.6:1 | 4.5:1 | Soft tertiary tag |
| `on-spotlight` | `spotlight-strong` | 9.5:1 | 9.5:1 | 4.5:1 | spotlight tag and avatar |
| `on-spotlight` | `spotlight` | 9.5:1 | 9.5:1 | 3:1 | Display text on a filled spotlight band |
| `ink` | `spotlight-tint` | 17.3:1 | 12.7:1 | 4.5:1 | Soft spotlight tag |
| `on-accent` | `accent-strong` | 6.0:1 | 6.0:1 | 4.5:1 | accent tag and avatar |
| `on-accent` | `accent` | 4.0:1 | 4.0:1 | 3:1 | Display text on a filled accent band |
| `ink` | `accent-tint` | 16.3:1 | 12.9:1 | 4.5:1 | Soft accent tag |
| `success` | `surface` | 6.0:1 | 9.4:1 | 4.5:1 | success text and icons |
| `success` | `success-tint` | 5.2:1 | 7.0:1 | 4.5:1 | success tag |
| `ink` | `success-tint` | 16.3:1 | 12.9:1 | 4.5:1 | success notice and banner |
| `warning` | `surface` | 5.4:1 | 9.3:1 | 4.5:1 | warning text and icons |
| `warning` | `warning-tint` | 5.0:1 | 6.9:1 | 4.5:1 | warning tag |
| `ink` | `warning-tint` | 17.3:1 | 12.7:1 | 4.5:1 | warning notice and banner |
| `danger` | `surface` | 6.2:1 | 8.3:1 | 4.5:1 | danger text and icons |
| `danger` | `danger-tint` | 5.2:1 | 7.1:1 | 4.5:1 | danger tag |
| `ink` | `danger-tint` | 15.9:1 | 14.8:1 | 4.5:1 | danger notice and banner |
<!-- brand:end -->
