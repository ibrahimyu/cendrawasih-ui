'use client';
import { useEffect, useId, useRef, type FocusEvent, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { cx } from './cx.js';
import { place } from './place.js';

/** Spread these on the element the tooltip is about */
export interface TooltipTriggerProps {
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  onPointerEnter: (e: PointerEvent) => void;
  onPointerLeave: (e: PointerEvent) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

export interface TooltipProps {
  /** A few words. Plain text only: nothing inside a tooltip can be clicked */
  content: string;
  /** Renders the element the tooltip is about, given the props it needs */
  children: (props: TooltipTriggerProps) => ReactNode;
  /** label: the tooltip is the trigger's name, for icon-only buttons. description: extra detail. Default description */
  kind?: 'label' | 'description';
  /** Default top; flips when there is no room */
  side?: 'top' | 'bottom';
  className?: string;
}

const SHOW_DELAY = 400;
const HIDE_DELAY = 120;

/**
 * A short label in ink that appears on hover and keyboard focus. Its feather tip points at the trigger.
 * Never on touch, so never the only place something is said
 */
export function Tooltip({ content, children, kind = 'description', side = 'top', className }: TooltipProps) {
  const id = useId();
  const tip = useRef<HTMLDivElement>(null);
  // The trigger is found by the aria-labelledby or aria-describedby it carries, so it needs no ref
  const anchor = () => document.querySelector<HTMLElement>(`[${kind === 'label' ? 'aria-labelledby' : 'aria-describedby'}~="${CSS.escape(`${id}-tip`)}"]`);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function show() {
    clearTimeout(timer.current);
    const el = tip.current;
    const trigger = anchor();
    if (!el || !trigger || el.matches(':popover-open')) return;
    el.showPopover();
    const at = place(trigger, el, side, 6, 'center');
    el.dataset.side = at.side;
    el.dataset.align = at.align;
  }
  function hide() {
    clearTimeout(timer.current);
    if (tip.current?.matches(':popover-open')) tip.current.hidePopover();
  }
  function later(fn: () => void, ms: number) {
    clearTimeout(timer.current);
    timer.current = setTimeout(fn, ms);
  }

  return (
    <>
      {children({
        [kind === 'label' ? 'aria-labelledby' : 'aria-describedby']: `${id}-tip`,
        onPointerEnter: (e) => { if (e.pointerType !== 'touch') later(show, SHOW_DELAY); },
        onPointerLeave: () => later(hide, HIDE_DELAY),
        onFocus: (e) => { if (e.currentTarget.matches(':focus-visible')) show(); },
        onBlur: hide,
        // Escape dismisses without moving focus (WCAG 1.4.13), and only the tooltip, not a dialog around it
        onKeyDown: (e) => { if (e.key === 'Escape' && tip.current?.matches(':popover-open')) { e.preventDefault(); e.stopPropagation(); hide(); } },
      } as TooltipTriggerProps)}
      <div
        ref={tip}
        id={`${id}-tip`}
        popover="manual"
        role="tooltip"
        className={cx('cx-tooltip', className)}
        // The pointer can move onto the tooltip without it going away
        onPointerEnter={() => clearTimeout(timer.current)}
        onPointerLeave={() => later(hide, HIDE_DELAY)}
      >
        {content}
      </div>
    </>
  );
}
