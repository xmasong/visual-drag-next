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
            <el-input
              v-if="curComponent"
              v-model.number="curComponent.style[key]"
              type="number"
            />
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { useComponent } from "@/stores";
import { styleData } from "@/utils";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

const activeName = ref("");
const componentStore = useComponent();
const { curComponent } = storeToRefs(componentStore);

const styleKeys = computed(() => {
  if (!curComponent.value) return [];
  const curComponentStyleKeys = Object.keys(curComponent.value.style);
  return styleData.filter((item) => curComponentStyleKeys.includes(item.key));
});

function onChange() {
  curComponent.value!.collapseName = activeName.value;
}
</script>

<style lang="scss">
.v-common-attr {
  margin-bottom: 18px;
}
</style>
