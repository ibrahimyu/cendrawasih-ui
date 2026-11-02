import type { ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

export interface BannerProps {
  /** Default info. The icon and words carry the meaning; the tint only confirms it */
  tone?: 'info' | 'success' | 'warning' | 'danger';
  /** A few words, in bold: "Accurate maintenance" */
  title?: ReactNode;
  /** One sentence: what, when, and what it means for you */
  children: ReactNode;
  /** A link or a small button */
  action?: ReactNode;
  /** Shows a close button that calls this */
  onDismiss?: () => void;
  /** Default "Dismiss" */
  dismissLabel?: string;
  className?: string;
}

/**
 * A message about the whole app or account, across the top of the page: maintenance, an expiring plan,
 * a connection down everywhere. For a message about one region of a page, use Notice
 */
export function Banner({ tone = 'info', title, children, action, onDismiss, dismissLabel = 'Dismiss', className }: BannerProps) {
  return (
    <div className={cx('cx-banner', `cx-banner--${tone}`, className)} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className="cx-banner__icon"><Icon name={tone} size={20} /></span>
      <p className="cx-banner__text">
        {title ? <strong className="cx-banner__title">{title}</strong> : null}
        {children}
      </p>
      {action ? <div className="cx-banner__action">{action}</div> : null}
      {onDismiss ? (
        <button type="button" className="cx-banner__close" aria-label={dismissLabel} onClick={onDismiss}>
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </div>
  );
}
