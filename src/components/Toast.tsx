'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

export interface ToastOptions {
  /** Default info. A danger toast stays until it is closed */
  tone?: 'info' | 'success' | 'warning' | 'danger';
  /** What happened, in a few words: "1.284 orders synced" */
  title: ReactNode;
  body?: ReactNode;
  /** One undo or follow-up, never the only way to do it */
  action?: { label: string; onClick: () => void };
  /** Milliseconds on screen. Default 6000, 10000 with an action, forever for danger */
  duration?: number;
}

type Entry = ToastOptions & { id: number };

const ToastContext = createContext<((t: ToastOptions) => void) | null>(null);

/** Returns a function that shows a toast. Needs a ToastProvider above it */
export function useToast() {
  const show = useContext(ToastContext);
  if (!show) throw new Error('useToast needs a <ToastProvider> above it');
  return show;
}

export interface ToastProviderProps {
  children?: ReactNode;
  /** Names the toast region for screen readers. Default "Notifications" */
  label?: string;
  /** Accessible name of each close button. Default "Dismiss" */
  closeLabel?: string;
}

const MAX = 3;

/** Holds the toasts for an app: bottom right on laptops, bottom center on phones, three at most */
export function ToastProvider({ children, label = 'Notifications', closeLabel = 'Dismiss' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Entry[]>([]);
  const [paused, setPaused] = useState(false);
  const next = useRef(0);

  const show = useCallback((t: ToastOptions) => {
    setToasts((list) => [...list, { ...t, id: next.current++ }].slice(-MAX));
  }, []);
  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {/* The live region is always there, so toasts added to it are announced */}
      <section
        className="cx-toasts"
        aria-label={label}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
      >
        <ol className="cx-toasts__list" aria-live="polite" aria-relevant="additions">
          {toasts.map((t) => <ToastItem key={t.id} toast={t} paused={paused} closeLabel={closeLabel} onDismiss={dismiss} />)}
        </ol>
      </section>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, paused, closeLabel, onDismiss }: { toast: Entry; paused: boolean; closeLabel: string; onDismiss: (id: number) => void }) {
  const { id, tone = 'info', title, body, action } = toast;
  const duration = toast.duration ?? (tone === 'danger' ? Infinity : action ? 10000 : 6000);
  const left = useRef(duration);

  // Counts down only while nobody is reading or using the toasts (WCAG 2.2.1)
  useEffect(() => {
    if (paused || !Number.isFinite(left.current)) return;
    const start = Date.now();
    const t = setTimeout(() => onDismiss(id), left.current);
    return () => { clearTimeout(t); left.current -= Date.now() - start; };
  }, [paused, id, onDismiss]);

  return (
    <li className={cx('cx-toast', `cx-toast--${tone}`)} role={tone === 'danger' ? 'alert' : undefined}>
      <span className="cx-toast__icon"><Icon name={tone} /></span>
      <div className="cx-toast__text">
        <strong className="cx-toast__title">{title}</strong>
        {body ? <span className="cx-toast__body">{body}</span> : null}
      </div>
      {action ? (
        <button type="button" className="cx-btn cx-btn--secondary cx-btn--sm cx-toast__action" onClick={() => { action.onClick(); onDismiss(id); }}>
          {action.label}
        </button>
      ) : null}
      <button type="button" className="cx-toast__close" aria-label={closeLabel} onClick={() => onDismiss(id)}>
        <Icon name="close" size={16} />
      </button>
    </li>
  );
}
