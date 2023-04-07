<template>
  <div
    ref="shapeRef"
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
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { useComponent } from "@/stores/canvas";
import type { Pos, Component } from "@/types";
import { ref, nextTick, onMounted } from "vue";
import {
  getShapeStyle,
  calculateComponentPositonAndSize,
  eventBus,
} from "@/utils";
import { useCompose, useSnapshot } from "@/stores";
import { storeToRefs } from "pinia";
import runAnimation from "@/utils/runAnimation";

const componentStore = useComponent();
const {
  setCurComponent,
  setShapeStyle,
  setClickComponentStatus,
  setInEditorStatus,
} = componentStore;
const { curComponent } = storeToRefs(componentStore);
const { recordSnapshot } = useSnapshot();
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
  setInEditorStatus(true);
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

  // 如果元素没有移动，则不保存快照
  let hasMove = false;
  const move = (moveEvent: MouseEvent) => {
    hasMove = true;
    const curX = moveEvent.clientX;
    const curY = moveEvent.clientY;

    pos.top = curY - startY + startTop;
    pos.left = curX - startX + startLeft;
    // 修改当前组件样式
    setShapeStyle(pos);
    // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
    // 如果不使用 nextTick，吸附后将无法移动
    nextTick(() => {
      // 触发元素移动事件，用于显示标线、吸附功能
      // 后面两个参数代表鼠标移动方向
      // curY - startY > 0 true 表示向下移动 false 表示向上移动
      // curX - startX > 0 true 表示向右移动 false 表示向左移动
      eventBus.emit("move", {
        isDownward: curY - startY > 0,
        isRightward: curX - startX > 0,
      });
    });
  };

  const up = () => {
    hasMove && recordSnapshot();
    // 触发元素停止移动事件，用于隐藏标线
    eventBus.emit("unmove");
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

function isNeedLockProportion() {
  if (props.element.component != "Group") return false;
  // const ratates = [0, 90, 180, 360];
  // for (const component of props.element.propValue) {
  //   if (!ratates.includes(mod360(parseInt(component.style.rotate)))) {
  //     return true;
  //   }
  // }

  // return false;
}

function handleMouseDownOnPoint(point, e) {
  setInEditorStatus(true);
  setClickComponentStatus(true);

  e.stopPropagation();
  e.preventDefault();

  const style = { ...props.element.style };

  // 组件宽高比
  const proportion = style.width / style.height;

  // 组件中心点
  const center = {
    x: style.left + style.width / 2,
    y: style.top + style.height / 2,
  };

  // 获取画布位移信息
  const { editor } = useCompose();
  const editorRectInfo = editor!.getBoundingClientRect();

  // 获取 point 与实际拖动基准点的差值 @justJokee
  // fix https://github.com/woai3c/visual-drag-demo/issues/26#issue-937686285
  const pointRect = e.target.getBoundingClientRect();
  // 当前点击圆点相对于画布的中心坐标
  const curPoint = {
    x: Math.round(
      pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2
    ),
    y: Math.round(
      pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2
    ),
  };

  // 获取对称点的坐标
  const symmetricPoint = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y),
  };

  // 是否需要保存快照
  let needSave = false;
  let isFirst = true;

  const needLockProportion = isNeedLockProportion();
  const move = (moveEvent) => {
    // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
    // 因此第一次点击时不触发 move 事件
    if (isFirst) {
      isFirst = false;
      return;
    }

    needSave = true;
    const curPositon = {
      x: moveEvent.clientX - Math.round(editorRectInfo.left),
      y: moveEvent.clientY - Math.round(editorRectInfo.top),
    };

    calculateComponentPositonAndSize(
      point,
      style,
      curPositon,
      proportion,
      needLockProportion,
      {
        center,
        curPoint,
        symmetricPoint,
      }
    );
    setShapeStyle(style);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    needSave && recordSnapshot();
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

const shapeRef = ref();
onMounted(() => {
  eventBus.on("runAnimation", () => {
    if (props.element == curComponent.value) {
      runAnimation(shapeRef.value, curComponent.value.animations);
    }
  });
  eventBus.on("stopAnimation", () => {
    shapeRef.value.classList.remove("animated", "infinite");
  });
});
</script>
<style lang="scss">
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
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
