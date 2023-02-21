<template>
  <div
    v-if="modelValue"
    class="modal-bg"
    @click="$emit('update:modelValue', false)"
  >
    <div class="fadeInLeft animated modal" @click="stopPropagation">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);

function stopPropagation(e) {
  e.stopPropagation();
}
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;

  .modal {
    width: 400px;
    background: #fff;
    height: 100%;
  }
}
</style>
