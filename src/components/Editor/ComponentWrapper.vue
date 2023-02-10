<template>
  <div @click="onClick" @mouseenter="onMouseEnter">
    <!-- <component
      :is="config.component"
      v-if="config.component.startsWith('SVG')"
      ref="component"
      class="component"
      :style="getSVGStyle(config.style)"
      :prop-value="config.propValue"
      :element="config"
      :request="config.request"
      :linkage="config.linkage"
    /> -->

    <component
      :is="config.component"
      ref="component"
      class="component"
      :style="getStyle(config.style)"
      :prop-value="config.propValue"
      :element="config"
      :request="config.request"
      :linkage="config.linkage"
    />
  </div>
</template>

<script setup lang="ts">
import { eventBus, getStyle } from "@/utils";
import { events } from "@/utils/events";
const store = defineProps({
  config: {
    type: Object,
    required: true,
    default: () => {},
  },
});

function onClick() {
  const configEvents = store.config.events;
  Object.keys(configEvents).forEach((configEvent) => {
    events[configEvent](configEvents[configEvent]);
  });

  eventBus.emit("v-click", store.config.id);
}
function onMouseEnter() {
  eventBus.emit("v-hover", store.config.id);
}
</script>

<style lang="scss" scoped>
.component {
  position: absolute;
}
</style>
