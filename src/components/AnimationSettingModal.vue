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
const props = defineProps({
  curIndex: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped lang="scss">
.animation-setting {
  .loop {
    margin-top: 10px;
  }
}
</style>
