import { GameOptions } from "../App.js";

const player = (board) => {
  const initialBoard = [
    [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
    [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
    [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
  ];

  if (JSON.stringify(board) === JSON.stringify(initialBoard)) {
    return GameOptions.X;
  }

  let xCount = 0;
  let oCount = 0;

  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell === GameOptions.X) xCount++;
      else if (cell === GameOptions.O) oCount++;
    })
  );

  if (xCount <= oCount) {
    return GameOptions.X;
  }
  return GameOptions.O;
};
const actions = (board) => {
  const actions = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (board[row][col] === GameOptions.EMPTY) {
        actions.push([row, col]);
      }
    }
  }
  return actions;
};
const winner = (board) => {
  for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
    if (
      board[rowIdx][0] === board[rowIdx][1] &&
      board[rowIdx][0] === board[rowIdx][2] &&
      board[rowIdx][0] !== " "
    ) {
      return board[rowIdx][0];
    }

    if (
      board[0][rowIdx] === board[1][rowIdx] &&
      board[0][rowIdx] === board[2][rowIdx] &&
      board[0][rowIdx] !== " "
    ) {
      return board[0][rowIdx];
    }
  }
  if (
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2] &&
    board[0][0] !== " "
  ) {
    return board[0][0];
  }

  if (
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0] &&
    board[2][0] !== " "
  ) {
    return board[0][2];
  }

  return GameOptions.EMPTY;
};

const terminal = (board) => {
  if (winner(board) !== GameOptions.EMPTY || actions(board).length === 0) {
    return true;
  }
  return false;
};

const utility = (board) => {
  switch (winner(board)) {
    case GameOptions.X:
      return 1;
    case GameOptions.O:
      return -1;
    default:
      return 0;
  }
};

export const miniMax = (board) => {
  const initialBoard = [
    [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
    [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
    [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
  ];

  if (JSON.stringify(board) === JSON.stringify(initialBoard)) {
    return random(board);
  }

  const maxi = player(board) === GameOptions.X ? true : false;
  const { move } = calculateNextMove(board, maxi);

  return move;
};

const result = (board, action) => {
  const p = player(board);
  const copyBoard = JSON.parse(JSON.stringify(board));

  copyBoard[action[0]][action[1]] = p;
  return copyBoard;
};

const calculateNextMove = (board, maximize) => {
  if (terminal(board)) {
    return { score: utility(board), best_move: [] };
  }
  if (maximize === true) {
    let best_score = -10000;
    let best_move = null;
    actions(board).forEach((action) => {
      let { score } = calculateNextMove(result(board, action), false);
      if (score > best_score) {
        best_score = score;
        best_move = action;
      }
    });
    return { score: best_score, move: best_move };
  } else if (maximize === false) {
    let best_score = 10000;
    let best_move = null;
    actions(board).forEach((action) => {
      let { score } = calculateNextMove(result(board, action), true);
      if (score < best_score) {
        best_score = score;
        best_move = action;
      }
    });
    return { score: best_score, move: best_move };
  }
};

const random = (board) => {
  const act = actions(board);
  const move = act[Math.floor(Math.random() * (act.length - 0) + 0)];
  return move;
};

export default function gameReducer(state, action) {
  switch (action.type) {
    case "SELECT_PLAYER":
      return {
        ...state,
        humanPlayer: action.selectedPlayer,
        aiPlayer:
          action.selectedPlayer === GameOptions.X
            ? GameOptions.O
            : GameOptions.X,
        playerTurn: action.selectedPlayer === GameOptions.X,
      };

    case "START":
      return { ...state, inProgress: true };
    case "RESTART":
      return {
        board: [
          [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
          [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
          [GameOptions.EMPTY, GameOptions.EMPTY, GameOptions.EMPTY],
        ],
        playerTurn: true,
        aiPlayer: "O",
        humanPlayer: "X",
        isOver: false,
        winner: "",
      };
    case "MAKE_PLAYER_MOVE":
      const newBoard = JSON.parse(JSON.stringify(state.board));
      newBoard[action.cell[0]][action.cell[1]] = state.humanPlayer;
      return {
        ...state,
        board: newBoard,
        playerTurn: false,
        isOver: terminal(newBoard),
        winner: winner(newBoard),
      };
    case "MAKE_AI_MOVE":
      const newAiBoard = JSON.parse(JSON.stringify(state.board));
      newAiBoard[action?.cell[0]][action?.cell[1]] = state.aiPlayer;
      const newState = {
        ...state,
        board: newAiBoard,
        playerTurn: true,
        isOver: terminal(newAiBoard),
        winner: winner(newAiBoard),
      };
      return newState;
    default:
      return state;
  }
}
