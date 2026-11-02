import type { ElementType, MouseEvent, ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon, type IconName } from './Icon.js';

export interface NavItem {
  label: ReactNode;
  href: string;
  icon?: IconName;
  /** The page you are on: takes the selected wash and aria-current="page" */
  current?: boolean;
  /** A count of things to act on, as a feather badge */
  badge?: number | string;
  /** Draws the badge in red, for failures and alerts */
  alert?: boolean;
}

/** One of these per group. A heading is optional */
export interface NavSection {
  heading?: ReactNode;
  items: NavItem[];
}

export interface SideNavProps {
  /** A flat list, or sections with headings */
  items: NavItem[] | NavSection[];
  /** Names the nav. Default "Main" */
  'aria-label'?: string;
  /** Your router's link component, like Next's Link. It gets href, className, aria-current and children. Default a */
  linkAs?: ElementType;
  /** Runs on every item click, after navigation starts. AppShell uses it to close the menu sheet */
  onNavigate?: (e: MouseEvent) => void;
  className?: string;
}

const isSections = (items: NavItem[] | NavSection[]): items is NavSection[] => items.length > 0 && 'items' in items[0]!;

/** The app's main navigation: 44px pill rows. The current page takes the selected wash, never the action fill */
export function SideNav({ items, linkAs: Link = 'a', onNavigate, className, ...aria }: SideNavProps) {
  const sections = isSections(items) ? items : [{ items }];
  return (
    <nav className={cx('cx-sidenav', className)} aria-label={aria['aria-label'] ?? 'Main'}>
      {sections.map((section, i) => (
        <div key={i} className="cx-sidenav__section">
          {section.heading ? <h2 className="cx-sidenav__heading">{section.heading}</h2> : null}
          <ul className="cx-sidenav__list">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="cx-sidenav__link" aria-current={item.current ? 'page' : undefined} onClick={onNavigate}>
                  {item.icon ? <Icon name={item.icon} /> : null}
                  <span className="cx-sidenav__label">{item.label}</span>
                  {item.badge != null ? <span className={cx('cx-sidenav__badge', item.alert && 'cx-sidenav__badge--alert')}>{item.badge}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
