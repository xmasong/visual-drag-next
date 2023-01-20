import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Component } from "@/types";
import { cloneDeep } from "lodash";
import { useComponent } from "./canvas";

export const useSnapshot = defineStore("snapshot", () => {
  const snapshotData: Ref<Component[][]> = ref([]);
  const snapshotIndex: Ref<number> = ref(-1);
  const componentStore = useComponent();
  const { setCurComponent, setComponentData } = componentStore;

  function recordSnapshot() {
    // 添加新的快照
    snapshotData.value[++snapshotIndex.value] = cloneDeep(
      componentStore.componentData
    );
    // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
    if (snapshotIndex.value < snapshotData.value.length - 1) {
      snapshotData.value = snapshotData.value.slice(0, snapshotIndex.value + 1);
    }
  }

  function undo() {
    if (snapshotIndex.value >= 0) {
      snapshotIndex.value--;
      const componentData = cloneDeep(snapshotData.value[snapshotIndex.value]); // || getDefaultcomponentData();
      if (componentStore.curComponent) {
        // 如果当前组件不在 componentData 中，则置空
        const needClean = !componentData?.find(
          (component) => componentStore?.curComponent?.id === component.id
        );

        if (needClean) setCurComponent({ component: null, index: null });
      }
      setComponentData(componentData);
    }
  }

  function redo() {
    if (snapshotIndex.value < snapshotData.value.length - 1) {
      snapshotIndex.value++;
      setComponentData(snapshotData.value[snapshotIndex.value]);
    }
  }

  return {
    snapshotData,
    snapshotIndex,
    undo,
    redo,
    recordSnapshot,
  };
});
