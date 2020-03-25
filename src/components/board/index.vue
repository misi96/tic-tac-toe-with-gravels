<template>
  <div class="board-container">
    <table>
      <tr v-for="(row, i) in state" :key="i">
        <td v-for="(value, j) in row"
            :key="j"
            @click="handleFieldClick(i, j)">
          <el-button :type="getButtonType(i, j)"
                     :class="{ hidden: isEmptyCell(i, j) }"
                     icon="el-icon-user-solid"
                     circle/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Board',
    props: {
      state: Array
    },
    methods: {
      handleFieldClick(row, column) {
        this.$emit('on-field-click', {row, column})
      },
      isEmptyCell(row, column) {
        return this.state[row][column] === 0
      },
      getButtonType(row, column) {
        switch (this.state[row][column]) {
          case 1:
            return 'danger'
          case 2:
            return 'warning'
          case 3:
            return 'success'
        }
      }
    }
  }
</script>

<style scoped lang="css">
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
  }

  .board-container {
    display: grid;
    grid-gap: 10px;
    justify-content: center;
  }

  .hidden {
    visibility: hidden;
  }
</style>
