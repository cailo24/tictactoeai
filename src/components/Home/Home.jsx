import React, { useContext } from "react";
import { GameContext, GameDispatchContext } from "../../contexts/GameContext";
import "./Home.scss";
import { GameOptions } from "../../App";

const PLAYERS = [
  {
    label: "Play as X",
    value: "X",
  },
  {
    label: "Play as O",
    value: "O",
  },
];

const Home = () => {
  const dispatch = useContext(GameDispatchContext);
  const game = useContext(GameContext);

  return (
    !game.inProgress && (
      <div className="Home">
        <h1>Can you beat Cailo's AI at Tic-Tac-Toe?</h1>
        <h2>X goes first</h2>
        <div className="Home__players">
          {PLAYERS.map((p) => {
            const cls =
              game.humanPlayer === p.value
                ? "Home__players__buttons--active"
                : "Home__players__buttons";
            return (
              <button
                className={cls}
                key={p.label}
                type="button"
                value={p.value}
                onClick={() =>
                  dispatch({ type: "SELECT_PLAYER", selectedPlayer: p.value })
                }
              >
                {p.label}
              </button>
            );
          })}
        </div>
        {game.humanPlayer !== "" && (
          <button
            className="Home__start"
            type="button"
            onClick={() => dispatch({ type: "START" })}
          >
            Start
          </button>
        )}
      </div>
    )
  );
};

export default Home;
