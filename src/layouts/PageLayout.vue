<template>
  <div style="margin: -24px -24px 0px">
    <page-header :title="title">
      <slot slot="content" name="headerContent"></slot>
      <div
        slot="content"
        v-if="!this.$slots.headerContent && (desc || (linkList && linkList.length>0))"
      >
        <p v-if="desc" style="font-size: 14px;line-height: 1.5;color: rgba(0,0,0,.65)">{{desc}}</p>
        <div class="link">
          <template v-for="(link, index) in realLinkList">
            <a :key="index" :href="link.href">
              <a-icon :type="link.icon" />
              {{link.title}}
            </a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra"></slot>
      
    </page-header>

    <div ref="page" :class="['page-content', layout]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/page/PageHeader";
export default {
  name: "PageLayout",
  components: { PageHeader },
  props: ["desc", "logo", "title", "avatar", "linkList", "extraImage"],
  computed: {
    layout() {
      return this.$store.state.app.layout;
    },
    realLinkList() {
      if (this.linkList) {
        return this.linkList.filter(i => this.$secured(i.authority));
      }
      return [];
    },
    multipage() {
      return this.$store.state.app.multipage;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
    close() {
      this.$eventBus.$emit("closePage", this.$route.fullPath);
    }
  }
};
</script>

<style lang="less" scoped>
.link {
  margin-top: 16px;
  line-height: 24px;
  a {
    font-size: 14px;
    margin-right: 32px;
    i {
      font-size: 22px;
      margin-right: 8px;
    }
  }
}
.page-content {
  &.side {
    margin: 24px 24px 0px;
  }
  &.head {
    margin: 24px auto 0;
    max-width: 1400px;
  }
}
</style>
