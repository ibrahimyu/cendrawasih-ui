import type { ReactNode } from 'react';
import { AppShell, Button, Icon, type NavItem } from '@cendra/ui';
import logoDay from '../assets/logos/cendra-main-horizontal.svg';
import logoNight from '../assets/logos/cendra-white-horizontal.svg';
import './dashboard.css';

export type AppPage = 'dashboard' | 'orders' | 'order' | 'settings' | 'welcome';

const logo = (
  <a href="#dashboard" className="db-home">
    <img className="db-logo--day" src={logoDay} alt="Cendra" />
    <img className="db-logo--night" src={logoNight} alt="Cendra" />
  </a>
);

function nav(page: AppPage): NavItem[] {
  return [
    { label: 'Overview', icon: 'overview', href: '#dashboard', current: page === 'dashboard' || page === 'welcome' },
    { label: 'Orders', icon: 'orders', href: '#orders', current: page === 'orders' || page === 'order', badge: 3, alert: true },
    { label: 'Integrations', icon: 'plug', href: '#integrations' },
    { label: 'Sync runs', icon: 'sync', href: '#runs' },
    { label: 'Field mapping', icon: 'mapping', href: '#mapping' },
    { label: 'Settings', icon: 'settings', href: '#settings', current: page === 'settings' },
  ];
}

/** The app around every playground screen: the Cendra shell, its nav and the help card */
export function Frame({ page, children }: { page: AppPage; children: ReactNode }) {
  return (
    <AppShell
      className="db"
      logo={logo}
      nav={nav(page)}
      sideTop={
        <div className="db-workspace">
          <span className="cx-caption">Workspace</span>
          <span className="cx-label">Toko Sinar Abadi</span>
          <span className="cx-caption">Jakarta · 5 tools connected</span>
        </div>
      }
      sideBottom={
        <div className="db-help cx-tone--maroon">
          <Icon name="chat" className="cx-watermark" />
          <span className="cx-subtitle">Need a hand?</span>
          <span className="cx-body-sm">Your Cendra engineer replies within an hour on WhatsApp.</span>
          <Button variant="secondary" size="sm" iconStart={<Icon name="chat" size={16} />}>Chat on WhatsApp</Button>
        </div>
      }
      actions={<Button variant="ghost" size="sm" aria-label="Alerts, 3 new"><Icon name="alerts" /></Button>}
    >
      {children}
    </AppShell>
  );
}
