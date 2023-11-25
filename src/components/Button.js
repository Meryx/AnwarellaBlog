import React from "react";

const Button = ({ children, style, callback }) => {
  const className =
    style === "primary" ? "button button-primary" : "button button-secondary";
  return (
    <>
      <button onClick={callback} className={className}>
        {children}
      </button>
    </>
  );
};

export default Button;
