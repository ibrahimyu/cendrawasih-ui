'use client';
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon, type IconName } from './Icon.js';
import { place } from './place.js';

export type MenuItem =
  | {
      id: string;
      label: ReactNode;
      icon?: IconName;
      /** Destructive: drawn in danger. Put it last, after a separator */
      danger?: boolean;
      disabled?: boolean;
      onSelect?: () => void;
    }
  | { separator: true };

/** Spread these on the button that opens the menu */
export interface MenuTriggerProps {
  popoverTarget: string;
  'aria-haspopup': 'menu';
  'aria-expanded': boolean;
  'aria-controls': string;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

export interface MenuProps {
  /** Renders the button that opens the menu, given the props it needs */
  trigger: (props: MenuTriggerProps) => ReactNode;
  items: MenuItem[];
  /** Names the menu for screen readers */
  'aria-label': string;
  /** Line the menu up with the trigger's start or end edge. Default start */
  align?: 'start' | 'end';
  className?: string;
}

/**
 * A list of actions that opens from a button. Arrow keys, Home and End move between items;
 * Escape, Tab or a click outside closes it and focus goes back to the button
 */
export function Menu({ trigger, items, align = 'start', className, ...aria }: MenuProps) {
  const id = useId();
  const menu = useRef<HTMLDivElement>(null);
  // The trigger is found by the aria-controls it carries, so it needs no ref (React 18 drops refs on function components)
  const button = () => document.querySelector<HTMLElement>(`[aria-controls="${CSS.escape(`${id}-menu`)}"]`);
  const [open, setOpen] = useState(false);
  const firstFocus = useRef<'first' | 'last'>('first');

  const enabled = () => [...(menu.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? [])];

  function position() {
    const el = menu.current;
    const anchor = button();
    if (!el || !anchor) return;
    place(anchor, el, 'bottom', 6);
    if (align === 'end') {
      const a = anchor.getBoundingClientRect();
      el.style.left = `${Math.max(8, Math.round(a.right - el.offsetWidth))}px`;
    }
  }

  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const onToggle = (e: Event) => {
      const now = (e as ToggleEvent).newState === 'open';
      setOpen(now);
      if (now) {
        position();
        const list = enabled();
        (firstFocus.current === 'last' ? list.at(-1) : list[0])?.focus();
        firstFocus.current = 'first';
      } else if (!document.activeElement || document.activeElement === document.body || el.contains(document.activeElement)) {
        button()?.focus();
      }
    };
    // The menu has no size until it shows, so put it under the trigger now and correct it once it has one
    const onBefore = (e: Event) => {
      const a = button()?.getBoundingClientRect();
      if ((e as ToggleEvent).newState !== 'open' || !a) return;
      el.style.top = `${Math.round(a.bottom + 6)}px`;
      el.style.left = align === 'end' ? '' : `${Math.round(a.left)}px`;
    };
    el.addEventListener('beforetoggle', onBefore);
    el.addEventListener('toggle', onToggle);
    return () => { el.removeEventListener('beforetoggle', onBefore); el.removeEventListener('toggle', onToggle); };
  });

  useEffect(() => {
    if (!open) return;
    const follow = () => position();
    window.addEventListener('resize', follow);
    window.addEventListener('scroll', follow, true);
    return () => { window.removeEventListener('resize', follow); window.removeEventListener('scroll', follow, true); };
  });

  function onTriggerKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    firstFocus.current = e.key === 'ArrowUp' ? 'last' : 'first';
    menu.current?.showPopover();
  }

  function onMenuKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Tab') { menu.current?.hidePopover(); return; }
    const list = enabled();
    const i = list.indexOf(document.activeElement as HTMLButtonElement);
    const next = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: list.length - 1 }[e.key];
    if (next == null) return;
    e.preventDefault();
    list[(next + list.length) % list.length]?.focus();
  }

  return (
    <>
      {trigger({
        popoverTarget: `${id}-menu`,
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': `${id}-menu`,
        onKeyDown: onTriggerKey,
      })}
      <div ref={menu} id={`${id}-menu`} popover="auto" role="menu" aria-label={aria['aria-label']} className={cx('cx-menu', className)} onKeyDown={onMenuKey}>
        {items.map((item, i) =>
          'separator' in item ? (
            <div key={`sep-${i}`} role="separator" className="cx-menu__separator" />
          ) : (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              tabIndex={-1}
              aria-disabled={item.disabled || undefined}
              className={cx('cx-menu__item', item.danger && 'cx-menu__item--danger')}
              onClick={() => {
                if (item.disabled) return;
                menu.current?.hidePopover();
                button()?.focus();
                item.onSelect?.();
              }}
            >
              {item.icon ? <Icon name={item.icon} /> : null}
              {item.label}
            </button>
          ),
        )}
      </div>
    </>
  );
}
