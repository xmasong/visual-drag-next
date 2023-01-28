// 用于监听、触发事件
import mitt from "mitt";

type Events = {
  [propName: string]: any;
};
export const eventBus = mitt<Events>();
