<template>
  <div style="overflow: hidden">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps(["propValue", "element"]);
const canvasRef = ref();
const canvasCtx = ref();
const isFirst = ref(true);
const img = ref();

watch(() => props.element.style.width, drawImage);
watch(() => props.element.style.height, drawImage);
watch(() => props.propValue.flip.vertical, mirrorFlip);
watch(() => props.propValue.flip.horizontal, mirrorFlip);

function drawImage() {
  const { width, height } = props.element.style;
  canvasRef.value.width = width;
  canvasRef.value.height = height;
  if (isFirst.value) {
    isFirst.value = false;
    img.value = document.createElement("img");
    img.value.src = props.propValue.url;
    img.value.onload = () => {
      canvasCtx.value.drawImage(img.value, 0, 0, width, height);
      mirrorFlip();
    };
  } else {
    mirrorFlip();
  }
}

function mirrorFlip() {
  const { vertical, horizontal } = props.propValue.flip;
  const { width, height } = props.element.style;
  const hvalue = horizontal ? -1 : 1;
  const vValue = vertical ? -1 : 1;

  // 清除图片
  canvasCtx.value.clearRect(0, 0, width, height);
  // 平移图片
  canvasCtx.value.translate(
    width / 2 - (width * hvalue) / 2,
    height / 2 - (height * vValue) / 2
  );
  // 对称镜像
  canvasCtx.value.scale(hvalue, vValue);
  canvasCtx.value.drawImage(img.value, 0, 0, width, height);
  // 还原坐标点
  canvasCtx.value.setTransform(1, 0, 0, 1, 0, 0);
}

onMounted(() => {
  canvasCtx.value = canvasRef.value.getContext("2d");
  drawImage();
});
</script>
