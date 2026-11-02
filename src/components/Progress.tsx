import { useId, type ReactNode } from 'react';
import { cx } from './cx.js';

export interface ProgressProps {
  /** What is in progress, in words: "Syncing Shopee orders" */
  label: ReactNode;
  /** How far along. Leave it out when nobody knows, and the bar sweeps instead */
  value?: number;
  /** Default 100 */
  max?: number;
  /** Replaces the percentage, on screen and for screen readers: "214 of 1.120 orders" */
  valueText?: string;
  /** action while working; success when done; danger when it stopped. Default action */
  tone?: 'action' | 'success' | 'danger';
  /** Keeps the label for screen readers only, when the words are already beside the bar */
  hideLabel?: boolean;
  /** For the percentage. Default id-ID */
  locale?: string;
  className?: string;
}

/**
 * How far along a sync, an import or an upload is: a label, the amount, and an 8px pill bar. Without a
 * value, the bar sweeps: the one looping animation in Cendra, and it stops under reduced motion
 */
export function Progress({ label, value, max = 100, valueText, tone = 'action', hideLabel, locale = 'id-ID', className }: ProgressProps) {
  const id = useId();
  const known = value != null;
  const ratio = known ? Math.min(Math.max(value / max, 0), 1) : 0;
  const text = valueText ?? (known ? new Intl.NumberFormat(locale, { style: 'percent' }).format(ratio) : undefined);
  return (
    <div className={cx('cx-progress', `cx-progress--${tone}`, !known && 'cx-progress--indeterminate', className)}>
      <div className={cx('cx-progress__head', hideLabel && 'cx-visually-hidden')}>
        <span className="cx-progress__label" id={`${id}-label`}>{label}</span>
        {text ? <span className="cx-progress__value" aria-hidden>{text}</span> : null}
      </div>
      <div
        className="cx-progress__track"
        role="progressbar"
        aria-labelledby={`${id}-label`}
        aria-valuemin={known ? 0 : undefined}
        aria-valuemax={known ? max : undefined}
        aria-valuenow={known ? value : undefined}
        aria-valuetext={known ? text : undefined}
      >
        <div className="cx-progress__fill" style={known ? { width: `${ratio * 100}%` } : undefined} />
      </div>
    </div>
  );
}
