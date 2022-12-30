<template>
  <div class="editor">
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

const { componentData } = useComponent();
</script>
<style lang="scss">
.editor {
  position: relative;
  background: #fff;
  height: 100%;
}
</style>
