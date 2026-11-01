'use client';
import type { ComponentProps } from 'react';
import { Field, type FieldCommon } from './Field.js';

export type TextFieldProps = FieldCommon & (
  | ({ multiline?: false } & ComponentProps<'input'>)
  | ({ multiline: true } & ComponentProps<'textarea'>)
);

export function TextField({ label, hint, error, optional, hideLabel, multiline, className, id, ...rest }: TextFieldProps) {
  return (
    <Field {...{ label, hint, error, optional, hideLabel, id, className }}>
      {(control) => multiline
        ? <textarea {...(rest as ComponentProps<'textarea'>)} {...control} className="cx-field__control" />
        : <input {...(rest as ComponentProps<'input'>)} {...control} className="cx-field__control" />}
    </Field>
  );
}
