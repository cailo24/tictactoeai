import React, { useReducer } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import gameReducer from "./reducers/gameReducer";
import { GameDispatchContext, GameContext } from "./contexts/GameContext";

export const GameOptions = {
  X: "X",
  O: "O",
  EMPTY: " ",
};

const initial = {
  board: [
    [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
    [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
    [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
  ],
  playerTurn: true,
  isOver: false,
  winner: "",
  humanPlayer: "X",
  aiPlayer: "O",
  inProgress: false,
};

function App() {
  const [game, dispatch] = useReducer(gameReducer, initial);
  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        <div className="App">
          <Home />
          <Game />
        </div>
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
