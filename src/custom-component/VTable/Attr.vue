<template>
  <div class="attr-list v-talbe-attr">
    <CommonAttr></CommonAttr>
    <EditTable></EditTable>
    <el-form v-if="curComponent">
      <el-form-item label="斑马纹">
        <el-switch
          v-model="(curComponent.propValue as Record<string, any>).stripe"
        ></el-switch>
      </el-form-item>
      <el-form-item label="表头加粗">
        <el-switch
          v-model="(curComponent.propValue as Record<string, any>).thBold"
        ></el-switch>
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
