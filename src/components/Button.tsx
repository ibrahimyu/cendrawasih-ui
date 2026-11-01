import type { ComponentProps, ReactNode } from 'react';
import { cx } from './cx.js';

interface Common {
  /** primary: the main action. plume: the one yellow spotlight per view. Default primary */
  variant?: 'primary' | 'plume' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** feather: three round corners and a sharp tip, for conversation actions only (chat, message, reply). Default plume */
  shape?: 'plume' | 'feather';
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}
export type ButtonProps = Common & (
  | ({ href?: undefined } & ComponentProps<'button'>)
  | ({ href: string } & ComponentProps<'a'>)
);

/** A plume-shaped control. Hover flips its corners, press squares them. Renders a link when given href */
export function Button({ variant = 'primary', size = 'md', shape = 'plume', iconStart, iconEnd, className, children, ...rest }: ButtonProps) {
  const classes = cx('cx-btn', `cx-btn--${variant}`, `cx-btn--${size}`, shape === 'feather' && 'cx-btn--feather', className);
  const content = (
    <>
      {iconStart ? <span className="cx-btn__icon" aria-hidden>{iconStart}</span> : null}
      {children}
      {iconEnd ? <span className="cx-btn__icon" aria-hidden>{iconEnd}</span> : null}
    </>
  );
  if (rest.href != null) return <a {...(rest as ComponentProps<'a'>)} className={classes}>{content}</a>;
  const { type = 'button', ...button } = rest as ComponentProps<'button'>;
  return <button type={type} {...button} className={classes}>{content}</button>;
}
