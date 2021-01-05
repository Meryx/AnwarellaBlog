import React from 'react';
import Nav from './Nav';
const Header = ({ title }) => {

  return (
    <div>
      <h1>{title}</h1>
      <Nav />
    </div>
  );


};

export default Header;
