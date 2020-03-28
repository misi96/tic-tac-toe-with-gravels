import {Gravels, Players} from '../models';

export function getNewState({row, column, state, player}) {
  const color = state[row][column].slice(-1)
  const {EMPTY, RED, ORANGE, GREEN} = Gravels

  switch (color) {
    case EMPTY:
      state[row][column] = `${player}${RED}`
      break
    case RED:
      state[row][column] = `${player}${ORANGE}`
      break
    case ORANGE:
      state[row][column] = `${player}${GREEN}`
      break
  }

  return JSON.parse(JSON.stringify(state))
}

export function isGreenStone(row, column, state) {
  return state[row][column].slice(-1) === Gravels.GREEN
}

export function getWinner(state) {
  const goalValues = getDiagonalGoalValues(state) || getRowGoalValues(state) || getColumnGoalValues(state)
  return goalValues ? +goalValues[0][0] : isTie(state) ? Players.BOTH : null
}

export function getDiagonalGoalValues(state) {
  const leftDiagonalValues = state.map((row, i) => state[i][i])
  const rightDiagonalValues = state.map((row, i) => state[i][state.length - 1 - i])

  return getGoalValues(leftDiagonalValues) || getGoalValues(rightDiagonalValues)
}

export function getRowGoalValues(state) {
  return state.find(row => getGoalValues(row))
}

export function getColumnGoalValues(state) {
  const columns = state.map((row, i) => row.map((value, j) => state[j][i]))
  return columns.find(column => getGoalValues(column))
}

export function getGoalValues(values) {
  const areGoalValues = values.every(value => value === values[0] && value !== Gravels.EMPTY)
  return areGoalValues ? values : null
}

export function getDefaultState() {
  const {EMPTY} = Gravels

  const defaultState = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
  ]

  return JSON.parse(JSON.stringify(defaultState))
}

export function isTie(state) {
  return state.every(row => row.every(value => value.slice(-1) === Gravels.GREEN))
}
