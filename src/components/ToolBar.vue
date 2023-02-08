<template>
  <div class="tool-bar">
    <el-row>
      <el-button>JSON</el-button>
      <el-button @click="undo">撤销</el-button>
      <el-button @click="redo">重做</el-button>
      <el-button @click="preview(false)">预览</el-button>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { useSnapshot } from "@/stores";
const { undo, redo } = useSnapshot();

function preview(isScreenshot) {}
</script>
<style lang="scss">
.tool-bar {
  padding: 15px 10px;
  white-space: nowrap;
  overflow-x: auto;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
</style>
