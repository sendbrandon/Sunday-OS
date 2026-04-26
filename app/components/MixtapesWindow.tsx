import type { Mix } from '@/lib/mixtapes';

interface Props {
  mixes: Mix[];
  activeCatalog: string;
}

export function MixtapesWindow({ mixes, activeCatalog }: Props) {
  return (
    <aside className="window mixtapes">
      <div className="titlebar">
        <button className="tb-x" aria-label="close">×</button>
        <div className="tb-title">
          Sunday <em>— mixtapes</em>
        </div>
        <div className="tb-controls">
          <span>−</span>
          <span>□</span>
        </div>
      </div>
      <div className="body">
        <div className="mix-banner">
          <h2>Mixtapes</h2>
          <span className="count">fifty-two sundays</span>
        </div>
        <div className="mix-grid">
          {mixes.map((mix) => (
            <button
              key={mix.catalog}
              className={`mix-card${mix.catalog === activeCatalog ? ' active' : ''}`}
              aria-label={`Play ${mix.title} by ${mix.djFull}`}
            >
              <span className="stamp">{mix.catalog}</span>
              <span className="scrawl">{mix.djShort}</span>
              <span className="duration">{mix.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
