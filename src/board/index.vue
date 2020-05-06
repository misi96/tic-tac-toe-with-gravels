<template>
  <div id="board-container">
    <table>
      <tr v-for="(row, i) in state" :key="i">
        <td v-for="(value, j) in row" :key="j" @click="handleFieldClick(i, j)">
          <el-avatar class="animated"
                     :class="{ hidden: isEmptyCell(i, j) }"
                     :style="{ background: getGravelColor(i, j) }"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {Gravels, Players} from '../models';

export default {
  name: 'Board',
  props: {
    state: Array,
    hasWinner: Boolean,
    currentPlayer: Number
  },
  methods: {
    handleFieldClick(row, column) {
      const isClickEnabled = !this.hasWinner && this.currentPlayer === Players.HUMAN
      const isStoneGreen = this.state[row][column] === Gravels.GREEN

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
    getGravelColor(row, column) {
      switch (this.state[row][column]) {
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
