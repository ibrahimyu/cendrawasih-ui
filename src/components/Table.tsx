'use client';
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

export interface TableColumn<Row> {
  key: string;
  header: ReactNode;
  /** The cell's content. Default: row[key] */
  cell?: (row: Row) => ReactNode;
  /** Numbers and amounts: aligned right, in tabular figures */
  numeric?: boolean;
  /** Makes the header a sort button. true compares row[key]; a function gives its own order */
  sort?: boolean | ((a: Row, b: Row) => number);
  /** A CSS width for the column, like "160px" or "30%" */
  width?: string;
  /** Let long text wrap onto more lines. Cells stay on one line otherwise, and a wide table scrolls */
  wrap?: boolean;
}

export interface TableSort {
  key: string;
  direction: 'ascending' | 'descending';
}

export interface TableProps<Row> {
  /** Names the table. Shown above it unless hideCaption */
  caption: ReactNode;
  hideCaption?: boolean;
  columns: TableColumn<Row>[];
  rows: Row[];
  /** A stable id for each row */
  rowKey: (row: Row) => string;
  /** Controlled sort */
  sort?: TableSort | null;
  defaultSort?: TableSort;
  onSortChange?: (sort: TableSort) => void;
  /** Leave rows in the order given, for sorting on the server. The headers still show and report the sort */
  manualSort?: boolean;
  /** Adds a checkbox to each row and one in the header for all rows */
  selectable?: boolean;
  /** Controlled selection: the keys of the checked rows */
  selected?: string[];
  defaultSelected?: string[];
  onSelectionChange?: (keys: string[]) => void;
  /** Accessible name of a row's checkbox. Default "Select row" */
  selectLabel?: (row: Row) => string;
  /** Default "Select all rows" */
  selectAllLabel?: string;
  /** Shown in place of the rows when there are none */
  empty?: ReactNode;
  className?: string;
}

const collator = new Intl.Collator('id', { numeric: true, sensitivity: 'base' });

function compareBy<Row>(column: TableColumn<Row>) {
  if (typeof column.sort === 'function') return column.sort;
  return (a: Row, b: Row) => {
    const x = (a as Record<string, unknown>)[column.key];
    const y = (b as Record<string, unknown>)[column.key];
    if (typeof x === 'number' && typeof y === 'number') return x - y;
    return collator.compare(String(x ?? ''), String(y ?? ''));
  };
}

/**
 * Rows of records on hairlines, 48px tall. Sortable headers report their order with aria-sort; numbers
 * align right. When it is wider than its column it scrolls sideways inside itself and takes keyboard focus
 */
export function Table<Row>({
  caption, hideCaption, columns, rows, rowKey, sort, defaultSort, onSortChange, manualSort,
  selectable, selected, defaultSelected, onSelectionChange, selectLabel = () => 'Select row', selectAllLabel = 'Select all rows',
  empty, className,
}: TableProps<Row>) {
  const id = useId();
  const [ownSort, setOwnSort] = useState<TableSort | null>(defaultSort ?? null);
  const current = sort !== undefined ? sort : ownSort;
  const [ownSelected, setOwnSelected] = useState<string[]>(defaultSelected ?? []);
  const checked = new Set(selected ?? ownSelected);

  const shown = useMemo(() => {
    const column = current && columns.find((c) => c.key === current.key);
    if (!column || !column.sort || manualSort) return rows;
    const compare = compareBy(column);
    const sign = current.direction === 'ascending' ? 1 : -1;
    return [...rows].sort((a, b) => sign * compare(a, b));
  }, [rows, columns, current, manualSort]);

  function sortBy(key: string) {
    const next: TableSort = { key, direction: current?.key === key && current.direction === 'ascending' ? 'descending' : 'ascending' };
    if (sort === undefined) setOwnSort(next);
    onSortChange?.(next);
  }

  function select(keys: string[]) {
    if (selected === undefined) setOwnSelected(keys);
    onSelectionChange?.(keys);
  }
  const keys = shown.map(rowKey);
  const all = keys.length > 0 && keys.every((k) => checked.has(k));
  const some = !all && keys.some((k) => checked.has(k));

  // Only a table that overflows its column needs to take focus, so keyboard users can scroll it
  const wrap = useRef<HTMLDivElement>(null);
  const [scrolls, setScrolls] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const check = () => setScrolls(el.scrollWidth > el.clientWidth);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className={cx('cx-table', className)}
      role={scrolls ? 'region' : undefined}
      aria-labelledby={scrolls ? `${id}-caption` : undefined}
      tabIndex={scrolls ? 0 : undefined}
    >
      <table className="cx-table__table">
        <caption id={`${id}-caption`} className={cx('cx-table__caption', hideCaption && 'cx-visually-hidden')}>{caption}</caption>
        {columns.some((c) => c.width) ? (
          <colgroup>
            {selectable ? <col className="cx-table__select-col" /> : null}
            {columns.map((c) => <col key={c.key} style={c.width ? { width: c.width } : undefined} />)}
          </colgroup>
        ) : null}
        <thead>
          <tr>
            {selectable ? (
              <th scope="col" className="cx-table__select">
                <input
                  type="checkbox"
                  className="cx-choice__input cx-choice__input--check"
                  aria-label={selectAllLabel}
                  checked={all}
                  disabled={keys.length === 0}
                  ref={(el) => { if (el) el.indeterminate = some; }}
                  onChange={() => select(all ? [...checked].filter((k) => !keys.includes(k)) : [...new Set([...checked, ...keys])])}
                />
              </th>
            ) : null}
            {columns.map((c) => {
              const on = current?.key === c.key;
              return (
                <th key={c.key} scope="col" className={cx(c.numeric && 'cx-table__num', c.wrap && 'cx-table__wrap')} aria-sort={c.sort ? (on ? current.direction : 'none') : undefined}>
                  {c.sort ? (
                    <button type="button" className="cx-table__sort" onClick={() => sortBy(c.key)}>
                      {c.header}
                      <Icon name={on ? (current.direction === 'ascending' ? 'arrow-up' : 'arrow-down') : 'sort'} size={16} className={cx('cx-table__sort-icon', on && 'cx-table__sort-icon--on')} />
                    </button>
                  ) : c.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {shown.length === 0 ? (
            <tr>
              <td className="cx-table__empty" colSpan={columns.length + (selectable ? 1 : 0)}>{empty ?? 'Nothing to show'}</td>
            </tr>
          ) : shown.map((row) => {
            const key = rowKey(row);
            const on = checked.has(key);
            return (
              <tr key={key} className={cx(on && 'cx-table__row--selected')}>
                {selectable ? (
                  <td className="cx-table__select">
                    <input
                      type="checkbox"
                      className="cx-choice__input cx-choice__input--check"
                      aria-label={selectLabel(row)}
                      checked={on}
                      onChange={() => select(on ? [...checked].filter((k) => k !== key) : [...checked, key])}
                    />
                  </td>
                ) : null}
                {columns.map((c, i) => {
                  const content = c.cell ? c.cell(row) : String((row as Record<string, unknown>)[c.key] ?? '');
                  const Cell = i === 0 ? 'th' : 'td';
                  return <Cell key={c.key} scope={i === 0 ? 'row' : undefined} className={cx(c.numeric && 'cx-table__num', c.wrap && 'cx-table__wrap')}>{content}</Cell>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
