import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="title-container">
        <h1 className="title">
          <span className="evolve">evolve</span>
          <span className="garage">garage</span>
        </h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="/service" className="nav-link">Service</a></li>
          <li className="nav-item"><a href="/about" className="nav-link">About us</a></li>
          <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
          <li className="nav-item"><a href="/faq" className="nav-link">FAQ</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;