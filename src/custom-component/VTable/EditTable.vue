<template>
  <div class="edit-table">
    <table @dblclick="handleDblclick">
      <tbody>
        <tr v-for="(item, row) in tableData" :key="row">
          <td
            v-for="(e, col) in item"
            :key="col"
            :class="{ selected: curTd === row + ',' + col }"
            @click="handleClickCell(row, col)"
          >
            <el-input
              v-if="canEdit && curTd === row + ',' + col"
              v-model="tableData[row][col]"
              v-focus
              @blur="handleBlur"
            ></el-input>
            <span v-else>{{ e }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="addRow">添加新行</button>
      <button @click="addCol">添加新列</button>
      <button @click="deleteRow">删除行</button>
      <button @click="deleteCol">删除列</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useComponent } from "@/stores";
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";

const vFocus = {
  mounted: (el) => el.querySelector("input").focus(),
};

const curTd = ref("");
const canEdit = ref(false);
const curTdBackUp = ref("");

const componentStore = useComponent();
const tableData = computed(
  () => (componentStore.curComponent?.propValue as Record<string, any>).data
);

function handleDblclick() {
  canEdit.value = true;
}

function handleClickCell(row, col) {
  curTd.value = row + "," + col;
  curTdBackUp.value = curTd.value;
}

function handleBlur() {
  canEdit.value = false;
  curTd.value = "";
}

function addRow() {
  tableData.value.push(new Array(tableData.value[0]?.length || 1).fill(" "));
}

function addCol() {
  if (tableData.value.length) {
    tableData.value.forEach((item) => item.push(" "));
  } else {
    tableData.value.push([" "]);
  }
}

function deleteRow() {
  if (!curTdBackUp.value) {
    ElMessage.error("请先选择要删除的行");
    return;
  }

  const row = curTdBackUp.value.split(",")[0];
  tableData.value.splice(row, 1);
}

function deleteCol() {
  if (!curTdBackUp.value) {
    ElMessage.error("请先选择要删除的列");
    return;
  }

  const col = curTdBackUp.value.split(",")[1];
  tableData.value.forEach((item) => {
    item.splice(col, 1);
  });
}
</script>

<style lang="scss" scoped>
.edit-table {
  overflow: auto;
  margin-bottom: 8px;

  & > div {
    margin-top: 18px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    button {
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      font-weight: 500;
      padding: 4px 10px;
      font-size: 14px;
      border-radius: 4px;
      margin-bottom: 10px;

      &:hover {
        background: #ecf5ff;
        color: #409eff;
      }
    }
  }

  table {
    border-collapse: collapse;
    word-break: break-all;
    word-wrap: break-word;
    text-align: center;
    font-size: 12px;

    td {
      border: 1px solid #ebeef5;
      height: 40px;
      min-width: 60px;
      max-width: 80px;
      padding: 10px;
    }
  }

  .selected {
    background: #ecf5ff;
    color: #409eff;
  }
}
</style>
