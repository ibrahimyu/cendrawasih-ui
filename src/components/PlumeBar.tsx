import { cx } from './cx.js';

const STRIPES = ['maroon', 'red', 'orange', 'yellow', 'green'] as const;

export interface PlumeBarProps {
  thin?: boolean;
  className?: string;
}

/** The five-color stripe, in logo order. Once per screen */
export function PlumeBar({ thin, className }: PlumeBarProps) {
  return (
    <div className={cx('cx-plumebar', thin && 'cx-plumebar--thin', className)} aria-hidden>
      {STRIPES.map((c) => <span key={c} className={`cx-plumebar__${c}`} />)}
    </div>
  );
}
