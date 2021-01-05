import React from 'react';
import './Body.css';

const Body = ({ children }) => {
  return (
    <div className='container'>
      {children}
    </div>
  )
}

export default Body;
