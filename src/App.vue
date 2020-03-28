<template>
  <div id="app">
    <h1>Mesterséges intelligencia alkalmazások</h1>
    <h2>2. feladat - Amőba kavicsokkal</h2>
    <h3>Szatmári Mihály</h3>

    <el-button v-if="!isGameStarted" type="success" @click="startGame">
      Játék indítása
    </el-button>

    <div v-if="isGameStarted" id="board-header-container">
      <div id="board-header">
        <el-button type="success" @click="resetGame">
          Új játék
        </el-button>

        <div v-if="!winner">
          <i v-if="isLoading" id="loading-icon" class="el-icon-loading"/>
          <span>{{ currentPlayerText }}</span>
        </div>
      </div>
    </div>

    <div v-if="isGameStarted">
      <div id="board-container">
        <board :state="state"
               :has-winner="winner"
               :current-player="currentPlayer"
               @on-field-click="handleFieldClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import Board from './board/index';
import {getDefaultState, getNewState, getWinner} from './state';
import {Players} from './models';

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
      const { AI, HUMAN } = Players
      this.currentPlayer = this.currentPlayer === AI ? HUMAN : AI
    },
    handleFieldClick({row, column}) {
      this.makeStep(row, column)
      if(!this.winner) {
        this.makeAIStep()
      }
    },
    showGameResult() {
      const { title, message, type } = this.getResultDialogText()
      this.$alert(message, title, { confirmButtonText: 'Bezárás',  type: type })
    },
    getResultDialogText() {
      switch (this.winner) {
        case Players.HUMAN:
          return { title: 'Győzelem', message: 'Gratulálok, győztél!', type: 'success' }
        case Players.AI:
          return { title: 'Vereség', message: 'Sajnálom, vesztettél!', type: 'error' }
        case Players.BOTH:
          return { title: 'Döntetlen', message: 'A játék eredménye döntetlen', type: 'warning' }
      }
    },
    startGame() {
      this.isGameStarted = true
    },
    resetGame() {
      this.winner = null
      this.currentPlayer = 2
      this.state = getDefaultState()
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

  #board-header-container {
    display: grid;
    justify-content: space-around;
    margin-bottom: 20px;
  }

  #board-header {
    width: 450px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #loading-icon {
    margin-right: 5px;
  }
</style>