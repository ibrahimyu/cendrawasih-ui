import type { ElementType, ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

export interface Crumb {
  label: ReactNode;
  /** Every crumb but the last links somewhere */
  href?: string;
}

export interface BreadcrumbProps {
  /** From the top level down to the current page, which comes last */
  items: Crumb[];
  /** Default "Breadcrumb" */
  'aria-label'?: string;
  /** Your router's link component. Default a */
  linkAs?: ElementType;
  className?: string;
}

/**
 * Where this page sits, as a trail of links above its title. The current page ends the trail as plain
 * text. On phones only the parent shows, as a back link
 */
export function Breadcrumb({ items, linkAs: Link = 'a', className, ...aria }: BreadcrumbProps) {
  const last = items.length - 1;
  return (
    <nav className={cx('cx-breadcrumb', className)} aria-label={aria['aria-label'] ?? 'Breadcrumb'}>
      <ol className="cx-breadcrumb__list">
        {items.map((item, i) => (
          <li key={i} className={cx('cx-breadcrumb__item', i === last - 1 && 'cx-breadcrumb__item--parent')}>
            {i === last ? (
              <span className="cx-breadcrumb__current" aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href} className="cx-breadcrumb__link">
                <Icon name="chevron-left" size={16} className="cx-breadcrumb__back" />
                {item.label}
              </Link>
            )}
            {i < last ? <Icon name="chevron-right" size={16} className="cx-breadcrumb__sep" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
