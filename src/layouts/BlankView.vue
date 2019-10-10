<template>
    <keep-alive>
      <router-view ref="page" :key="$route.fullPath"/>
    </keep-alive>
</template>

<script>
export default {
  name: "BlankView",
  data() {
    return {
      desc: "",
      linkList: [],
      extraImage: ""
    };
  },
  mounted() {
    this.getPageHeaderInfo();
  },
  updated() {
    this.getPageHeaderInfo();
  },
  methods: {
    getPageHeaderInfo() {
      let page = this.$refs.page;
      page = page ? page : {};
      this.desc = page.desc;
      this.linkList = page.linkList;
      this.extraImage = page.extraImage;
    }
  }
};
</script>

<style scoped>
</style>
