import type { ComponentProps, ElementType } from 'react';
import { cx } from './cx.js';
import { Logogram } from './Logogram.js';

// The brand guide's three supergraphic pairings, and the plume tone each one outlines with
const TONES = { night: 'maroon', sunrise: 'red', forest: 'green' } as const;

export interface BandProps extends ComponentProps<'section'> {
  /** Default night */
  tone?: keyof typeof TONES;
  /** The full-color field, for full-bleed marketing sections only */
  filled?: boolean;
  /** Default section */
  as?: ElementType;
}

/** A wide hero box with the logogram bleeding off its edge */
export function Band({ tone = 'night', filled, as: Tag = 'section', className, children, ...rest }: BandProps) {
  return (
    <Tag {...rest} className={cx('cx-band', `cx-band--${tone}`, filled ? 'cx-band--filled' : `cx-tone--${TONES[tone]}`, className)}>
      <Logogram size={null} className="cx-band__plume" />
      <div className="cx-band__inner">{children}</div>
    </Tag>
  );
}
