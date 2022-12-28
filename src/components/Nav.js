import React from 'react';
import { Link } from 'gatsby';

import './nav.css';

const Nav = () => (
  <>
    <p id="header-in-nav">
      <span id="header-desc">[Programming, GradSchool, Personal Opinions]</span>{' '}
      from Anwar Haredy
    </p>
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-list-item">
          <Link to="/About">About</Link>
        </li>
      </ul>
    </nav>
  </>
);

export default Nav;
