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
import {getDefaultState, getNewState, getWinner, Players} from './state';

export default {
  name: 'App',
  components: {
    Board
  },
  data() {
    return {
      winner: null,
      isGameStarted: false,
      currentPlayer: Players.HUMAN,
      state: getDefaultState()
    }
  },
  computed: {
    isLoading() {
      return this.currentPlayer === Players.AI && !this.winner
    },
    currentPlayerText() {
      return !this.isLoading ? 'Te következel' : 'Az ellenfél következik'
    }
  },
  methods: {
    switchPlayer() {
      const {AI, HUMAN} = Players
      this.currentPlayer = this.currentPlayer === AI ? HUMAN : AI
    },
    handleFieldClick(coordinates) {
      this.addGravel(coordinates)
    },
    addGravel({row, column}) {
      this.makeStep(row, column)
      if(!this.winner) {
        this.makeAIStep()
      }
    },
    showGameResult() {
      const title = this.winner === Players.BOTH ?
        'Döntetlen'
        : this.winner === Players.HUMAN ? 'Győzelem' : 'Vereség'
      const message = this.winner === 2 ? 'Gratulálok, győztél!' : 'Sajnálom, vesztettél!'

      this.$alert(message, title, {
        confirmButtonText: 'Bezárás',
        type: `${this.winner === 2 ? 'success' : 'error'}`
      })
    },
    startGame() {
      if(this.isGameStarted) {
        this.winner = null
        this.currentPlayer = 2
        this.state = getDefaultState()
      } else {
        this.isGameStarted = true
      }
    },
    makeAIStep() {
      const row = Math.floor(Math.random() * 3);
      const column = Math.floor(Math.random() * 3);

      setTimeout(() => this.makeStep(row, column), 500)
    },
    makeStep(row, column) {
      this.state = getNewState({row, column, state: this.state, player: this.currentPlayer})
      this.winner = getWinner(this.state)
      this.winner ? this.showGameResult() : this.switchPlayer()
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
