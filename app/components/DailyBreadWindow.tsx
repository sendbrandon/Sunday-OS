'use client';

import { useState, useEffect, useRef } from 'react';
import { MOODS, REACHES, VERSES, type Mood, type Reach, type VerseKey } from '@/lib/verses';
import { useDraggable } from '@/lib/useDraggable';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = 'q1' | 'q2' | 'verse';

const SITE_URL = 'https://sunday-os.vercel.app';

export function DailyBreadWindow({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>('q1');
  const [mood, setMood] = useState<Mood | null>(null);
  const [reach, setReach] = useState<Reach | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [copiedFlash, setCopiedFlash] = useState(false);
  const verseAnimRef = useRef<HTMLDivElement>(null);

  // Static initial position; centered for typical viewport. Drag to reposition.
  const { ref, style } = useDraggable({ x: 370, y: 120 });

  // reset state every time the window opens
  useEffect(() => {
    if (open) {
      setStep('q1');
      setMood(null);
      setReach(null);
      setSavedFlash(false);
      setCopiedFlash(false);
    }
  }, [open]);

  // re-trigger fade-in animation when verse renders
  useEffect(() => {
    if (step === 'verse' && verseAnimRef.current) {
      verseAnimRef.current.classList.remove('bread-verse-state');
      void verseAnimRef.current.offsetWidth;
      verseAnimRef.current.classList.add('bread-verse-state');
    }
  }, [step, mood, reach]);

  const verse =
    mood && reach
      ? VERSES[`${mood}-${reach}` as VerseKey]
      : VERSES['good-gratitude'];

  const shareText = `“${verse.text}” — ${verse.ref}`;
  const shareUrl = SITE_URL;

  const handleAnother = () => {
    setMood(null);
    setReach(null);
    setStep('q1');
  };

  const handleSave = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopiedFlash(true);
      setTimeout(() => setCopiedFlash(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleShareNative = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: 'Sunday — Daily Bread',
          text: shareText,
          url: shareUrl,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopy();
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="window bread"
      style={{ ...style, display: open ? 'block' : 'none' }}
    >
      <div className="titlebar" data-drag-handle>
        <button className="tb-x" onClick={onClose} aria-label="close">×</button>
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
                  onClick={() => {
                    setMood(m.id);
                    setStep('q2');
                  }}
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
                  onClick={() => {
                    setReach(r.id);
                    setStep('verse');
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'verse' && (
          <div ref={verseAnimRef} className="bread-verse-state">
            <div className="bread-ref">— {verse.ref} · King James Version</div>
            <div className="bread-text">“{verse.text}”</div>

            <div className="bread-share">
              <span className="bread-share-label">Share</span>
              <a
                className="bread-share-btn"
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
              >
                Twitter
              </a>
              <a
                className="bread-share-btn"
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                Facebook
              </a>
              <button
                className="bread-share-btn"
                onClick={handleShareNative}
                aria-label="Share via device"
              >
                More
              </button>
              <button
                className="bread-share-btn"
                onClick={handleCopy}
                aria-label="Copy verse"
              >
                {copiedFlash ? 'Copied.' : 'Copy'}
              </button>
            </div>

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
