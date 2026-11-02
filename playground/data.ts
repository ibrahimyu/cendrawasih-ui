// Sample data shared by the gallery and the pattern screens
export type Status = 'Synced' | 'Waiting' | 'Failed';
export interface Order { id: string; channel: string; buyer: string; total: number; status: Status; time: string }

const buyers = ['Toko Sinar Abadi', 'CV Maju Jaya', 'Rina Wulandari', 'Budi Santoso', 'PT Sumber Rejeki', 'Dewi Lestari', 'Agus Pratama'];
const statuses: Status[] = ['Synced', 'Synced', 'Waiting', 'Synced', 'Failed', 'Synced', 'Waiting'];

export const orders: Order[] = Array.from({ length: 23 }, (_, i) => ({
  id: `INV-2026-${String(1284 - i).padStart(5, '0')}`,
  channel: i % 3 === 0 ? 'Tokopedia' : 'Shopee',
  buyer: buyers[i % buyers.length]!,
  total: 85000 + ((i * 137000) % 2400000),
  status: statuses[i % statuses.length]!,
  time: `09:${String(59 - i * 2).padStart(2, '0')} WIB`,
}));

export const rupiah = new Intl.NumberFormat('id-ID');
export const statusTone = { Synced: 'success', Waiting: 'warning', Failed: 'danger' } as const;
