<template>
  <div class="tool-bar">
    <el-row>
      <!-- <el-button>JSON</el-button> -->
      <el-button @click="undo">撤销</el-button>
      <el-button @click="redo">重做</el-button>
      <el-button @click="preview">预览</el-button>
      <el-button @click="save">保存</el-button>
      <el-button @click="clearCanvas">清空画布</el-button>
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
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { eventBus } from "@/utils";
const { undo, redo } = useSnapshot();

const isShowPreview = ref(false);
const isScreenshot = ref(false);
const componentStore = useComponent();
const { componentData, canvasStyleData } = storeToRefs(componentStore);

function preview() {
  isScreenshot.value = false;
  isShowPreview.value = true;
  componentStore.setEditMode("preview");
}

function handlePreviewChange() {
  isShowPreview.value = false;
  componentStore.setEditMode("edit");
}

function save() {
  localStorage.setItem("canvasData", JSON.stringify(componentData.value));
  localStorage.setItem("canvasStyle", JSON.stringify(canvasStyleData.value));
  ElMessage.success("保存成功");
}

const { setCurComponent, setComponentData } = componentStore;
const { recordSnapshot } = useSnapshot();
function clearCanvas() {
  setCurComponent({ component: null, index: null });
  setComponentData([]);
  recordSnapshot();
}
// use for shortcutKey
eventBus.on("save", () => save());
eventBus.on("preview", () => preview());
eventBus.on("clearCanvas", () => clearCanvas());
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
