<template>
  <div class="editor" id="editor" @contextmenu="handleContextMenu">
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
        :id="'component' + item.id"
        :propValue="item.propValue"
      />
    </Shape>
    <!-- 右击菜单 -->
    <ContextMenu />
  </div>
</template>
<script setup lang="ts">
import { useComponent, useContextMenu } from "@/stores/index";
import Shape from "./Shape.vue";
import ContextMenu from "../ContextMenu.vue";
import { storeToRefs } from "pinia";

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
</script>
<style lang="scss">
.editor {
  position: relative;
  background: #fff;
  height: 100%;
}
</style>
