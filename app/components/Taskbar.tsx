'use client';

import { useState } from 'react';
import { DailyBreadWindow } from './DailyBreadWindow';

const APPS = [
  { id: 'player', num: 'I', label: 'Player' },
  { id: 'mixtapes', num: 'II', label: 'Mixtapes' },
  { id: 'bread', num: 'III', label: 'Daily Bread' },
  { id: 'testimony', num: 'IV', label: 'Testimony' },
  { id: 'guestbook', num: 'V', label: 'Guestbook' },
] as const;

export function Taskbar() {
  const [breadOpen, setBreadOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<string>('player');

  const handleClick = (id: string) => {
    setActiveApp(id);
    if (id === 'bread') setBreadOpen(true);
  };

  return (
    <>
      <DailyBreadWindow open={breadOpen} onClose={() => setBreadOpen(false)} />
      <nav className="taskbar">
        {APPS.map((app) => (
          <button
            key={app.id}
            className={`tb-app${activeApp === app.id ? ' active' : ''}`}
            onClick={() => handleClick(app.id)}
            title={app.label}
          >
            <span className="tb-num">{app.num}</span>
            <span className="tb-label">{app.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
