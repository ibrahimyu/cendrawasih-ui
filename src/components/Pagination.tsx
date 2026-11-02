'use client';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

export interface PaginationProps {
  /** The current page, from 1 */
  page: number;
  /** Rows on a page */
  pageSize: number;
  /** All rows, across every page */
  total: number;
  onPageChange: (page: number) => void;
  /** For the numbers, like "id-ID" (1.284) or "en-US" (1,284). Default: the browser's locale */
  locale?: string;
  /** The range text. Default "1–25 of 1,284" */
  rangeText?: (from: string, to: string, total: string) => string;
  /** Names the nav. Default "Pagination" */
  label?: string;
  /** Default "Previous page" and "Next page" */
  previousLabel?: string;
  nextLabel?: string;
  /** Default "Page 3" */
  pageLabel?: (page: string) => string;
  className?: string;
}

/** The pages to show: the first, the last, and the current one with a neighbor each side; null is a gap */
function pageList(page: number, count: number): (number | null)[] {
  const keep = new Set([1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count));
  // A gap of one page shows the page instead of an ellipsis
  if (keep.has(3)) keep.add(2);
  if (keep.has(count - 2)) keep.add(count - 1);
  const pages = [...keep].sort((a, b) => a - b);
  return pages.flatMap((p, i) => (i > 0 && p - pages[i - 1]! > 1 ? [null, p] : [p]));
}

/**
 * Which rows are showing, and buttons to move between pages. The current page takes the selected wash
 * (you are here). On phones the page numbers give way to the range and the arrows. Nothing to page: renders nothing
 */
export function Pagination({
  page, pageSize, total, onPageChange, locale,
  rangeText = (from, to, all) => `${from}–${to} of ${all}`,
  label = 'Pagination', previousLabel = 'Previous page', nextLabel = 'Next page', pageLabel = (p) => `Page ${p}`,
  className,
}: PaginationProps) {
  if (total <= 0) return null;
  const count = Math.max(1, Math.ceil(total / pageSize));
  const n = new Intl.NumberFormat(locale);
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <nav className={cx('cx-pagination', className)} aria-label={label}>
      <p className="cx-pagination__range" aria-live="polite">{rangeText(n.format(from), n.format(to), n.format(total))}</p>
      <ul className="cx-pagination__pages">
        <li>
          <button type="button" className="cx-pagination__btn" aria-label={previousLabel} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            <Icon name="chevron-left" size={20} />
          </button>
        </li>
        {pageList(page, count).map((p, i) =>
          p == null ? (
            <li key={`gap-${i}`} className="cx-pagination__gap" aria-hidden>…</li>
          ) : (
            <li key={p} className="cx-pagination__page">
              <button
                type="button"
                className="cx-pagination__btn"
                aria-label={pageLabel(n.format(p))}
                aria-current={p === page ? 'page' : undefined}
                onClick={() => { if (p !== page) onPageChange(p); }}
              >
                {n.format(p)}
              </button>
            </li>
          ),
        )}
        <li>
          <button type="button" className="cx-pagination__btn" aria-label={nextLabel} disabled={page >= count} onClick={() => onPageChange(page + 1)}>
            <Icon name="chevron-right" size={20} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
