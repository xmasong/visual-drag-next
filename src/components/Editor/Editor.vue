<template>
  <div class="editor" id="editor" @contextmenu="handleContextMenu">
    <!-- 网格线 -->
    <Grid />
    <!--页面组件列表展示-->
    <Shape
      v-for="(item, index) in componentData"
      :active="item.id === (curComponent || {}).id"
      :key="item.id"
      :element="item"
      :index="index"
    >
      <component
        :is="item.component"
        v-if="item.component.startsWith('SVG')"
        :id="'component' + item.id"
        :style="getSVGStyle(item.style, svgFilterAttrs)"
        class="component"
        :prop-value="item.propValue"
        :element="item"
        :request="item.request"
      />
      <component
        v-else
        class="component"
        :is="item.component"
        :id="'component' + item.id"
        :propValue="item.propValue"
        :element="item"
        :style="getComponentStyle(item.style)"
      />
    </Shape>
    <!-- 标线 -->
    <MarkLine />
    <!-- 右击菜单 -->
    <ContextMenu />
  </div>
</template>
<script setup lang="ts">
import { useComponent, useContextMenu, useCompose } from "@/stores/index";
import Shape from "./Shape.vue";
import MarkLine from "./MarkLine.vue";
import ContextMenu from "../ContextMenu.vue";
import Grid from "./Grid.vue";
import { storeToRefs } from "pinia";
import { getStyle, getSVGStyle } from "@/utils";
import { onMounted } from "vue";
// Shape相关
const componentStore = useComponent();
const { componentData, curComponent } = storeToRefs(componentStore);
const { showContextMenu } = useContextMenu();

function handleContextMenu(e) {
  e.stopPropagation();
  e.preventDefault();

  // 计算菜单相对于编辑器的位移
  let target = e.target;
  let top = e.offsetY;
  let left = e.offsetX;
  while (target instanceof SVGElement) {
    target = target.parentNode;
  }

  while (!target.className.includes("editor")) {
    left += target.offsetLeft;
    top += target.offsetTop;
    target = target.parentNode;
  }

  showContextMenu({ top, left });
}

// 普通Component相关
const svgFilterAttrs = ["width", "height", "top", "left", "rotate"];
function getComponentStyle(style) {
  return getStyle(style, svgFilterAttrs);
}

onMounted(() => {
  const { getEditor } = useCompose();
  getEditor();
});
</script>
<style lang="scss">
.editor {
  position: relative;
  background: #fff;
  height: 100%;

  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
