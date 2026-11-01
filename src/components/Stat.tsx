import type { ReactNode } from 'react';
import { cx, type Plume } from './cx.js';
import { Icon, type IconName } from './Icon.js';
import { Tag } from './Tag.js';

export interface StatProps {
  /** Short, in the filled tag at the top */
  label: ReactNode;
  value: ReactNode;
  /** One line of context under the number */
  meta?: ReactNode;
  /** The outline and tag color. Default maroon */
  tone?: Plume;
  /** The watermark icon */
  icon?: IconName;
  /** Sets the number in the danger color */
  alert?: boolean;
  /** plume: the one featured tile in a row */
  shape?: 'rounded' | 'plume';
  className?: string;
}

/** A key number in a large outlined box: the label is a small filled tag, the icon a watermark */
export function Stat({ label, value, meta, tone = 'maroon', icon, alert, shape, className }: StatProps) {
  return (
    <div className={cx('cx-stat', `cx-tone--${tone}`, shape === 'plume' && 'cx-stat--plume', className)}>
      {icon ? <Icon name={icon} className="cx-watermark" /> : null}
      <Tag tone={tone}>{label}</Tag>
      <span className={cx('cx-stat__value', alert && 'cx-stat__value--alert')}>{value}</span>
      {meta ? <span className="cx-stat__meta">{meta}</span> : null}
    </div>
  );
}
