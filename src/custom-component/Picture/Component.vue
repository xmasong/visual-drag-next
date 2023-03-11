<template>
  <div style="overflow: hidden">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["propValue", "element"]);
</script>
