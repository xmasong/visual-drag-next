<template>
  <el-dialog
    :title="`${config.label} 动画配置`"
    :visible="centerDialogVisible"
    width="30%"
    center
    @close="handleCloseModal"
    class="animation-setting"
  >
    <div class="time">
      动画时长：<el-input-number
        v-model="config.animationTime"
        controls-position="right"
        :min="0.1"
        :precision="2"
        :step="0.01"
      />
    </div>
    <div class="loop">
      是否循环：<el-switch
        v-model="config.isLoop"
        active-text="是"
        inactive-text="否"
        :disabled="isDisabled"
      >
      </el-switch>
    </div>
    <slot name="footer" class="dialog-footer">
      <el-button @click="handleCloseModal">取 消</el-button>
      <el-button type="primary" @click="handleSaveSetting">确 定</el-button>
    </slot>
  </el-dialog>
</template>

<script setup lang="ts">
import { useAnimation, useComponent } from "@/stores";
import { eventBus } from "@/utils";
import { storeToRefs } from "pinia";
import { reactive, ref, computed } from "vue";

const props = defineProps({
  curIndex: {
    type: Number,
    default: 0,
  },
});
const centerDialogVisible = ref(true);
const componentStore = useComponent();
const { curComponent } = storeToRefs(componentStore);
const {
  label,
  animationTime,
  isLoop = false,
  value,
} = curComponent.value!.animations[props.curIndex] || {};

const config = reactive({
  animationTime,
  label,
  isLoop,
  value,
});

const isDisabled = computed(() => {
  return curComponent.value?.animations.length > 1;
});

const emit = defineEmits(["close"]);
function handleCloseModal() {
  emit("close");
}

const { alterAnimation } = useAnimation();
function handleSaveSetting() {
  alterAnimation({
    index: props.curIndex,
    data: {
      animationTime: config.animationTime,
      isLoop: config.isLoop,
    },
  });
  eventBus.emit("stopAnimation");
  handleCloseModal();
}
</script>

<style scoped lang="scss">
.animation-setting {
  .loop {
    margin-top: 10px;
  }
}
</style>
