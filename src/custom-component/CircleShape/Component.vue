<template>
  <div class="circle-shape">
    <v-text :prop-value="element.propValue" :element="element" />
  </div>
</template>

<script setup lang="ts">
defineProps(["propValue", "element"]);
</script>

<style lang="scss" scoped>
.circle-shape {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: auto;
}
</style>
