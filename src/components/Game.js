import React, { useEffect } from "react";
import { Main, Signal, Query } from "@apps/lights-on.js";

const Game = ({ emit, victory }) => {
  useEffect(() => {
    Main();
  }, []);
  const getPosition = (e) => {
    console.log("clicked");
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x, y);
    const response = Signal(x, y);

    if (response) emit();

    if (Query()) victory();
  };
  return (
    <>
      <canvas id="canvas" width={168} height={168} onClick={getPosition} />
    </>
  );
};

export default Game;
