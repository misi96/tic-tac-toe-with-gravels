export function getNewState({row, column, state, player}) {
  const color = state[row][column].slice(-1)
  const stateCopy = JSON.parse(JSON.stringify(state))

  switch (color) {
    case '0':
      stateCopy[row][column] = `${player}r`
      break
    case 'r':
      stateCopy[row][column] = `${player}o`
      break
    case 'o':
      stateCopy[row][column] = `${player}g`
      break
  }

  return JSON.parse(JSON.stringify(stateCopy))
}

export function isGreenStone(row, column, state) {
  return state[row][column].slice(-1) === 'g'
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
  const areGoalValues = values.every(value => value === values[0] && value !== '0')
  return areGoalValues ? values : null
}

export function getDefaultState() {
  const defaultState = [
    ['0', '0', '0'],
    ['0', '0', '0'],
    ['0', '0', '0']
  ]

  return JSON.parse(JSON.stringify(defaultState))
}

export function isTie(state) {
  return state.every(row => row.every(value => value.slice(-1) === 'g'))
}

export const Players = {
  AI: 1,
  HUMAN: 2,
  BOTH: 3
}
