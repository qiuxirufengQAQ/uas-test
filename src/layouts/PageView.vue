<template>
  <router-view ref="page" />
</template>

<script>
import PageHeader from "../components/page/PageHeader";
import PageLayout from "./PageLayout";
export default {
  name: "PageView",
  components: { PageLayout, PageHeader },
  data() {
    return {
      title: "",
      desc: "",
      linkList: [],
      extraImage: ""
    };
  },
  computed: {
    multipage() {
      return this.$store.state.app.multipage;
    }
  },
  mounted() {
    this.getPageHeaderInfo();
  },
  updated() {
    this.getPageHeaderInfo();
  },
  methods: {
    getPageHeaderInfo() {
      this.title = this.$route.name;
      let page = this.$refs.page;
      console.log(page);
      page = page ? page : {};
      this.desc = page.desc;
      this.linkList = page.linkList;
      this.extraImage = page.extraImage;
    }
  }
};
</script>

<style lang="less" scoped>
.extraImg {
  margin-top: -60px;
  text-align: center;
  width: 195px;
  img {
    width: 100%;
  }
}
</style>
