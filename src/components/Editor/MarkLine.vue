<template>
  <div class="mark-line">
    <div
      v-for="line in lineList"
      v-show="lineStatus[line] || false"
      :key="line"
      ref="lineRef"
      class="line"
      :class="line.includes('x') ? 'xline' : 'yline'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useComponent } from "@/stores";
import { eventBus, getComponentRotatedStyle } from "@/utils";
import { storeToRefs } from "pinia";
import { reactive, ref, onMounted } from "vue";

// 分别对应三条横线和三条竖线
const lineList = ref(["xt", "xc", "xb", "yl", "yc", "yr"]);
// 相距 dff 像素将自动吸附
const diff = ref(3);
const lineStatus = reactive({
  xt: false,
  xc: false,
  xb: false,
  yl: false,
  yc: false,
  yr: false,
});
const lineRef = ref();
const componentStore = useComponent();
const { componentData, curComponent } = storeToRefs(componentStore);
const { setShapeSingleStyle } = componentStore;
function hideLine() {
  Object.keys(lineStatus).forEach((line) => {
    lineStatus[line] = false;
  });
}

function isNearly(dragValue, targetValue) {
  return Math.abs(dragValue - targetValue) <= diff.value;
}

// Todo: 旋转吸附
function translateCurComponentShift(key, condition, curComponentStyle) {
  const { width, height } = curComponent.value!.style;
  if (key == "top") {
    return Math.round(
      condition.dragShift - (height - curComponentStyle.height) / 2
    );
  }

  return Math.round(
    condition.dragShift - (width - curComponentStyle.width) / 2
  );
}

function chooseTheTureLine(needToShow, isDownward, isRightward) {
  // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
  // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
  if (isRightward) {
    if (needToShow.includes("yr")) {
      lineStatus.yr = true;
    } else if (needToShow.includes("yc")) {
      lineStatus.yc = true;
    } else if (needToShow.includes("yl")) {
      lineStatus.yl = true;
    }
  } else {
    if (needToShow.includes("yl")) {
      lineStatus.yl = true;
    } else if (needToShow.includes("yc")) {
      lineStatus.yc = true;
    } else if (needToShow.includes("yr")) {
      lineStatus.yr = true;
    }
  }

  if (isDownward) {
    if (needToShow.includes("xb")) {
      lineStatus.xb = true;
    } else if (needToShow.includes("xc")) {
      lineStatus.xc = true;
    } else if (needToShow.includes("xt")) {
      lineStatus.xt = true;
    }
  } else {
    if (needToShow.includes("xt")) {
      lineStatus.xt = true;
    } else if (needToShow.includes("xc")) {
      lineStatus.xc = true;
    } else if (needToShow.includes("xb")) {
      lineStatus.xb = true;
    }
  }
}

function showLine(isDownward, isRightward) {
  const curComponentStyle = getComponentRotatedStyle(curComponent.value?.style);
  const curComponentHalfwidth = curComponentStyle.width / 2;
  const curComponentHalfHeight = curComponentStyle.height / 2;

  hideLine();
  componentData.value.forEach((component) => {
    if (component == curComponent.value) return;
    const componentStyle = getComponentRotatedStyle(component.style);
    const { top, left, bottom, right } = componentStyle;
    const componentHalfwidth = componentStyle.width / 2;
    const componentHalfHeight = componentStyle.height / 2;

    // dragShift-发生吸附后当前组件的top/left值，lineShift-发生吸附后辅助线的top/left值。
    const conditions = {
      top: [
        {
          isNearly: isNearly(curComponentStyle.top, top),
          lineNode: lineRef.value[0], // xt
          line: "xt",
          dragShift: top,
          lineShift: top,
        },
        {
          isNearly: isNearly(curComponentStyle.bottom, top),
          lineNode: lineRef.value[0], // xt
          line: "xt",
          dragShift: top - curComponentStyle.height,
          lineShift: top,
        },
        {
          // 组件与拖拽节点的中间是否对齐
          isNearly: isNearly(
            curComponentStyle.top + curComponentHalfHeight,
            top + componentHalfHeight
          ),
          lineNode: lineRef.value[1], // xc
          line: "xc",
          dragShift: top + componentHalfHeight - curComponentHalfHeight,
          lineShift: top + componentHalfHeight,
        },
        {
          isNearly: isNearly(curComponentStyle.top, bottom),
          lineNode: lineRef.value[2], // xb
          line: "xb",
          dragShift: bottom,
          lineShift: bottom,
        },
        {
          isNearly: isNearly(curComponentStyle.bottom, bottom),
          lineNode: lineRef.value[2], // xb
          line: "xb",
          dragShift: bottom - curComponentStyle.height,
          lineShift: bottom,
        },
      ],
      left: [
        {
          isNearly: isNearly(curComponentStyle.left, left),
          lineNode: lineRef.value[3], // yl
          line: "yl",
          dragShift: left,
          lineShift: left,
        },
        {
          isNearly: isNearly(curComponentStyle.right, left),
          lineNode: lineRef.value[3], // yl
          line: "yl",
          dragShift: left - curComponentStyle.width,
          lineShift: left,
        },
        {
          // 组件与拖拽节点的中间是否对齐
          isNearly: isNearly(
            curComponentStyle.left + curComponentHalfwidth,
            left + componentHalfwidth
          ),
          lineNode: lineRef.value[4], // yc
          line: "yc",
          dragShift: left + componentHalfwidth - curComponentHalfwidth,
          lineShift: left + componentHalfwidth,
        },
        {
          isNearly: isNearly(curComponentStyle.left, right),
          lineNode: lineRef.value[5], // yr
          line: "yr",
          dragShift: right,
          lineShift: right,
        },
        {
          isNearly: isNearly(curComponentStyle.right, right),
          lineNode: lineRef.value[5], // yr
          line: "yr",
          dragShift: right - curComponentStyle.width,
          lineShift: right,
        },
      ],
    };

    const needToShow: any[] = [];
    const { rotate } = curComponent.value!.style;
    Object.keys(conditions).forEach((key) => {
      // 遍历符合的条件并处理
      conditions[key].forEach((condition) => {
        if (!condition.isNearly) return;
        // 修改当前组件位移
        setShapeSingleStyle({
          key,
          value:
            rotate != 0
              ? translateCurComponentShift(key, condition, curComponentStyle)
              : condition.dragShift,
        });
        // Todo: condition.lineNode 偶现undefined
        // console.log("@@@condition", condition);
        condition.lineNode.style[key] = `${condition.lineShift}px`;
        needToShow.push(condition.line);
      });
    });

    // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
    // 同一方向上的线只显示一条，例如多条横条只显示一条横线
    if (needToShow.length) {
      chooseTheTureLine(needToShow, isDownward, isRightward);
    }
  });
}

onMounted(() => {
  // 监听元素移动和不移动的事件
  eventBus.on("move", ({ isDownward, isRightward }) => {
    showLine(isDownward, isRightward);
  });

  eventBus.on("unmove", () => hideLine());
});
</script>

<style lang="scss" scoped>
.mark-line {
  height: 100%;

  .line {
    background: #59c7f9;
    position: absolute;
    z-index: 1000;
  }

  .xline {
    width: 100%;
    height: 1px;
  }

  .yline {
    width: 1px;
    height: 100%;
  }
}
</style>
