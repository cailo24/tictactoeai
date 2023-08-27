import React, { useContext } from "react";
import Board from "../Board";
import "./Game.scss";
import { GameContext, GameDispatchContext } from "../../contexts/GameContext";
import { GameOptions } from "../../App";

const Game = () => {
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);

  const getGameHeading = () => {
    if (game.isOver) {
      if (game.winner === game.humanPlayer) {
        return "Congratulation you beat Cailo's AI!";
      }
      if (game.winner === GameOptions.EMPTY) {
        return "Draw, better luck next time chump!";
      }

      return "You got that ass beat huh?";
    }

    if (game.playerTurn) {
      return "Your turn";
    }
    return "Cailo's AI is thinking";
  };
  return (
    game.inProgress && (
      <div className="playground">
        <h1>{getGameHeading()}</h1>
        <Board />
        {game.isOver && (
          <button
            className="playground__reset"
            type="button"
            disabled={!game.isOver}
            onClick={() => {
              dispatch({ type: "RESTART" });
            }}
          >
            Play again!
          </button>
        )}
      </div>
    )
  );
};

export default Game;
