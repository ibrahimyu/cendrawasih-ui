import type { SVGProps } from 'react';
import { cx } from './cx.js';

// 2px rounded-stroke outline icons on a 24px grid. A stand-in until the brand draws its own set
const ICONS = {
  info: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 11v5', 'M12 7.5v.5'],
  success: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'm8 12.5 2.8 2.8L16.5 9.5'],
  warning: ['M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z', 'M12 9.5v4', 'M12 17v.5'],
  danger: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'm9 9 6 6', 'm15 9-6 6'],
  orders: ['M6 7h12l1 13H5L6 7Z', 'M9 10V6a3 3 0 0 1 6 0v4'],
  payments: ['M3 7a2 2 0 0 1 2-2h12v4', 'M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2Z', 'M16 14.5h.5'],
  clock: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 7v5l3 2'],
  sync: ['M20 11a8 8 0 0 0-14.9-3.5', 'M4 4v4h4', 'M4 13a8 8 0 0 0 14.9 3.5', 'M20 20v-4h-4'],
  chat: ['M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12Z'],
  plug: ['M9 2v6', 'M15 2v6', 'M6 8h12v3a6 6 0 0 1-12 0V8Z', 'M12 17v5'],
  package: ['m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z', 'M4 7.5 12 12l8-4.5', 'M12 12v9'],
  chart: ['M3 21h18', 'M6 17v-5', 'M11 17V6', 'M16 17v-8', 'M21 17v-3'],
} satisfies Record<string, string[]>;

export type IconName = keyof typeof ICONS;
export const iconNames = Object.keys(ICONS) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  name: IconName;
  /** Width and height in px. Default 20 */
  size?: number;
  /** Accessible name. Without it the icon is decorative */
  title?: string;
}

export function Icon({ name, size = 20, title, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      className={cx('cx-icon', className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {ICONS[name].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
