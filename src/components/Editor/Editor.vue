<template>
  <div class="editor" id="editor" @contextmenu="handleContextMenu">
    <Shape
      v-for="(item, index) in componentData"
      :key="`${item.id}`"
      :element="item"
      :index="index"
    >
      <component :is="item.component" :propValue="item.propValue" />
    </Shape>
  </div>
</template>
<script setup lang="ts">
import { useComponent } from "@/stores/canvas";
import { storeToRefs } from "pinia";
import Shape from "../Shape.vue";

const componentStore = useComponent();
// const { setCurComponent, setShapeStyle } = componentStore;
const { componentData } = storeToRefs(componentStore);

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

  // this.$store.commit("showContextMenu", { top, left });
}
</script>
<style lang="scss">
.editor {
  position: relative;
  background: #fff;
  height: 100%;
}
</style>
