import type { ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

export interface NoticeProps {
  /** Default info. The icon and title carry the meaning; color only confirms it */
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: ReactNode;
  children?: ReactNode;
  /** A button or link on the right */
  action?: ReactNode;
  className?: string;
}

export function Notice({ tone = 'info', title, children, action, className }: NoticeProps) {
  return (
    <div className={cx('cx-notice', `cx-notice--${tone}`, className)} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className="cx-notice__icon"><Icon name={tone} /></span>
      <div className="cx-notice__text">
        {title ? <strong className="cx-notice__title">{title}</strong> : null}
        {children ? <div className="cx-notice__body">{children}</div> : null}
      </div>
      {action ? <div className="cx-notice__action">{action}</div> : null}
    </div>
  );
}
