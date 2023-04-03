<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div
      v-for="(item, index) in componentList"
      :key="item.component"
      class="list"
      draggable="true"
      :data-index="index"
    >
      <DataAnalysis
        v-if="item.icon === 'el-DataAnalysis'"
        class="el-icon-custom"
      />
      <span v-else class="iconfont" :class="'icon-' + item.icon"></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import componentList from "@/custom-component/component-list";
import { DataAnalysis } from "@element-plus/icons-vue";

function handleDragStart(e: DragEvent) {
  if (!(e.target instanceof HTMLElement)) return;

  console.log("@@@DragStart: ", e.target.dataset.index);

  e.dataTransfer?.setData("index", e.target.dataset.index || "");
}
</script>
<style lang="scss">
.component-list {
  height: 100%;
  padding: 10px;
  display: grid;
  grid-gap: 10px 19px;
  grid-template-columns: repeat(auto-fill, 80px);
  grid-template-rows: repeat(auto-fill, 40px);

  .list {
    width: 80px;
    height: 40px;
    border: 1px solid #ddd;
    cursor: grab;
    text-align: center;
    color: #333;
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      cursor: grabbing;
    }

    .iconfont {
      font-size: 20px;
    }

    .icon-wenben,
    .icon-biaoge {
      font-size: 18px;
    }

    .icon-tupian {
      font-size: 16px;
    }
    .el-icon-custom {
      width: 18px;
    }
  }
}
</style>
