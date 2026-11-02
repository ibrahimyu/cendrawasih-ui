import { createElement, type SVGProps } from 'react';
import { cx } from './cx.js';
import { ICONS } from './icons.js';

// The icon set: 2px rounded-stroke outline icons on a 24px grid, drawn from Lucide.
// To add one, add it to scripts/build-icons.mjs and run npm run icons
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
      {ICONS[name].map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
