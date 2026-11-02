import type { CSSProperties } from 'react';
import { cx } from './cx.js';

export interface SkeletonProps {
  /** text: lines of body text. block: a box, like a chart or a card. circle: an avatar or an icon tile. Default text */
  shape?: 'text' | 'block' | 'circle';
  /** For text: how many lines. The last one is shorter. Default 1 */
  lines?: number;
  /** Any CSS length. Text defaults to the full width, a block to 100% × 120px, a circle to 40px */
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
}

/**
 * The shape of content that hasn't arrived yet, in still blocks of fill-pressed. Hidden from screen readers:
 * mark the region aria-busy and say what is loading in words
 */
export function Skeleton({ shape = 'text', lines = 1, width, height, className, style }: SkeletonProps) {
  const size = { width, height, ...style };
  if (shape === 'text') {
    return (
      <span className={cx('cx-skeleton-lines', className)} style={{ width, ...style }} aria-hidden>
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} className="cx-skeleton cx-skeleton--text" style={lines > 1 && i === lines - 1 ? { width: '60%' } : undefined} />
        ))}
      </span>
    );
  }
  return <span className={cx('cx-skeleton', `cx-skeleton--${shape}`, className)} style={size} aria-hidden />;
}
