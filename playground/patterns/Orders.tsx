import { useEffect, useMemo, useState } from 'react';
import { Button, EmptyState, FilterBar, FilterChip, Icon, Menu, Notice, PageHeader, Pagination, SearchField, Skeleton, Table, Tag, useToast, type TableSort } from '@cendra/ui';
import { orders, rupiah, statusTone, type Order, type Status } from '../data';
import { Frame } from '../Frame';
import './patterns.css';

const SIZE = 10;

/** List page: header, a notice that leads to a filter, the filter bar, the table, bulk actions, pagination */
export function Orders() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [on, setOn] = useState<Status[]>([]);
  const [sort, setSort] = useState<TableSort>({ key: 'time', direction: 'descending' });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  // The first load: skeletons in the table's place, the region marked busy
  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

  const matching = useMemo(() => {
    const k = sort.key as keyof Order;
    const sign = sort.direction === 'ascending' ? 1 : -1;
    return orders
      .filter((o) => (on.length === 0 || on.includes(o.status)) && (!query || `${o.id} ${o.buyer}`.toLowerCase().includes(query.toLowerCase())))
      .sort((a, b) => sign * (typeof a[k] === 'number' ? (a[k] as number) - (b[k] as number) : String(a[k]).localeCompare(String(b[k]))));
  }, [on, query, sort]);
  const failed = orders.filter((o) => o.status === 'Failed').length;

  const filter = (next: Status[]) => { setOn(next); setPage(1); setSelected([]); };
  const clear = () => { filter([]); setQuery(''); };

  return (
    <Frame page="orders">
      <div className="pt-page">
        <PageHeader eyebrow="Toko Sinar Abadi" title="Orders"
          actions={
            <Menu aria-label="Export orders" align="end" items={[
              { id: 'csv', label: 'Download CSV', icon: 'download' },
              { id: 'xlsx', label: 'Download Excel', icon: 'download' },
            ]} trigger={(p) => <Button {...p} variant="secondary" iconEnd={<Icon name="chevron-down" />}>Export</Button>} />
          }>
          {rupiah.format(orders.length)} orders today from Shopee and Tokopedia
        </PageHeader>

        {failed > 0 && !on.includes('Failed') ? (
          <Notice tone="danger" title={`${failed} orders failed to sync`}
            action={<Button size="sm" variant="secondary" onClick={() => filter(['Failed'])}>Show failed</Button>}>
            Their SKUs are missing in Accurate. Map the SKUs, then retry.
          </Notice>
        ) : null}

        <FilterBar label="Filter orders" active={on.length > 0 || query !== ''} onClear={clear}
          result={loading ? 'Loading orders…' : `${rupiah.format(matching.length)} orders`}>
          <SearchField label="Search orders" hideLabel placeholder="Order ID or buyer" value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }} onClear={() => setQuery('')} />
          {(['Synced', 'Waiting', 'Failed'] as Status[]).map((st) => (
            <FilterChip key={st} pressed={on.includes(st)} count={orders.filter((o) => o.status === st).length}
              onPressedChange={(p) => filter(p ? [...on, st] : on.filter((x) => x !== st))}>{st}</FilterChip>
          ))}
        </FilterBar>

        {selected.length > 0 ? (
          <div className="pt-bulk" role="region" aria-label="Selected orders">
            <span className="cx-label">{selected.length} selected</span>
            <Button size="sm" iconStart={<Icon name="sync" size={16} />} onClick={() => {
              toast({ tone: 'success', title: `Retrying ${selected.length} orders`, body: 'They will show as Synced in a minute if the SKUs are mapped.' });
              setSelected([]);
            }}>Retry sync</Button>
            <Button size="sm" variant="ghost" onClick={() => setSelected([])}>Clear selection</Button>
          </div>
        ) : null}

        <div aria-busy={loading}>
          {loading ? (
            <div className="pt-skeleton">
              <span className="cx-visually-hidden">Loading orders</span>
              {Array.from({ length: 6 }, (_, i) => <Skeleton key={i} width={`${70 + ((i * 13) % 30)}%`} />)}
            </div>
          ) : (
            <Table<Order>
        locale="id-ID"
              caption="Orders" hideCaption rowKey={(o) => o.id}
              selectable selected={selected} onSelectionChange={setSelected} selectLabel={(o) => `Select ${o.id}`}
              sort={sort} onSortChange={(next) => { setSort(next); setPage(1); }} manualSort
              rows={matching.slice((page - 1) * SIZE, page * SIZE)}
              empty={
                <EmptyState icon="search" title="No orders match" as="h3" actions={<Button size="sm" variant="secondary" onClick={clear}>Clear filters</Button>}>
                  Try another order ID or buyer, or clear the filters.
                </EmptyState>
              }
              columns={[
                { key: 'id', header: 'Order', sort: true, cell: (o) => <a className="pt-link" href="#order">{o.id}</a> },
                { key: 'buyer', header: 'Buyer', sort: true },
                { key: 'channel', header: 'Channel' },
                { key: 'status', header: 'Status', cell: (o) => <Tag tone={statusTone[o.status]} soft>{o.status}</Tag> },
                { key: 'total', header: 'Total', numeric: true, sort: true, cell: (o) => `Rp ${rupiah.format(o.total)}` },
                { key: 'time', header: 'Time', numeric: true, sort: true },
              ]}
            />
          )}
        </div>
        {!loading ? <Pagination locale="id-ID" page={page} pageSize={SIZE} total={matching.length} onPageChange={setPage} /> : null}
      </div>
    </Frame>
  );
}
