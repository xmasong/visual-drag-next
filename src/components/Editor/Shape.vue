<template>
  <div
    class="shape"
    :class="{ active }"
    @mousedown="handleMouseDownOnShape"
    :style="getShapeStyle(props.element.style)"
  >
    <div
      v-for="item in isActive() ? pointList : []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
    ></div>
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
const props = defineProps({
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
  active: {
    required: true,
    type: Boolean,
    default: false,
  },
});

function handleMouseDownOnShape(e: MouseEvent) {
  e.stopPropagation();

  setClickComponentStatus(true);
  setCurComponent({
    component: props.element as Component,
    index: props.index,
  });

  const pos: Pos = { ...props.element.style };
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

// 操作锚点相关
const pointList = ref(["lt", "t", "rt", "r", "rb", "b", "lb", "l"]);
function isActive() {
  return props.active && !props.element.isLock;
}
function getPointStyle(point) {
  const width = props.element.style.width;
  const height = props.element.style.height;
  const hasT = /t/.test(point);
  const hasB = /b/.test(point);
  const hasL = /l/.test(point);
  const hasR = /r/.test(point);
  let newLeft = 0;
  let newTop = 0;

  // 四个角的点
  if (point.length === 2) {
    newLeft = hasL ? 0 : width;
    newTop = hasT ? 0 : height;
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = width / 2;
      newTop = hasT ? 0 : height;
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width;
      newTop = Math.floor(height / 2);
    }
  }

  const style = {
    marginLeft: "-4px",
    marginTop: "-4px",
    left: `${newLeft}px`,
    top: `${newTop}px`,
    // cursor: this.cursors[point],
  };

  return style;
}
</script>
<style lang="scss">
.shape {
  position: absolute;

  &.active {
    outline: 1px solid #70c0ff;
    user-select: none;
  }

  .shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #59c7f9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
  }
}
</style>
