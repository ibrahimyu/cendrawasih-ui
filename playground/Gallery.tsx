import { useMemo, useState, type ReactNode } from 'react';
import { Band, Banner, Breadcrumb, Button, Card, Checkbox, ChoiceGroup, Dialog, EmptyState, FilterBar, FilterChip, Icon, type TableSort, iconNames, Logogram, Menu, Notice, Pagination, PlumeBar, Progress, RadioGroup, SearchField, Select, Sheet, SideNav, Skeleton, Stat, Switch, Table, Tabs, Tag, TextField, ToastProvider, TopBar, Tooltip, useToast, type Plume } from '@cendra/ui';
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

type Status = 'Synced' | 'Waiting' | 'Failed';
interface Order { id: string; channel: string; buyer: string; total: number; status: Status; time: string }
const buyers = ['Toko Sinar Abadi', 'CV Maju Jaya', 'Rina Wulandari', 'Budi Santoso', 'PT Sumber Rejeki', 'Dewi Lestari', 'Agus Pratama'];
const statuses: Status[] = ['Synced', 'Synced', 'Waiting', 'Synced', 'Failed', 'Synced', 'Waiting'];
const orders: Order[] = Array.from({ length: 23 }, (_, i) => ({
  id: `INV-2026-${String(1284 - i).padStart(5, '0')}`,
  channel: i % 3 === 0 ? 'Tokopedia' : 'Shopee',
  buyer: buyers[i % buyers.length]!,
  total: 85000 + ((i * 137000) % 2400000),
  status: statuses[i % statuses.length]!,
  time: `09:${String(59 - i * 2).padStart(2, '0')} WIB`,
}));
const rupiah = new Intl.NumberFormat('id-ID');
const statusTone = { Synced: 'green', Waiting: 'yellow', Failed: 'red' } as const;

function DataDemo() {
  const [query, setQuery] = useState('');
  const [on, setOn] = useState<Status[]>([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<TableSort>({ key: 'time', direction: 'descending' });
  const size = 8;
  // Filter and sort the whole list, then page it: what a server does for a real list
  const matching = useMemo(() => {
    const k = sort.key as keyof Order;
    const sign = sort.direction === 'ascending' ? 1 : -1;
    return orders
      .filter((o) => (on.length === 0 || on.includes(o.status)) && (!query || `${o.id} ${o.buyer}`.toLowerCase().includes(query.toLowerCase())))
      .sort((a, b) => sign * (typeof a[k] === 'number' ? (a[k] as number) - (b[k] as number) : String(a[k]).localeCompare(String(b[k]))));
  }, [on, query, sort]);
  const toggle = (st: Status) => (p: boolean) => { setOn(p ? [...on, st] : on.filter((x) => x !== st)); setPage(1); };
  return (
    <div className="gl-stack gl-data">
      <FilterBar label="Filter orders" active={on.length > 0 || query !== ''} onClear={() => { setOn([]); setQuery(''); setPage(1); }}
        result={`${rupiah.format(matching.length)} orders${selected.length ? ` · ${selected.length} selected` : ''}`}>
        <SearchField label="Search orders" hideLabel placeholder="Order ID or buyer" value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }} onClear={() => setQuery('')} />
        {(['Synced', 'Waiting', 'Failed'] as Status[]).map((st) => (
          <FilterChip key={st} pressed={on.includes(st)} onPressedChange={toggle(st)} count={orders.filter((o) => o.status === st).length}>{st}</FilterChip>
        ))}
      </FilterBar>
      <Table<Order>
        caption="Orders today" hideCaption rowKey={(o) => o.id} selectable selected={selected} onSelectionChange={setSelected}
        selectLabel={(o) => `Select ${o.id}`} sort={sort} onSortChange={(next) => { setSort(next); setPage(1); }} manualSort
        rows={matching.slice((page - 1) * size, page * size)}
        empty="No orders match these filters."
        columns={[
          { key: 'id', header: 'Order', sort: true, width: '200px' },
          { key: 'buyer', header: 'Buyer', sort: true },
          { key: 'channel', header: 'Channel' },
          { key: 'status', header: 'Status', cell: (o) => <Tag tone={statusTone[o.status]} soft>{o.status}</Tag> },
          { key: 'total', header: 'Total', numeric: true, sort: true, cell: (o) => `Rp ${rupiah.format(o.total)}` },
          { key: 'time', header: 'Time', numeric: true, sort: true },
        ]}
      />
      <Pagination page={page} pageSize={size} total={matching.length} onPageChange={setPage} />
      <Pagination page={7} pageSize={25} total={1284} onPageChange={() => {}} label="Pagination example" />
    </div>
  );
}

