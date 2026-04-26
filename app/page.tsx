import { TopBar } from './components/TopBar';
import { StageMark } from './components/StageMark';
import { PlayerWindow } from './components/PlayerWindow';
import { MixtapesWindow } from './components/MixtapesWindow';
import { Taskbar } from './components/Taskbar';
import { MIXES, ACTIVE_MIX } from '@/lib/mixtapes';

export default function Page() {
  return (
    <>
      <TopBar />
      <main className="stage">
        <StageMark />
        <PlayerWindow mix={ACTIVE_MIX} />
        <MixtapesWindow mixes={MIXES} activeCatalog={ACTIVE_MIX.catalog} />
      </main>
      <Taskbar />
    </>
  );
}
