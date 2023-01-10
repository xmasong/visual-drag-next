<template>
  <div class="editor" id="editor">
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
</script>
<style lang="scss">
.editor {
  position: relative;
  background: #fff;
  height: 100%;
}
</style>
