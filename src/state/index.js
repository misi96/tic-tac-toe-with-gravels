import {Gravels} from '../models';

export function getNewState({row, column, state}) {
  const {EMPTY, RED, ORANGE, GREEN} = Gravels

  switch (state[row][column]) {
    case EMPTY:
      state[row][column] = RED
      break
    case RED:
      state[row][column] = ORANGE
      break
    case ORANGE:
      state[row][column] = GREEN
      break
  }

  return getDeepCopy(state)
}

export function hasWinner(state) {
  return hasDiagonalGoalValues(state) || hasRowGoalValues(state) || hasColumnGoalValues(state)
}

export function hasDiagonalGoalValues(state) {
  const leftDiagonalValues = state.map((row, i) => state[i][i])
  const rightDiagonalValues = state.map((row, i) => state[i][state.length - 1 - i])

  return hasGoalValues(leftDiagonalValues) || hasGoalValues(rightDiagonalValues)
}

export function hasRowGoalValues(state) {
  return state.some(row => hasGoalValues(row))
}

export function hasColumnGoalValues(state) {
  const columns = state.map((row, i) => row.map((value, j) => state[j][i]))
  return columns.some(column => hasGoalValues(column))
}

export function hasGoalValues(values) {
  return values.every(value => value === values[0] && value !== Gravels.EMPTY)
}

export function getDefaultState() {
  const {EMPTY} = Gravels

  const defaultState = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
  ]

  return getDeepCopy(defaultState)
}

export function getDeepCopy(state) {
  return JSON.parse(JSON.stringify(state))
}

export function doesStateContain(value, state) {
  return state.some((row, i) => row.some((column, j) => state[i][j].includes(value)))
}

export function getLowestGravelToDropOn(state) {
  if(doesStateContain(Gravels.EMPTY, state)) {
    return Gravels.EMPTY
  } else if (doesStateContain(Gravels.RED, state)) {
    return Gravels.RED
  } else if (doesStateContain(Gravels.ORANGE, state)) {
    return Gravels.ORANGE
  } else {
    return Gravels.GREEN
  }
}
