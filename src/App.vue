<template>
  <div id="app">
    <h1>Mesterséges intelligencia alkalmazások</h1>
    <h2>2. feladat - Amőba kavicsokkal</h2>
    <h3>Szatmári Mihály</h3>

    <div id="new-game-button">
      <el-button type="success"
                 @click="startGame">
        {{`${isGameStarted ? 'Új játék' : 'Játék indítása'}`}}
      </el-button>
    </div>

    <div v-if="isGameStarted">
      <p v-if="!winner">
        <i v-if="isLoading" id="loading-icon" class="el-icon-loading"/>
        <span>{{ currentPlayerText }}</span>
      </p>

      <div id="board-container">
        <board :state="state"
               :has-winner="!!winner"
               :current-player="currentPlayer"
               @on-field-click="handleFieldClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import Board from './board/index';

export default {
  name: 'App',
  components: {
    Board
  },
  data() {
    return {
      isGameStarted: false,
      currentPlayer: 2,
      winner: null,
      state: [
        ['0', '0', '0'],
        ['0', '0', '0'],
        ['0', '0', '0'],
      ]
    }
  },
  computed: {
    isLoading() {
      return this.currentPlayer === 1 && !this.winner
    },
    currentPlayerText() {
      return !this.isLoading ? 'Te következel' : 'Az ellenfél következik'
    }
  },
  methods: {
    switchPlayer() {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
    },
    handleFieldClick(coordinates) {
      this.addGravel(coordinates)
    },
    addGravel({row, column}) {
      switch (this.state[row][column].slice(-1)) {
        case '0':
          this.state[row][column] = `${this.currentPlayer}r`
          break
        case 'r':
          this.state[row][column] = `${this.currentPlayer}o`
          break
        case 'o':
          this.state[row][column] = `${this.currentPlayer}g`
          break
      }
      this.state = [...this.state]
      if(this.isGoalState(this.state)) {
        this.showGameResult()
      }
      this.switchPlayer()

      if(this.currentPlayer === 1 && !this.winner) {
        setTimeout(() => {this.makeAIStep()}, 1000)
      }
    },
    showGameResult() {
      const title = this.winner === 2 ? 'Győzelem' : 'Vereség'
      const message = this.winner === 2 ? 'Gratulálok, győztél!' : 'Sajnálom, vesztettél!'

      this.$alert(message, title, {
        confirmButtonText: 'Bezárás',
        type: `${this.winner === 2 ? 'success' : 'error'}`
      })
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
      const isGoal = values.every(value => value === values[0] && value !== '0')
      this.winner = isGoal ? +values[0][0] : null

      return isGoal
    },
    startGame() {
      if(this.isGameStarted) {
        this.winner = null
        this.currentPlayer = 2
        this.state = [['0', '0', '0'], ['0', '0', '0'], ['0', '0', '0']]
      } else {
        this.isGameStarted = true
      }
    },
    makeAIStep() {
      const row = Math.floor(Math.random() * 3);
      const column = Math.floor(Math.random() * 3);

      this.addGravel({row, column})
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

  #loading-icon {
    margin-right: 5px;
  }
</style>