function Overlays() {
  const [dialog, setDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  const [sheet, setSheet] = useState(false);
  const toast = useToast();
  const toasts = () => {
    toast({ tone: 'success', title: '1.284 orders synced', body: 'Shopee → Accurate, 09:42 WIB' });
    toast({ tone: 'info', title: 'Mapping archived', action: { label: 'Undo', onClick: () => toast({ title: 'Mapping restored' }) } });
    toast({ tone: 'danger', title: '12 orders failed to sync', body: 'The SKU is missing in Accurate.' });
  };
  return (
    <>
      <Section title="Dialog and Sheet">
        <p className="cx-body-sm gl-note">Native modal dialogs on the scrim. Escape, the close button or a click outside closes them; focus goes back to the button.</p>
        <div className="gl-row">
          <Button variant="secondary" onClick={() => setDialog(true)}>Rename mapping</Button>
          <Button variant="danger" onClick={() => setAlert(true)}>Disconnect Xendit</Button>
          <Button variant="secondary" iconStart={<Icon name="filter" />} onClick={() => setSheet(true)}>Filters</Button>
          <Button variant="ghost" onClick={toasts}>Show toasts</Button>
        </div>
        <Dialog open={dialog} onClose={() => setDialog(false)} title="Rename mapping"
          actions={<><Button variant="ghost" onClick={() => setDialog(false)}>Cancel</Button><Button onClick={() => setDialog(false)}>Save</Button></>}>
          <TextField label="Name" defaultValue="Shopee orders → Accurate invoices" hint="Only your team sees this name." />
        </Dialog>
        <Dialog alert size="sm" open={alert} onClose={() => setAlert(false)} title="Disconnect Xendit?"
          description="Payments stop matching at once. Matches made so far stay in Accurate."
          actions={<><Button variant="ghost" data-autofocus onClick={() => setAlert(false)}>Keep connected</Button><Button variant="danger" onClick={() => setAlert(false)}>Disconnect</Button></>} />
        <Sheet open={sheet} onClose={() => setSheet(false)} title="Filters"
          actions={<><Button variant="ghost" onClick={() => setSheet(false)}>Clear all</Button><Button onClick={() => setSheet(false)}>Show 128 orders</Button></>}>
          <Select label="Channel" defaultValue="all" options={[{ value: 'all', label: 'All channels' }, { value: 'shopee', label: 'Shopee' }, { value: 'tokopedia', label: 'Tokopedia' }]} />
          <ChoiceGroup legend="Status">
            <Checkbox label="Synced" defaultChecked />
            <Checkbox label="Waiting" defaultChecked />
            <Checkbox label="Failed" />
          </ChoiceGroup>
          <RadioGroup legend="Date" defaultValue="7" options={[{ value: '1', label: 'Today' }, { value: '7', label: 'Last 7 days' }, { value: '30', label: 'Last 30 days' }]} />
        </Sheet>
      </Section>

      <Section title="Menu and Tooltip">
        <p className="cx-body-sm gl-note">Menus open from a button; arrow keys move, Escape closes. Tooltips are filled ink labels whose feather tip points at the trigger.</p>
        <div className="gl-row">
          <Menu aria-label="Export" items={[
            { id: 'csv', label: 'Download CSV', icon: 'download' },
            { id: 'xlsx', label: 'Download Excel', icon: 'download' },
            { id: 'copy', label: 'Copy link', icon: 'link' },
            { id: 'email', label: 'Email to accountant', icon: 'mail', disabled: true },
          ]} trigger={(p) => <Button {...p} variant="secondary" iconEnd={<Icon name="chevron-down" />}>Export</Button>} />
          <Menu aria-label="Mapping actions" align="end" items={[
            { id: 'edit', label: 'Edit mapping', icon: 'edit' },
            { id: 'copy', label: 'Duplicate', icon: 'copy' },
            { separator: true },
            { id: 'delete', label: 'Delete mapping', icon: 'delete', danger: true },
          ]} trigger={(p) => <Button {...p} variant="ghost" aria-label="Mapping actions"><Icon name="more" /></Button>} />
          <Tooltip content="Sync now" kind="label">
            {(p) => <Button {...p} variant="secondary"><Icon name="sync" /></Button>}
          </Tooltip>
          <Tooltip content="Every 5 minutes, 06:00–23:00 WIB">
            {(p) => <Button {...p} variant="ghost" iconStart={<Icon name="clock" />}>Sync schedule</Button>}
          </Tooltip>
        </div>
      </Section>
    </>
  );
}

export function Gallery() {
  return (
    <ToastProvider>
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

        <Section title="Progress, Skeleton, EmptyState and Banner">
          <div className="gl-feedback">
            <Banner tone="warning" title="Accurate maintenance" action={<Button size="sm" variant="secondary">Details</Button>} onDismiss={() => {}}>
              Syncing pauses Sunday 22:00–23:00 WIB. Nothing is lost; it catches up after.
            </Banner>
            <Banner tone="danger" title="Tokopedia is not responding.">Orders from Tokopedia wait until it is back. We retry every 5 minutes.</Banner>
          </div>
          <div className="gl-grid">
            <div className="gl-stack">
              <Progress label="Syncing Shopee orders" value={214} max={1120} valueText="214 of 1.120 orders" />
              <Progress label="Importing products" value={62} />
              <Progress label="Stock levels synced" value={1} max={1} tone="success" valueText="Done" />
              <Progress label="Tokopedia orders" value={41} max={120} tone="danger" valueText="Stopped at 41 of 120" />
              <Progress label="Connecting to Accurate" />
            </div>
            <div className="gl-stack gl-skel" aria-busy="true">
              <span className="cx-visually-hidden">Loading the latest sync</span>
              <div className="gl-row"><Skeleton shape="circle" /><Skeleton width="50%" /></div>
              <Skeleton lines={3} />
              <Skeleton shape="block" height={96} />
            </div>
          </div>
          <div className="gl-grid">
            <div className="gl-panel">
              <EmptyState icon="check" title="No failed records" actions={<Button size="sm" variant="secondary">See all sync runs</Button>}>
                Everything from the last 24 hours reached Accurate.
              </EmptyState>
            </div>
            <EmptyState tone="green" icon="plug" title="Connect your first store" actions={<><Button>Connect a store</Button><Button variant="ghost">How it works</Button></>}>
              Shopee, Tokopedia or your website. Orders start flowing into Accurate within minutes.
            </EmptyState>
          </div>
        </Section>

        <Section title="SideNav, TopBar and Breadcrumb">
          <p className="cx-body-sm gl-note">AppShell puts SideNav in a column from laptop width, and a TopBar with a menu sheet below it. The dashboard uses it: narrow the window to see.</p>
          <div className="gl-nav">
            <div className="gl-nav__side">
              <SideNav aria-label="Example" items={[
                { items: [
                  { label: 'Overview', icon: 'overview', href: '#components', current: true },
                  { label: 'Sync runs', icon: 'sync', href: '#components', badge: 128 },
                  { label: 'Alerts', icon: 'alerts', href: '#components', badge: 12, alert: true },
                ] },
                { heading: 'Setup', items: [
                  { label: 'Integrations', icon: 'plug', href: '#components' },
                  { label: 'Field mapping', icon: 'mapping', href: '#components' },
                  { label: 'Settings', icon: 'settings', href: '#components' },
                ] },
              ]} />
            </div>
            <div className="gl-stack gl-nav__main">
              <TopBar className="gl-nav__bar" logo={<span className="cx-subtitle">Cendra</span>} onMenu={() => {}}
                actions={<Button variant="ghost" size="sm" aria-label="Alerts"><Icon name="alerts" /></Button>} />
              <Breadcrumb items={[{ label: 'Integrations', href: '#components' }, { label: 'Tokopedia → Accurate', href: '#components' }, { label: 'Field mapping' }]} />
              <h3 className="cx-headline">Field mapping</h3>
              <Breadcrumb aria-label="Short breadcrumb" items={[{ label: 'Sync runs', href: '#components' }, { label: 'Run 09:35 WIB' }]} />
            </div>
          </div>
        </Section>

        <Section title="Table, Pagination and filters">
          <p className="cx-body-sm gl-note">Search, filter, sort, select and page. The list is filtered and sorted as a whole, then paged, so the table gets manualSort.</p>
          <DataDemo />
        </Section>

        <Overlays />

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
    </ToastProvider>
  );
}
