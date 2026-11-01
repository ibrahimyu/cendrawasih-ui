'use client';
import { useId, type ComponentProps, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

interface Common {
  label: ReactNode;
  hint?: ReactNode;
  /** Written as an instruction: "Enter an email like name@company.com" */
  error?: ReactNode;
  /** Marks the field optional. Pass a string to translate the word */
  optional?: boolean | string;
}
export type TextFieldProps = Common & (
  | ({ multiline?: false } & ComponentProps<'input'>)
  | ({ multiline: true } & ComponentProps<'textarea'>)
);

export function TextField({ label, hint, error, optional, multiline, className, id, ...rest }: TextFieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const control = {
    id: fieldId,
    className: 'cx-field__control',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': cx(errorId, hintId) || undefined,
  };
  return (
    <div className={cx('cx-field', error ? 'cx-field--error' : null, className)}>
      <label className="cx-field__label" htmlFor={fieldId}>
        {label}
        {optional ? <span className="cx-field__optional">{optional === true ? 'Optional' : optional}</span> : null}
      </label>
      {multiline
        ? <textarea {...(rest as ComponentProps<'textarea'>)} {...control} />
        : <input {...(rest as ComponentProps<'input'>)} {...control} />}
      {error ? <span className="cx-field__error" id={errorId}><Icon name="danger" />{error}</span> : null}
      {hint ? <span className="cx-field__hint" id={hintId}>{hint}</span> : null}
    </div>
  );
}
