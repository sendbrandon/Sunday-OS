'use client';

import { useState, useEffect, useRef } from 'react';
import { MOODS, REACHES, VERSES, type Mood, type Reach, type VerseKey } from '@/lib/verses';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = 'q1' | 'q2' | 'verse';

export function DailyBreadWindow({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>('q1');
  const [mood, setMood] = useState<Mood | null>(null);
  const [reach, setReach] = useState<Reach | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const verseRef = useRef<HTMLDivElement>(null);

  // reset state every time the window opens
  useEffect(() => {
    if (open) {
      setStep('q1');
      setMood(null);
      setReach(null);
      setSavedFlash(false);
    }
  }, [open]);

  // re-trigger fade-in animation when verse changes
  useEffect(() => {
    if (step === 'verse' && verseRef.current) {
      verseRef.current.classList.remove('bread-verse-state');
      void verseRef.current.offsetWidth; // force reflow
      verseRef.current.classList.add('bread-verse-state');
    }
  }, [step, mood, reach]);

  if (!open) return null;

  const handleMood = (m: Mood) => {
    setMood(m);
    setStep('q2');
  };

  const handleReach = (r: Reach) => {
    setReach(r);
    setStep('verse');
  };

  const handleAnother = () => {
    setMood(null);
    setReach(null);
    setStep('q1');
  };

  const handleSave = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const verse =
    mood && reach
      ? VERSES[`${mood}-${reach}` as VerseKey]
      : VERSES['good-gratitude'];

  return (
    <div className="window bread">
      <div className="titlebar">
        <button className="tb-x" onClick={onClose} aria-label="close">
          ×
        </button>
        <div className="tb-title">
          Sunday <em>— daily bread</em>
        </div>
        <div className="tb-controls">
          <span>−</span>
          <span>□</span>
        </div>
      </div>
      <div className="bread-body">
        {step === 'q1' && (
          <>
            <div className="bread-eyebrow">
              <span className="step">Step 1</span>{' '}
              <span className="of">of two · receive today’s word</span>
            </div>
            <h2 className="bread-title">What kind of day is this?</h2>
            <div className="bread-options">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  className="bread-opt"
                  onClick={() => handleMood(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'q2' && (
          <>
            <div className="bread-eyebrow">
              <span className="step">Step 2</span>{' '}
              <span className="of">of two · receive today’s word</span>
            </div>
            <h2 className="bread-title">What are you reaching for?</h2>
            <div className="bread-options">
              {REACHES.map((r) => (
                <button
                  key={r.id}
                  className="bread-opt"
                  onClick={() => handleReach(r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'verse' && (
          <div ref={verseRef} className="bread-verse-state">
            <div className="bread-ref">— {verse.ref} · King James Version</div>
            <div className="bread-text">“{verse.text}”</div>
            <div className="bread-actions">
              <button className="bread-act primary" onClick={handleAnother}>
                Receive another
              </button>
              <button
                className="bread-act"
                onClick={handleSave}
                style={savedFlash ? { opacity: 0.5 } : undefined}
              >
                {savedFlash ? 'Saved.' : 'Save to testimony'}
              </button>
              <button
                className="bread-act"
                onClick={onClose}
                style={{ marginLeft: 'auto' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
