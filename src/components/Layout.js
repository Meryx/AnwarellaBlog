import React from "react";
import PropTypes from "prop-types";
import "./layout.css";
import "katex/dist/katex.min.css";



const Layout = ({ children }) => (
  <div className="layout">

    <div className="main">{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
