<template>
  <div id="board-container">
    <table>
      <tr v-for="(row, i) in state" :key="i">
        <td v-for="(value, j) in row" :key="j" @click="handleFieldClick(i, j)">
          <el-avatar :icon="getGravelIcon(i, j)"
                     class="animated"
                     :class="{ hidden: isEmptyCell(i, j) }"
                     :style="{ background: getGravelColor(i, j) }"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {Gravels, Players} from '../models';
import {isGravelGreen} from '../state';

export default {
  name: 'Board',
  props: {
    state: Array,
    winner: Number,
    currentPlayer: Number
  },
  methods: {
    handleFieldClick(row, column) {
      const isClickEnabled = !this.winner && this.currentPlayer === Players.HUMAN
      const isStoneGreen = isGravelGreen(row, column, this.state)

      if(isClickEnabled) {
        !isStoneGreen ? this.emitCoordinates({row, column}) : this.showInvalidStepMessage()
      }
    },
    emitCoordinates(coordinates) {
      this.$emit('on-field-click', coordinates)
    },
    showInvalidStepMessage() {
      this.$message.warning('Oda nem léphetsz!')
    },
    isEmptyCell(row, column) {
      return this.state[row][column] === Gravels.EMPTY
    },
    getGravelIcon(row, column) {
      const isAIGravel = +this.state[row][column][0] === Players.AI
      return `el-icon-${isAIGravel? 's-tools' : 'user-solid'}`
    },
    getGravelColor(row, column) {
      switch (this.state[row][column].slice(-1)) {
        case Gravels.RED:
          return 'red'
        case Gravels.ORANGE:
          return 'orange'
        case Gravels.GREEN:
          return 'green'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    width: 450px;
    height: 450px;
    border-collapse: collapse;
    border-radius: 1em;
  }

  table, th, td {
    border: 1px solid black;
  }

  td {
    background: lightgrey;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: wheat;
    }
  }

  #board-container {
    display: grid;
    grid-gap: 10px;
    justify-content: center;
  }

  .hidden {
    visibility: hidden;
  }

  .animated {
    transition: 0.3s;
  }
</style>
