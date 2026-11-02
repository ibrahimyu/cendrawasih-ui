import type { ComponentProps, ElementType } from 'react';
import { cx, type Tone } from './cx.js';

export interface BandProps extends ComponentProps<'section'> {
  /** The outline and watermark, or with filled, the ground. Default primary */
  tone?: Tone;
  /** The full-color field, for full-bleed marketing sections only */
  filled?: boolean;
  /** Default section */
  as?: ElementType;
}

/** A wide hero box with the brand's mark bleeding off its edge */
export function Band({ tone = 'primary', filled, as: Tag = 'section', className, children, ...rest }: BandProps) {
  return (
    <Tag {...rest} className={cx('cx-band', `cx-tone--${tone}`, filled && 'cx-band--filled', className)}>
      <span className="cx-band__plume" aria-hidden />
      <div className="cx-band__inner">{children}</div>
    </Tag>
  );
}
