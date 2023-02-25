import { defineStore, storeToRefs } from "pinia";
import { useComponent } from "./canvas";

export const useAnimation = defineStore("animation", () => {
  const componentStore = useComponent();
  const { curComponent } = storeToRefs(componentStore);
  function addAnimation(animation) {
    curComponent.value?.animations.push(animation);
  }

  function removeAnimation(index) {
    curComponent.value?.animations.splice(index, 1);
  }

  function alterAnimation({ index, data = {} }) {
    if (typeof index === "number" && curComponent.value) {
      const original = curComponent.value.animations[index];
      curComponent.value.animations[index] = { ...original, ...data };
    }
  }

  return {
    addAnimation,
    removeAnimation,
    alterAnimation,
  };
});
