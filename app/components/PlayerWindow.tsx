import type { Mix } from '@/lib/mixtapes';

interface Props {
  mix: Mix;
}

export function PlayerWindow({ mix }: Props) {
  return (
    <section className="window player">
      <div className="titlebar">
        <button className="tb-x" aria-label="close">
          ×
        </button>
        <div className="tb-title">
          Sunday <em>— player</em>
        </div>
        <div className="tb-controls">
          <span>−</span>
          <span>□</span>
        </div>
      </div>
      <div className="body">
        <div className="video">
          <div className="video-meta">
            <span>Reel {mix.catalog.replace('SUN-', '')} · {mix.djShort.toLowerCase().replace(/\W+/g, '_')}.mov</span>
            <span>Side A</span>
          </div>
          <div className="video-corner">— side a, track three.</div>
        </div>
        <div className="now-playing">
          <div className="np-meta">
            <div className="np-eyebrow">Now playing</div>
            <div className="np-title">{mix.title}</div>
            <div className="np-credit">{mix.context}</div>
          </div>
          <div className="controls">
            <button className="ctrl" aria-label="previous">‹‹</button>
            <button className="ctrl play" aria-label="play">▶</button>
            <button className="ctrl" aria-label="next">››</button>
          </div>
        </div>
        <div className="channel-bar">
          <span className="lbl">Channel</span>
          <span>Sunday FM</span>
          <span className="car">▾</span>
        </div>
      </div>
    </section>
  );
}
