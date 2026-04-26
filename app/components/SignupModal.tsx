'use client';

import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '@/lib/useDraggable';
import { signup, type SignupResult } from '../actions/signup';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SignupModal({ open, onClose }: Props) {
  const { ref, style } = useDraggable({ x: 400, y: 140 });
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SignupResult | null>(null);

  useEffect(() => {
    if (open) {
      setResult(null);
      setPending(false);
      // focus email input on open
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const res = await signup(formData);
    setResult(res);
    setPending(false);
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="window signup"
      style={{ ...style, display: open ? 'block' : 'none' }}
    >
      <div className="titlebar" data-drag-handle>
        <button className="tb-x" onClick={onClose} aria-label="close">×</button>
        <div className="tb-title">
          Sunday <em>— join the congregation</em>
        </div>
        <div className="tb-controls">
          <span>−</span>
          <span>□</span>
        </div>
      </div>
      <div className="signup-body">
        {!result?.ok ? (
          <>
            <div className="signup-eyebrow">A daily scripture, every morning.</div>
            <h2 className="signup-title">Receive the word.</h2>
            <p className="signup-lede">
              One verse, sent at sunrise. Hand-picked from the King James Version. No content beyond that.
            </p>
            <form className="signup-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="signup-input"
                autoComplete="email"
                disabled={pending}
              />
              <button
                type="submit"
                className="signup-submit"
                disabled={pending}
              >
                {pending ? 'Sending…' : 'Receive'}
              </button>
            </form>
            {result?.ok === false && (
              <div className="signup-error">{result.message}</div>
            )}
            <div className="signup-fineprint">
              Unsubscribe anytime. We don’t share emails with anyone.
            </div>
          </>
        ) : (
          <div className="signup-success">
            <div className="signup-eyebrow">Welcome.</div>
            <h2 className="signup-title">{result.message}</h2>
            <p className="signup-lede">
              Watch your inbox tomorrow at sunrise.
            </p>
            <button className="signup-submit" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
