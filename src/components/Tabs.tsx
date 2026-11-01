'use client';
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from './cx.js';

export interface TabItem {
  id: string;
  label: ReactNode;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled selection */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** The id of each tab's panel, for aria-controls */
  panelIds?: Record<string, string>;
  'aria-label'?: string;
  className?: string;
}

/** A pill track; the selected tab takes the action fill. Arrow keys, Home and End move between tabs */
export function Tabs({ items, value, defaultValue, onChange, panelIds, className, ...aria }: TabsProps) {
  const [own, setOwn] = useState(defaultValue ?? items[0]?.id);
  const selected = value ?? own;
  const refs = useRef(new Map<string, HTMLButtonElement>());

  function select(id: string) {
    if (value == null) setOwn(id);
    onChange?.(id);
  }

  function onKeyDown(e: KeyboardEvent) {
    const i = items.findIndex((t) => t.id === selected);
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: items.length - 1 }[e.key];
    if (next == null) return;
    e.preventDefault();
    const tab = items[(next + items.length) % items.length];
    if (!tab) return;
    select(tab.id);
    refs.current.get(tab.id)?.focus();
  }

  return (
    <div className={cx('cx-tabs', className)} role="tablist" aria-label={aria['aria-label']} onKeyDown={onKeyDown}>
      {items.map((t) => {
        const on = t.id === selected;
        return (
          <button
            key={t.id}
            ref={(el) => { if (el) refs.current.set(t.id, el); else refs.current.delete(t.id); }}
            type="button"
            role="tab"
            id={`${t.id}-tab`}
            aria-selected={on}
            aria-controls={panelIds?.[t.id]}
            tabIndex={on ? 0 : -1}
            className="cx-tab"
            onClick={() => select(t.id)}
          >
            {t.label}
            {t.count != null ? <span className="cx-tab__count">{t.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
