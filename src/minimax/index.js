import {getDeepCopy, getNewState, hasWinner} from '../state';
import {Players} from '../models';

export function getBestMove(state, gravel) {
  let bestScore = -Infinity;
  let move;
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      if (state[row][column].includes(gravel)) {
        const newState = getNewState({row, column, state: getDeepCopy(state), player: Players.AI})
        let score = minimax(newState, 0, false, -Infinity, Infinity, gravel);
        if (score > bestScore) {
          bestScore = score;
          move = { row, column };
        }
      }
    }
  }
  return move
}

let scores = [10, -10];

function minimax(state, depth, isMaximizing, alpha, beta, gravel) {
  let result = hasWinner(state, gravel);
  if (result) {
    const winner = isMaximizing ? Players.HUMAN : Players.AI
    return scores[winner - 1];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (state[row][column].includes(gravel)) {
          const newState = getNewState({row, column, state: getDeepCopy(state), player: Players.AI})
          let score = minimax(getDeepCopy(newState), depth + 1, false, alpha, beta, gravel);
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
        if (state[row][column].includes(gravel)) {
          const newState = getNewState({row, column, state: getDeepCopy(state), player: Players.HUMAN})
          let score = minimax(getDeepCopy(newState), depth + 1, true, alpha, beta, gravel);
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
