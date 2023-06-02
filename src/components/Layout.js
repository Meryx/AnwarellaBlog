import React from 'react';

import Header from '@root/src/components/Header';
import '@root/src/styles/main.scss';
import 'katex/dist/katex.min.css';

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    {children}
  </div>
);

export default Layout;
