<template>
  <div class="event-list">
    <div class="div-events">
      <el-button @click="isShowEvent = true">添加事件</el-button>
      <div v-if="componentStore.curComponent">
        <el-tag
          v-for="event in Object.keys(componentStore.curComponent.events)"
          :key="event"
          closable
          @close="handleRemoveEvent(event)"
        >
          {{ event }}
        </el-tag>
      </div>
    </div>

    <!-- 选择事件 -->
    <Modal v-model="isShowEvent">
      <el-tabs v-model="eventActiveName">
        <el-tab-pane
          v-for="item in eventList"
          :key="item.key"
          :label="item.label"
          :name="item.key"
          style="padding: 0 20px"
        >
          <el-input
            v-if="item.key == 'redirect'"
            v-model="item.param"
            type="textarea"
            placeholder="请输入完整的 URL"
            @keydown.stop
          />
          <el-input
            v-if="item.key == 'alert'"
            v-model="item.param"
            type="textarea"
            placeholder="请输入要 alert 的内容"
            @keydown.stop
          />
          <el-button
            style="margin-top: 20px"
            @click="handleAddEvent(item.key, item.param)"
            >确定</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useComponent } from "@/stores";
import { getEventList } from "@/utils";
import { ref } from "vue";
import Modal from "./Modal.vue";
const isShowEvent = ref(false);
const eventActiveName = ref("redirect");

const eventList = ref(getEventList());
const componentStore = useComponent();
const { addEvent, removeEvent } = componentStore;
function handleAddEvent(event, param) {
  isShowEvent.value = false;
  addEvent({ event, param });
  eventList.value = getEventList();
}

function handleRemoveEvent(event) {
  removeEvent(event);
}
</script>

<style lang="scss" scoped>
.event-list {
  .div-events {
    text-align: center;
    padding: 0 20px;

    .el-button {
      display: inline-block;
      margin-bottom: 10px;
    }

    .el-tag {
      display: block;
      width: 50%;
      margin: auto;
      margin-bottom: 10px;
    }
  }
}
</style>
