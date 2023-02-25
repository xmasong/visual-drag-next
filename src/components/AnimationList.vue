<template>
  <div class="animation-list">
    <div class="div-animation">
      <el-button @click="isShowAnimation = true">添加动画</el-button>
      <el-button @click="previewAnimate">预览动画</el-button>
      <div v-if="componentStore.curComponent">
        <el-tag
          v-for="(tag, index) in componentStore.curComponent.animations"
          :key="index"
          closable
          @close="removeAnimation(index)"
        >
          {{ tag.label }}
          <i
            class="cursor el-icon-setting"
            @click="handleAnimationSetting(index)"
          ></i>
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
              v-for="animate in item.children"
              :ref="animate.value"
              :key="animate.value"
              class="animate"
              @mouseenter="runAnimation(animate)"
              @click="addAnimation(animate)"
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
import { useComponent } from "@/stores";
import { eventBus } from "@/utils";
import { ref } from "vue";

const isShowAnimation = ref(false);
const componentStore = useComponent();
function previewAnimate() {
  eventBus.emit("runAnimation");
}

function removeAnimation(index) {
  //   this.$store.commit("removeAnimation", index);
  if (!componentStore.curComponent?.animations.length) {
    // 清空动画数据，停止运动
    eventBus.emit("stopAnimation");
  }
}
</script>

<style lang="scss">
.animation-list {
  .cursor {
    cursor: pointer;
  }

  .div-animation {
    text-align: center;

    & > div {
      margin-top: 20px;
    }

    .el-tag {
      display: block;
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
}
</style>
