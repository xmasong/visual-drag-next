<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-if="editMode == 'edit'"
    class="v-text"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
  >
    <!-- tabindex >= 0 使得双击时聚焦该元素 -->
    <div
      ref="text"
      :contenteditable="canEdit"
      :class="{ 'can-edit': canEdit }"
      tabindex="0"
      :style="{ verticalAlign: element.style.verticalAlign }"
      @dblclick="setEdit"
      @paste="clearStyle"
      @mousedown="handleMousedown"
      @blur="handleBlur"
      @input="handleInput"
      v-html="element.propValue"
    ></div>
  </div>
  <div v-else class="v-text preview">
    <div
      :style="{ verticalAlign: element.style.verticalAlign }"
      v-html="element.propValue"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useComponent } from "@/stores";
import { eventBus, keycodes } from "@/utils";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, ref } from "vue";

const props = defineProps(["propValue", "element"]);

const componentStore = useComponent();
const { editMode, curComponent } = storeToRefs(componentStore);

const canEdit = ref(false);
eventBus.on("componentClick", onComponentClick);
function onComponentClick() {
  // 如果当前点击的组件 id 和 VText 不是同一个，需要设为不允许编辑 https://github.com/woai3c/visual-drag-demo/issues/90
  if (curComponent.value!.id !== props.element.id) {
    canEdit.value = false;
  }
}

const ctrlKey = 17;
const isCtrlDown = ref(false);
function handleKeydown(e) {
  // 阻止冒泡，防止触发复制、粘贴组件操作
  canEdit.value && e.stopPropagation();
  if (e.keyCode == ctrlKey) {
    isCtrlDown.value = true;
  } else if (
    isCtrlDown.value &&
    canEdit.value &&
    keycodes.includes(e.keyCode)
  ) {
    e.stopPropagation();
  } else if (e.keyCode == 46) {
    // deleteKey
    e.stopPropagation();
  }
}

function handleKeyup(e) {
  // 阻止冒泡，防止触发复制、粘贴组件操作
  canEdit.value && e.stopPropagation();
  if (e.keyCode == ctrlKey) {
    isCtrlDown.value = false;
  }
}
onBeforeUnmount(() => {
  eventBus.off("componentClick", onComponentClick);
});
</script>

<style lang="scss" scoped>
.v-text {
  width: 100%;
  height: 100%;
  display: table;

  div {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
    word-break: break-all;
    padding: 4px;
  }

  .can-edit {
    cursor: text;
    height: 100%;
  }
}

.preview {
  user-select: none;
}
</style>
