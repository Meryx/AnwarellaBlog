import React from 'react';

const fourOhfour = () => {
  return (
    <>
      <div className="fourohfour-container">
        <div class="not-found">
          <h1>404</h1>
          <p>The page you're looking for does not exist.</p>
        </div>
      </div>
    </>
  );
};

export default fourOhfour;

export const Head = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <title>404 Not Found</title>
    </>
  );
};
