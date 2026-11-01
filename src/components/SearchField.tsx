'use client';
import { useRef, useState, type ComponentProps } from 'react';
import { Field, type FieldCommon } from './Field.js';
import { Icon } from './Icon.js';

export type SearchFieldProps = FieldCommon & Omit<ComponentProps<'input'>, 'type'> & {
  /** Called when the clear button empties the field */
  onClear?: () => void;
  /** Accessible name of the clear button. Default "Clear search" */
  clearLabel?: string;
};

/** A text field with a search icon and a clear button that appears once there is something to clear */
export function SearchField({ label, hint, error, optional, hideLabel, onClear, clearLabel = 'Clear search', className, id, value, defaultValue, onChange, ...rest }: SearchFieldProps) {
  const [own, setOwn] = useState(String(defaultValue ?? ''));
  const current = value != null ? String(value) : own;
  const input = useRef<HTMLInputElement>(null);
  return (
    <Field {...{ label, hint, error, optional, hideLabel, id, className }}>
      {(control) => (
        <span className="cx-search">
          <Icon name="search" className="cx-search__icon" />
          <input
            {...rest}
            {...control}
            ref={input}
            type="search"
            className="cx-field__control cx-search__control"
            value={current}
            onChange={(e) => { if (value == null) setOwn(e.target.value); onChange?.(e); }}
          />
          {current ? (
            <button type="button" className="cx-search__clear" aria-label={clearLabel}
              onClick={() => { if (value == null) setOwn(''); onClear?.(); input.current?.focus(); }}>
              <Icon name="close" size={16} />
            </button>
          ) : null}
        </span>
      )}
    </Field>
  );
}
