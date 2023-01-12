import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Component, ComponentParams, Pos } from "@/types";

export const useComponent = defineStore("component", () => {
  const componentData: Ref<Component[]> = ref([]);
  const curComponent: Ref<Component | undefined | null> = ref();
  const curComponentIndex: Ref<number | undefined | null> = ref();

  function addComponent({ component, index }: ComponentParams) {
    if (!component) return;
    if (typeof index === "number") {
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

  // 点击画布时是否点中组件，主要用于取消选中组件用。
  // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
  const isClickComponent = ref(false);
  function setClickComponentStatus(status) {
    isClickComponent.value = status;
  }

  return {
    componentData,
    curComponent,
    curComponentIndex,
    isClickComponent,
    addComponent,
    setCurComponent,
    setShapeStyle,
    setClickComponentStatus,
  };
});
