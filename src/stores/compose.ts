import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { $ } from "@/utils/utils";

export const useCompose = defineStore("compose", () => {
  const editor: Ref<HTMLDivElement | null> = ref(null);

  function getEditor() {
    editor.value = $("#editor");
  }

  return {
    editor,
    getEditor,
  };
});
