import { reactive, ref, type Ref } from "vue";
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

  function setComponentData(compData: Component[] = []) {
    componentData.value = compData;
  }
  function setShapeStyle({ top, left, width, height, rotate }: Pos) {
    if (!curComponent.value) return;
    if (top) curComponent.value.style.top = Math.round(top);
    if (left) curComponent.value.style.left = Math.round(left);
    if (width) curComponent.value.style.width = Math.round(width);
    if (height) curComponent.value.style.height = Math.round(height);
    if (rotate) curComponent.value.style.rotate = Math.round(rotate);
  }

  function setShapeSingleStyle({ key, value }) {
    if (!curComponent.value) return;
    curComponent.value.style[key] = value;
  }

  // 点击画布时是否点中组件，主要用于取消选中组件用。
  // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
  const isClickComponent = ref(false);
  function setClickComponentStatus(status) {
    isClickComponent.value = status;
  }

  function deleteComponent(index?) {
    if (index === undefined) {
      index = curComponentIndex.value;
    }

    if (index === curComponentIndex.value) {
      curComponentIndex.value = null;
      curComponent.value = null;
    }
    console.log("deleteComponent", index, /\d/.test(index));
    if (/\d/.test(index)) {
      componentData.value.splice(index, 1);
    }
  }

  // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
  const isInEdiotr: Ref<boolean> = ref(false);
  function setInEditorStatus(status) {
    isInEdiotr.value = status;
  }
  // 编辑器模式 edit preview
  const editMode = ref("edit");
  function setEditMode(mode) {
    editMode.value = mode;
  }

  let canvasStyleData = reactive({
    // 页面全局数据
    width: 1200,
    height: 740,
    scale: 100,
    color: "#000",
    opacity: 1,
    background: "#fff",
    fontSize: 14,
  });
  function setCanvasStyle(style) {
    canvasStyleData = style;
  }

  function addEvent({ event, param }) {
    if (!curComponent.value) return;
    curComponent.value.events[event] = param;
  }

  function removeEvent(event) {
    if (!curComponent.value) return;
    delete curComponent.value.events[event];
  }
  return {
    canvasStyleData,
    componentData,
    curComponent,
    curComponentIndex,
    isClickComponent,
    isInEdiotr,
    editMode,
    addComponent,
    setCurComponent,
    setComponentData,
    setShapeStyle,
    setShapeSingleStyle,
    setClickComponentStatus,
    deleteComponent,
    setInEditorStatus,
    setEditMode,
    setCanvasStyle,
    addEvent,
    removeEvent,
  };
});
