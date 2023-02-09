<template>
  <div ref="container" class="bg">
    <el-button v-if="!isScreenshot" class="close" @click="$emit('close')"
      >关闭</el-button
    >
    <el-button v-else class="close" @click="htmlToImage">确定</el-button>
    <div class="canvas-container">
      <div
        class="canvas"
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
import { getCanvasStyle, changeStyleWithScale } from "@/utils";
import { cloneDeep } from "lodash";

defineProps({
  isScreenshot: {
    type: Boolean,
    default: false,
  },
});

const { canvasStyleData, componentData } = useComponent();
const copyData = cloneDeep(componentData);
function htmlToImage() {}
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
