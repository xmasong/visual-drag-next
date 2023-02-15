<template>
  <div class="tool-bar">
    <el-row>
      <el-button>JSON</el-button>
      <el-button @click="undo">撤销</el-button>
      <el-button @click="redo">重做</el-button>
      <el-button @click="preview">预览</el-button>
    </el-row>
    <!-- 预览 -->
    <Preview
      v-if="isShowPreview"
      :is-screenshot="isScreenshot"
      @close="handlePreviewChange"
    />
  </div>
</template>
<script setup lang="ts">
import { useComponent, useSnapshot } from "@/stores";
import { ref } from "vue";
import Preview from "./Editor/Preview.vue";
const { undo, redo } = useSnapshot();

const isShowPreview = ref(false);
const isScreenshot = ref(false);
const { setEditMode } = useComponent();

function preview() {
  isScreenshot.value = false;
  isShowPreview.value = true;
  setEditMode("preview");
}

function handlePreviewChange() {
  isShowPreview.value = false;
  setEditMode("edit");
}
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
