import type { ReactNode } from 'react';
import { Band, Button, Card, Checkbox, ChoiceGroup, Icon, iconNames, Logogram, Notice, PlumeBar, RadioGroup, SearchField, Select, Stat, Switch, Tabs, Tag, TextField, type Plume } from '@cendra/ui';
import mainstream from '../assets/illustrations/mainstream.png';
import './gallery.css';

const plumes: Plume[] = ['maroon', 'red', 'orange', 'yellow', 'green'];

type Step = [name: string, bg: string, fg: string, border?: string];
const stateRows: [string, Step[]][] = [
  ['Primary', [['Rest', 'action', 'on-action'], ['Hover', 'action-hover', 'on-action'], ['Pressed', 'action-pressed', 'on-action']]],
  ['Plume', [['Rest', 'yellow', 'on-yellow'], ['Hover', 'yellow-light', 'on-yellow'], ['Pressed', 'yellow-deep', 'on-yellow']]],
  ['Secondary', [['Rest', 'surface', 'ink', 'line-control'], ['Hover', 'fill-hover', 'ink', 'line-strong'], ['Pressed', 'fill-pressed', 'ink', 'line-strong']]],
  ['Selected', [['Selected', 'selected', 'on-selected']]],
  ['Disabled', [['Disabled', 'surface-sunk', 'ink-disabled', 'line']]],
];

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
          <p className="cx-body-lg">Fill small, outline large. Black type, plume accents, one spotlight per view. Pills are pressed; feather tips only label.</p>
        </header>

        <Section title="States">
          <p className="cx-body-sm gl-note">Every state is its own color step. Nothing fades with opacity.</p>
          <div className="gl-states">
            {stateRows.map(([label, steps]) => (
              <div key={label} className="gl-state-row">
                <span className="cx-label">{label}</span>
                {steps.map(([name, bg, fg, border]) => (
                  <span key={name} className="gl-swatch" style={{ background: `var(--${bg})`, color: `var(--${fg})`, boxShadow: border ? `inset 0 0 0 2px var(--${border})` : undefined }}>{name}</span>
                ))}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Motion">
          <p className="cx-body-sm gl-note">Hover a row to play it. Three durations, ease-out, nothing longer than 240ms.</p>
          <div className="gl-stack">
            {(['fast', 'base', 'slow'] as const).map((d) => (
              <div key={d} className="gl-motion" style={{ ['--gl-d' as string]: `var(--duration-${d})` }}>
                <code className="cx-caption">duration-{d}</code>
                <span className="gl-motion__track"><span className="gl-motion__dot" /></span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Layout grid">
          <p className="cx-body-sm gl-note">12 columns at every size. Resize the window: the spans follow the tablet, laptop and wide breakpoints.</p>
          <div className="cx-grid gl-cols">
            {Array.from({ length: 12 }, (_, i) => <span key={i} className="cx-span-1">{i + 1}</span>)}
          </div>
          <div className="cx-grid gl-cols">
            <span className="cx-span-tablet-6 cx-span-laptop-8">tablet 6 · laptop 8</span>
            <span className="cx-span-tablet-6 cx-span-laptop-4">tablet 6 · laptop 4</span>
          </div>
          <div className="cx-grid gl-cols">
            {[1, 2, 3, 4].map((i) => <span key={i} className="cx-span-6 cx-span-laptop-3">6 · laptop 3</span>)}
          </div>
        </Section>

        <Section title="Chart colors">
          <p className="cx-body-sm gl-note">Series in this order, never skipping. Red is kept for errors.</p>
          <div className="gl-row">
            {['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-other'].map((c) => (
              <span key={c} className="gl-series"><i style={{ background: `var(--${c})` }} />{c}</span>
            ))}
          </div>
          <div className="gl-bars" aria-hidden>
            {[[40, 30, 20, 10], [30, 35, 25, 10], [45, 20, 20, 15], [25, 30, 30, 15]].map((bar, i) => (
              <span key={i} className="gl-bar">
                {bar.map((h, j) => <i key={j} style={{ height: h * 1.6, background: `var(--chart-${j + 1})` }} />)}
              </span>
            ))}
          </div>
        </Section>

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

        <Section title="Select and SearchField">
          <div className="gl-grid">
            <Select label="Warehouse" placeholder="Choose a warehouse" options={[
              { value: 'jkt', label: 'Jakarta Barat' }, { value: 'sby', label: 'Surabaya' }, { value: 'mdn', label: 'Medan' },
            ]} hint="Stock is read from this warehouse." />
            <Select label="Sync every" defaultValue="5" options={[
              { value: '5', label: '5 minutes' }, { value: '15', label: '15 minutes' }, { value: '60', label: 'Hour' },
            ]} />
            <Select label="Region" disabled defaultValue="id" options={[{ value: 'id', label: 'Indonesia' }]} />
            <SearchField label="Search orders" hideLabel placeholder="Search by order ID or buyer" defaultValue="INV-2026" />
          </div>
        </Section>

        <Section title="Checkbox, RadioGroup and Switch">
          <div className="gl-grid">
            <ChoiceGroup legend="Sync these to Accurate" hint="You can change this later.">
              <Checkbox label="Orders" defaultChecked />
              <Checkbox label="Payments" hint="Matched to invoices by amount and date." defaultChecked />
              <Checkbox label="Stock levels" />
              <Checkbox label="Refunds" disabled />
            </ChoiceGroup>
            <RadioGroup legend="When a SKU is missing" defaultValue="skip" options={[
              { value: 'skip', label: 'Skip the order and tell me', hint: 'It waits in Failed records.' },
              { value: 'create', label: 'Create the item in Accurate' },
              { value: 'stop', label: 'Stop the whole sync' },
            ]} />
            <ChoiceGroup legend="Notifications">
              <Switch label="WhatsApp me when a sync fails" defaultChecked />
              <Switch label="Daily summary email" hint="Sent at 07:00 WIB." />
              <Switch label="Weekly report" disabled />
            </ChoiceGroup>
            <ChoiceGroup legend="Agree before connecting" error="Tick this to connect Xendit">
              <Checkbox label="I can read and write payments on this account" />
              <Checkbox label="Select all channels" indeterminate />
            </ChoiceGroup>
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
