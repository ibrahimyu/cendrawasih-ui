import type { ComponentProps } from 'react';
import { cx, type Plume } from './cx.js';

export interface TagProps extends ComponentProps<'span'> {
  /** Default neutral */
  tone?: Plume | 'neutral';
  /** A tinted wash instead of the full fill, for status in tables and lists */
  soft?: boolean;
}

/** A small filled label. Never a button */
export function Tag({ tone = 'neutral', soft, className, ...rest }: TagProps) {
  return <span {...rest} className={cx('cx-tag', `cx-tag--${tone}`, soft && 'cx-tag--soft', className)} />;
}
