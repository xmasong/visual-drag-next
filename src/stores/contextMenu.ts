import { defineStore } from "pinia";
import { ref } from "vue";

export const useContextMenu = defineStore("contextMenu", () => {
  const menuTop = ref(0);
  const menuLeft = ref(0);
  const menuShow = ref(false);

  function showContextMenu({ top, left }) {
    menuShow.value = true;
    menuTop.value = top;
    menuLeft.value = left;
  }

  function hideContextMenu() {
    menuShow.value = false;
  }

  return {
    menuTop,
    menuLeft,
    menuShow,
    showContextMenu,
    hideContextMenu,
  };
});
