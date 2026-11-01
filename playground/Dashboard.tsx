import { Band, Button, Icon, Notice, PlumeBar, Stat, Tabs, Tag, type Plume } from '@cendra/ui';
import logoDay from '../assets/logos/cendra-main-horizontal.svg';
import logoNight from '../assets/logos/cendra-white-horizontal.svg';
import './dashboard.css';

const fmt = (n: number) => n.toLocaleString('id-ID');

// Orders synced per day, by channel
const days = ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', 'Today'];
const shopee = [520, 610, 580, 640, 700, 820, 760, 590, 630, 660, 710, 780, 840, 812];
const tokped = [260, 280, 300, 270, 310, 350, 330, 290, 300, 320, 330, 360, 380, 341];
const web = [90, 110, 100, 95, 120, 140, 130, 105, 110, 115, 125, 140, 150, 131];
const MAX = 1500;
const px = (v: number) => Math.round((v / MAX) * 200);

const connections: { code: string; tile: string; name: string; meta: string; status: string; tone: Plume }[] = [
  { code: 'SP', tile: 'orange', name: 'Shopee → Accurate', meta: 'Orders and stock · 2 min ago', status: 'Connected', tone: 'green' },
  { code: 'TK', tile: 'green', name: 'Tokopedia → Accurate', meta: 'Orders and stock · 7 min ago', status: '12 failed', tone: 'red' },
  { code: 'XD', tile: 'maroon', name: 'Xendit → Accurate', meta: 'Payments · 4 min ago', status: 'Renew soon', tone: 'yellow' },
  { code: 'WA', tile: 'green', name: 'WhatsApp Business', meta: 'Order updates to buyers · live', status: 'Connected', tone: 'green' },
  { code: 'WC', tile: 'red', name: 'Website → Accurate', meta: 'WooCommerce orders · 9 min ago', status: 'Connected', tone: 'green' },
];

const runs: { time: string; flow: string; data: string; records: string; status: string; tone: Plume; duration: string }[] = [
  { time: '09:42', flow: 'Shopee → Accurate', data: 'Orders', records: '214', status: 'Synced', tone: 'green', duration: '38s' },
  { time: '09:40', flow: 'Xendit → Accurate', data: 'Payments', records: '96', status: 'Synced', tone: 'green', duration: '12s' },
  { time: '09:35', flow: 'Tokopedia → Accurate', data: 'Orders', records: '12', status: 'Failed', tone: 'red', duration: '9s' },
  { time: '09:30', flow: 'Accurate → Shopee', data: 'Stock levels', records: '1.120', status: 'Synced', tone: 'green', duration: '1m 04s' },
  { time: '09:20', flow: 'Website → Accurate', data: 'Orders', records: '41', status: 'Synced', tone: 'green', duration: '15s' },
  { time: '09:15', flow: 'Accurate → Tokopedia', data: 'Stock levels', records: '1.120', status: 'Retrying', tone: 'orange', duration: '2m 10s' },
];

