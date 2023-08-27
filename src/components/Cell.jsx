import React, { useContext } from "react";
import "./Cell.scss";
import { GameOptions } from "../App";
import { GameContext, GameDispatchContext } from "../contexts/GameContext";

const Cell = ({ row, column, value }) => {
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);

  const flipCell = (e) => {
    if (value === GameOptions.EMPTY && game.playerTurn) {
      dispatch({
        type: "MAKE_PLAYER_MOVE",
        cell: [row, column],
      });
    }
  };
  return (
    <div
      className="cell"
      onClick={flipCell}
      disabled={value !== GameOptions.EMPTY}
      value={value}
    >
      {value}
    </div>
  );
};

export default Cell;
