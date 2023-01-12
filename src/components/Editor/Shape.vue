<template>
  <div
    class="shape"
    @mousedown="handleMouseDownOnShape"
    :style="getShapeStyle(element.style)"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { useComponent } from "@/stores/canvas";
import type { Pos, Component } from "@/types";
import { ref } from "vue";
import { getShapeStyle } from "@/utils/style";

const componentStore = useComponent();
const { setCurComponent, setShapeStyle, setClickComponentStatus } =
  componentStore;
const fresh = ref(0);
const { element, index } = defineProps({
  element: {
    required: true,
    type: Object,
    default: () => {},
  },
  index: {
    required: true,
    type: Number,
    default: 0,
  },
});

function handleMouseDownOnShape(e: MouseEvent) {
  e.stopPropagation();

  setClickComponentStatus(true);
  setCurComponent({
    component: element as Component,
    index,
  });

  const pos: Pos = { ...element.style };
  const startY = e.clientY;
  const startX = e.clientX;
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(pos.top);
  const startLeft = Number(pos.left);

  const move = (moveEvent: MouseEvent) => {
    fresh.value++;
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
.shape {
  position: absolute;
}
</style>
