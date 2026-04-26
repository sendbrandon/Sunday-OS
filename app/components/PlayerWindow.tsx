'use client';

import { useEffect, useState } from 'react';
import type { Mix } from '@/lib/mixtapes';
import type { Reel } from '@/lib/reels';
import { useDraggable } from '@/lib/useDraggable';

interface Props {
  mix: Mix;
  reel: Reel;
  visible: boolean;
  onMinimize: () => void;
  onReelEnd: () => void;
}

function buildMixcloudEmbed(shareUrl: string, autoplay: boolean) {
  const path = shareUrl.replace(/^https?:\/\/(www\.)?mixcloud\.com/, '');
  const feed = encodeURIComponent(path);
  return `https://www.mixcloud.com/widget/iframe/?feed=${feed}&hide_cover=1&light=1${autoplay ? '&autoplay=1' : ''}`;
}

export function PlayerWindow({ mix, reel, visible, onMinimize, onReelEnd }: Props) {
  const { ref, style } = useDraggable({ x: 92, y: 64 });
  const [playing, setPlaying] = useState(false);
  const embedUrl = buildMixcloudEmbed(mix.mixcloudUrl, true);

  // Auto-play on first visit. 120ms delay lets DesktopShell's random-mix
  // selection settle first so the iframe loads with the right URL on
  // first mount instead of remounting once the random mix swaps in.
  // Browser autoplay policies may still hold audio paused until first
  // user click — that's expected and fine.
  useEffect(() => {
    const t = setTimeout(() => setPlaying(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="window player"
      style={{ ...style, display: visible ? 'block' : 'none' }}
    >
      <div className="titlebar" data-drag-handle>
        <button className="tb-x" onClick={onMinimize} aria-label="minimize">×</button>
        <div className="tb-title">
          Sunday <em>— player</em>
        </div>
        <div className="tb-controls">
          <span onClick={onMinimize} role="button" aria-label="minimize">−</span>
          <span aria-label="maximize">□</span>
        </div>
      </div>
      <div className="body">
        <div className="video">
          <video
            key={reel.id}
            className="video-el"
            src={reel.filename}
            autoPlay
            muted
            playsInline
            onEnded={onReelEnd}
          />
          <div className="video-meta">
            <span>{reel.id} · {reel.filename.split('/').pop()}</span>
            <span>Side A</span>
          </div>
          <div className="video-corner">{reel.context}</div>
        </div>
        <div className="now-playing">
          <div className="np-meta">
            <div className="np-eyebrow">Now playing</div>
            <div className="np-title">{mix.title}</div>
            <div className="np-credit">{mix.context}</div>
          </div>
          <div className="controls">
            <button className="ctrl" aria-label="previous">‹‹</button>
            <button
              className="ctrl play"
              aria-label={playing ? 'pause' : 'play'}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? '‖' : '▶'}
            </button>
            <button className="ctrl" aria-label="next">››</button>
          </div>
        </div>
        {playing && (
          <iframe
            key={mix.catalog}
            className="mixcloud-iframe"
            title={`${mix.title} — Mixcloud`}
            src={embedUrl}
            width="100%"
            height="60"
            frameBorder="0"
            allow="autoplay"
          />
        )}
        <div className="channel-bar">
          <span className="lbl">Channel</span>
          <span>Sunday FM</span>
          <span className="car">▾</span>
        </div>
      </div>
    </section>
  );
}
