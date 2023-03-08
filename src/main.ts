import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/iconfont/iconfont.css";
import "@/assets/animate.scss";
import "./assets/main.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");

// 注册element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const components = ["Picture", "VButton"];

components.forEach((key) => {
  app.component(
    key,
    defineAsyncComponent(
      () => import(`@/custom-component/${key}/Component.vue`)
    )
  );
  app.component(
    key + "Attr",
    defineAsyncComponent(() => import(`@/custom-component/${key}/Attr.vue`))
  );
});
