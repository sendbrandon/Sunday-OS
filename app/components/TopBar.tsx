'use client';

interface Props {
  onSignupClick: () => void;
}

export function TopBar({ onSignupClick }: Props) {
  return (
    <header className="topbar">
      <div className="tb-section">
        <button
          className="tb-link"
          onClick={onSignupClick}
          aria-label="Join the congregation"
        >
          Join the congregation
        </button>
        <span className="tb-sep">/</span>
        <button className="tb-link" aria-label="Sign in">Sign in</button>
      </div>
      <div className="tb-section">
        <span>Sun · 19 Jul 1987</span>
        <span className="tb-sep">·</span>
        <span>5:47 PM</span>
      </div>
    </header>
  );
}
