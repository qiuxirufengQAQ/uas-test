import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// require.context全局注册非常通用的基础组件，
// 第一个参数 其组件目录的相对路径
// 第二个参数 是否查询子目录
// 第三个参数 匹配组件文件名的正则表达式
const files = require.context("./stores", true, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  const n = key.substring(2, key.length - 3);
  modules[n] = files(key).default;
});

export default new Vuex.Store({
  strict: true,
  modules,
  getters: {
    permissions: state => state.app.permissions,
    currUser: state => state.app.currUser
  }
});
