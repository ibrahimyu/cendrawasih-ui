import type { ComponentProps, ReactNode } from 'react';
import { cx, type Plume } from './cx.js';
import { Icon, type IconName } from './Icon.js';

interface Common {
  /** plume: two rounded corners and two sharp ones, for the one featured card. Default rounded */
  shape?: 'rounded' | 'plume';
  /** Gives the card a 3px outline in this color and a watermark in its paired color */
  tone?: Plume;
  /** The watermark icon, cropped off the bottom-right corner. Use with tone */
  icon?: IconName;
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** An illustration on a filled color tile at the top */
  media?: ReactNode;
  mediaTone?: Plume;
  footer?: ReactNode;
}
export type CardProps = Common & Omit<ComponentProps<'div'>, 'title'> & { href?: string };

/** A large box. Neutral by default; with tone, outlined in a plume color */
export function Card({ shape = 'rounded', tone, icon, eyebrow, title, media, mediaTone = 'maroon', footer, className, children, href, ...rest }: CardProps) {
  const classes = cx('cx-card', `cx-card--${shape}`, tone && `cx-card--toned cx-tone--${tone}`, className);
  const content = (
    <>
      {icon ? <Icon name={icon} className="cx-watermark" /> : null}
      {media ? <div className={cx('cx-card__media', `cx-card__media--${mediaTone}`)}>{media}</div> : null}
      {eyebrow ? <span className="cx-card__eyebrow">{eyebrow}</span> : null}
      {title ? <strong className="cx-card__title">{title}</strong> : null}
      {children ? <div className="cx-card__body">{children}</div> : null}
      {footer ? <div className="cx-card__footer">{footer}</div> : null}
    </>
  );
  if (href != null) return <a {...(rest as ComponentProps<'a'>)} href={href} className={classes}>{content}</a>;
  return <div {...rest} className={classes}>{content}</div>;
}
