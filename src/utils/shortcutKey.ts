import { useComponent, useSnapshot } from "@/stores";
import { storeToRefs } from "pinia";

const ctrlKey = 17,
  commandKey = 91, // mac command
  vKey = 86, // 粘贴
  cKey = 67, // 复制
  xKey = 88, // 剪切
  yKey = 89, // 重做
  zKey = 90, // 撤销
  gKey = 71, // 组合
  bKey = 66, // 拆分
  lKey = 76, // 锁定
  uKey = 85, // 解锁
  sKey = 83, // 保存
  pKey = 80, // 预览
  dKey = 68, // 删除
  deleteKey = 8, // 删除 mac backspace
  eKey = 69; // 清空画布

export const keycodes = [66, 67, 68, 69, 71, 76, 80, 83, 85, 86, 88, 89, 90];

// 与组件状态无关的操作
const basemap = {
  [vKey]: todo,
  [yKey]: redo,
  [zKey]: undo,
  [sKey]: todo,
  [pKey]: todo,
  [eKey]: todo,
};

// 组件锁定状态下可以执行的操作
const lockMap = {
  ...basemap,
  [uKey]: todo,
};

// 组件未锁定状态下可以执行的操作
const unlockMap = {
  ...basemap,
  [cKey]: todo,
  [xKey]: todo,
  [gKey]: todo,
  [bKey]: todo,
  [dKey]: deleteComponent,
  [deleteKey]: deleteComponent,
  [lKey]: todo,
};

let isCtrlOrCommandDown = false;
// 全局监听按键操作并执行相应命令
export function listenGlobalKeyDown() {
  window.onkeydown = (e) => {
    const componentStore = useComponent();
    const { isInEdiotr, curComponent } = storeToRefs(componentStore);
    if (!isInEdiotr.value) return;
    const { keyCode } = e;
    if (keyCode === ctrlKey || keyCode === commandKey) {
      isCtrlOrCommandDown = true;
    } else if (keyCode == deleteKey && curComponent.value) {
      componentStore.deleteComponent();
      //   store.commit("recordSnapshot");
    } else if (isCtrlOrCommandDown) {
      if (
        unlockMap[keyCode] &&
        (!curComponent.value || !curComponent.value.isLock)
      ) {
        e.preventDefault();
        unlockMap[keyCode]();
      } else if (
        lockMap[keyCode] &&
        curComponent.value &&
        curComponent.value.isLock
      ) {
        e.preventDefault();
        lockMap[keyCode]();
      }
    }
  };

  window.onkeyup = (e) => {
    if (e.keyCode === ctrlKey || e.keyCode === commandKey) {
      isCtrlOrCommandDown = false;
    }
  };

  window.onmousedown = () => {
    const { setInEditorStatus } = useComponent();
    setInEditorStatus(false);
  };
}

function todo() {}

function redo() {
  const { redo } = useSnapshot();
  redo();
}

function undo() {
  const { undo } = useSnapshot();
  undo();
}

function deleteComponent() {
  const componentStore = useComponent();
  const { curComponent } = storeToRefs(componentStore);
  const { deleteComponent } = componentStore;
  if (curComponent.value) {
    deleteComponent();
    // store.commit("recordSnapshot");
  }
}
