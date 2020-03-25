<template>
  <div id="app">
    <h1>Mesterséges intelligencia alkalmazások</h1>
    <h2>2. feladat - Amőba kavicsokkal</h2>
    <h3>Szatmári Mihály</h3>

    <div id="new-game-button">
      <el-button type="primary" @click="resetGame">
        Új játék
      </el-button>
    </div>

    <div id="board-container">
      <board :state="state" @on-field-click="handleFieldClick"/>
    </div>
  </div>
</template>

<script>
import Board from './components/board/index';

export default {
  name: 'App',
  components: {
    Board
  },
  data() {
    return {
      isWin: false,
      gravels: [1, 2, 3],
      state: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    }
  },
  mounted() {
  },
  methods: {
    handleFieldClick(coordinates) {
      this.addGravel(coordinates)
    },
    addGravel({row, column}) {
      switch (this.state[row][column]) {
        case 0:
          this.state[row][column] = 1
          break
        case 1:
          this.state[row][column] = 2
          break
        case 2:
          this.state[row][column] = 3
          break
      }
      this.state = [...this.state]
      this.showGameResult()
    },
    showGameResult() {
      if(this.isGoalState(this.state)) {
        this.$confirm('Gratulálok, te győztél!', 'Győzelem', {
          confirmButtonText: 'Új játék',
          cancelButtonText: 'Mégsem',
          type: 'success'
        })
          .then(() => this.state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]])
      }
    },
    isGoalState(state) {
      return this.hasDiagonalGoalValues(state) ||
        this.hasRowGoalValues(state) ||
        this.hasColumnGoalValues(state)
    },
    hasDiagonalGoalValues(state) {
      const leftDiagonalValues = state.map((row, i) => state[i][i])
      const rightDiagonalValues = state.map((row, i) => state[i][state.length - 1 - i])

      return this.areGoalValues(leftDiagonalValues) || this.areGoalValues(rightDiagonalValues)
    },
    hasRowGoalValues(state) {
      return state.some(row => this.areGoalValues(row))
    },
    hasColumnGoalValues(state) {
      const columns = state.map((row, i) => row.map((value, j) => state[j][i]))
      return columns.some(column => this.areGoalValues(column))
    },
    areGoalValues(values) {
      return values.every(value => value === values[0] && value !== 0)
    },
    resetGame() {
      this.state = [[0,0,0], [0,0,0], [0,0,0]]
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-width: 400px;
  }

  #board-container {
    display: grid;
  }

  #new-game-button {
    margin-bottom: 20px;
  }
</style>
