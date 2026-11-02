import { cx } from './cx.js';

const STRIPES = ['primary', 'secondary', 'tertiary', 'spotlight', 'accent'] as const;

export interface PlumeBarProps {
  thin?: boolean;
  className?: string;
}

/** The five brand roles as a stripe. Once per screen */
export function PlumeBar({ thin, className }: PlumeBarProps) {
  return (
    <div className={cx('cx-plumebar', thin && 'cx-plumebar--thin', className)} aria-hidden>
      {STRIPES.map((c) => <span key={c} className={`cx-plumebar__${c}`} />)}
    </div>
  );
}
