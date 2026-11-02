// Compiles the DTCG token files in tokens/ into CSS:
//   tokens/system/        brand-neutral roles, spacing, shape, motion, type -> src/styles/tokens.css, tailwind.css
//   tokens/brands/<id>/   one brand: its palette mapped onto the roles       -> src/styles/brands/<id>.css
// Theme-aware colors become light-dark() pairs, so the page follows the OS theme unless an ancestor sets
// data-theme="light" or data-theme="dark". Every brand must fill the role contract and pass the contrast
// pairs below in both themes, or the build fails and says what to fix.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');
const load = (p) => JSON.parse(read(`tokens/${p}`));
const loadIf = (p) => (existsSync(new URL(`tokens/${p}`, root)) ? load(p) : {});

const system = { base: load('system/base.tokens.json'), day: load('system/day.tokens.json'), night: load('system/night.tokens.json') };
const contract = system.base.$extensions['co.cendra'].brandContract;
const brands = readdirSync(new URL('tokens/brands/', root), { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => d.name).sort()
  .map((id) => ({ id, base: load(`brands/${id}/brand.tokens.json`), day: loadIf(`brands/${id}/day.tokens.json`), night: loadIf(`brands/${id}/night.tokens.json`) }));

// Walk a token group, yielding [path, token] for every leaf that has a $value
function* leaves(group, path = []) {
  for (const [key, node] of Object.entries(group ?? {})) {
    if (key.startsWith('$') || typeof node !== 'object') continue;
    if ('$value' in node) yield [[...path, key], node];
    else yield* leaves(node, [...path, key]);
  }
}

// Token path -> CSS custom property name. Color keys are flat: color.primary-edge -> --primary-edge
function varName(path) {
  const [group, ...rest] = path;
  if (group === 'color') return `--${rest.join('-')}`;
  if (group === 'font') return `--font-${rest[1]}`;
  return `--${path.join('-')}`;
}

const alias = (v) => typeof v === 'string' && /^\{.+\}$/.test(v);
const dim = (d) => `${d.value}${d.value === 0 ? '' : d.unit}`;

// A brand's palette is private: aliases into it are inlined, so no hue name ever becomes a variable
function ref(v, palette) {
  const path = v.slice(1, -1).split('.');
  if (path[0] !== 'palette') return `var(${varName(path)})`;
  const token = palette?.[path[1]];
  if (!token) throw new Error(`${v} is not in the brand's palette`);
  return color(token.$value, palette);
}

function color(v, palette) {
  if (alias(v)) return ref(v, palette);
  if (v.alpha == null || v.alpha === 1) return v.hex;
  const [r, g, b] = v.components.map((c) => Math.round(c * 255));
  return `rgb(${r} ${g} ${b} / ${v.alpha})`;
}

function value(token, type, palette) {
  const v = token.$value;
  if (alias(v)) return ref(v, palette);
  switch (type) {
    case 'color': return color(v, palette);
    case 'dimension': return dim(v);
    case 'shadow': return `${dim(v.offsetX)} ${dim(v.offsetY)} ${dim(v.blur)} ${dim(v.spread)} ${color(v.color)}`;
    case 'duration': return dim(v);
    case 'cubicBezier': return `cubic-bezier(${v.join(', ')})`;
    case 'fontFamily': return v.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');
    default: return String(v);
  }
}

// $type is inherited from the closest group that declares it
function typeOf(group, path) {
  let type, node = group;
  for (const key of path) {
    if (node.$type) type = node.$type;
    node = node[key];
  }
  return node.$type ?? type;
}

const keys = (group) => new Set([...leaves(group)].map(([p]) => p.join('.')));
const themeKeys = keys(system.day.color);
const baseColorKeys = keys(system.base.color);
for (const [a, b] of [['day', 'night'], ['night', 'day']]) {
  for (const k of keys(system[a].color)) if (!keys(system[b].color).has(k)) throw new Error(`tokens/system/${b}.tokens.json is missing ${k}`);
}

// ---- System tokens ----

const decls = [];
for (const [path, token] of leaves(system.base)) {
  if (path[0] === 'typography') continue;
  decls.push(`  ${varName(path)}: ${value(token, typeOf(system.base, path))};`);
}

// Composite corner shapes built from the radius tokens. The feather tip marks things that only
// label (tags, badges, counts); anything you press is a pill
const shapes = [
  ['radius-feather', 'var(--radius-sm) var(--radius-sm) var(--radius-sm) var(--radius-nib)', 'Tags, badges and counts: three round corners and one sharp tip. Never on anything clickable.'],
];
for (const [name, val] of shapes) decls.push(`  --${name}: ${val};`);

// One light-dark() pair per token, or a plain value when both themes agree
function pair(light, dark, type, palette) {
  const l = value(light, type, palette);
  const d = value(dark, type, palette);
  if (l === d) return l;
  if (type !== 'shadow') return `light-dark(${l}, ${d})`;
  // Only the color may differ between themes: light-dark() works on colors, not whole shadows
  const geometry = (t) => value({ $value: { ...t.$value, color: { hex: '' } } }, 'shadow');
  if (geometry(light) !== geometry(dark)) throw new Error('shadows may differ only in color between themes');
  return `${geometry(light)}light-dark(${color(light.$value.color)}, ${color(dark.$value.color)})`;
}

const nightTokens = new Map([...leaves(system.night)].map(([p, t]) => [p.join('.'), t]));
for (const [path, token] of leaves(system.day)) {
  decls.push(`  ${varName(path)}: ${pair(token, nightTokens.get(path.join('.')), typeOf(system.day, path))};`);
}
// The brand's mark, drawn by the Band supergraphic and BrandMark. Fully transparent until a brand sets one
decls.push('  --brand-mark: linear-gradient(transparent, transparent);');

const typeStyles = [...leaves(system.base.typography)].map(([[name], token]) => {
  const v = token.$value;
  const ext = token.$extensions?.['co.cendra'] ?? {};
  const tracking = ext.letterSpacingEm != null ? `${ext.letterSpacingEm}em` : dim(v.letterSpacing);
  return { name, family: ref(v.fontFamily), size: dim(v.fontSize), lineHeight: v.lineHeight, weight: v.fontWeight, tracking, transform: ext.textTransform };
});

// The 12-column grid, generated so its media queries always match the breakpoint tokens.
// Mobile first: .cx-span-6 applies everywhere, .cx-span-laptop-4 from laptop up
const bps = Object.entries(system.base.breakpoint).filter(([k]) => !k.startsWith('$')).map(([name, t]) => [name, dim(t.$value)]);
const cols = system.base.layout.columns.$value;
const spans = (prefix) => Array.from({ length: cols }, (_, i) => `.cx-span${prefix}-${i + 1} { grid-column: span ${i + 1}; }`).join(' ');
const step = { tablet: 'tablet', laptop: 'laptop', wide: 'laptop' };
const layoutCss = `@layer cendra.layout {
  .cx-container {
    box-sizing: border-box; width: 100%; margin-inline: auto;
    max-width: calc(var(--layout-max) + 2 * var(--cx-margin)); padding-inline: var(--cx-margin);
    --cx-margin: var(--layout-margin-phone);
  }
  .cx-grid {
    display: grid; grid-template-columns: repeat(${cols}, minmax(0, 1fr)); gap: var(--layout-gutter-phone);
  }
  .cx-grid > * { grid-column: span ${cols}; min-width: 0; }
  ${spans('')}
${bps.map(([name, min]) => `  @media (min-width: ${min}) {
    .cx-container { --cx-margin: var(--layout-margin-${step[name]}); }
    .cx-grid { gap: var(--layout-gutter-${step[name]}); }
    ${spans(`-${name}`)}
  }`).join('\n')}
}`;

const header = '/* Generated by scripts/build-tokens.mjs from tokens/. Do not edit. */\n';
// Declared first in every file, so a brand always overrides the system whichever is imported first
const layerOrder = '@layer cendra.tokens.system, cendra.tokens.brand;';

// System tokens are declared again on every [data-brand] element, so the role aliases (--action: var(--primary))
// pick up the palette of the brand around them
const tokensCss = `${header}
${layerOrder}

@layer cendra.tokens.system {
  :root { color-scheme: light dark; }
  :root, [data-brand] {
  ${decls.join('\n  ')}
  }
  [data-theme="light"] { color-scheme: light; }
  [data-theme="dark"] { color-scheme: dark; }
}

@layer cendra.type {
${typeStyles.map((s) => `  .cx-${s.name} { font-family: ${s.family}; font-size: ${s.size}; line-height: ${s.lineHeight}; font-weight: ${s.weight};${s.tracking === '0' ? '' : ` letter-spacing: ${s.tracking};`}${s.transform ? ` text-transform: ${s.transform};` : ''} }`).join('\n')}
}

${layoutCss}
`;

// ---- Brands ----

const TONES = ['primary', 'secondary', 'tertiary', 'spotlight', 'accent'];

function resolver(brand, theme) {
  const layers = [brand[theme].color, brand.base.color, system[theme].color, system.base.color].filter(Boolean);
  const find = (k) => layers.map((l) => l[k]).find((t) => t && '$value' in t);
  const hexOf = (v, seen) => {
    if (!alias(v)) return v.hex;
    const [group, name] = v.slice(1, -1).split('.');
    if (group === 'palette') return hexOf(brand.base.palette[name].$value, seen);
    if (seen.includes(name)) throw new Error(`${brand.id}: ${[...seen, name].join(' -> ')} is a loop`);
    const token = find(name);
    if (!token) throw new Error(`${brand.id}: ${v} does not exist`);
    return hexOf(token.$value, [...seen, name]);
  };
  return (name) => {
    const token = find(name);
    if (!token) throw new Error(`${brand.id}: no ${name} in ${theme}`);
    return hexOf(token.$value, [name]);
  };
}

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [text or mark, ground, minimum, where it shows]. 4.5 for text, 3 for display text, outlines and the focus ring
const checks = [
  ['ink', 'surface', 4.5, 'All text'],
  ['ink-soft', 'surface', 4.5, 'Secondary text'],
  ['ink', 'surface-sunk', 4.5, 'Text in wells and info notices'],
  ['line-control', 'surface', 3, 'Input borders'],
  ['on-action', 'action', 4.5, 'Primary button'],
  ['on-action', 'action-hover', 4.5, 'Primary button, hover'],
  ['on-action', 'action-pressed', 4.5, 'Primary button, pressed'],
  ['on-spotlight', 'spotlight', 4.5, 'Spotlight button, highlighted word'],
  ['on-spotlight', 'spotlight-hover', 4.5, 'Spotlight button, hover'],
  ['on-spotlight', 'spotlight-pressed', 4.5, 'Spotlight button, pressed'],
  ['on-selected', 'selected', 4.5, 'Selected tab, nav item, page'],
  ['on-danger', 'danger-fill', 4.5, 'Danger button, alert badge'],
  ['on-danger', 'danger-fill-hover', 4.5, 'Danger button, hover'],
  ['on-danger', 'danger-fill-pressed', 4.5, 'Danger button, pressed'],
  ['link', 'surface', 4.5, 'Links'],
  ['focus', 'surface', 3, 'Focus ring'],
  ['primary-edge', 'surface', 3, 'Primary outline'],
  ['on-primary', 'primary', 4.5, 'Text on a filled primary band'],
  ...TONES.flatMap((r) => [
    [`on-${r}`, `${r}-strong`, 4.5, `${r} tag and avatar`],
    ...(r === 'primary' ? [] : [[`on-${r}`, r, 3, `Display text on a filled ${r} band`]]),
    ['ink', `${r}-tint`, 4.5, `Soft ${r} tag`],
  ]),
  ...['success', 'warning', 'danger'].flatMap((s) => [
    [s, 'surface', 4.5, `${s} text and icons`],
    [s, `${s}-tint`, 4.5, `${s} tag`],
    ['ink', `${s}-tint`, 4.5, `${s} notice and banner`],
  ]),
];

const brandCss = new Map();
const brandReports = new Map();
const failures = [];
for (const brand of brands) {
  const where = `tokens/brands/${brand.id}`;
  const palette = brand.base.palette;
  const ext = brand.base.$extensions?.['co.cendra'] ?? {};
  const known = new Set([...Object.keys(contract), ...baseColorKeys, ...themeKeys]);
  for (const k of Object.keys(contract)) if (!brand.base.color?.[k]) failures.push(`${where}/brand.tokens.json: missing color.${k} (${contract[k]})`);
  for (const [file, group] of [['brand', brand.base.color], ['day', brand.day.color], ['night', brand.night.color]]) {
    for (const k of keys(group)) if (!known.has(k)) failures.push(`${where}/${file}.tokens.json: color.${k} is not a system role. Add it to tokens/system first.`);
  }
  for (const g of Object.keys(brand.base)) if (!g.startsWith('$') && !['palette', 'color', 'font'].includes(g)) failures.push(`${where}/brand.tokens.json: "${g}" can't be set by a brand, only palette, color and font`);
  if (failures.length) continue;

  const out = [];
  const themed = new Set([...keys(brand.day.color), ...keys(brand.night.color)]);
  for (const [path, token] of leaves(brand.base)) {
    if (path[0] === 'palette' || themed.has(path.slice(1).join('.'))) continue;
    out.push(`  ${varName(path)}: ${value(token, typeOf(brand.base, path), palette)};`);
  }
  // A theme override falls back to the brand's base value, then to the system default for that theme
  const pick = (theme, k) => brand[theme].color?.[k] ?? brand.base.color?.[k] ?? system[theme].color[k] ?? system.base.color[k];
  for (const k of themed) out.push(`  --${k}: ${pair(pick('day', k), pick('night', k), 'color', palette)};`);
  if (ext.mark) {
    const svg = read(ext.mark).replace(/\s+id="[^"]*"/g, '').replace(/>\s+</g, '><').trim();
    out.push(`  --brand-mark: url("data:image/svg+xml,${encodeURIComponent(svg)}");`);
  }
  const faces = (ext.fontFaces ?? []).map(({ family, file, weight }) =>
    `@font-face {\n  font-family: "${family}";\n  src: url("../../fonts/${file}.woff2") format("woff2");\n  font-weight: ${weight};\n  font-style: normal;\n  font-display: swap;\n}`);
  brandCss.set(brand.id, `${header}/* ${ext.name ?? brand.id}: ${brand.base.$description ?? ''} */
${faces.length ? `\n${faces.join('\n')}\n` : ''}
${layerOrder}

@layer cendra.tokens.brand {
  :where(:root:not([data-brand])), [data-brand="${brand.id}"] {
  ${out.join('\n  ')}
  }
}
`);

  const day = resolver(brand, 'day');
  const night = resolver(brand, 'night');
  const results = checks.map(([fg, bg, min, use]) => {
    const r = { fg, bg, min, use, day: contrast(day(fg), day(bg)), night: contrast(night(fg), night(bg)) };
    for (const theme of ['day', 'night']) {
      if (r[theme] < min) failures.push(`${where}: ${fg} on ${bg} is ${r[theme].toFixed(2)}:1 on ${theme === 'day' ? 'Day' : 'Night'}, needs ${min}:1 (${use})`);
    }
    return r;
  });
  const colors = [...new Set([...Object.keys(contract), ...baseColorKeys, ...themeKeys])];
  brandReports.set(brand.id, { ext, colors: colors.map((k) => ({ k, day: day(k), night: night(k) })), results });
}
if (failures.length) {
  console.error(`Tokens not built. Fix these first:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

// ---- Tailwind 4 ----

// Colors are inlined as var() so they keep switching with the theme and the brand. Fonts share Tailwind's
// --font-* names; the cendra layer sits above Tailwind's theme layer, so the brand's value wins. Radii,
// shadows, easings and type sizes are brand-neutral, so they are declared with literal values
const colorNames = [...Object.keys(contract), ...baseColorKeys, ...themeKeys];
const literal = (prefix) => decls.map((d) => d.trim()).filter((d) => d.startsWith(prefix));
const tailwindCss = `${header}/* Use after Tailwind, then your brand:
     @layer theme, base, cendra, components, utilities;
     @import "tailwindcss";
     @import "@cendra/ui/tailwind.css";
     @import "@cendra/ui/brands/cendra.css";                                    */
@import "./index.css";

@custom-variant dark {
  &:where([data-theme="dark"], [data-theme="dark"] *) { @slot; }
  @media (prefers-color-scheme: dark) {
    &:where(:not([data-theme="light"], [data-theme="light"] *)) { @slot; }
  }
}

@theme inline {
${colorNames.map((n) => `  --color-${n}: var(--${n});`).join('\n')}
  --font-display: var(--font-display);
  --font-text: var(--font-text);
}

@theme {
  --spacing: 4px;
  ${[...literal('--radius-'), ...literal('--shadow-'), ...literal('--ease-'), ...bps.map(([n, v]) => `--breakpoint-${n}: ${v};`)].join('\n  ')}
${typeStyles.map((s) => [
  `  --text-${s.name}: ${s.size};`,
  `  --text-${s.name}--line-height: ${s.lineHeight};`,
  `  --text-${s.name}--font-weight: ${s.weight};`,
  s.tracking === '0' ? null : `  --text-${s.name}--letter-spacing: ${s.tracking};`,
].filter(Boolean).join('\n')).join('\n')}
}
`;

writeFileSync(new URL('src/styles/tokens.css', root), tokensCss);
writeFileSync(new URL('src/styles/tailwind.css', root), tailwindCss);
mkdirSync(new URL('src/styles/brands/', root), { recursive: true });
for (const [id, css] of brandCss) writeFileSync(new URL(`src/styles/brands/${id}.css`, root), css);

// ---- Docs ----

const row = (...cells) => `| ${cells.join(' | ')} |`;
const code = (s) => `\`${s}\``;
const describe = (t) => (t?.$description ?? '').replace(/\|/g, '\\|');
const shown = (t, type) => value(t, type).replace(/var\(--([a-z0-9-]+)\)/g, '$1');

function replaceBetween(file, start, end, content) {
  const url = new URL(file, root);
  const doc = read(file);
  const a = doc.indexOf(start);
  const b = doc.indexOf(end);
  if (a < 0 || b < 0) throw new Error(`${file} is missing the ${start} / ${end} markers`);
  writeFileSync(url, doc.slice(0, a) + content + doc.slice(b + end.length));
}

// The token reference in docs/design-language.md, between the tokens:start and tokens:end markers
const contractRows = Object.entries(contract).map(([k, d]) => row(code(k), d.replace(/\|/g, '\\|')));
const colorRows = [
  ...[...leaves(system.base.color)].map(([p, t]) => row(code(p.join('-')), code(shown(t, 'color')), code(shown(t, 'color')), describe(t))),
  ...[...leaves(system.day.color)].map(([p, t]) => row(code(p.join('-')), code(shown(t, 'color')), code(shown(nightTokens.get(['color', ...p].join('.')), 'color')), describe(t))),
];
const typeRows = typeStyles.map((s) => {
  const t = system.base.typography[s.name];
  return row(code(`cx-${s.name}`), t.$value.fontFamily.includes('display') ? 'display' : 'text', `${s.size} / ${s.lineHeight}`, s.weight, s.tracking, describe(t));
});
const scaleRows = [
  ...['space', 'breakpoint', 'layout', 'size', 'radius', 'stroke', 'opacity', 'duration', 'ease'].flatMap((g) => [...leaves(system.base[g])].map(([p, t]) =>
    row(code(varName([g, ...p]).slice(2)), value(t, typeOf(system.base, [g, ...p])), describe(t)))),
  ...shapes.map(([name, val, use]) => row(code(name), code(val.replace(/var\(--([a-z0-9-]+)\)/g, '$1')), use)),
  row(code('shadow-overlay'), 'Day and Night pair', describe(system.day.shadow.overlay)),
];
replaceBetween('docs/design-language.md', '<!-- tokens:start', '<!-- tokens:end -->', `<!-- tokens:start (generated by scripts/build-tokens.mjs; edit tokens/ instead) -->
## Tokens

The source of truth is \`tokens/system/\` (W3C design token format). \`npm run tokens\` compiles it to \`src/styles/tokens.css\`, which every product imports, and rewrites this section. A brand's own values are listed in its page under \`docs/brands/\`.

### What a brand provides

Every brand in \`tokens/brands/\` must set these. Everything else has a default it may override.

${row('Role', 'What it is')}
${row('---', '---')}
${contractRows.join('\n')}

### What each color is for

Defaults are written as the role they point to; a brand may override any of them.

${row('Token', 'Day', 'Night', 'Use')}
${row('---', '---', '---', '---')}
${colorRows.join('\n')}

### Type scale

The brand sets the two faces, \`font-display\` and \`font-text\`. Without one, both are the system sans.

${row('Class', 'Face', 'Size / line height', 'Weight', 'Tracking', 'Use')}
${row('---', '---', '---', '---', '---', '---')}
${typeRows.join('\n')}

### Spacing, layout, size, radius, shape, stroke, opacity, motion, elevation

${row('Token', 'Value', 'Use')}
${row('---', '---', '---')}
${scaleRows.join('\n')}
<!-- tokens:end -->`);

// Each brand's resolved colors and contrast results, in docs/brands/<id>.md between the brand markers
for (const [id, { ext, colors, results }] of brandReports) {
  const file = `docs/brands/${id}.md`;
  if (!existsSync(new URL(file, root))) {
    mkdirSync(new URL('docs/brands/', root), { recursive: true });
    writeFileSync(new URL(file, root), `# ${ext.name ?? id}\n\nHow ${ext.name ?? id} fills the Cendrawasih UI roles.\n\n<!-- brand:start -->\n<!-- brand:end -->\n`);
  }
  const ratio = (r, min) => `${r.toFixed(1)}:1${r < min ? ' ✗' : ''}`;
  replaceBetween(file, '<!-- brand:start', '<!-- brand:end -->', `<!-- brand:start (generated by scripts/build-tokens.mjs from tokens/brands/${id}/; edit those instead) -->
## Resolved colors

${row('Token', 'Day', 'Night')}
${row('---', '---', '---')}
${colors.map((c) => row(code(c.k), c.day, c.night)).join('\n')}

## Contrast checks

The build fails if any pair drops below its minimum.

${row('Text or mark', 'Ground', 'Day', 'Night', 'Minimum', 'Where')}
${row('---', '---', '---', '---', '---', '---')}
${results.map((r) => row(code(r.fg), code(r.bg), ratio(r.day, r.min), ratio(r.night, r.min), `${r.min}:1`, r.use)).join('\n')}
<!-- brand:end -->`);
}

console.log(`tokens.css: ${decls.length} variables, ${typeStyles.length} type styles; brands: ${[...brandCss.keys()].join(', ')}`);
