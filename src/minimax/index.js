import {getNewState, getWinner, isGreenStone, Players} from '../state';

export function getBestMove(state) {
  let bestScore = -Infinity;
  let move;
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      if (!isGreenStone(row, column, state)) {
        const newState = getNewState({row, column, state, player: Players.AI})
        let score = minimax(newState, 0, false);
        if (score > bestScore) {
          bestScore = score;
          move = { row, column };
        }
      }
    }
  }
  return move
}

let scores = [10, -10, 0];

function minimax(state, depth, isMaximizing) {
  let result = getWinner(state);
  if (result !== null) {
    return scores[result - 1];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (!isGreenStone(row, column, state)) {
          const newState = getNewState({row, column, state, player: Players.AI})
          let score = minimax(newState, depth + 1, false);
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (!isGreenStone(row, column, state)) {
          const newState = getNewState({row, column, state, player: Players.HUMAN})
          let score = minimax(newState, depth + 1, true);
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

