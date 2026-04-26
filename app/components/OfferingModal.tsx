'use client';

import { useEffect, useState } from 'react';
import { useDraggable } from '@/lib/useDraggable';
import { createOffering, type OfferingResult } from '../actions/offering';

interface Props {
  open: boolean;
  onClose: () => void;
  /** True when the user is returning from a successful Stripe Checkout */
  receivedFlash: boolean;
}

const PRESETS = [
  { amount: 5, label: 'the widow’s mite' },
  { amount: 10, label: 'a Sunday tithe' },
  { amount: 25, label: 'the building fund' },
] as const;

export function OfferingModal({ open, onClose, receivedFlash }: Props) {
  const { ref, style } = useDraggable({ x: 420, y: 140 });
  const [selected, setSelected] = useState<number | 'custom'>(10);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setPending(false);
      if (!receivedFlash) {
        setSelected(10);
        setCustomAmount('');
        setName('');
      }
    }
  }, [open, receivedFlash]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    setError(null);
    setPending(true);

    const amount =
      selected === 'custom' ? Number(customAmount) : selected;

    const formData = new FormData();
    formData.set('amount', String(amount));
    if (name) formData.set('name', name);

    const result: OfferingResult = await createOffering(formData);

    if (!result.ok || !result.url) {
      setError(result.message ?? 'Something went wrong.');
      setPending(false);
      return;
    }

    window.location.href = result.url;
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="window offering"
      style={{ ...style, display: open ? 'block' : 'none' }}
    >
      <div className="titlebar" data-drag-handle>
        <button className="tb-x" onClick={onClose} aria-label="close">×</button>
        <div className="tb-title">
          Sunday <em>— offering</em>
        </div>
        <div className="tb-controls">
          <span>−</span>
          <span>□</span>
        </div>
      </div>

      <div className="offering-body">
        {receivedFlash ? (
          <div className="offering-thanks">
            <div className="offering-eyebrow">Received.</div>
            <h2 className="offering-title">Thank you.</h2>
            <p className="offering-lede">
              The plate has been passed. Sunday is alive because of you.
            </p>
            <button className="offering-submit" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="offering-eyebrow">The plate is being passed.</div>
            <h2 className="offering-title">Receive what you have received.</h2>
            <p className="offering-lede">
              Sunday is a labor of love. Give as the spirit moves you.
            </p>

            <form className="offering-form" onSubmit={handleSubmit}>
              <div className="offering-tiles">
                {PRESETS.map((p) => (
                  <button
                    type="button"
                    key={p.amount}
                    className={`offering-tile${selected === p.amount ? ' active' : ''}`}
                    onClick={() => setSelected(p.amount)}
                  >
                    <span className="offering-tile-amount">${p.amount}</span>
                    <span className="offering-tile-label">— {p.label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  className={`offering-tile${selected === 'custom' ? ' active' : ''}`}
                  onClick={() => setSelected('custom')}
                >
                  <span className="offering-tile-amount">
                    $
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      step="1"
                      placeholder="—"
                      className="offering-custom-input"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelected('custom');
                      }}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  </span>
                  <span className="offering-tile-label">— or as the spirit moves you</span>
                </button>
              </div>

              <input
                type="text"
                placeholder="your name (optional, for the guestbook)"
                className="offering-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                disabled={pending}
              />

              {error && <div className="offering-error">{error}</div>}

              <button type="submit" className="offering-submit" disabled={pending}>
                {pending ? 'sending…' : 'give thanks'}
              </button>

              <div className="offering-fineprint">
                Secured by Stripe. One-time gift, no recurring charges.
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
