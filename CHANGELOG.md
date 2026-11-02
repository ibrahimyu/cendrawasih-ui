# Changelog

Every version that changes a prop, class, token or export lists how to migrate. To upgrade a product, apply the **Migration** steps of each version between the one it uses and the new one, in order.

## 0.2.0

The brand is separated from the system. Components now use five brand roles instead of Cendra's color names, and each brand ships as its own stylesheet. Cendra looks exactly as before.

### Added

- Brands: `tokens/brands/<id>/` compiles to `@cendra/ui/brands/<id>.css`. Cendra and Example ship with the package. See `docs/adding-a-brand.md`.
- Brand roles `primary`, `secondary`, `tertiary`, `spotlight`, `accent`, each with `on-`, `-strong`, `-edge`, `-tint` and `-mark` steps, plus `-hover` and `-pressed` for primary and spotlight.
- Status tones on `Tag`: `tone="success" | "warning" | "danger"`, always soft.
- `danger-fill`, `danger-fill-hover`, `danger-fill-pressed`, `on-danger` for destructive buttons and alert badges.
- `BrandMark`: the active brand's mark at any size. The Band draws the same mark from `--brand-mark`.
- `data-brand="<id>"` picks a brand for a page or a subtree when more than one is loaded.
- The token build checks every brand's contrast in both themes and fails with a list of what to fix.
- `Tone` and `Status` types.

### Migration

1. **Load the brand.** After `@cendra/ui/styles.css` (or `tailwind.css`), add `@cendra/ui/brands/cendra.css`. Without it, colors are missing. Fonts now come from the brand file.
2. **Tone props** (`Tag`, `Stat`, `Card` `tone` and `mediaTone`, `EmptyState`, `Avatar`):

   | Before | After |
   | --- | --- |
   | `maroon` | `primary` |
   | `red` | `secondary` |
   | `orange` | `tertiary` |
   | `yellow` | `spotlight` |
   | `green` | `accent` |

   Tags that show a **state** move to status tones and drop `soft`: `<Tag tone="green" soft>` for *Synced* or *Paid* becomes `<Tag tone="success">`; yellow soft for *Waiting* becomes `warning`; red soft for *Failed* becomes `danger`.
3. **Button:** `variant="plume"` becomes `variant="spotlight"`.
4. **Band:** `tone="night"` becomes `"primary"` (now the default), `"sunrise"` becomes `"secondary"`, `"forest"` becomes `"accent"`. `filled` is unchanged.
5. **Types:** `Plume` becomes `Tone`.
6. **CSS variables:**

   | Before | After |
   | --- | --- |
   | `--maroon` | `--primary` |
   | `--maroon-deep` | `--primary-hover` |
   | `--maroon-edge` | `--primary-edge` |
   | `--red` | `--secondary` |
   | `--red-deep` | `--secondary-strong`; `--danger-fill` on destructive actions |
   | `--orange` | `--tertiary` |
   | `--yellow`, `--yellow-light`, `--yellow-deep` | `--spotlight`, `--spotlight-hover`, `--spotlight-pressed` |
   | `--green` | `--accent` |
   | `--green-deep` | `--accent-strong`; `--success` when it means done |
   | `--white` | the `on-` color of what it sits on, usually `--on-primary` |
   | `--on-maroon`, `--on-red`, `--on-green` | `--on-primary`, `--on-secondary` (or `--on-danger`), `--on-accent` |
   | `--on-yellow` | `--on-spotlight`; `--on-tertiary` on orange |
   | `--tint-yellow` | `--warning-tint`; `--spotlight-tint` for highlights |
   | `--tint-red`, `--tint-green` | `--danger-tint`, `--success-tint` |
   | `--tint-orange` | `--tertiary-tint` |

7. **CSS classes:** the hue in `cx-tone--*`, `cx-tag--*`, `cx-avatar--*`, `cx-card__media--*` and `cx-plumebar__*` becomes the role, as in step 2. `cx-btn--plume` becomes `cx-btn--spotlight`. `cx-band--night`, `--sunrise` and `--forest` are gone: a band takes `cx-tone--<role>`.
8. **Tailwind utilities** follow the variables: `bg-maroon` becomes `bg-primary`, `text-red-deep` becomes `text-secondary-strong`, `bg-tint-green` becomes `bg-success-tint`.
9. **Token files** moved: `tokens/brand.tokens.json`, `day.tokens.json` and `night.tokens.json` are now `tokens/system/*` (brand-neutral) and `tokens/brands/cendra/*` (the palette).
