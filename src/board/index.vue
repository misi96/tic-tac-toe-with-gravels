<template>
  <div class="board-container">
    <table>
      <tr v-for="(row, i) in state" :key="i">
        <td v-for="(value, j) in row"
            :key="j"
            @click="handleFieldClick(i, j)">
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
  export default {
    name: 'Board',
    props: {
      state: Array,
      hasWinner: Boolean,
      currentPlayer: Number
    },
    methods: {
      handleFieldClick(row, column) {
        if(!this.hasWinner && this.currentPlayer !== 1) {
          this.state[row][column].slice(-1) !== 'g'
            ? this.$emit('on-field-click', {row, column})
            : this.$message.warning('Oda nem léphetsz!')
        }
      },
      isEmptyCell(row, column) {
        return this.state[row][column] === '0'
      },
      getGravelIcon(row, column) {
        return `el-icon-${this.state[row][column][0] === '1' ? 's-tools' : 'user-solid'}`
      },
      getGravelColor(row, column) {
        switch (this.state[row][column].slice(-1)) {
          case 'r':
            return 'red'
          case 'o':
            return 'orange'
          case 'g':
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

  .board-container {
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
