import { useState } from 'react';
import { Accordion, AccordionItem, Avatar, Button, Dialog, Icon, Menu, Notice, PageHeader, Tag, useToast } from '@cendra/ui';
import { rupiah } from '../data';
import { Frame } from '../Frame';
import './patterns.css';

const items = [
  { name: 'Kaos Polos Hitam, L', sku: 'KAOS-HTM-L', qty: 3, price: 89000, missing: true },
  { name: 'Kaos Polos Putih, M', sku: 'KAOS-PTH-M', qty: 2, price: 89000 },
  { name: 'Topi Bordir Cendra', sku: 'TOPI-BRD-01', qty: 1, price: 125000 },
];
const shipping = 63000;
const total = items.reduce((sum, i) => sum + i.qty * i.price, 0) + shipping;

const history = [
  { who: 'Shopee', kind: 'org' as const, tone: 'orange' as const, what: 'Order received from Shopee', when: '09:51 WIB' },
  { who: 'Cendra', kind: 'org' as const, tone: 'maroon' as const, what: 'Sent to Accurate: failed, SKU KAOS-HTM-L missing', when: '09:51 WIB', failed: true },
  { who: 'Rina Wulandari', kind: 'person' as const, what: 'Rina Wulandari retried the sync: failed again', when: '09:58 WIB', failed: true },
];

/** Detail page: breadcrumb, status, one primary action, the problem and its fix, sections, history */
export function Order() {
  const toast = useToast();
  const [retrying, setRetrying] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  function retry() {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      toast({ tone: 'danger', title: 'Still failing', body: 'KAOS-HTM-L is still missing in Accurate. Map it first.' });
    }, 1200);
  }

  return (
    <Frame page="order">
      <div className="pt-page">
        <PageHeader
          breadcrumb={[{ label: 'Orders', href: '#orders' }, { label: 'INV-2026-01280' }]}
          title="INV-2026-01280"
          status={<Tag tone="red" soft>Failed</Tag>}
          actions={<>
            {/* Busy keeps its look and ignores presses; disabled would say it can't be used */}
            <Button onClick={() => { if (!retrying) retry(); }} aria-busy={retrying} iconStart={<Icon name="sync" size={18} />}>
              {retrying ? 'Retrying…' : 'Retry sync'}
            </Button>
            <Menu aria-label="More actions" align="end" items={[
              { id: 'copy', label: 'Copy order ID', icon: 'copy', onSelect: () => toast({ title: 'Order ID copied' }) },
              { id: 'shopee', label: 'Open in Shopee', icon: 'external' },
              { separator: true },
              { id: 'cancel', label: 'Cancel order', icon: 'delete', danger: true, onSelect: () => setCancelling(true) },
            ]} trigger={(p) => <Button {...p} variant="secondary" aria-label="More actions"><Icon name="more" /></Button>} />
          </>}
        >
          Shopee · Rp {rupiah.format(total)} · 12 Nov 2026, 09:51 WIB
        </PageHeader>

        <Notice tone="danger" title="This order didn't reach Accurate"
          action={<Button size="sm" variant="secondary">Map SKU</Button>}>
          SKU KAOS-HTM-L doesn't exist in Accurate. Map it to an Accurate item, then retry.
        </Notice>

        <div className="cx-grid">
          <div className="cx-span-laptop-8 pt-stack">
            <Accordion>
              <AccordionItem title="Items" meta={<Tag tone="red" soft>1 unmapped</Tag>} defaultOpen>
                <ul className="pt-lines">
                  {items.map((i) => (
                    <li key={i.sku}>
                      <span className="pt-lines__main">
                        <span className="cx-label">{i.name}</span>
                        <span className="cx-caption pt-soft">{i.sku}{i.missing ? ' · not in Accurate' : ''}</span>
                      </span>
                      <span className="pt-num">{i.qty} × Rp {rupiah.format(i.price)}</span>
                    </li>
                  ))}
                  <li><span className="cx-label">Shipping</span><span className="pt-num">Rp {rupiah.format(shipping)}</span></li>
                  <li className="pt-lines__total"><span className="cx-label">Total</span><span className="pt-num">Rp {rupiah.format(total)}</span></li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Payment" meta="Paid · Xendit">
                <p>Paid by bank transfer (BCA) at 09:50 WIB. It will match the Accurate invoice once the order syncs.</p>
              </AccordionItem>
              <AccordionItem title="Shipping" meta="J&T Express">
                <p>PT Sumber Rejeki, Jl. Raya Darmo 88, Surabaya 60265. Waiting for pickup.</p>
              </AccordionItem>
            </Accordion>
          </div>

          <aside className="cx-span-laptop-4 pt-stack">
            <section className="pt-panel">
              <h2 className="cx-subtitle">Buyer</h2>
              <div className="pt-person">
                <Avatar name="PT Sumber Rejeki" kind="org" size="lg" decorative />
                <span className="pt-lines__main">
                  <span className="cx-label">PT Sumber Rejeki</span>
                  <span className="cx-caption pt-soft">031 555 0192 · 12 orders</span>
                </span>
              </div>
            </section>
            <section className="pt-panel">
              <h2 className="cx-subtitle">Sync history</h2>
              <ol className="pt-history">
                {history.map((h) => (
                  <li key={h.what}>
                    <Avatar name={h.who} kind={h.kind} tone={h.tone} size="sm" decorative />
                    <span className="pt-lines__main">
                      <span className="cx-body-sm">{h.what}</span>
                      <span className="cx-caption pt-soft">{h.when}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </aside>
        </div>
      </div>

      <Dialog alert size="sm" open={cancelling} onClose={() => setCancelling(false)} title="Cancel this order?"
        description="It is cancelled in Shopee too, and the buyer is refunded. This can't be undone."
        actions={<>
          <Button variant="ghost" data-autofocus onClick={() => setCancelling(false)}>Keep order</Button>
          <Button variant="danger" onClick={() => { setCancelling(false); toast({ title: 'INV-2026-01280 cancelled', body: 'PT Sumber Rejeki will be refunded within 1 day.' }); }}>Cancel order</Button>
        </>} />
    </Frame>
  );
}
