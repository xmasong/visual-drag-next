<template>
  <div class="svg-triangle-container">
    <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
      <polygon
        ref="triangle"
        :points="points"
        :stroke="element.style.borderColor"
        :fill="element.style.backgroundColor"
        stroke-width="1"
      />
    </svg>
    <v-text :prop-value="element.propValue" :element="element" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps(["propValue", "element"]);
const points = ref("");

function draw() {
  const { width, height } = props.element.style;
  drawTriangle(width, height);
}

function drawTriangle(width, height) {
  const pointsScale = [
    [0.5, 0.05],
    [1, 0.95],
    [0, 0.95],
  ];

  const coordinatePoints = pointsScale.map(
    (point) => width * point[0] + " " + height * point[1]
  );
  points.value = coordinatePoints.toString();
}

onMounted(() => {
  draw();
});
</script>

<style lang="scss" scoped>
.svg-triangle-container {
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
  }

  .v-text {
    position: absolute;
    top: 72%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 40%;
  }
}
</style>
