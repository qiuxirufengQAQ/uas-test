<template>
  <transition name="page-toggle">
    <keep-alive v-if="multipage">
      <router-view ref="page" :key="$route.fullPath"/>
    </keep-alive>
    <router-view v-else ref="page" />
  </transition>
</template>

<script>
export default {
  name: "RouteView",
  computed: {
    multipage() {
      return this.$store.state.app.multipage;
    }
  }
};
</script>

<style scoped>
</style>
