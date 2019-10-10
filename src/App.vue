<template>
  <div id="app">
    <!-- <a-local-provider> 为组件内建文案提供统一的国际化支持 -->
    <a-locale-provider :locale="locale">
      <router-view/>
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enquireScreen from "./utils/device";

export default {
  name: "App",
  data() {
    return {
      locale: zhCN
    };
  },
  created() {
    let _this = this;
    enquireScreen(isMobile => {
      _this.$store.commit("app/setIsMobile", isMobile);
    });
  }
};
</script>

<style lang="less">
:global {
  //拖拽控件全局样式
  .dragable-ghost {
    border: 1px dashed #aaaaaa;
    opacity: 0.65;
  }
  .dragable-chose {
    border: 1px dashed #aaaaaa;
    opacity: 0.65;
  }
  .dragable-drag {
    border: 1px dashed #aaaaaa;
    opacity: 0.65;
  }
  //页面切换动画
  .page-toggle-enter-active {
    transition: all 0.2s ease-in 0.25s;
  }
  .page-toggle-leave-active {
    transition: all 0.2s ease-out 0s;
  }
  .page-toggle-enter,
  .page-toggle-leave-to {
    opacity: 0;
    padding: 0px;
  }
}
</style>
