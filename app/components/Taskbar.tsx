'use client';

interface Props {
  playerVisible: boolean;
  mixtapesVisible: boolean;
  breadOpen: boolean;
  offeringOpen: boolean;
  onPlayerToggle: () => void;
  onMixtapesToggle: () => void;
  onBreadToggle: () => void;
  onOfferingToggle: () => void;
}

export function Taskbar({
  playerVisible,
  mixtapesVisible,
  breadOpen,
  offeringOpen,
  onPlayerToggle,
  onMixtapesToggle,
  onBreadToggle,
  onOfferingToggle,
}: Props) {
  const apps = [
    {
      id: 'player',
      num: 'I',
      label: 'Player',
      active: playerVisible,
      onClick: onPlayerToggle,
    },
    {
      id: 'mixtapes',
      num: 'II',
      label: 'Mixtapes',
      active: mixtapesVisible,
      onClick: onMixtapesToggle,
    },
    {
      id: 'bread',
      num: 'III',
      label: 'Daily Bread',
      active: breadOpen,
      onClick: onBreadToggle,
    },
    {
      id: 'offering',
      num: 'IV',
      label: 'Offering',
      active: offeringOpen,
      onClick: onOfferingToggle,
    },
  ];

  return (
    <nav className="taskbar">
      {apps.map((app) => (
        <button
          key={app.id}
          className={`tb-app${app.active ? ' active' : ''}`}
          onClick={app.onClick}
          title={`${app.label} — click to ${app.active ? 'minimize' : 'restore'}`}
        >
          <span className="tb-num">{app.num}</span>
          <span className="tb-label">{app.label}</span>
        </button>
      ))}
    </nav>
  );
}
