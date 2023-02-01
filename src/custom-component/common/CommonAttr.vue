<template>
  <div class="v-common-attr">
    <el-collapse v-model="activeName" accordion @change="onChange">
      <el-collapse-item title="通用样式" name="style">
        <el-form>
          <el-form-item
            v-for="({ key, label }, index) in styleKeys"
            :key="index"
            :label="label"
          >
            <el-input v-model.number="curComponent.style[key]" type="number" />
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { useComponent } from "@/stores";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const activeName = ref("");
const styleKeys = ref([]);
const componentStore = useComponent();
const { curComponent } = storeToRefs(componentStore);
function onChange() {}
</script>

<style lang="scss">
.v-common-attr {
  margin-bottom: 18px;
}
</style>
