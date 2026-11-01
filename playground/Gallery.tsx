import type { ReactNode } from 'react';
import { Band, Button, Card, Icon, iconNames, Logogram, Notice, PlumeBar, Stat, Tabs, Tag, TextField, type Plume } from '@cendra/ui';
import mainstream from '../assets/illustrations/mainstream.png';
import './gallery.css';

const plumes: Plume[] = ['maroon', 'red', 'orange', 'yellow', 'green'];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="gl-section">
      <h2 className="cx-title">{title}</h2>
      {children}
    </section>
  );
}

export function Gallery() {
  return (
    <div className="gl">
      <PlumeBar />
      <main className="gl-main">
        <header className="gl-head">
          <span className="cx-eyebrow">Design language</span>
          <h1 className="cx-display">Cendrawasih UI</h1>
          <p className="cx-body-lg">Fill small, outline large. Black type, plume accents, one spotlight per view. Hover a button to see it flip.</p>
        </header>

        <Section title="Button">
          <div className="gl-row">
            <Button variant="plume">Book a call</Button>
            <Button>Discuss an integration</Button>
            <Button variant="secondary">See our work</Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="danger">Disconnect Xendit</Button>
            <Button disabled>Retry sync</Button>
          </div>
          <div className="gl-row">
            <Button variant="secondary" shape="feather" iconStart={<Icon name="chat" size={18} />}>Chat on WhatsApp</Button>
            <Button shape="feather">Message buyer</Button>
          </div>
          <div className="gl-row">
            <Button size="sm" variant="secondary">Small</Button>
            <Button size="md" variant="secondary">Medium</Button>
            <Button size="lg" variant="secondary" iconEnd={<Icon name="sync" />}>Large</Button>
          </div>
        </Section>

        <Section title="Tag">
          <div className="gl-row">
            {plumes.map((t) => <Tag key={t} tone={t}>{t}</Tag>)}
            <Tag>neutral</Tag>
          </div>
          <div className="gl-row">
            {plumes.map((t) => <Tag key={t} tone={t} soft>{t} soft</Tag>)}
          </div>
        </Section>

        <Section title="Stat">
          <div className="gl-grid">
            <Stat tone="yellow" shape="plume" icon="orders" label="Orders synced" value="1.284" meta="+9% vs last Sunday" />
            <Stat tone="green" icon="payments" label="Payments matched" value="Rp 48,2 jt" meta="312 of 318" />
            <Stat tone="red" icon="warning" label="Failed records" value="12" alert meta="Since 09:35 WIB" />
            <Stat tone="orange" icon="package" label="Stock updates" value="1.120" meta="Accurate → Shopee" />
            <Stat tone="maroon" icon="clock" label="Sync delay" value="2m 40s" meta="Target: under 5 minutes" />
          </div>
        </Section>

        <Section title="Card">
          <div className="gl-grid">
            <Card shape="plume" media={<img src={mainstream} alt="" />} mediaTone="yellow" eyebrow="Audit" title="AppGrout" footer={<Button size="sm" variant="secondary">Learn more</Button>}>
              Reviews code built with Lovable, Bolt or Cursor before launch.
            </Card>
            <Card tone="green" icon="plug" eyebrow="Integration" title="Systems integration">
              We connect your ERP, CRM, payments and internal tools so data flows without manual work.
            </Card>
            <Card href="#components" eyebrow="Linked" title="A neutral card">
              Hover lifts it 4px and draws a stronger line.
            </Card>
          </div>
        </Section>

        <Section title="Band">
          <Band tone="night">
            <h3 className="cx-headline">Your systems, finally <span className="cx-highlight">talking</span> to each other.</h3>
            <Button variant="plume">Book a call</Button>
          </Band>
          <Band tone="forest" filled>
            <h3 className="cx-display">Filled, for full-bleed marketing</h3>
            <Button>Discuss an integration</Button>
          </Band>
        </Section>

        <Section title="TextField">
          <div className="gl-grid">
            <TextField label="Email address" placeholder="name@company.com" hint="We reply within one working day." />
            <TextField label="Company" optional defaultValue="Toko Sinar Abadi" />
            <TextField label="Phone" defaultValue="0812" error="Enter a full number, like 0812 3456 7890" />
            <TextField label="What should talk to what?" multiline placeholder="Shopee orders into Accurate…" />
          </div>
        </Section>

        <Section title="Notice">
          <div className="gl-stack">
            <Notice title="Sync scheduled">Every 5 minutes, from 06:00 to 23:00 WIB.</Notice>
            <Notice tone="success" title="Xendit connected">Payments will start matching in the next run.</Notice>
            <Notice tone="warning" title="Token expires in 3 days" action={<Button size="sm" variant="secondary">Renew</Button>}>Renew it before 4 Nov.</Notice>
            <Notice tone="danger" title="12 orders failed to sync">The SKU is missing in Accurate.</Notice>
          </div>
        </Section>

        <Section title="Tabs">
          <Tabs aria-label="Example" items={[{ id: 'a', label: 'All', count: 128 }, { id: 'o', label: 'Orders' }, { id: 'f', label: 'Failed', count: 12 }]} />
        </Section>

        <Section title="Icon and logogram">
          <div className="gl-row">
            {iconNames.map((n) => <span key={n} className="gl-icon"><Icon name={n} size={24} />{n}</span>)}
          </div>
          <div className="gl-row gl-logos">
            <Logogram size={56} title="Cendra" style={{ color: 'var(--maroon-edge)' }} />
            <Logogram size={56} style={{ color: 'var(--red)' }} />
            <Logogram size={56} style={{ color: 'var(--green)' }} />
            <Logogram size={56} style={{ color: 'var(--ink)' }} />
          </div>
        </Section>
      </main>
    </div>
  );
}
