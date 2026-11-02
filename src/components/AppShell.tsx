'use client';
import { useId, useState, type ElementType, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Sheet } from './Dialog.js';
import { Icon } from './Icon.js';
import { PlumeBar } from './PlumeBar.js';
import { SideNav, type SideNavProps } from './SideNav.js';

export interface TopBarProps {
  /** The logo, ideally a link home */
  logo: ReactNode;
  /** Shows a menu button at the start that calls this */
  onMenu?: () => void;
  /** Whether the menu it opens is open, for aria-expanded */
  menuOpen?: boolean;
  /** Accessible name of the menu button. Default "Menu" */
  menuLabel?: string;
  /** Buttons at the end: search, notifications, the account */
  actions?: ReactNode;
  className?: string;
}

/** The bar across the top of the app below laptop width: menu button, logo, a few actions */
export function TopBar({ logo, onMenu, menuOpen, menuLabel = 'Menu', actions, className }: TopBarProps) {
  return (
    <header className={cx('cx-topbar', className)}>
      {onMenu ? (
        <button type="button" className="cx-topbar__menu" aria-label={menuLabel} aria-expanded={menuOpen} aria-haspopup="dialog" onClick={onMenu}>
          <Icon name="menu" />
        </button>
      ) : null}
      <div className="cx-topbar__logo">{logo}</div>
      {actions ? <div className="cx-topbar__actions">{actions}</div> : null}
    </header>
  );
}

export interface AppShellProps {
  /** The logo, ideally a link home. Shown in the side column, and in the top bar below laptop width */
  logo: ReactNode;
  /** The nav items, flat or in sections */
  nav: SideNavProps['items'];
  /** Names the nav. Default "Main" */
  navLabel?: string;
  /** Your router's link component. Default a */
  linkAs?: ElementType;
  /** Above the nav: the workspace or store you are in */
  sideTop?: ReactNode;
  /** At the foot of the side column: help, the account */
  sideBottom?: ReactNode;
  /** At the end of the top bar below laptop width */
  actions?: ReactNode;
  /** The plume bar across the top. Default true */
  plumeBar?: boolean;
  /** Default "Menu" and "Skip to content" */
  menuLabel?: string;
  skipLabel?: string;
  children: ReactNode;
  className?: string;
}

/**
 * The frame of an app. From laptop width, a side column with the logo, the nav and whatever you
 * put above and below it. Below, a top bar whose menu button opens the same column in a sheet
 */
export function AppShell({
  logo, nav, navLabel, linkAs, sideTop, sideBottom, actions, plumeBar = true,
  menuLabel = 'Menu', skipLabel = 'Skip to content', children, className,
}: AppShellProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className={cx('cx-shell', className)}>
      <a className="cx-shell__skip" href={`#${id}-main`}>{skipLabel}</a>
      {plumeBar ? <PlumeBar /> : null}
      <TopBar logo={logo} onMenu={() => setOpen(true)} menuOpen={open} menuLabel={menuLabel} actions={actions} />
      <div className="cx-shell__body">
        <aside className="cx-shell__side">
          <div className="cx-shell__logo">{logo}</div>
          {sideTop}
          <SideNav items={nav} aria-label={navLabel} linkAs={linkAs} />
          {sideBottom ? <div className="cx-shell__foot">{sideBottom}</div> : null}
        </aside>
        <main id={`${id}-main`} className="cx-shell__main" tabIndex={-1}>{children}</main>
      </div>
      <Sheet side="start" open={open} onClose={() => setOpen(false)} title={menuLabel} className="cx-shell__sheet">
        {sideTop}
        <SideNav items={nav} aria-label={navLabel} linkAs={linkAs} onNavigate={() => setOpen(false)} />
        {sideBottom}
      </Sheet>
    </div>
  );
}
