import React, { useContext, useEffect } from "react";
import { GameContext, GameDispatchContext } from "../contexts/GameContext";
import { miniMax } from "../reducers/gameReducer";
import Cell from "./Cell";
import "./Board.scss";

const Board = () => {
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(resolve, 500);
    }).then(() => {
      if (!game.playerTurn && !game.isOver) {
        const move = miniMax(game.board);
        dispatch({ type: "MAKE_AI_MOVE", cell: move });
      }
    });
  }, [game.board, game.playerTurn, game.isOver, dispatch]);

  return (
    <div className="Board">
      {game?.board?.map((row, rowIdx) =>
        row?.map((value, col) => (
          <Cell key={(row, col)} row={rowIdx} column={col} value={value} />
        ))
      )}
    </div>
  );
};

export default Board;
