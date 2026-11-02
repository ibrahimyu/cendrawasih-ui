import type { CSSProperties } from 'react';
import { cx } from './cx.js';

export interface BrandMarkProps {
  /** Width and height in px. Default 32 */
  size?: number;
  /** Accessible name. Without it the mark is decorative */
  title?: string;
  className?: string;
  style?: CSSProperties;
}

/** The current brand's mark (--brand-mark), drawn in currentColor. Shows nothing for a brand without one */
export function BrandMark({ size = 32, title, className, style }: BrandMarkProps) {
  return (
    <span
      className={cx('cx-brandmark', className)}
      style={{ width: size, height: size, ...style }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    />
  );
}
