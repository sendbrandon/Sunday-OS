'use client';

import { useState } from 'react';
import { SignupModal } from './SignupModal';

export function TopBar() {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      <header className="topbar">
        <div className="tb-section">
          <button
            className="tb-link"
            onClick={() => setSignupOpen(true)}
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
    </>
  );
}
