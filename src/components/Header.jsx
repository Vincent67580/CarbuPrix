import React from 'react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <img 
          src="/Logo.svg" 
          alt="Logo CarbuPrix" 
          className="header-logo" 
        />
        <h1>CarbuPrix</h1>
      </div>
      <p className="header-subtitle">Les prix autour de vous</p>
    </header>
  );
}