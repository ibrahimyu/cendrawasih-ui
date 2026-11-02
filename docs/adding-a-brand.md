# Adding a brand

A brand is a folder in `tokens/brands/` and a page in `docs/brands/`. It never touches a component. Start by copying the Example brand.

## What you need from the brand

- **Colors.** Ideally hex values from a brand guide. A website or a logo is enough to start: pick the colors from it and confirm them with the brand's owner before shipping.
- **A mark**, as a single-ink SVG (any fill; only its shape is used). Optional: without one, Bands have no supergraphic.
- **Fonts**, as woff2 files you may self-host. Optional: without them, the system sans is used.
- **Voice, logo rules and imagery**, for the brand's page.

## Fitting a palette to the five roles

Most brands have one or two colors, not five. Fill the roles in this order:

1. `primary`: the brand's main color. It fills the Day primary button, so white or near-black text on it must reach 4.5:1.
2. `spotlight`: the brightest, warmest color, used once per screen. It usually carries dark text (`on-spotlight`), often the primary. It is also the Night action and the selected wash, so it must read on near-black.
3. `secondary`, `tertiary`, `accent`: the brand's other colors. If there aren't enough, use a lighter or darker step of primary, or a neutral warm or cool hue that sits well with it. Repeating a color is allowed; three identical stripes in the plume bar are not, so vary them.
4. For each, set `on-X` to the text color that reads on it. If text needs a darker fill than the shape color, add `X-strong` (Cendra's red is #db3d3d for shapes and #b82a2a under white text).
5. Never use a red or green brand color to mean failure or success. Status is the system's (`success`, `warning`, `danger`); the brand's red is just a tone.

## Steps

1. Copy `tokens/brands/example/` to `tokens/brands/<id>/`. The folder name is the brand's id, in lowercase: `sunny-clinic`.
2. In `brand.tokens.json`:
   - `$description`: one sentence on the brand's character.
   - `$extensions.co.cendra`: `name`, `mark` (path to the SVG from the repo root) and `fontFaces` (`{ family, file, weight }`; put the woff2 files in `src/fonts/`).
   - `palette`: the brand's colors under their own names. Only this file sees them.
   - `color`: the roles, as aliases into the palette. All of `primary`, `primary-hover`, `primary-pressed`, `on-primary`, `secondary`, `on-secondary`, `tertiary`, `on-tertiary`, `spotlight`, `spotlight-hover`, `spotlight-pressed`, `on-spotlight`, `accent` and `on-accent` are required. You may also set any `X-strong`, and any system color (for example `danger-fill-hover`).
   - `font.family`: the display and text faces, with fallbacks.
3. In `day.tokens.json` and `night.tokens.json`, override only what the defaults get wrong for this palette. The common ones: `primary-edge` on Night for a dark primary; `X-tint` for soft tags; `link` and `focus`; `action` and `on-action` on Night if the primary is light enough to stay the action; the four chart colors. Every key must be a system token: the build rejects anything else.
4. Run `npm run tokens`. It checks the brand: every role present, no unknown keys, every contrast pair in both themes. Fix what it lists and run it again. When it passes it writes `src/styles/brands/<id>.css` and the color and contrast tables in `docs/brands/<id>.md`.
5. Write the top of `docs/brands/<id>.md`, above the generated part: who the brand is for, its palette and what it changes from the defaults, faces, voice, imagery and logo rules. Use `docs/brands/cendra.md` as the model.
6. Add the brand to the playground: import its CSS and add it to `brands` in `playground/main.tsx`. Run `npm run dev`, pick it in the Brand menu, and go through every screen in Day and Night. Look hardest at the Band, the Stats, the tags and the selected nav item.
7. `npm run typecheck` and `npm run build`.

## Using it in a product

```css
@import "@cendra/ui/styles.css";
@import "@cendra/ui/brands/<id>.css";
```

One brand per page is the normal case, and needs nothing else. To show two brands on one page (a white-label preview, the playground), load both and set `data-brand="<id>"` on `<html>` or on the element that should take each brand.

## Asking an AI to do it

Give it this file and the brand's material, for example:

> Add a brand called Sunny Clinic, id `sunny-clinic`, following docs/adding-a-brand.md. Their colors are … (or: take them from https://…, and list what you picked so I can confirm). Mark: assets/brands/sunny-clinic/mark.svg. No custom fonts. Voice: calm, plain, reassuring; they talk to patients, not businesses.

It should end with `npm run tokens` passing, the brand in the playground, and a page in `docs/brands/` for you to review.
