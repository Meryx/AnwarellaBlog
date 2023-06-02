import React from 'react';
import Nav from './Nav';

const Header = ({ title }) => {
  return (
    <div>
      <h1>Anwar Haredy's Blog</h1>
      <h2>Programming, Graphics, Grad School, and Random Thoughts</h2>
      <Nav />
      <div className="header-divider"></div>
    </div>
  );
};

export default Header;
