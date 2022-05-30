import React from 'react';

import logo from '../assets/img/fortnite-logo.png';

import 'materialize-css';

export default function Template({ children }) {
  return (
    <div className="app-root">
      <header>
        <nav>
          <div className="nav-wrapper black">
            <img
              src={logo}
              className="brand-logo"
              alt="Fortnite Logo"
              width="120px"
            />
          </div>
        </nav>
      </header>
      <main style={{
        padding: '50px',
      }}
      >
        {children}

      </main>
      <footer className="black">
        <b>AC05 | Jall&apos;s</b>
      </footer>
    </div>
  );
}
