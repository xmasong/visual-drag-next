<template>
  <div class="tool-bar">
    <el-row>
      <el-button>JSON</el-button>
      <el-button>撤销</el-button>
      <el-button>重做</el-button>
    </el-row>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.tool-bar {
  padding: 15px 10px;
  white-space: nowrap;
  overflow-x: auto;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
</style>
