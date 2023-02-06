<template>
  <div class="v-common-attr">
    <el-collapse v-model="activeName" accordion @change="onChange">
      <el-collapse-item title="通用样式" name="style">
        <el-form v-if="curComponent">
          <el-form-item
            v-for="({ key, label }, index) in styleKeys"
            :key="index"
            :label="label"
          >
            <el-color-picker
              v-if="isIncludesColor(key)"
              v-model="curComponent.style[key]"
              show-alpha
            ></el-color-picker>
            <el-select
              v-else-if="selectKey.includes(key)"
              v-model="curComponent.style[key]"
            >
              <el-option
                v-for="item in optionMap[key]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-else
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
import { styleData, selectKey, optionMap } from "@/utils";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

const activeName = ref("style");
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

function isIncludesColor(str) {
  return str.toLowerCase().includes("color");
}
</script>

<style lang="scss">
.v-common-attr {
  margin-bottom: 18px;
}
</style>
