# Working in Cendrawasih UI

Cendrawasih UI is a design system with brands plugged into it. Cendra is the first brand, not the system. Keep the two apart: that is what lets an improvement here reach every brand, and lets a brand change without touching a component.

## The boundary

- **System** (`tokens/system/`, `src/`, `docs/design-language.md`): layout, density, shape, motion, states, type scale, components, neutrals, status colors, and the role tokens with their defaults.
- **Brand** (`tokens/brands/<id>/`, `docs/brands/<id>.md`): a palette mapped onto the five roles (`primary`, `secondary`, `tertiary`, `spotlight`, `accent`), its faces, its mark, its voice and imagery.

Rules:

- Components, `components.css` and the playground use role and system tokens only: `var(--primary)`, `var(--spotlight-tint)`, `var(--success)`. Never a hex value, never a palette name like maroon or teal, never `font-family: "Google Sans"`.
- Tone props take roles (`tone="accent"`); states take status (`tone="danger"`). A red brand color never stands for failure.
- Nothing Cendra-specific goes in the system: product names, cendra.co copy, the bird. Those go in `docs/brands/cendra.md` or the Cendra brand folder. The `Logogram` component is Cendra's; brand-neutral code uses `BrandMark`.
- The plume, feather, quill and nib names (`radius-plume`, `PlumeBar`, the feather tip) are the system's shape vocabulary, not Cendra branding. Keep them.

## Where a change goes

| Change | Where |
| --- | --- |
| How a component looks or behaves for everyone | `src/components/`, `src/styles/components.css`, its section in `docs/design-language.md` |
| A new color the components need | A token in both `tokens/system/day.tokens.json` and `night.tokens.json` (or `base` if theme-independent), defaulting to a role or a neutral, with a `$description`. Brands inherit it; override it per brand only where the default is wrong |
| A new required role | `brandContract` in `tokens/system/base.tokens.json`, then every brand, and a new contrast check in `scripts/build-tokens.mjs` |
| One brand's colors, faces or mark | `tokens/brands/<id>/` and the top of `docs/brands/<id>.md` |
| A new brand | Follow `docs/adding-a-brand.md` |

## Checks

- `npm run tokens` after any token edit. It fails, with a list, if a brand misses a role, sets a key the system doesn't have, or drops below a contrast minimum in either theme. Fix the brand; don't lower a minimum to make it pass.
- `npm run typecheck`.
- `npm run dev`, then look at the screens with `?brand=cendra` and `?brand=example`, each with `?theme=light` and `?theme=dark`. A change that only looks right in Cendra is not done.

Generated, never edit by hand: `src/styles/tokens.css`, `src/styles/tailwind.css`, `src/styles/brands/*.css`, the `tokens:start`/`tokens:end` section of `docs/design-language.md`, and the `brand:start`/`brand:end` section of each brand page.

## Changes that products must act on

Products depend on this package and are upgraded by people and by AI reading `CHANGELOG.md`. Any change that renames or removes a prop, class, token or export goes under the next version there, with a **Migration** list of old → new that can be applied mechanically. Bump the minor version while we are on 0.x.

## Writing

Follow the content rules in `docs/design-language.md`: sentence case, plain words, no hype. Code comments match the surrounding density.
