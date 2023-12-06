import React, { useEffect, useRef } from "react";
import { Main, Signal, Query, Reset, Mode, Solve } from "@apps/lights-on.js";

const Game = ({ emit, victory, parentState, modeState, solveSignal }) => {
  const isFirstRender = useRef(true);
  const isFirstRenderSolve = useRef(true);
  useEffect(() => {
    Main();
  }, []);
  useEffect(() => {
    Reset();
  }, [parentState]);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    Mode();
  }, [modeState]);
  useEffect(() => {
    console.log(solveSignal);
    if (isFirstRenderSolve.current) {
      isFirstRenderSolve.current = false;
      return;
    }
    Solve();
  }, [solveSignal]);
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
      <canvas id="canvas" width={300} height={300} onClick={getPosition} />
    </>
  );
};

export default Game;
