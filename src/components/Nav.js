import React from "react";
import { Link } from "gatsby";

const Nav = () => (
  <>
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-list-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-list-item">
          <Link to="/all-posts">All Posts</Link>
        </li>
      </ul>
    </nav>
  </>
);

export default Nav;
