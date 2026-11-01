'use client';
import { useId, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

export interface FieldCommon {
  label: ReactNode;
  hint?: ReactNode;
  /** Written as an instruction: "Enter an email like name@company.com" */
  error?: ReactNode;
  /** Marks the field optional. Pass a string to translate the word */
  optional?: boolean | string;
  /** Keeps the label for screen readers but hides it on screen. Only where the purpose is obvious, like search */
  hideLabel?: boolean;
}

/** What a control inside a Field needs to be labelled and described */
export interface FieldControl {
  id: string;
  'aria-invalid'?: true;
  'aria-describedby'?: string;
}

interface FieldProps extends FieldCommon {
  id?: string;
  className?: string;
  children: (control: FieldControl) => ReactNode;
}

/** The label, hint and error around a text-like control. TextField, Select and SearchField share it */
export function Field({ label, hint, error, optional, hideLabel, id, className, children }: FieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const control: FieldControl = {
    id: fieldId,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': cx(errorId, hintId) || undefined,
  };
  return (
    <div className={cx('cx-field', error ? 'cx-field--error' : null, className)}>
      <label className={cx('cx-field__label', hideLabel && 'cx-visually-hidden')} htmlFor={fieldId}>
        {label}
        {optional ? <span className="cx-field__optional">{optional === true ? 'Optional' : optional}</span> : null}
      </label>
      {children(control)}
      {error ? <span className="cx-field__error" id={errorId}><Icon name="danger" />{error}</span> : null}
      {hint ? <span className="cx-field__hint" id={hintId}>{hint}</span> : null}
    </div>
  );
}
