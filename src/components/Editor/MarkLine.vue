<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      v-show="lineStatus[line] || false"
      :key="line"
      :ref="line"
      class="line"
      :class="line.includes('x') ? 'xline' : 'yline'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

// 分别对应三条横线和三条竖线
const lines = ref(["xt", "xc", "xb", "yl", "yc", "yr"]);
// 相距 dff 像素将自动吸附
const diff = ref(3);
const lineStatus = reactive({
  xt: false,
  xc: false,
  xb: false,
  yl: false,
  yc: false,
  yr: false,
});
</script>

<style lang="scss" scoped>
.mark-line {
  height: 100%;

  .line {
    background: #59c7f9;
    position: absolute;
    z-index: 1000;
  }

  .xline {
    width: 100%;
    height: 1px;
  }

  .yline {
    width: 1px;
    height: 100%;
  }
}
</style>
