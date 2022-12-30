import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Component } from "@/types";

export const useComponent = defineStore("component", () => {
  const componentData: Ref<Component[]> = ref([]);

  function addComponent({
    component,
    index,
  }: {
    component: Component;
    index?: number;
  }) {
    if (index !== undefined) {
      componentData.value.splice(index, 0, component);
    } else {
      componentData.value.push(component);
    }
  }

  return { componentData, addComponent };
});
