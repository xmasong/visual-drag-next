<template>
  <div class="attr-list">
    <CommonAttr></CommonAttr>
    <el-form v-if="curComponent">
      <el-form-item label="内容">
        <el-input v-model="curComponent.propValue" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import CommonAttr from "@/custom-component/common/CommonAttr.vue";
import { useComponent } from "@/stores";
import { storeToRefs } from "pinia";

const componentStore = useComponent();
const { curComponent } = storeToRefs(componentStore);
</script>
