// Copies the stylesheets and fonts next to the compiled components in dist/
import { cpSync } from 'node:fs';

const root = new URL('../', import.meta.url);
cpSync(new URL('src/styles', root), new URL('dist/styles', root), { recursive: true });
cpSync(new URL('src/fonts', root), new URL('dist/fonts', root), { recursive: true });
