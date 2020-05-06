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

        <div v-if="!hasWinner">
          <i v-if="isLoading" id="loading-icon" class="el-icon-loading"/>
          <span>{{ currentPlayerText }}</span>
        </div>
      </div>
    </div>

    <div v-if="isGameStarted">
      <div id="board-container">
        <board :state="state"
               :has-winner="hasWinner"
               :current-player="currentPlayer"
               @on-field-click="handleFieldClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import Board from './board/index';
import {
  getDeepCopy,
  getDefaultState,
  getLowestGravelToDropOn,
  getNewState,
  hasWinner
} from './state';
import {Players} from './models';
import {getBestMove} from './minimax';

export default {
  name: 'App',
  components: {
    Board
  },
  data() {
    return {
      hasWinner: false,
      isGameStarted: false,
      currentPlayer: Players.HUMAN,
      state: getDefaultState()
    }
  },
  computed: {
    isLoading() {
      return this.currentPlayer === Players.AI && !this.hasWinner
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
      if(!this.hasWinner) {
        setTimeout(() => this.makeAIStep(), 1000)
      }
    },
    showGameResult() {
      const { title, message, type } = this.getResultDialogText()
      this.$alert(message, title, { confirmButtonText: 'Bezárás',  type: type })
    },
    getResultDialogText() {
      if(this.currentPlayer === Players.HUMAN) {
        return { title: 'Győzelem', message: 'Gratulálok, győztél!', type: 'success' }
      } else {
        return { title: 'Vereség', message: 'Sajnálom, vesztettél!', type: 'error' }
      }
    },
    startGame() {
      this.isGameStarted = true
    },
    resetGame() {
      this.hasWinner = false
      this.currentPlayer = 2
      this.state = getDefaultState()
    },
    makeAIStep() {
      const gravel = getLowestGravelToDropOn(this.state)
      const {row, column} = getBestMove(getDeepCopy(this.state), gravel)
      this.makeStep(row, column)
    },
    makeStep(row, column) {
      this.state = getNewState({row, column, state: this.state, player: this.currentPlayer})
      this.hasWinner = hasWinner(this.state)
      this.hasWinner ? this.showGameResult() : this.switchPlayer()
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
