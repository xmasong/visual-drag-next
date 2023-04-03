<template>
  <div class="attr">
    <CommonAttr></CommonAttr>
    <el-form>
      <el-form-item label="标题">
        <el-switch v-model="option.title.show" active-text="显示标题">
        </el-switch>
        <el-input v-model="option.title.text" placeholder="请输入内容">
        </el-input>
      </el-form-item>
      <el-form-item label="工具提示">
        <el-switch v-model="option.tooltip.show" active-text="显示提示">
        </el-switch>
      </el-form-item>
      <el-form-item label="图例">
        <el-switch v-model="option.legend.show" active-text="显示图例">
        </el-switch>
      </el-form-item>
      <el-form-item label="横坐标">
        <el-switch v-model="option.xAxis.show" active-text="显示横坐标">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-dropdown>
          <span class="el-dropdown-link">
            更换图表类型<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <span
                v-for="(chart, index) in charts"
                :key="index"
                @click="selectchart(chart.title)"
              >
                <el-dropdown-item>{{ chart.name }}</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="静态数据源">
        <el-button @click="openStaticWinbox">修改数据</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="数据修改" v-model:visible="dialogVisible" width="75%">
      <div ref="ace" class="ace"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="updatedata">更新数据</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import ace from "ace-builds";
import "ace-builds/src-min-noconflict/theme-chrome";
import "ace-builds/src-min-noconflict/mode-json5";
import CommonAttr from "@/custom-component/common/CommonAttr.vue";
import { useComponent } from "@/stores";
import { storeToRefs } from "pinia";

const componentStore = useComponent();
const { curComponent } = storeToRefs(componentStore);
</script>

<style>
.ace {
  margin: 5px;
  margin-top: -20px;
  height: 600px;
  width: 1100px;
}

.attr {
  margin: 13px;
}
</style>
