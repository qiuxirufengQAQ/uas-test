import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import axios from "axios";
import "ant-design-vue/dist/antd.css";
import {
  Button,
  Form,
  Card,
  Tabs,
  Icon,
  Input,
  Checkbox,
  LocaleProvider,
  Alert,
  Layout,
  Dropdown,
  Menu,
  Breadcrumb,
  Table,
  Divider,
  Row,
  Col,
  Select,
  DatePicker,
  Modal,
  InputNumber,
  TreeSelect,
  List,
  Badge,
  Collapse,
  AutoComplete,
  Steps,
  Radio,
  Upload,
  Spin,
  message,
  Popconfirm,
  Popover
} from "ant-design-vue";

import { formatDate, formatShortDate, formatFullDate } from "./utils/utils";
import { hasAuthority } from "./utils/authority";
import EnumItem from "@/components/tool/EnumItem";

Vue.prototype.$axios = axios;
Vue.prototype.$message = message;
Vue.prototype.$unsync = sync(store, router);
Vue.prototype.$eventBus = new Vue(); //注册全局事件对象
Vue.prototype.$confirm = Modal.confirm;

//权限判断指令
Vue.prototype.$secured = value => {
  return hasAuthority(store.getters.permissions, store.getters.currUser, value);
};

Vue.prototype.$confirm = Modal.confirm;
//通用方法
Vue.prototype.$_getFileUrl = path => {
  return "/controller/attachment-file/file-data?filePath=" + path;
};

Vue.config.productionTip = false;

// Vue.use(Antd);
Vue.use(Button);
Vue.use(Form);
Vue.use(Card);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(LocaleProvider);
Vue.use(Alert);
Vue.use(Layout);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(Divider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Modal);
Vue.use(InputNumber);
Vue.use(TreeSelect);
Vue.use(List);
Vue.use(Badge);
Vue.use(Collapse);
Vue.use(AutoComplete);
Vue.use(Steps);
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Spin);
Vue.use(Popconfirm);
Vue.use(Popover);
Vue.component("EnumItem", EnumItem);

Vue.filter("date", function(value, fmt) {
  return formatDate(value, fmt);
});

Vue.filter("fullDate", function(value) {
  return formatFullDate(value);
});

Vue.filter("shortDate", function(value) {
  return formatShortDate(value);
});

Vue.filter("percent", function(value) {
  return (value * 100).toFixed(2) + "%";
});

//路由权限校验 ：
// to：router即将进入的路由对象，
// from：当前导航即将离开的路由，
// next：Function，进行管道中的一个钩子，如果执行完了，则导航的状态就是confirmed（确认的）；否则为false，终止导航
router.beforeEach((to, from, next) => {
  if (to.meta && !Vue.prototype.$secured(to.meta.authority)) {
    next({ path: "/exception/403" });
  } else {
    next();
  }
});

// 单页面应用
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
