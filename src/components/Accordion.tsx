'use client';
import { createContext, useContext, useId, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

const GroupName = createContext<string | undefined>(undefined);

export interface AccordionProps {
  /** AccordionItems */
  children: ReactNode;
  /** Opening one closes the others. Default false */
  exclusive?: boolean;
  className?: string;
}

/** Sections that open and close in place, in one outlined box */
export function Accordion({ children, exclusive, className }: AccordionProps) {
  const name = useId();
  return (
    <div className={cx('cx-accordion', className)}>
      <GroupName.Provider value={exclusive ? name : undefined}>{children}</GroupName.Provider>
    </div>
  );
}

export interface AccordionItemProps {
  /** The section's name, in a few words */
  title: ReactNode;
  /** A short fact on the right: "3 fields", "Failed" */
  meta?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /** Controlled: pair with onToggle */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
}

/**
 * One section: a native details element, so it works without script and the browser's find-in-page
 * opens it. The chevron turns when it opens
 */
export function AccordionItem({ title, meta, children, defaultOpen, open, onToggle, className }: AccordionItemProps) {
  const name = useContext(GroupName);
  return (
    <details
      className={cx('cx-accordion__item', className)}
      name={name}
      open={open ?? defaultOpen}
      onToggle={(e) => onToggle?.(e.currentTarget.open)}
    >
      <summary className="cx-accordion__summary">
        <span className="cx-accordion__title">{title}</span>
        {meta != null ? <span className="cx-accordion__meta">{meta}</span> : null}
        <Icon name="chevron-down" size={20} className="cx-accordion__chevron" />
      </summary>
      <div className="cx-accordion__content">{children}</div>
    </details>
  );
}
