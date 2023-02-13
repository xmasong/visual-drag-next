<template>
  <div ref="container" class="bg">
    <el-button v-if="!isScreenshot" class="close" @click="handleClose"
      >关闭</el-button
    >
    <el-button v-else class="close" @click="htmlToImage">确定</el-button>
    <div class="canvas-container">
      <div
        class="preview-canvas"
        :style="{
          ...getCanvasStyle(canvasStyleData),
          width: changeStyleWithScale(canvasStyleData.width) + 'px',
          height: changeStyleWithScale(canvasStyleData.height) + 'px',
        }"
      >
        <ComponentWrapper
          v-for="(item, index) in copyData"
          :key="index"
          :config="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useComponent } from "@/stores";
import { getCanvasStyle, changeStyleWithScale, $ } from "@/utils";
import { cloneDeep } from "lodash";
import ComponentWrapper from "./ComponentWrapper.vue";
import { toPng } from "html-to-image";

defineProps({
  isScreenshot: {
    type: Boolean,
    default: false,
  },
});

const { canvasStyleData, componentData } = useComponent();
const copyData = cloneDeep(componentData);

const emit = defineEmits(["close"]);
function handleClose() {
  emit("close");
}

function htmlToImage() {
  toPng($(".preview-canvas"))
    .then((dataUrl) => {
      const a = document.createElement("a");
      a.setAttribute("download", "screenshot");
      a.href = dataUrl;
      a.click();
    })
    .catch((error) => {
      console.error("oops, something went wrong!", error);
    })
    .finally(handleClose);
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;

  .canvas-container {
    width: calc(100% - 40px);
    height: calc(100% - 120px);
    overflow: auto;

    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
    }
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
