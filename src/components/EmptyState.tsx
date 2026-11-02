import type { ReactNode } from 'react';
import { cx, type Tone } from './cx.js';
import { Icon, type IconName } from './Icon.js';

export interface EmptyStateProps {
  /** Says what would be here */
  icon?: IconName;
  /** What is empty, or what happened: "No failed records" */
  title: ReactNode;
  /** Why, and what to do next */
  children?: ReactNode;
  /** One or two buttons. The main one first */
  actions?: ReactNode;
  /** Makes it a large outlined box with the icon as a watermark, for an empty page. Plain otherwise, for inside a panel */
  tone?: Tone;
  /** The heading level for the title. Default h2 */
  as?: 'h2' | 'h3' | 'h4';
  className?: string;
}

/**
 * What a list, a table or a page shows when there is nothing in it yet, and how to fill it. Plain inside a
 * panel; toned, it is a large box: outlined in its tone with its icon as a watermark
 */
export function EmptyState({ icon, title, children, actions, tone, as: Heading = 'h2', className }: EmptyStateProps) {
  return (
    <div className={cx('cx-empty', tone && `cx-empty--toned cx-tone--${tone}`, className)}>
      {icon && !tone ? <span className="cx-empty__icon"><Icon name={icon} /></span> : null}
      {icon && tone ? <Icon name={icon} className="cx-watermark cx-empty__mark" /> : null}
      <Heading className="cx-empty__title">{title}</Heading>
      {children ? <div className="cx-empty__body">{children}</div> : null}
      {actions ? <div className="cx-empty__actions">{actions}</div> : null}
    </div>
  );
}
