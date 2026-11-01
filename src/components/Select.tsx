'use client';
import type { ComponentProps, ReactNode } from 'react';
import { Field, type FieldCommon } from './Field.js';
import { Icon } from './Icon.js';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export type SelectProps = FieldCommon & Omit<ComponentProps<'select'>, 'children'> & {
  options: SelectOption[];
  /** A first, empty choice that names what to pick: "Choose a warehouse" */
  placeholder?: string;
};

/** A native select in field clothing: the platform's own picker on phones, full keyboard support everywhere */
export function Select({ label, hint, error, optional, hideLabel, options, placeholder, className, id, ...rest }: SelectProps) {
  return (
    <Field {...{ label, hint, error, optional, hideLabel, id, className }}>
      {(control) => (
        <span className="cx-select">
          <select {...rest} {...control} className="cx-field__control cx-select__control">
            {placeholder != null ? <option value="" disabled={rest.required}>{placeholder}</option> : null}
            {options.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
          </select>
          <Icon name="chevron-down" className="cx-select__chevron" />
        </span>
      )}
    </Field>
  );
}
