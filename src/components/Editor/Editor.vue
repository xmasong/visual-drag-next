<template>
  <div class="editor" id="editor">
    <component
      v-for="item in componentData"
      :key="item.id"
      :is="item.component"
      :style="item.style"
      :propValue="item.propValue"
    />
  </div>
</template>
<script setup lang="ts">
import { useComponent } from "@/stores/canvas";
import { storeToRefs } from "pinia";

const componentStore = useComponent();
const { componentData } = storeToRefs(componentStore);
</script>
<style lang="scss">
.editor {
  position: relative;
  background: #fff;
  height: 100%;
}
</style>
