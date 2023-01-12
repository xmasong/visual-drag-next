<template>
  <div class="home">
    <ToolBarVue />
    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <ComponentList />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor />
        </div>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right"></section>
    </main>
  </div>
</template>
<script setup lang="ts">
import ComponentList from "@/components/ComponentList.vue";
import Editor from "@/components/Editor/Editor.vue";
import ToolBarVue from "@/views/ToolBar.vue";
import componentList from "@/custom-component/component-list";
import { cloneDeep } from "lodash";
import { nanoid } from "nanoid";
import { $ } from "@/utils/utils";
import { useComponent, useContextMenu } from "@/stores";
import { storeToRefs } from "pinia";

function handleDrop(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  let index: string = "";
  if (e.dataTransfer) index = e.dataTransfer.getData("index");
  const rectInfo = $("#editor").getBoundingClientRect();
  if (index !== "") {
    const component = cloneDeep(componentList[+index]);
    component.style.top = e.clientY - rectInfo.y;
    component.style.left = e.clientX - rectInfo.x;
    component.id = nanoid();

    // // 根据画面比例修改组件样式比例 https://github.com/woai3c/visual-drag-demo/issues/91
    // changeComponentSizeWithScale(component);
    const componentStore = useComponent();
    componentStore.addComponent({ component });

    console.log("@@@Drop: ", component.style.top, component.style.left);

    // this.$store.commit("recordSnapshot");
  }
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
  // 拖动鼠标手型
  if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
}

function handleMouseDown(e: MouseEvent) {
  e.stopPropagation();
  const { setClickComponentStatus } = useComponent();
  setClickComponentStatus(false);
  // this.$store.commit("setInEditorStatus", true);
}

function deselectCurComponent(e: MouseEvent) {
  const componentStore = useComponent();
  const { isClickComponent } = storeToRefs(componentStore);
  const { hideContextMenu } = useContextMenu();

  console.log("@@@isClickComponent", isClickComponent.value);
  if (!isClickComponent.value) {
    componentStore.setCurComponent({ component: null, index: null });
  }
  // 0 左击 1 滚轮 2 右击
  if (e.button != 2) {
    hideContextMenu();
  }
}
</script>
<style lang="scss">
.home {
  height: 100vh;
  background: #fff;
  .tool-bar {
    padding: 15px 10px;
    white-space: nowrap;
    overflow-x: auto;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;

      & > div {
        overflow: auto;

        &:first-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .right {
      position: absolute;
      height: 100%;
      width: 288px;
      right: 0;
      top: 0;
      .el-select {
        width: 100%;
      }
    }

    .center {
      margin-left: 200px;
      margin-right: 288px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }

  .global-attr {
    padding: 10px;
  }
}
</style>
