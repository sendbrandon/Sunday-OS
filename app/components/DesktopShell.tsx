'use client';

import { useEffect, useState } from 'react';
import type { Mix } from '@/lib/mixtapes';
import type { Reel } from '@/lib/reels';
import { TopBar } from './TopBar';
import { StageMark } from './StageMark';
import { PlayerWindow } from './PlayerWindow';
import { MixtapesWindow } from './MixtapesWindow';
import { DailyBreadWindow } from './DailyBreadWindow';
import { SignupModal } from './SignupModal';
import { OfferingModal } from './OfferingModal';
import { Taskbar } from './Taskbar';

interface Props {
  initialMix: Mix;
  initialReel: Reel;
  mixes: Mix[];
  reels: Reel[];
}

export function DesktopShell({ initialMix, initialReel, mixes, reels }: Props) {
  const [playerVisible, setPlayerVisible] = useState(true);
  const [mixtapesVisible, setMixtapesVisible] = useState(true);
  const [breadOpen, setBreadOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [offeringOpen, setOfferingOpen] = useState(false);
  const [offeringReceived, setOfferingReceived] = useState(false);

  // Detect Stripe Checkout return — open the Offering modal in
  // "thank you" mode and clean the URL so a refresh doesn't re-trigger.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('offering') === 'received') {
      setOfferingOpen(true);
      setOfferingReceived(true);
      // remove the param without a navigation
      params.delete('offering');
      params.delete('mock');
      const cleaned = params.toString();
      const newUrl = window.location.pathname + (cleaned ? '?' + cleaned : '');
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  // Random mix on first visit. SSR uses the stable initial mix to avoid
  // hydration mismatch; client picks a random one immediately after mount.
  const [activeCatalog, setActiveCatalog] = useState(initialMix.catalog);
  useEffect(() => {
    if (mixes.length > 1) {
      const idx = Math.floor(Math.random() * mixes.length);
      setActiveCatalog(mixes[idx].catalog);
    }
  }, [mixes]);
  const activeMix =
    mixes.find((m) => m.catalog === activeCatalog) ?? initialMix;

  // Reel rotation — pick a random reel on first mount, then auto-advance
  // to a different random reel each time the current one ends. Continuous
  // viewing: 10 reels × ~25s each, shuffled, never repeats back-to-back.
  // An hour of watching feels like one long curated channel.
  const [reelIndex, setReelIndex] = useState(0);
  useEffect(() => {
    if (reels.length > 1) {
      setReelIndex(Math.floor(Math.random() * reels.length));
    }
  }, [reels.length]);

  const handleReelEnd = () => {
    if (reels.length <= 1) return;
    let next = reelIndex;
    while (next === reelIndex) {
      next = Math.floor(Math.random() * reels.length);
    }
    setReelIndex(next);
  };

  const activeReel = reels[reelIndex] ?? initialReel;

  return (
    <>
      <TopBar onSignupClick={() => setSignupOpen(true)} />
      <main className="stage">
        <StageMark />
        <PlayerWindow
          mix={activeMix}
          reel={activeReel}
          visible={playerVisible}
          onMinimize={() => setPlayerVisible(false)}
          onReelEnd={handleReelEnd}
        />
        <MixtapesWindow
          mixes={mixes}
          activeCatalog={activeCatalog}
          onSelect={(catalog) => setActiveCatalog(catalog)}
          visible={mixtapesVisible}
          onMinimize={() => setMixtapesVisible(false)}
        />
      </main>
      <DailyBreadWindow
        open={breadOpen}
        onClose={() => setBreadOpen(false)}
      />
      <SignupModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
      />
      <OfferingModal
        open={offeringOpen}
        receivedFlash={offeringReceived}
        onClose={() => {
          setOfferingOpen(false);
          // reset received state once the user closes the thank-you
          setOfferingReceived(false);
        }}
      />
      <Taskbar
        playerVisible={playerVisible}
        mixtapesVisible={mixtapesVisible}
        breadOpen={breadOpen}
        offeringOpen={offeringOpen}
        onPlayerToggle={() => setPlayerVisible((v) => !v)}
        onMixtapesToggle={() => setMixtapesVisible((v) => !v)}
        onBreadToggle={() => setBreadOpen((v) => !v)}
        onOfferingToggle={() => {
          setOfferingOpen((v) => !v);
          // when re-opening manually after a thank-you, drop the flash
          if (offeringReceived) setOfferingReceived(false);
        }}
      />
    </>
  );
}
