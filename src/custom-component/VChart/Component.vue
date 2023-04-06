<template>
  <div ref="echartRef"></div>
</template>

<script setup lang="ts">
import { useComponent } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
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
const echartInstance = ref();
onMounted(() => {
  echartInstance.value = echarts.init(echartRef.value, undefined, {
    width: props.element.style.width,
    height: props.element.style.height,
  });
  renderChart();
});

function renderChart() {
  let EChart = echartInstance.value;
  let option = props.propValue.option;
  // 设置参数
  let config = {
    ...option,
  };
  // 更新大小
  echartInstance.value.resize({
    width: props.element.style.width,
    height: props.element.style.height,
  });
  // 配置参数
  EChart.setOption(config);
}
</script>
