import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Component, ComponentParams, Pos } from "@/types";

export const useComponent = defineStore("component", () => {
  const componentData: Ref<Component[]> = ref([]);
  const curComponent: Ref<Component | undefined> = ref();
  const curComponentIndex: Ref<number | undefined> = ref();

  function addComponent({ component, index }: ComponentParams) {
    if (index !== undefined) {
      componentData.value.splice(index, 0, component);
    } else {
      componentData.value.push(component);
    }
  }

  function setCurComponent({ component, index }: ComponentParams) {
    curComponent.value = component;
    curComponentIndex.value = index;
  }

  function setShapeStyle({ top, left, width, height, rotate }: Pos) {
    if (!curComponent.value) return;
    if (top) curComponent.value.style.top = Math.round(top);
    if (left) curComponent.value.style.left = Math.round(left);
    if (width) curComponent.value.style.width = Math.round(width);
    if (height) curComponent.value.style.height = Math.round(height);
    if (rotate) curComponent.value.style.rotate = Math.round(rotate);
  }

  return {
    componentData,
    curComponent,
    curComponentIndex,
    addComponent,
    setCurComponent,
    setShapeStyle,
  };
});
