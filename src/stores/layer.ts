import { defineStore } from "pinia";
import { useComponent } from "@/stores/canvas";
import { ElMessage } from "element-plus";

export const useLayer = defineStore("layer", () => {
  function swap(i: number, j: number) {
    const store = useComponent();
    const tmp = store.componentData[i];
    store.componentData[i] = store.componentData[j];
    store.componentData[j] = tmp;
  }

  // 上移图层 index，表示元素在数组中越往后
  function upComponent() {
    const store = useComponent();
    if (!store.curComponentIndex) return;
    if (store.curComponentIndex < store.componentData.length - 1) {
      swap(store.curComponentIndex, store.curComponentIndex + 1);
      store.curComponentIndex++;
    } else {
      ElMessage.error("已经到顶了");
    }
  }

  // 下移图层 index，表示元素在数组中越往前
  function downComponent() {
    const store = useComponent();
    if (!store.curComponentIndex) return;
    if (store.curComponentIndex > 0) {
      swap(store.curComponentIndex, store.curComponentIndex - 1);
      store.curComponentIndex--;
    } else {
      ElMessage.error("已经到底了");
    }
  }

  // 置顶
  function topComponent() {
    const store = useComponent();
    if (!store.curComponentIndex) return;
    if (store.curComponentIndex < store.componentData.length - 1) {
      swap(store.curComponentIndex, store.componentData.length - 1);
    } else {
      ElMessage.error("已经到顶了");
    }
  }

  // 置底
  function bottomComponent() {
    const store = useComponent();
    if (!store.curComponentIndex) return;
    if (store.curComponentIndex > 0) {
      swap(store.curComponentIndex, 0);
    } else {
      ElMessage.error("已经到底了");
    }
  }

  return {
    upComponent,
    downComponent,
    topComponent,
    bottomComponent,
  };
});