const nav = [
  { label: 'Overview', current: true, d: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
  { label: 'Integrations', d: 'M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v5' },
  { label: 'Sync runs', d: 'M20 11a8 8 0 0 0-14.9-3.5M4 4v4h4M4 13a8 8 0 0 0 14.9 3.5M20 20v-4h-4' },
  { label: 'Field mapping', d: 'M7 4 3 8l4 4M3 8h14M17 12l4 4-4 4M21 16H7' },
  { label: 'Alerts', badge: 12, d: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0' },
  { label: 'Settings', d: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6' },
];

export function Dashboard() {
  return (
    <div className="db">
      <PlumeBar />
      <div className="db-shell">
        <aside className="db-side">
          <img className="db-logo db-logo--day" src={logoDay} alt="Cendra" />
          <img className="db-logo db-logo--night" src={logoNight} alt="Cendra" />
          <div className="db-workspace">
            <span className="cx-caption">Workspace</span>
            <span className="cx-label">Toko Sinar Abadi</span>
            <span className="cx-caption">Jakarta · 5 tools connected</span>
          </div>
          <nav className="db-nav" aria-label="Main">
            {nav.map((item) => (
              <a key={item.label} href="#dashboard" aria-current={item.current ? 'page' : undefined}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={item.d} />
                </svg>
                {item.label}
                {item.badge ? <span className="db-badge">{item.badge}</span> : null}
              </a>
            ))}
          </nav>
          <div className="db-help cx-tone--maroon">
            <Icon name="chat" className="cx-watermark" />
            <span className="cx-subtitle">Need a hand?</span>
            <span className="cx-body-sm">Your Cendra engineer replies within an hour on WhatsApp.</span>
            <Button variant="secondary" size="sm">Chat on WhatsApp</Button>
          </div>
        </aside>

        <main className="db-main">
          <header className="db-header">
            <div>
              <span className="cx-eyebrow">Toko Sinar Abadi</span>
              <h1 className="cx-headline">Overview</h1>
            </div>
            <div className="db-actions">
              <span className="cx-body-sm">Last sync 09:42 WIB</span>
              <Button variant="ghost">Export report</Button>
              <Button variant="secondary">Connect a tool</Button>
            </div>
          </header>

          <Band tone="night">
            <Tag tone="maroon">Sunday, 1 Nov 2026</Tag>
            <h2 className="cx-headline">Your stores are <span className="cx-highlight">in sync</span>, except one thing.</h2>
            <p className="cx-body db-soft">1.284 orders and 312 payments moved in the last 24 hours. 12 Tokopedia orders are waiting on a missing SKU in Accurate.</p>
            <Button variant="plume" size="lg">Review 12 failed orders</Button>
          </Band>

          <section className="db-stats" aria-label="Key numbers">
            <Stat tone="yellow" shape="plume" icon="orders" label="Orders synced, 24h" value="1.284" meta="+9% vs last Sunday" />
            <Stat tone="green" icon="payments" label="Payments matched" value="Rp 48,2 jt" meta="312 of 318 matched to invoices" />
            <Stat tone="red" icon="warning" label="Failed records" value="12" alert meta="Tokopedia orders since 09:35 WIB" />
            <Stat tone="maroon" icon="clock" label="Average sync delay" value="2m 40s" meta="Target: under 5 minutes" />
          </section>

          <div className="db-row">
            <section className="db-panel db-panel--wide">
              <div className="db-panel__head">
                <div className="db-panel__title">
                  <h2 className="cx-title">Orders synced</h2>
                  <span className="cx-body-sm db-soft">Last 14 days, by channel</span>
                </div>
                <div className="db-legend">
                  <span><i style={{ background: 'var(--maroon-edge)' }} />Shopee</span>
                  <span><i style={{ background: 'var(--green)' }} />Tokopedia</span>
                  <span><i style={{ background: 'var(--orange)' }} />Website</span>
                </div>
              </div>
              <div className="db-chart" role="img" aria-label="Stacked bar chart of orders synced per day from 19 Oct to 1 Nov, between 870 and 1.370 a day, 1.284 today.">
                {[0, 500, 1000, 1500].map((v) => (
                  <div key={v} className="db-chart__line" style={{ bottom: 22 + px(v) }}>
                    <span className="cx-caption">{fmt(v)}</span>
                  </div>
                ))}
                <div className="db-chart__bars">
                  {days.map((d, i) => {
                    const today = i === days.length - 1;
                    return (
                      <div key={d} className="db-bar" data-today={today || undefined}>
                        {today ? <span className="cx-caption db-bar__total">{fmt(shopee[i]! + tokped[i]! + web[i]!)}</span> : null}
                        <i style={{ height: px(web[i]!), background: 'var(--orange)' }} />
                        <i style={{ height: px(tokped[i]!), background: 'var(--green)' }} />
                        <i style={{ height: px(shopee[i]!), background: 'var(--maroon-edge)' }} />
                        <span className="cx-caption db-bar__label">{d}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="db-panel">
              <div className="db-panel__head">
                <h2 className="cx-title">Connections</h2>
                <a href="#dashboard" className="cx-body-sm db-strong">Manage</a>
              </div>
              <ul className="db-connections">
                {connections.map((c) => (
                  <li key={c.code}>
                    <span className={`db-tile db-tile--${c.tile}`}>{c.code}</span>
                    <span className="db-connections__text">
                      <span className="cx-label">{c.name}</span>
                      <span className="cx-caption db-soft">{c.meta}</span>
                    </span>
                    <Tag tone={c.tone} soft>{c.status}</Tag>
                  </li>
                ))}
              </ul>
              <Notice tone="warning" title="Xendit token expires in 3 days">Renew it before 4 Nov so payments keep matching.</Notice>
            </section>
          </div>

          <section className="db-panel">
            <div className="db-panel__head">
              <h2 className="cx-title">Recent sync runs</h2>
              <Tabs
                aria-label="Filter sync runs"
                defaultValue="all"
                items={[{ id: 'all', label: 'All', count: 128 }, { id: 'orders', label: 'Orders' }, { id: 'payments', label: 'Payments' }, { id: 'failed', label: 'Failed', count: 12 }]}
              />
            </div>
            <div className="db-table">
              <table>
                <thead>
                  <tr><th scope="col">Time</th><th scope="col">Flow</th><th scope="col">Data</th><th scope="col" className="num">Records</th><th scope="col">Status</th><th scope="col" className="num">Duration</th></tr>
                </thead>
                <tbody>
                  {runs.map((r) => (
                    <tr key={r.time}>
                      <td className="db-soft">{r.time}</td>
                      <td className="db-strong">{r.flow}</td>
                      <td>{r.data}</td>
                      <td className="num">{r.records}</td>
                      <td><Tag tone={r.tone} soft>{r.status}</Tag></td>
                      <td className="num db-soft">{r.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
