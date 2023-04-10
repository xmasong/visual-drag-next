<template>
  <div ref="echartRef"></div>
</template>

<script setup lang="ts">
import { useComponent } from "@/stores";
import { storeToRefs } from "pinia";
import { markRaw, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps(["propValue", "element"]);
const componentStore = useComponent();
const { curComponent } = storeToRefs(componentStore);
watch(
  curComponent,
  () => {
    renderChart();
  },
  { deep: true }
);

const echartRef = ref();
let echartInstance: echarts.ECharts;
onMounted(() => {
  echartInstance = markRaw(
    echarts.init(echartRef.value, undefined, {
      width: props.element.style.width,
      height: props.element.style.height,
    })
  );
  renderChart();
});

function renderChart() {
  let option = props.propValue.option;
  // 设置参数
  let config = {
    ...option,
  };
  // 更新大小
  echartInstance.resize({
    width: props.element.style.width,
    height: props.element.style.height,
  });
  // 配置参数
  echartInstance.setOption(config);
}
</script>
