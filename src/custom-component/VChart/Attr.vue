<template>
  <div class="vchart-attr">
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
                @click="selectchart(chart.type)"
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

    <el-dialog title="数据修改" v-model="dialogVisible" width="75%">
      <div ref="aceRef" class="ace"></div>
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
import { computed, nextTick, ref } from "vue";
import { ElMessage } from "element-plus";

const componentStore = useComponent();
const { curComponent } = storeToRefs(componentStore);
const option = computed(
  () => (curComponent.value?.propValue as Record<string, any>).option
);
const charts = [
  {
    type: "bar",
    name: "柱状图",
  },
  {
    type: "scatter",
    name: "散点图",
  },
  {
    type: "line",
    name: "折线图",
  },
];

const dialogVisible = ref(false);
const editor = ref();
const aceRef = ref();
function openStaticWinbox() {
  dialogVisible.value = !dialogVisible.value;
  nextTick(() => {
    ace.config.set(
      "basePath",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.15.3/"
    );
    editor.value = ace.edit(aceRef.value, {
      maxLines: 28,
      minLines: 28,
      fontSize: 14,
      theme: "ace/theme/chrome",
      mode: "ace/mode/json5",
      tabSize: 4,
      readOnly: false,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    });
    // 初始化图表数据在editor中
    let data = JSON.stringify(option.value.series.data);
    let xAxis = JSON.stringify(option.value.xAxis.data);
    editor.value.setValue(data + "\n" + xAxis);
  });
}

// 寻找数组[]
function findstring(str, ch1, ch2) {
  return str.substr(str.indexOf(ch1), str.indexOf(ch2) + 1);
}

// 更新数据editor中的数据修改
function updatedata() {
  let str = editor.value.getValue();
  let Arrdata = findstring(str, "[", "]");
  let ArrXAxis = findstring(str.substr(str.indexOf("]") + 1), "[", "]");
  option.value.series.data = JSON.parse(Arrdata);
  option.value.xAxis.data = JSON.parse(ArrXAxis);
  ElMessage.success("更新成功");
  dialogVisible.value = !dialogVisible.value;
}

// 更换表格类型
function selectchart(chartType: string) {
  option.value.series.type = chartType;
}
</script>

<style lang="scss">
.vchart-attr {
  margin: 13px;

  .ace {
    border: 1px solid #ebebeb;

    .ace_print-margin {
      display: none;
    }
  }
}
</style>
