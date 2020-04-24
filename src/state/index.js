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

  return getDeepCopy(state)
}

export function isGravelGreen(row, column, state) {
  return state[row][column].slice(-1) === Gravels.GREEN
}

export function getWinner(state, gravel) {
  const goalValues = getDiagonalGoalValues(state) || getRowGoalValues(state) || getColumnGoalValues(state)
  return goalValues ? +goalValues[0][0] : isTie(state, gravel) ? Players.BOTH : null
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

  return getDeepCopy(defaultState)
}

export function isTie(state, gravel) {
  return state.every(row => row.every(value => gravel
    ? value.slice(-1) !== gravel
    : value.slice(-1) === Gravels.GREEN))
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
