import { DesktopShell } from './components/DesktopShell';
import { MIXES, ACTIVE_MIX } from '@/lib/mixtapes';
import { ACTIVE_REEL } from '@/lib/reels';

export default function Page() {
  return <DesktopShell mix={ACTIVE_MIX} reel={ACTIVE_REEL} mixes={MIXES} />;
}
