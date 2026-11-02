/** Which side of its anchor a floating element landed on, and which of its corners is nearest the anchor */
export interface Placement {
  side: 'top' | 'bottom';
  align: 'start' | 'end';
}

const MARGIN = 8;

/**
 * Puts a fixed, top-layer element (a popover) next to its anchor. It goes on the preferred side and
 * flips when there is no room. `from: 'center'` starts it at the anchor's middle, for a feather tip
 * that points at the anchor; `from: 'edge'` lines it up with the anchor's start edge, for menus
 */
export function place(anchor: Element, el: HTMLElement, prefer: Placement['side'], gap: number, from: 'edge' | 'center' = 'edge'): Placement {
  const a = anchor.getBoundingClientRect();
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;

  const below = a.bottom + gap + h <= vh - MARGIN;
  const above = a.top - gap - h >= MARGIN;
  const side = prefer === 'bottom' ? (below || !above ? 'bottom' : 'top') : (above || !below ? 'top' : 'bottom');

  const x = from === 'center' ? a.left + a.width / 2 - 4 : a.left;
  const fits = x + w <= vw - MARGIN;
  const end = from === 'center' ? a.left + a.width / 2 + 4 : a.right;
  const left = fits ? Math.max(x, MARGIN) : Math.max(end - w, MARGIN);

  el.style.top = `${Math.round(side === 'bottom' ? a.bottom + gap : a.top - gap - h)}px`;
  el.style.left = `${Math.round(left)}px`;
  return { side, align: fits ? 'start' : 'end' };
}
