'use client';
import { useId, useState, type ComponentProps, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

type InputProps = Omit<ComponentProps<'input'>, 'type' | 'children'>;

export interface CheckboxProps extends InputProps {
  label: ReactNode;
  hint?: ReactNode;
  /** Some but not all of the things it stands for are checked */
  indeterminate?: boolean;
}

/** A choice that is on or off and takes effect when the form is submitted. For settings that apply at once, use Switch */
export function Checkbox({ label, hint, indeterminate, className, id, ...rest }: CheckboxProps) {
  return (
    <ChoiceRow kind="check" {...{ label, hint, className, id }}>
      {(control) => (
        <input
          {...rest}
          {...control}
          type="checkbox"
          className="cx-choice__input cx-choice__input--check"
          ref={(el) => { if (el) el.indeterminate = Boolean(indeterminate); }}
        />
      )}
    </ChoiceRow>
  );
}

export interface SwitchProps extends InputProps {
  label: ReactNode;
  hint?: ReactNode;
}

/** A setting that takes effect the moment it flips: notifications, auto-sync. Never inside a form with a submit button */
export function Switch({ label, hint, className, id, ...rest }: SwitchProps) {
  return (
    <ChoiceRow kind="switch" {...{ label, hint, className, id }}>
      {(control) => <input {...rest} {...control} type="checkbox" role="switch" className="cx-choice__input cx-choice__input--switch" />}
    </ChoiceRow>
  );
}

export interface RadioOption {
  value: string;
  label: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  legend: ReactNode;
  options: RadioOption[];
  /** Shared by the radios. Defaults to a generated name */
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hint?: ReactNode;
  error?: ReactNode;
  /** Lay short options side by side */
  inline?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/** One choice out of two to six. More than six, or long labels: use Select. Arrow keys move between options */
export function RadioGroup({ legend, options, name, value, defaultValue, onChange, hint, error, inline, required, disabled, className }: RadioGroupProps) {
  const auto = useId();
  const groupName = name ?? auto;
  const [own, setOwn] = useState(defaultValue);
  const current = value ?? own;
  return (
    <ChoiceGroup {...{ legend, hint, error, inline, className }}>
      {options.map((o) => (
        <ChoiceRow key={o.value} kind="radio" label={o.label} hint={o.hint}>
          {(control) => (
            <input
              {...control}
              type="radio"
              className="cx-choice__input cx-choice__input--radio"
              name={groupName}
              value={o.value}
              checked={current === o.value}
              required={required}
              disabled={disabled || o.disabled}
              onChange={() => { if (value == null) setOwn(o.value); onChange?.(o.value); }}
            />
          )}
        </ChoiceRow>
      ))}
    </ChoiceGroup>
  );
}

export interface ChoiceGroupProps {
  legend: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  inline?: boolean;
  className?: string;
  children: ReactNode;
}

/** A labelled set of checkboxes, radios or switches: a fieldset whose legend names the question */
export function ChoiceGroup({ legend, hint, error, inline, className, children }: ChoiceGroupProps) {
  const id = useId();
  return (
    <fieldset
      className={cx('cx-choices', inline && 'cx-choices--inline', error ? 'cx-choices--error' : null, className)}
      aria-describedby={cx(error ? `${id}-error` : null, hint ? `${id}-hint` : null) || undefined}
    >
      <legend className="cx-field__label">{legend}</legend>
      {hint ? <span className="cx-field__hint" id={`${id}-hint`}>{hint}</span> : null}
      <div className="cx-choices__list">{children}</div>
      {error ? <span className="cx-field__error" id={`${id}-error`}><Icon name="danger" />{error}</span> : null}
    </fieldset>
  );
}

interface ChoiceRowProps {
  kind: 'check' | 'radio' | 'switch';
  label: ReactNode;
  hint?: ReactNode;
  id?: string;
  className?: string;
  children: (control: { id: string; 'aria-describedby'?: string }) => ReactNode;
}

function ChoiceRow({ kind, label, hint, id, className, children }: ChoiceRowProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const hintId = hint ? `${inputId}-hint` : undefined;
  return (
    <div className={cx('cx-choice', `cx-choice--${kind}`, className)}>
      {children({ id: inputId, 'aria-describedby': hintId })}
      <span className="cx-choice__text">
        <label className="cx-choice__label" htmlFor={inputId}>{label}</label>
        {hint ? <span className="cx-choice__hint" id={hintId}>{hint}</span> : null}
      </span>
    </div>
  );
}
