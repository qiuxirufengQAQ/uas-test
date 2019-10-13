<template>
  <a-layout>
    <!-- 选择为手机时展示的关闭导航栏 -->
    <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
      <sider-menu
        :theme="theme"
        :menuData="menuData"
        :collapsed="false"
        :collapsible="false"
        @menuSelect="onMenuSelect"
      />
    </drawer>
    <sider-menu
      :theme="theme"
      v-else-if="layout === 'side'"
      :menuData="menuData"
      :collapsed="collapsed"
      :collapsible="true"
    >ceshi</sider-menu>
    <a-layout>
      <global-header :menuData="menuData" :collapsed="collapsed" @toggleCollapse="toggleCollapse" />
      <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="padding: 0px">
        <global-footer :copyright="copyright" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";
import Drawer from "../components/tool/Drawer";
import SiderMenu from "../components/menu/SiderMenu";

const minHeight = window.innerHeight - 64 - 24 - 53;

export default {
  name: "GlobalLayout",
  components: { SiderMenu, Drawer, GlobalFooter, GlobalHeader },
  data() {
    return {
      minHeight: minHeight + "px",
      collapsed: false
    };
  },
  computed: {
    menuData() {
      return this.$store.state.app.menuData;
    },
    isMobile() {
      return this.$store.state.app.isMobile;
    },
    theme() {
      return this.$store.state.app.theme;
    },
    layout() {
      return this.$store.state.app.layout;
    },
    copyright() {
      return this.$store.state.app.copyright;
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    onDrawerChange(show) {
      this.collapsed = show;
    },
    onMenuSelect() {
      this.toggleCollapse();
    }
  },
  beforeCreate() {
    this.$store.dispatch({
      type: "app/fetchSessionInfo"
    });
  }
};
</script>

<style lang="less" scoped>
</style>
