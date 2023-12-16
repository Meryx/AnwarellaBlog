import React from "react";
import Nav from "./Nav";

const Header = ({ title }) => {
  return (
    <div>
      <h1>Anwar Haredy</h1>
      <h2 className="subheader">Software Engieering and Computer Science</h2>
      <Nav />
      <div className="header-divider"></div>
    </div>
  );
};

export default Header;
