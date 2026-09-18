import React from 'react';
import logoSvg from '/public/Logo.svg';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <img 
          src={logoSvg} 
          alt="Logo CarbuPrix" 
          className="header-logo" 
        />
        <h1>CarbuPrix</h1>
      </div>
      <p className="header-subtitle">Les prix autour de vous</p>
    </header>
  );
}