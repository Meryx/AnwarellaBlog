import React from "react";
import { useState } from "react";
import Game from "@components/Game";
import Layout from "@components/Layout";
import "./lights-on-game.css";

const LightsOn = () => {
  const [moves, setMoves] = useState(0);
  const [victory, setVictory] = useState(false); // [victory, setVictory
  const incrementMoves = () => {
    setMoves(moves + 1);
  };
  const declareVictory = () => {
    setVictory(true);
  };
  return (
    <Layout>
      <h1>Lights on!</h1>
      <p>
        Click on a cell to toggle its state and the state of its adjacent cells
        (excluding diagonals) from on to off or vice versa. Turn on all cells to
        win.
      </p>
      <div className="victory-message">
        {victory && <span>Congratulations on your victory!</span>}
      </div>
      <div className="game-container">
        <Game emit={incrementMoves} victory={declareVictory} />
        <p>Moves: {moves}</p>
      </div>
    </Layout>
  );
};

export default LightsOn;

export const Head = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <title>404 Not Found</title>
    </>
  );
};
