'use client';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './Icon.js';

interface ModalCommon {
  open: boolean;
  /** Called on Escape, the close button, a click on the scrim, or a form inside with method="dialog" */
  onClose: () => void;
  title: ReactNode;
  /** One or two sentences under the title, read out when the dialog opens */
  description?: ReactNode;
  children?: ReactNode;
  /** Buttons at the bottom. The main action goes last */
  actions?: ReactNode;
  /** Accessible name of the close button. Default "Close" */
  closeLabel?: string;
  className?: string;
}

export interface DialogProps extends ModalCommon {
  /** sm 400px, md 560px, lg 720px. Default md */
  size?: 'sm' | 'md' | 'lg';
  /** A confirmation that needs an answer: role="alertdialog", and a click on the scrim does nothing */
  alert?: boolean;
}

export interface SheetProps extends ModalCommon {
  /** end: a full-height panel from the right. bottom: up from the bottom edge. Phones always get bottom. Default end */
  side?: 'end' | 'bottom';
}

function Modal({ open, onClose, title, description, children, actions, closeLabel = 'Close', className, role, dismissible, kind }: ModalCommon & {
  role?: 'alertdialog';
  dismissible: boolean;
  kind: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const pressedScrim = useRef(false);
  const id = useId();
  const close = useRef(onClose);
  close.current = onClose;
  const isOpen = useRef(open);
  isOpen.current = open;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      const before = document.activeElement as HTMLElement | null;
      el.showModal();
      el.querySelector<HTMLElement>('[data-autofocus]')?.focus();
      return () => { if (el.open) el.close(); before?.focus?.(); };
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Escape, method="dialog" forms and el.close() all end here. The event comes a task later, so skip it
    // when the parent already closed the dialog, or when it was reopened in the meantime
    const onNativeClose = () => { if (isOpen.current && !el.open) close.current(); };
    el.addEventListener('close', onNativeClose);
    return () => el.removeEventListener('close', onNativeClose);
  }, []);

  return (
    <dialog
      ref={ref}
      className={cx(kind, className)}
      role={role}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-desc` : undefined}
      // The panel fills the dialog, so a press on the dialog element itself is a press on the scrim
      onPointerDown={(e) => { pressedScrim.current = e.target === e.currentTarget; }}
      onClick={(e) => { if (dismissible && pressedScrim.current && e.target === e.currentTarget) ref.current?.close(); }}
    >
      <header className="cx-dialog__head">
        <h2 className="cx-dialog__title" id={`${id}-title`}>{title}</h2>
        <button type="button" className="cx-dialog__close" aria-label={closeLabel} onClick={() => ref.current?.close()}>
          <Icon name="close" />
        </button>
      </header>
      <div className="cx-dialog__body">
        {description ? <p className="cx-dialog__desc" id={`${id}-desc`}>{description}</p> : null}
        {children}
      </div>
      {actions ? <footer className="cx-dialog__foot">{actions}</footer> : null}
    </dialog>
  );
}

/** A modal box in the middle of the screen. Focus stays inside until it closes, then goes back where it was */
export function Dialog({ size = 'md', alert, className, ...rest }: DialogProps) {
  return <Modal {...rest} kind="cx-dialog" className={cx(`cx-dialog--${size}`, className)} role={alert ? 'alertdialog' : undefined} dismissible={!alert} />;
}

/** A modal panel from the edge of the screen, for a task that needs more room than a dialog: filters, a record's details */
export function Sheet({ side = 'end', className, ...rest }: SheetProps) {
  return <Modal {...rest} kind="cx-dialog cx-sheet" className={cx(`cx-sheet--${side}`, className)} dismissible />;
}
