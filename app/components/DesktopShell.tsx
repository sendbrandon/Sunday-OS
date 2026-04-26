'use client';

import { useState } from 'react';
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
  mix: Mix;
  reel: Reel;
  mixes: Mix[];
}

/**
 * Top-level client wrapper that owns visibility state for every window
 * in the OS. Each window is always-rendered (so its drag listeners stay
 * attached) but hides via display:none when not visible. Taskbar items
 * toggle this visibility — the OS minimize/restore.
 */
export function DesktopShell({ mix, reel, mixes }: Props) {
  const [playerVisible, setPlayerVisible] = useState(true);
  const [mixtapesVisible, setMixtapesVisible] = useState(true);
  const [breadOpen, setBreadOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <TopBar onSignupClick={() => setSignupOpen(true)} />
      <main className="stage">
        <StageMark />
        <PlayerWindow
          mix={mix}
          reel={reel}
          visible={playerVisible}
          onMinimize={() => setPlayerVisible(false)}
        />
        <MixtapesWindow
          mixes={mixes}
          activeCatalog={mix.catalog}
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
