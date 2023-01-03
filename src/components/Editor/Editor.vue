<template>
  <div class="editor" id="editor">
    <component
      v-for="(item, index) in componentData"
      :key="item.id"
      :is="item.component"
      :style="getShapeStyle(item.style)"
      :propValue="item.propValue"
      @mousedown="handleMouseDown($event, item, index)"
    />
  </div>
</template>
<script setup lang="ts">
import { useComponent } from "@/stores/canvas";
import type { Pos } from "@/types";
import { storeToRefs } from "pinia";
import { getShapeStyle } from "@/utils/style";

const componentStore = useComponent();
const { setCurComponent, setShapeStyle } = componentStore;
const { componentData } = storeToRefs(componentStore);

function handleMouseDown(e: MouseEvent, element, index) {
  e.stopPropagation();

  setCurComponent({
    component: element,
    index,
  });

  const pos: Pos = { ...element.style };
  const startY = e.clientY;
  const startX = e.clientX;
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(pos.top);
  const startLeft = Number(pos.left);

  const move = (moveEvent: MouseEvent) => {
    const currX = moveEvent.clientX;
    const currY = moveEvent.clientY;

    pos.top = currY - startY + startTop;
    pos.left = currX - startX + startLeft;
    // 修改当前组件样式
    setShapeStyle(pos);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}
</script>
<style lang="scss">
.editor {
  position: relative;
  background: #fff;
  height: 100%;
}
</style>
