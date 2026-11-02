import type { ComponentProps } from 'react';
import { cx, type Status, type Tone } from './cx.js';

export interface TagProps extends ComponentProps<'span'> {
  /** A brand tone, neutral, or a status. Status tags are always soft. Default neutral */
  tone?: Tone | Status | 'neutral';
  /** A tinted wash instead of the full fill. Brand tones only: status tags are soft already */
  soft?: boolean;
}

/** A small filled label with the feather tip, which marks it as not clickable. Never a button */
export function Tag({ tone = 'neutral', soft, className, ...rest }: TagProps) {
  return <span {...rest} className={cx('cx-tag', `cx-tag--${tone}`, soft && 'cx-tag--soft', className)} />;
}
