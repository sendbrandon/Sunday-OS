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

  const [activeCatalog, setActiveCatalog] = useState(initialMix.catalog);
  const activeMix =
    mixes.find((m) => m.catalog === activeCatalog) ?? initialMix;

  // Reel rotation — pick a random reel on first client mount so the
  // visitor lands on a different video each visit. SSR uses the stable
  // initial reel to avoid hydration mismatch; client picks fresh after.
  const [reelIndex, setReelIndex] = useState(0);
  useEffect(() => {
    if (reels.length > 1) {
      setReelIndex(Math.floor(Math.random() * reels.length));
    }
  }, [reels.length]);
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
      <Taskbar
        playerVisible={playerVisible}
        mixtapesVisible={mixtapesVisible}
        breadOpen={breadOpen}
        onPlayerToggle={() => setPlayerVisible((v) => !v)}
        onMixtapesToggle={() => setMixtapesVisible((v) => !v)}
        onBreadToggle={() => setBreadOpen((v) => !v)}
      />
    </>
  );
}
