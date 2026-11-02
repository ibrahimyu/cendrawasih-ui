import type { ElementType, ReactNode } from 'react';
import { Breadcrumb, type Crumb } from './Breadcrumb.js';
import { cx } from './cx.js';

export interface PageHeaderProps {
  /** The page's name. Becomes the h1 */
  title: ReactNode;
  /** A trail above the title, for pages below the top level */
  breadcrumb?: Crumb[];
  /** A word above the title: the workspace or the kind of record. Not with a breadcrumb */
  eyebrow?: ReactNode;
  /** Beside the title: a status Tag */
  status?: ReactNode;
  /** Under the title: one sentence, or facts like "Created 12 Nov 2026 · Shopee" */
  children?: ReactNode;
  /** On the right: at most one primary button, then secondary ones or a Menu */
  actions?: ReactNode;
  /** Your router's link component, for the breadcrumb */
  linkAs?: ElementType;
  className?: string;
}

/**
 * The top of every page: where it sits, what it is, its state and what you can do with it. Actions sit on
 * the right and wrap under the title on narrow screens
 */
export function PageHeader({ title, breadcrumb, eyebrow, status, children, actions, linkAs, className }: PageHeaderProps) {
  return (
    <header className={cx('cx-pageheader', className)}>
      {breadcrumb ? <Breadcrumb items={breadcrumb} linkAs={linkAs} /> : null}
      <div className="cx-pageheader__row">
        <div className="cx-pageheader__text">
          {eyebrow && !breadcrumb ? <span className="cx-pageheader__eyebrow">{eyebrow}</span> : null}
          <div className="cx-pageheader__titleline">
            <h1 className="cx-pageheader__title">{title}</h1>
            {status}
          </div>
          {children ? <div className="cx-pageheader__meta">{children}</div> : null}
        </div>
        {actions ? <div className="cx-pageheader__actions">{actions}</div> : null}
      </div>
    </header>
  );
}
