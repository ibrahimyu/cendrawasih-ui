'use client';
import type { ComponentProps, ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

export interface FilterChipProps extends Omit<ComponentProps<'button'>, 'onChange'> {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  /** How many rows the filter matches, as a feather badge */
  count?: number;
  children: ReactNode;
}

/** A filter you turn on and off. A pill, because you press it; on, it takes the selected wash and a check */
export function FilterChip({ pressed, onPressedChange, count, className, children, ...rest }: FilterChipProps) {
  return (
    <button
      type="button"
      {...rest}
      aria-pressed={pressed}
      className={cx('cx-chip', className)}
      onClick={() => onPressedChange(!pressed)}
    >
      {pressed ? <Icon name="check" size={16} className="cx-chip__check" /> : null}
      {children}
      {count != null ? <span className="cx-chip__count">{count}</span> : null}
    </button>
  );
}

export interface FilterBarProps {
  /** Names the group of filters. Default "Filters" */
  label?: string;
  /** The controls: a SearchField, FilterChips, a Select or a button that opens a filter Sheet */
  children: ReactNode;
  /** What the filters match, read out when it changes: "128 orders" */
  result?: ReactNode;
  /** Shows a clear button while any filter is on */
  active?: boolean;
  onClear?: () => void;
  /** Default "Clear filters" */
  clearLabel?: string;
  className?: string;
}

/** The row of filters above a Table, with what they match and a way to clear them */
export function FilterBar({ label = 'Filters', children, result, active, onClear, clearLabel = 'Clear filters', className }: FilterBarProps) {
  return (
    <div className={cx('cx-filterbar', className)} role="group" aria-label={label}>
      <div className="cx-filterbar__controls">{children}</div>
      <div className="cx-filterbar__status">
        <p className="cx-filterbar__result" role="status">{result}</p>
        {active && onClear ? (
          <button type="button" className="cx-btn cx-btn--ghost cx-btn--sm" onClick={onClear}>{clearLabel}</button>
        ) : null}
      </div>
    </div>
  );
}
