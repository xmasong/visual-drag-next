<template>
  <div class="rect-shape">
    <v-text :prop-value="element.propValue" :element="element" />
  </div>
</template>

<script setup lang="ts">
defineProps(["propValue", "element"]);
</script>

<style lang="scss" scoped>
.rect-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
