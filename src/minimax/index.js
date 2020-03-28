import {getNewState, getWinner, isGreenStone, Players} from '../state';

export function getBestMove(state) {
  let bestScore = -Infinity;
  let move;
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      if (!isGreenStone(row, column, state)) {
        const newState = getNewState({row, column, state, player: Players.AI})
        let score = minimax(newState, 0, false, -Infinity, Infinity);
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

function minimax(state, depth, isMaximizing, alpha, beta) {
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
          let score = minimax(newState, depth + 1, false, alpha, beta);
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore)
          if(beta <= alpha) {
            break
          }
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
          let score = minimax(newState, depth + 1, true, alpha, beta);
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, bestScore)
          if(beta <= alpha) {
            break
          }
        }
      }
    }
    return bestScore;
  }
}

