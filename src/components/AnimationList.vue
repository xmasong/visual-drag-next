<template>
  <div class="animation-list">
    <div class="div-animation">
      <el-button @click="isShowAnimation = true">添加动画</el-button>
      <el-button @click="handlePreviewAnimate">预览动画</el-button>
      <div v-if="componentStore.curComponent">
        <el-tag
          v-for="(tag, index) in componentStore.curComponent.animations"
          :key="index"
          closable
          @close="handleRemoveAnimation(index)"
        >
          <span>{{ tag.label }}</span>
          <SettingIcon
            class="cursor el-icon-setting"
            @click="handleAnimationSetting(index)"
          ></SettingIcon>
        </el-tag>
      </div>
    </div>

    <!-- 选择动画 -->
    <Modal v-model="isShowAnimation">
      <el-tabs v-model="animationActiveName">
        <el-tab-pane
          v-for="item in animationClassData"
          :key="item.label"
          :label="item.label"
          :name="item.label"
        >
          <el-scrollbar class="animate-container">
            <div
              ref="animateRef"
              v-for="(animate, index) in item.children"
              :key="animate.value"
              class="animate"
              @mouseenter="handleRunAnimation(animate, index)"
              @click="handleAddAnimation(animate)"
            >
              <div>
                {{ animate.label }}
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </Modal>
    <!-- 编辑动画配置 -->
    <AnimationSettingModal
      v-if="isShowAnimationSetting"
      :cur-index="curIndex"
      @close="isShowAnimationSetting = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAnimation, useComponent } from "@/stores";
import { eventBus } from "@/utils";
import animationClassData from "@/utils/animationClassData";
import runAnimation from "@/utils/runAnimation";
import { ref } from "vue";
import AnimationSettingModal from "./AnimationSettingModal.vue";
import Modal from "./Modal.vue";
import { Setting as SettingIcon } from "@element-plus/icons-vue";

const isShowAnimation = ref(false);
const isShowAnimationSetting = ref(false);
const curIndex = ref(0);
const animationActiveName = ref("进入");

const componentStore = useComponent();
const { addAnimation, removeAnimation } = useAnimation();

function handlePreviewAnimate() {
  eventBus.emit("runAnimation");
}

function handleAddAnimation(animate) {
  addAnimation(animate);
  isShowAnimation.value = false;
}

function handleRemoveAnimation(index) {
  removeAnimation(index);
  if (!componentStore.curComponent?.animations.length) {
    // 清空动画数据，停止运动
    eventBus.emit("stopAnimation");
  }
}

function handleAnimationSetting(index) {
  isShowAnimationSetting.value = true;
  curIndex.value = index;
}

const animateRef = ref();
async function handleRunAnimation(animate, index) {
  if (animate.pending) return;

  animate.pending = true;
  await runAnimation(animateRef.value[index], [animate]);

  // 防止无限触发同一元素的动画
  setTimeout(() => {
    animate.pending = false;
  }, 100);
}
</script>

<style lang="scss">
.animation-list {
  .cursor {
    cursor: pointer;
  }
  .el-icon-setting {
    width: 14px;
  }

  .div-animation {
    text-align: center;

    & > div {
      margin-top: 20px;
    }

    .el-tag {
      display: flex;
      align-items: center;
      width: 50%;
      margin: auto;
      margin-bottom: 10px;
    }
  }

  .el-scrollbar__view {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 10px;

    .animate {
      cursor: pointer;
    }

    .animate > div {
      width: 100px;
      height: 60px;
      background: #f5f8fb;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 12px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #333;
      border-radius: 3px;
      user-select: none;
      cursor: pointer;
    }
  }

  .el-tag__content {
    display: flex;
    align-items: center;
  }
}
</style>
