import { DesktopShell } from './components/DesktopShell';
import { MIXES, ACTIVE_MIX } from '@/lib/mixtapes';
import { REELS, ACTIVE_REEL } from '@/lib/reels';

export default function Page() {
  return (
    <DesktopShell
      initialMix={ACTIVE_MIX}
      initialReel={ACTIVE_REEL}
      mixes={MIXES}
      reels={REELS}
    />
  );
}
